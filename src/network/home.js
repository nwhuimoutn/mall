//封装首页的所有请求
import {request} from "./request"

//多个url不同封装
export function getHomeMultidata(){
  return request({
    url:'/home/multidata',
    // url:"/recommend"
  })
}
//获取商品数据的路径 需要传参  数据类型,页面
export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }

  })
}
