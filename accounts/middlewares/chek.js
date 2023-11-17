module.exports=(req,res,next)=>{
    //设置session判断
    if(!req.session.username){
      return res.redirect('/login')
    }
    next()
  }