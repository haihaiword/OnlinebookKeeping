const mongoose=require('mongoose')
let accountsSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    time:Date,
    type:{
        type:Number,
        default:-1
    },
    account:{
        type:Number,
        require:true
    },
    remarks:{
        type:String
    }
})
//创建模型对象
let accountsModle=mongoose.model('books',accountsSchema)
module.exports=accountsModle