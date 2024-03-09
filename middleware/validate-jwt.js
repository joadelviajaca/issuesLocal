const { request, response } = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            msg: 'No hay token de autenticación en la petición o no está en el formato correcto'
        });
    }

   

    try {
        const token = authHeader.split(' ')[1];
        //const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const { uid } = jwt.verify(token, 'Est03sMyPub1cK3y54@453');
        //req.uid = uid;
        console.log('Uid: ',uid)
        const user = await User.findById(uid);
        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }
        console.log('User: ', user)
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validateJWT
}