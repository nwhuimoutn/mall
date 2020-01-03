<template>
 <!--绑定图片位置-->
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <!--商品描述-->
      <p>{{goodsItem.title}}</p>
      <!--商品价格-->
      <span class="price">{{goodsItem.price}}</span>
      <!--收藏-->
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'GoodsListItem',
  props:{
    goodsItem:{
      //商品是实际信息为Object类型
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
/**图片占屏幕的百分比 */
    width: 46%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }
  /**收藏图标 */
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
