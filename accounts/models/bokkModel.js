const mongoose=require('mongoose')
let BookSchema=new mongoose.Schema({
    name:String,
    author:String,
    price:Number
})
//创建模型对象
let BookModle=mongoose.model('books',BookSchema)
module.exports=BookModle