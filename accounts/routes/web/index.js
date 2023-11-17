var express = require('express');
var router = express.Router();
//导入monent
const moment =require('moment');
const accountsModle = require('../../models/AccountModle');
/* GET home page. */
//导入中间件
let check=require('../../middlewares/chek')
//首页
router.get('/',(req,res)=>{
  res.redirect('/account')
})
router.get('/account',check, function(req, res, next) {
   //获取所有的集合信息
  accountsModle.find().sort({time:-1}).exec((err,data)=>{
    if(err){
      res.status(500).send(' 读取失败')
    }
    
    res.render('list',{accounts:data,moment:moment})
  })
  
  
});
router.get('/account/create', check,function(req, res, next) {
  res.render('create')
});
//新增记录
router.post('/account',check,(req,res)=>{
  accountsModle.create({
    ...req.body,
    time:moment(req.body.time).toDate()
  },(err,data)=>{
    if(err){

      res.status(500).send('插入失败')
      return
    }
  //成功提醒
  res.render('success',{msg:'添加成功了',url:'/account'})
})
})
router.get('/account/:id',check,(req,res)=>{
  //获取params的id参数
  let id=req.params.id
  //删除
  accountsModle.deleteOne({_id:id},(err,data)=>{
    if(err){
      res.status(500).send('删除失败')
      return
    }
 
  res.render('success',{msg:'删除成功',url:'/account'})
})
})
module.exports = router;
