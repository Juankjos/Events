const { response } = require('express');
const User = require('../models/users');
const bcryptjs = require('bcryptjs');

const userGet = async(req = request, res = response) => {
    
    const {mylimit = 20, init = 0} =req.query;
    const query = {status: true};

    const [totalUsers, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(init))
        .limit(Number(mylimit))
    ])
    res.json({
        totalUsers, 
        user
    });
}

const userPost = async(req, res = response) => {

    const {fname, lname, alias, password, email} = req.body;
    const user = new User({fname, lname, alias, password, email});

    //Encriptación de contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        msg: 'post CONTROLLER',
        user
    });
}

const userPut = async(req, res = response) => {
    const {id} = req.params;
    const {_id, password, ...every} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        rest.every = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, every);

    res.json(user);
}

const userDelete = async(req, res = response) => {
    const {id} = req.params;

    const user = await User.findByIdAndUpdate(id, {status: false});
    res.json(user);
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete
}