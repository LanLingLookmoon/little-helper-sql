const jsonWebToken = require('jsonwebtoken');

const SECRET_KEY = 'kity269716067060'

const verifyToken = (req, res, next) => {
    const isLogin = '/api/example'
    if (req.originalUrl == isLogin) {
        next()
        return
    }
    jsonWebToken.verify(req.headers.token, SECRET_KEY, function (__err, decode) {
		if (__err) {
			return res.status(401).send({
				code: 401,
				data: null,
				message: "登录过期,请重新登录"
			});
		} else {
			next();
		}
	})
}

const generateToken = (userInfo) => {
    const token = jsonWebToken.sign(userInfo,SECRET_KEY,{
        expiresIn:"72h", //token有效期
        // expiresIn: 60 * 60 * 24 * 7,  两种写法
    })
    return token
}

module.exports = { verifyToken, generateToken }