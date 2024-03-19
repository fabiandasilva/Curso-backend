const jwt = require("jsonwebtoken");

const generateJWT =(user)=>{
    return new Promise((resolve, reject) => {
        jwt.sign({user}, process.env.SECRET_JWT, {expiresIn: '1h'}, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    })
}


module.exports = {
    generateJWT,
    };