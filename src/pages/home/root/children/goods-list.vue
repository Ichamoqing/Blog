<template>
<div class="good-list">
  <h3 class="name">{{data.name}}</h3>
  <p class="desc">{{data.desc}}</p>

  <div class="row" v-for="(list, index) in showList" :key="index">
    <item :data="list[0]"/>
    <item v-if="list.length>1" :data="list[1]"/>
  </div>
  

</div>
</template>

<script>
import item from './goods-item'
export default {
  components: {
    item
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    showList(){
      // 拷贝原数组
      let itemList = [...this.data.itemList];
      // 准备一个临时数组，装数据
      let tmp = [];
      // 切割数组，2个为一组进行切割
      while(itemList.length > 0){
        tmp = [...tmp, itemList.splice(0, 2)];
      }
      // 处理好的数组给组件使用
      return tmp;
    }
  }
}
</script>

<style scoped>
.row{
  overflow: hidden;
}
</style>