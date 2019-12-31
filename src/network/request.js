//考虑扩展性每一个定义一个名字每一个封装
import axios from 'axios'

export function request(config){
    //1.创建axios的实例
   const instance=axios.create({
       baseURL:'http://123.207.32.32:8000',
    // baseURL: 'http://123.207.32.32:8000/api/v2',
    // baseURL: 'http://106.54.54.237:8000/api/v1',
       timeout:5000
   })
   //2.1 axios拦截器 请求use()传入两个参数有一个是配置信息
   //,一个是错误信息
   instance.interceptors.request.use(config=>{
    //    console.log(config);
       //这里可以对拦截的信息做进一步的扩展修改再返回
       //每次发送网络请求时,都希望在界面中显示已个请求的图标
       //某些网络请求(登录时(token)),必须携带以下特殊的信息
       //切记拦截数据要返回数据 不然接受不到数据
       return config
   },err=>{
    //    console.log(err);
   })
   //2.2 响应拦截  一样传2个参数 一个是数据一个是错误
   instance.interceptors.response.use(res=>{
       console.log(res);
       //返回data 真实开发就是需要data
       return res.data
   },err=>{
       console.log(err);
   })
   //3.发送网络请求
   return instance(config)
}

