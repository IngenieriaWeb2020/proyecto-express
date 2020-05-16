const { Router } = require('express');
const security = require('../security/security');

const router = Router();


// Se borrará, solo es de colchon por el momento
const User = require('../data/User')
const Permiso = require('../data/Permiso');


router.post('/login', security.validateLogin)
    // Se borrará, solo es de colchon por el momento
    .all('/verificar', security.verificarToken, (req, res) => res.send("Se permitió"))
    // Se pasará a bussines, solo es de colchon de pruebas por el momento
    //.post('/create', async (req, res) => {
        // CREAR PERMISOS ----------------------------------
        /*
        let permiso = new Permiso({
            rol: 'encargadoInventario',
            verUsuario: true,
            verPerfilUsuario: true,
            actualizarPerfilUsuario: true,
            registrarMaquina: true,
            actualizarInventario: true,
            registrarVenta: true,
            registrarCompra: true,
            registrarUsuario: false,
            actualizarUsuario: true,
            registrarContrato: false,
            verUsuarios: false,
            verReportes: false,
            verReporte: true
        })
        await permiso.save();
        res.send('Registrado')
        */

        // CREAR USUARIO --------------------------------------------------------------------
        /*
        let userBody = req.body;
        let user = new User({
            cedula: userBody.cedula,
            nombre: userBody.nombre,
            apellido: userBody.apellido,
            correo: userBody.correo,
            direccion: userBody.direccion,
            telefono: userBody.telefono,
            username: userBody.username
        });
        user.password = await user.encryptPassword(userBody.password);
        try{
            await user.save();
            res.send({msg:'Registrado', user});
        }catch(err){
            res.send({msg: err.errmsg || err.message, err});
        }
        */
    //})

module.exports = router;