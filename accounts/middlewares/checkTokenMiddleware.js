const jwt = require('jsonwebtoken')
const { secrect } = require('../config')
module.exports = (req, res, next) => {
    let token = req.get('token')
    if (!token) {
        res.json({
            code: '2003',
            msg: 'token缺少',

            data: null
        })
        return
    }
    jwt.verify(token, secret, (err, data) => {
        if (err) {
            res.json({
                code: '2004',
                msg: '校验失败',
                data: null
            })
            return
        }
        req.user=data
        next()
    });
}