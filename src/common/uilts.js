//防抖动功能封装

//防抖操作函数(传入function,等待时间)
    //这里的func 相当于this.$refs.scroll.refresh
export function debounce(func,delay){
      let timer=null
      return function(...args){
        //判断之前的timer有没有值 有的话清除掉
        if(timer) clearTimeout (timer)
        //从新计时
        timer = setTimeout(()=>{
          //把传入的数据放进
          func.apply(this,args)
        },delay)

      }
    }
