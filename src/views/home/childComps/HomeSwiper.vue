<template>

     <!--使用轮播图-->
  <swiper>
    <!--放入多张图片-->
    <swiper-item v-for="(item, index) in banners" :key="index">
      <!--因为轮播有点击事件所以要绑定点击事件-->
       <a :href="item.link">
         <img :src="item.image" alt="">
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

    }
  },
  components: {
    Swiper,SwiperItem
  }
}
</script>

<style scoped>
</style>
