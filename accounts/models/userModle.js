const mongoose=require('mongoose')
let userSchema=new mongoose.Schema({
    username:String,
    password:String
})
//创建模型对象
let useModle=mongoose.model('users',userSchema)
module.exports=useModle