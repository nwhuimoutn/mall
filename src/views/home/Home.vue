<template>

<div id='home'>
  <!--放入头部具体的插槽-->
  <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends='recommends'></recommend-view>
  <feature-view></feature-view>
    <!--class="tab-control" 定义实现吸顶效果-->
    <tab-control class="tab-control"
    :titles="['流行','新款','精选']"
    @tabClick='tabClick'></tab-control>
    <!--动态获取切换信息-->
    <goods-list :goods="showGoods"></goods-list>

    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

</div>
</template>

<script type="text/javascript">
import NavBar from 'components/common/navbar/NavBar'
//tab栏
import TabControl from "components/content/tabControl/TabControl";

 //引入轮播图
import HomeSwiper from "./childComps/HomeSwiper";
//推荐栏
import RecommendView from "./childComps/RecommendView";
//本周流行
import FeatureView from "./childComps/FeatureView";
//商品组件
import GoodsList from 'components/content/goods/GoodsList'


//封装好引用 这样就只用对该包里的函数处理就好
import {getHomeMultidata} from 'network/home'
import {getHomeGoods} from 'network/home'


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
      currentType:'pop'

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
      })
    }


  },
  components: {

    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList

  }
}
</script>

<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
    /*设置背景颜色var(--color-tint)是在css文件里定义的变量  */
    background-color: var(--color-tint);
    color: #fff ;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    /**position: sticky 吸顶效果实现  很多浏览器不支持这个属性
    移动端多数支持*/
    position: sticky;
    /**吸顶停留的位置 */
    top: 44px;
    /**吸顶 */
     z-index: 9;

  }
</style>
