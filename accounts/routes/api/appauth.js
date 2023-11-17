var express = require('express');
var router = express.Router();
const jwt=require('jsonwebtoken')
const useModle=require('../../models/userModle')
const {secret}=require('../../config')
//注册功能
router.post('/login',(req,res)=>{
    //查询数据库是否匹配数据库信息
    let{username,password}=req.body
    useModle.findOne({username:username,password:password},(err,data)=>{
        if(err){
            res.status(500).send('登录失败，请再次尝试')
            res.json({
                code:'2001',
                msg:'数据库读取失败',
                data:null
            })
            return
        }
        //判断data是否读取到
        if(!data){
            res.json({
                code:'2002',
                msg:'用户名或者密码错误',
                data:null
            })
            return
        }
        let token=jwt.sign({
            username:data.username,
            _id:data._id
        },secret,{expiresIn:60*60*24*7})
        //响应token
        res.json({
            code:'0000',
            msg:'登陆成功',
            data:token
        })
        
    })
})
//退出登录
router.post('/logout',(req,res)=>{
    //销毁session
    req.session.destroy(()=>{
        res.render('success',{msg:'退出成功',url:'/login'})
    })
})
module.exports = router;
