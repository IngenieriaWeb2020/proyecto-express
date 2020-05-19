const { Router } = require('express');
const security = require('../security/security');

const router = Router();


// Se borrará, solo es de colchon por el momento
const User = require('../data/User')
const Permiso = require('../data/Permiso');
const PuntoVenta = require('../data/PuntoVenta');
const tareasPrueba = require('../business/tareasProgramadas');


router.post('/login', security.validateLogin)
    // Se pasará a bussines, solo es de colchon de pruebas por el momento
    .post('/create', async (req, res) => {
        // CREAR PERMISOS ------------------------------------------------------------------
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

        // CREAR ADMIN, EMPLEADO O ENCARGADO --------------------------------------------------------------------
        
        /* let userBody = req.body;
        let user = new User({
            cedula: userBody.cedula,
            nombre: userBody.nombre,
            apellido: userBody.apellido,
            correo: userBody.correo,
            direccion: userBody.direccion,
            telefono: userBody.telefono,
            username: userBody.username,
            rol: userBody.rol
        });
        user.password = await user.encryptPassword(userBody.password);
        try{
            await user.save();
            res.send({msg:'Registrado', user});
        }catch(err){
            res.send({msg: err.errmsg || err.message, err});
        } */
       

        // CREAR TERCERO ---------------------------------------------------------------------------------
        /*
        let tercero = new User({
            nombre: 'Ramon',
            apellido: 'Ayala',
            direccion: 'Cll 61 # 22',
            telefono: '5206479'
        });
        await tercero.save()
        res.send({msg:'Registrado', tercero})
        */

        // CREAR PUNTO DE VENTA --------------------------------------------------------------------------
        /*
        let puntoVenta = new PuntoVenta({
            administrador: '5ebb1c7c7732fd1864e5cf39',
            encargadoInventario: '5ec1cd1713d68a3de0357213',
            direccion: 'Cll 20 # 10'
        });
        await puntoVenta.save();
        res.send({msg: 'Registrado', puntoVenta});
        */

        tareasPrueba.ventasSemanales();
        res.send('x');
    });

module.exports = router;