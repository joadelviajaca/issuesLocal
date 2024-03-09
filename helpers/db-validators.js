const User = require('../models/user');

const emailExists = async( email = '' ) => {

    // Verificar si el correo existe
    const existsEmail = await User.findOne({ email });
    if ( existsEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const loginUsed = async( login = '') => {
    const existsLogin = await User.findOne({ login });
    if ( existsLogin) {
        throw new Error(`El login: ${ login }, está en uso`);
    }
}

const existsUserById = async( id ) => {

    // Verificar si el id existe
    const existsUser = await User.findById(id);
    if ( !existsUser ) {
        throw new Error(`El id no existe ${ id }`);
    }
}



module.exports = {
    emailExists,
    existsUserById,
    loginUsed
}
