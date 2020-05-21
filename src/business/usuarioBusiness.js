const User = require('../data/User');

const contratoBusiness = require('./contratoBusiness');
const msgs = require('../util/messages');

async function verUsuarios(req, res){
    try {
        let usuarios = await User.find().where('rol').ne('tercero');
        res.send({auth: true, usuarios});
    } catch (err) {
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function verUsuario(req, res){
    let userId = req.params.id;

    try {
        let user = await User.findById(userId);

        res.send({auth: true, user});
    } catch (err) {
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function registrarUsuario(req, res){
    let { userBody, contratoBody } = req.body;

    let user = await User.findOne({username: userBody.username});
    if(user){
        return res.status(409).send({auth: false, msg: msgs.alreadyExist}); // Conflict
    }

    user = await User.findOne({correo: userBody.correo});
    if(user){
        return res.status(409).send({auth: false, msg: msgs.alreadyExist}); // Conflict
    }

    let newUser = new User(userBody);
    newUser.password = await newUser.encryptPassword(userBody.password);

    try{
        await newUser.save();
        contratoBusiness.registrarContrato(newUser._id, contratoBody);

        res.send({auth: true, msg: msgs.registered});
    }catch(err){
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

async function actualizarUsuario(req, res){
    let updateData = req.body;

    let user = await User.findById(updateData._id);
    if(!user){
        return res.status(404).send({auth: false, msg: msgs.wrongData}); // Not found
    }

    try{
        await user.updateOne(updateData);
        res.send({auth: true, msg: msgs.registered});
    }catch(err){
        res.status(500).send({auth: false, msg: msgs.serverError, errmsg: err.errmsg || err.message});
    }
}

module.exports = {
    verUsuarios,
    verUsuario,
    registrarUsuario,
    actualizarUsuario
}