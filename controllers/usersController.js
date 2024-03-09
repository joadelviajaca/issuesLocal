const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const User = require('../models/user');



const getUsers = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

const getUser = async (req = request, res = response) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        user
    })
}

const createUser = async (req, res = response) => {

    const { name, email, login, password, role } = req.body;
    const user = new User({ name, email, login, password, role });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
        user
    });
}

const updateUser = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, email, ...rest } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}



const deleteUser = async (req, res = response) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });


    res.json(user);
}




module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    getUser
}