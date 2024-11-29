const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    // autorizacion por headers
    const authHeader = req.get('Authorization');

    if(!authHeader)
    {
        const error = new Error('No autenticado, no hauy JWT');
        error.statusCode = 401;
        throw error;
    }

    // obtener el token
    const token = authHeader.split('')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token,'secret_key')
        
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // si es un token valido, pero si hay error
    if(!revisarToken)
    {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}