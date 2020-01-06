<template>

<div id='home'>
  <!--放入头部具体的插槽-->
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <!--多一份tab-control 为了实现 吸顶覆盖-->
   <tab-control
    :titles="['流行','新款','精选']"
    @tabClick='tabClick'
    ref="tabControl1"
    class='tab-control'
    v-show="isTabFixed"/>

  <!--滚动内容-->
  <scroll class="content"
          ref="scroll"
          :probe-type='3' @scroll='contentScroll'
          :pull-up-load="true" @pullingUp='loadMore'>
          <!--@swiperImageLoad.once   .once是获取一次高度--->
    <home-swiper :banners="banners"
                 @swiperImageLoad='swiperImageLoad'/>
    <recommend-view :recommends='recommends'/>
    <feature-view></feature-view>
    <!--class="tab-control" 定义原生浏览器实现吸顶效果-->
    <tab-control
    :titles="['流行','新款','精选']"
    @tabClick='tabClick'
    ref="tabControl2"/>
    <!--动态获取切换信息-->
    <goods-list :goods="showGoods"></goods-list>
  </scroll>

  <!--调用 监控点击回顶-->
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

</div>
</template>

<script type="text/javascript">

import NavBar from 'components/common/navbar/NavBar'
//tab栏
import TabControl from "components/content/tabControl/TabControl";
//商品组件
import GoodsList from 'components/content/goods/GoodsList'
//上拉滚动
import Scroll from 'components/common/scroll/Scroll'
//回顶图标
import BackTop from 'components/content/backTop/BackTop'


 //引入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//推荐栏
import RecommendView from "./childComps/RecommendView";
//本周流行
import FeatureView from "./childComps/FeatureView";


//封装好引用 这样就只用对该包里的函数处理就好
import {getHomeMultidata} from 'network/home'
import {getHomeGoods} from 'network/home'
import {debounce} from 'common/uilts'


export default {
  name: "Home",
  data() {
    return {
      //数据结果
      banners:[],
      recommends:[],
      goods:{
        //'流行','新款','精选' 数据
        'pop':{page: 0,list: []},
        'new':{page: 0,list: []},
        'sell':{page: 0,list: []}
      },
      //设置默认的页面
      currentType:'pop',
      //设置默认回顶图标不显示
      isShowBackTop:false,
      //保存滚动到什么位置的值
      tobOffsetTop:0,
      //设定默认不吸顶
      isTabFixed:false

    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  //生命周期函数
  created(){
    //1.调用methods里的  getHomeMultidata方法
    // 因为与methods里的方法名相同 使用this
    this.getHomeMultidata();

    //2.调用methods里的 请求数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  mounted(){
    //1.图片加载完成的时间监听
    //这个就相当于 deounce函数的返回值 可以后面跟延迟多少 200毫秒
    const refresh=debounce(this.$refs.scroll.refresh)
      //监听item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
      //图片加载一次更新一次数据
      // this.$refs.scroll.refresh()
      refresh()
    })


  },
  methods:{
    /**
     * 事件监听方法
     */
    //


    tabClick(index){
      console.log(index);

      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType='sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    backClick(){
      // console.log("dianji");
      //传入 scrill的 scrollTo方法
      this.$refs.scroll.scrollTo(0,0)
    },
    //自定义事件的方法 获取回顶的显示问题
    //position.y 值>1000px时 显示  因为Y轴向下滚是负值这里转正
    contentScroll(position){
      //判断BackTop 什么时候显示
      this.isShowBackTop=(-position.y) >800
      //决定tabControl是否吸顶(position:flix)
      this.isTabFixed=(-position.y) >this.tobOffsetTop
    },

    loadMore(){
      console.log("上拉加载");
      //当前加载的谁 就是记录的谁 当前
      this.getHomeGoods(this.currentType)
      // //从新计算所有可滚动的区域
      // this.$refs.scroll.scroll.refresh()

    },

    //获取用于吸顶的图片高度
    swiperImageLoad(){
      //.获取tabControl的offsetTop
      //所有的组件都有一个属性$el:用于获取组件中的元素
    this.tobOffsetTop=this.$refs.tabControl2.$el.offsetTop
    console.log( this.$refs.tabControl2.$el.offsetTop);
    },


    /**
     * 网络请求方法
     */
    //对生命周期函数的方法进行封装
    getHomeMultidata(){
       //1.请求多个数据 通过then 获取之前在request返回的就是promies数据
      getHomeMultidata().then(res=>{
      // console.log(res);
      //组件调用个的数据=当前数据
      //.data.banner.list 这些数据是我们需要的具体数据
      //是通过 调试工具vuetools 查看home/data对象 获取的
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods(type){
      //动态获取当前页面数 当第二次请求页面发生变化+1页
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        //不断添加商品请求
        this.goods[type].list.push(...res.data.list)
        //添加完商品后 页面显示+1
        this.goods[type].page +=1

        //当上拉加载更多完成后调用方法进行下一次加载
        this.$refs.scroll.finishPullUp()
      })
    }


  },
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop

  }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  /** vh 代表视口 100代表100% */
   height: 100vh;
   position: relative;
}
.home-nav{
    /*设置背景颜色var(--color-tint)是在css文件里定义的变量  */
    background-color: var(--color-tint);
    color: #fff ;

   /**在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control{ */
    /**position: sticky 吸顶效果实现  很多浏览器不支持这个属性
    移动端多数支持*/
    /* position: sticky; */
    /**吸顶停留的位置 */
    /* top: 44px;
    /**吸顶 */
     /* z-index: 9; */

  /* } */
  /**滚动框样式 */
  .content{
    /* height: calc(100% - 93px);

     overflow: hidden;
     margin-top: 44px */

    overflow: hidden;
    position: absolute;
    /**上面高度 */
    top: 44px;
    /**下面高度 */
    bottom: 49px;

    left: 0;
    right: 0;
  }
  /**设定 tab-control 停留的位置 */
  .tab-control{
    position: relative;
    z-index: 9;
  }


</style>
