<template>
  <div class="goods">
    <!--遍历goods-item组件 让每一个goods-item组件对应一个商品-->
    <goods-list-item v-for="item in goods"
    :key=item.id :goods-item='item'/>

  </div>
</template>

<script type="text/javascript">
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  props:{
    goods:{
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
    GoodsListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    /** 描述的字 包裹 */
    flex-wrap: wrap;
    /**均等分 让 */
    justify-content: space-around;

    padding: 2px;
  }
</style>
