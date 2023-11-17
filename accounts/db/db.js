module.exports=function(success,error){
const mongoose=require('mongoose')
//连接mongodb服务
const {DBHOST, DBPORT,DBNAME}=require('../config')
//设置strictQuery为true
strictQuery=true
mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
if(error !=='function'){
    error=()=>{
        console.log('连接失败');
    }
}
mongoose.connection.once('open',()=>{
    success()
})
mongoose.connection.once('error',()=>{
    error()
})
mongoose.connection.once('close',()=>{
    console.log('连接关闭');
})
}