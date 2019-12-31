<template>

<div id='home'>
  <!--放入头部具体的插槽-->
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends='recommends'></recommend-view>
</div>
</template>

<script type="text/javascript">
import NavBar from 'components/common/navbar/NavBar'
 //引入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//推荐栏
import RecommendView from "./childComps/RecommendView";

//封装好引用 这样就只用对该包里的函数处理就好
import {getHomeMultidata} from 'network/home'


export default {
  name: "Home",
  data() {
    return {
      //数据结果
      banners:[],
      recommends:[]
    }
  },
  //生命周期函数
  created(){
    //1.请求多个数据 通过then 获取之前在request返回的就是promies数据
    getHomeMultidata().then(res=>{
      console.log(res);
      //组件调用个的数据=当前数据
      //.data.banner.list 这些数据是我们需要的具体数据
      //是通过 调试工具vuetools 查看home/data对象 获取的
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView

  }
}
</script>

<style scoped>
.home-nav{
    /*设置背景颜色var(--color-tint)是在css文件里定义的变量  */
    background-color: var(--color-tint);
    color: #fff ;
  }
</style>
