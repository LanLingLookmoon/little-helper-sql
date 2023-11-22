const jsonWebToken = require('jsonwebtoken');

const SECRET_KEY = 'kity269716067060'

const verifyToken = (req, res, next) => {
    // console.log(1111);
    next()
}

const generateToken = (userInfo) => {
    const token = jsonWebToken.sign(userInfo,SECRET_KEY,{
        expiresIn:"72h", //token有效期
        // expiresIn: 60 * 60 * 24 * 7,  两种写法
    })
    return token
}

module.exports = { verifyToken, generateToken }