<template>
  <div class="tab-control">
    <div v-for="item in titles " :key="item.id">
        <span>{{item}}</span>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'TabControl',
  porps:{
    titles:{
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
  }
}
</script>

<style scoped>
</style>
