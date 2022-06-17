// 引入express
const express = require('express')
// 创建一个实例
const app = express()
// 指定静态资源
app.use(express.static(__dirname+'/static'))
// 配置路由
app.get('/todolist',(request,response)=>{
    // 发送数据 给客户端返回数据
    // response.send({
    //     name:'tom',
    //     age:18
    // })
})
// 端口监听 
app.listen(8001,(err)=>{
    if(!err){
        console.log('服务器已启动！');
    }
})