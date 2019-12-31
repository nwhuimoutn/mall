//封装首页的所有请求
import {request} from "./request"

//多个url不同封装
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}
