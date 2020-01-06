<template>
<!--ref 一般用于绑定子组件 父组件访问子组件-->
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

// <script type="text/javascript">
import BScroll from 'better-scroll'
// import BScroll from '@better-scroll/core'
// import PullUp from '@better-scroll/pull-up'

export default {
  name: 'Scroll',
  props:{
    //监听滚动位置
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted(){
    //获取wrapper对象
    this.scroll=new BScroll(this.$refs.wrapper,{
      //监听滚动位置
      probeType:this.probeType,
      click:true,
      //上拉加载更多
      pullUpLoad:this.pullUpLoad

    })
    //回顶位置调用
    this.scroll.scrollTo(0,0)
    //监听滚动位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      //把数据传出去 谁调用谁自定义调用事件
      this.$emit('scroll',position)
    })
     this.scroll.on('pullingUp',()=> {
      // console.log('上拉加载');
      this.$emit('pullingUp')
    })


  },
  methods:{
    //把 scrollTo方法封装传出去
    scrollTo(x,y,time=300){
      //当都为true时  才会执行(防止页面加载时图片已经加载的报错)
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //上拉加载完后方法后的封装
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    //图片加载更新方法
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  },
  components: {
  }
}
</script>

<style scoped>
</style>
