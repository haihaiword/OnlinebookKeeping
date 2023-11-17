var express = require('express');
var router = express.Router();
const useModle=require('../../models/userModle')
//注册功能
router.get('/reg',(req,res)=>{
    res.render('reg')
})
router.post('/reg',(req,res)=>{
    //获取请求体数据
    useModle.create(req.body,(err,data)=>{
        if(err){
            res.status(500).send('注册失败，请再次尝试')
            return
        }
        res.render('success',{msg:'注册成功',url:'login'})
    })
})
//登录功能
router.get('/login',(req,res)=>{
    res.render('login')
})
router.post('/login',(req,res)=>{
    //查询数据库是否匹配数据库信息
    let{username,password}=req.body
    useModle.findOne({username:username,password:password},(err,data)=>{
        if(err){
            res.status(500).send('登录失败，请再次尝试')
            return
        }
        //判断data是否读取到
        if(!data){
            res.send('账号密码错误')
            return
        }
        //写入session
        req.session.username=data.username
        req.session._id=data._id
        //登录成功，跳转到账单列表
        res.render('success',{msg:'登陆成功',url:'/account'})
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
