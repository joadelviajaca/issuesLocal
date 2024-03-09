const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../helpers/validate-fields');


const { login, validateToken } = require('../controllers/auth');
const { validateJWT } = require('../middleware/validate-jwt');


const router = Router();

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
],login );


router.get( '/renew', validateJWT , validateToken );


module.exports = router;