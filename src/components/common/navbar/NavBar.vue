<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "NavBar",
  data() {
    return {

    }
  },
  components: {
  }
}
</script>

<style scoped>
 .nav-bar{
   display: flex;
    height: 44px;
   /**填充高度 */
   line-height: 44px;
   /**text-align:  */
   text-align:center;
   /**添加阴影 */
   box-shadow:0 1px 1px rgba(100, 100, 100, 0.08)
 }
 .left,.right{
   width: 60px;
 }
 .center{
   /** 填充整个位置 */
   flex: 1;
 }
</style>
