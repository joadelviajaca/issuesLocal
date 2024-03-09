
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../helpers/validate-fields');
const {emailExists, existsUserById, loginUsed} = require('../helpers/db-validators')
const {createUser,deleteUser, getUsers, updateUser, getUser} = require('../controllers/usersController')
const { validateJWT} = require('../middleware/validate-jwt');
const { hasRole } = require('../middleware/validate-role');

const router = Router();


router.get('/', [
    validateJWT
], getUsers );

router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsUserById )
],
getUser)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsUserById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    // check('email', 'El correo no es válido').isEmail(),
    // check('email').custom( emailExists ),
    // check('login').custom(loginUsed),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    validateFields
],updateUser );

router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailExists ),
    check('login').custom(loginUsed),
    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),     
    validateFields
], createUser );

router.delete('/:id',[
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existsUserById ),
    validateFields
],deleteUser );






module.exports = router;