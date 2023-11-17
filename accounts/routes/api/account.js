var express = require('express');
var router = express.Router();
//导入monent
const moment = require('moment');
const accountsModle = require('../../models/AccountModle');
//token校验中间件函数
const checkTokenMiddleware = require('../../middlewares/checkTokenMiddleware')
//读取配置项

/* GET home page. */
router.get('/account', checkTokenMiddleware, function (req, res, next) {
    //获取所有的集合信息
    accountsModle.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            res.json({
                code: '1001',
                msg: '读取失败',
                data: null
            })
        }
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })
    })
})
//新增记录
router.post('/account', checkTokenMiddleware, (req, res) => {
    accountsModle.create({
        ...req.body,
        time: moment(req.body.time).toDate()
    }, (err, data) => {
        if (err) {
            res.json({
                code: '1002',
                msg: '创建失败',
                data: null
            })
            return
        }
        res.json({
            code: '0000',
            msg: '创建成功',
            data: data
        })
    })
})
router.delete('/account/:id', checkTokenMiddleware, (req, res) => {
    //获取params的id参数
    let id = req.params.id
    //删除
    accountsModle.deleteOne({ _id: id }, (err, data) => {
        if (err) {
            res.json({
                code: '1003',
                msg: '删除失败',
                data: null
            })
            return

        }

        res.json({
            code: '0000',
            msg: '删除成功',
            data: {}
        })
    })
})
//获取单个账单信息
router.get('/account/:id', checkTokenMiddleware, (req, res) => {
    let id = req.params.id
    accountsModle.findById(id, (err, data) => {
        if (err) {
            res.json({
                code: '1004',
                msg: '读取失败',
                data: null
            })

        }
        res.json({
            code: '0000',
            msg: '读取成功',
            data: data
        })
    })
})
router.patch('/account/:id', checkTokenMiddleware, (req, res) => {
    let { id } = req.params
    accountsModle.updateOne({ _id: id }, req.body, (err, data) => {
        if (err) {
            res.json({
                code: '1005',
                msg: '更新失败',
                data: null
            })
            return
        }
        //再次查询数据库获取单条数据
        accountsModle.findById(id, (err, data) => {
            if (err) {
                return res.json({
                    code: '1004',
                    msg: '读取失败',
                    data: null
                })
            }
            res.json({
                code: '0000',
                msg: '读取成功',
                data: data
            })
        })
    })
})
module.exports = router;
