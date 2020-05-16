const jwt = require('jsonwebtoken');

const User = require('../data/User');
const Permiso = require('../data/Permiso');
const config = require('../config/config');
const msgs = require('../util/messages');

async function validateLogin(req, res){
    let { username, password } = req.body;

    let user = await User.findOne({username});
    if(!user){
        return res.status(404).send({auth: false, msg: msgs.wrongData}); // Not found
    }

    let isValid = await user.validatePassword(password);
    if(!isValid){
        return res.status(404).send({auth: false, msg: msgs.wrongData}); // Not found
    }

    let permisos = await Permiso.findOne({rol: user.rol}, {rol: 0, _id: 0, __v: 0})

    let token = jwt.sign({id: user._id, permisos}, config.SECRET_KEY, {expiresIn: config.loggedInTime});
    
    await user.updateOne({fechaUltimaConexion: Date.now()}).catch(() => {
        return res.status(500).send({auth: false, msg: msgs.serverError}) // Internal Server Error      
    });

    // TODO: devolver perfil de usuario y demás informacion relevante de su dia a dia
    res.send({auth: true, token}); 
}

function verificarToken(req, res, next){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).send({auth: false, msg: msgs.noToken}); // Unauthorized
    }

    jwt.verify(token, config.SECRET_KEY, async (err, decoded) => {
        if(err){
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }

        const user = await User.findById(decoded.id);
        const permisos = await Permiso.findOne({rol: user.rol}, {rol: 0, _id: 0, __v: 0})

        let path = req.path;
        let method = req.method;
        let params = req.params;

        if(path === '/usuarios/' + params.id && method === 'GET'){
            let tienePermiso = permisos.verUsuario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/perfiles/' + params.id && method === 'GET'){
            let tienePermiso = permisos.verPerfilUsuario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/perfiles' && method === 'PUT'){
            let tienePermiso = permisos.actualizarPerfilUsuario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/maquinas' && method === 'POST'){
            let tienePermiso = permisos.registrarMaquina;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/inventarios' && method === 'PUT'){
            let tienePermiso = permisos.actualizarInventario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/ventas' && method === 'POST'){
            let tienePermiso = permisos.registrarVenta;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/compras' && method === 'POST'){
            let tienePermiso = permisos.registrarCompra;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/usuarios' && method === 'POST'){
            let tienePermiso = permisos.registrarUsuario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/usuarios' && method === 'PUT'){
            let tienePermiso = permisos.actualizarUsuario;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/contratos' && method === 'POST'){
            let tienePermiso = permisos.registrarContrato;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/usuarios' && method === 'GET'){
            let tienePermiso = permisos.verUsuarios;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/reportes' && method === 'GET'){
            let tienePermiso = permisos.verReportes;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else if(path === '/reportes/' + params.id && method === 'GET'){
            let tienePermiso = permisos.verReporte;
            if(tienePermiso) return next(); // TODO: No olvidar devolver auth: true en business
            return res.status(401).send({auth: false, msg: msgs.unauthorized}); // Unauthorized
        }
        else{
            // TODO: Eliminar path y method
            return res.status(400).send({auth: false, msg: msgs.invalidPath, path, method}); // Bad request
        }
    })
}

module.exports = {
    validateLogin,
    verificarToken
}