<template>

     <!--使用轮播图-->
  <swiper>
    <!--放入多张图片-->
    <swiper-item v-for="(item, index) in banners" :key="index">
      <!--因为轮播有点击事件所以要绑定点击事件-->
       <a :href="item.link">
         <img :src="item.image" alt="" @load="imageLoad">
       </a>
    </swiper-item>
  </swiper>

</template>

<script type="text/javascript">
import {Swiper,SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
   props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      //设定监听默认状态
      isLoad:false
    }
  },
  methods:{
    imageLoad(){
      // console.log('imageLoad');
      //获取高度一个就可以了 发送一次
     //如果没有加载
      // this.$emit('swiperImageLoad')
    if(!this.isLoad){
      this.$emit('swiperImageLoad')
      this.isLoad=true
    }

    }
  },
  components: {
    Swiper,SwiperItem
  }
}
</script>

<style scoped>
</style>
