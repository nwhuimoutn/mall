<template>
  <!--:class="{avtive: index===currentIndex}
   动态绑定积极被选中的选项
   @click="itemClick(index)
   绑定点击选项 -->
  <div class="tab-control">
    <div v-for="(item,index) in titles"
    :key=(item,index) class="tab-control-item"
    :class="{active: index===currentIndex}"
    @click="itemClick(index)">
        <span>{{item}}</span>
    </div>
  </div>

</template>

<script type="text/javascript">
export default {
  name: 'TabControl',
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      //当前选中的下标
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
      //外面往里面传数据用props ,里面往外面传输数据用 $emit
      this.$emit("tabClick",index)
    }
  },
  components: {
  }
}
</script>

<style scoped>
 .tab-control{
    display: flex;
    /**文字居中 */
    text-align: center;
    /**文字大小 */
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
 }
 .tab-control-item{
   /**文件均等分配 */
   flex:1;
   /**文字高度 */
   height: 44px;
   line-height: 44px;
 }
  /**给文字的左右上下填充5的像素 */
 .tab-control-item span{
   padding: 5px;
 }
 /**设置 选中的文字样式 */
 .active{
    color:var(--color-high-text);
}
 /**文字下面显示横杠 */
 .active span{
   border-bottom: 3px solid var( --color-tint)
 }

</style>
