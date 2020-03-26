<template>
<div class="select-item-wrap">
  <h3 class="title">{{data.name}}</h3>
  <ul class="list">
    <li class="item text-overflow" v-for="(item, index) in data.skuSpecValueList" :key="item.id"
      :class="{active: selectIndex === index}"
      @click="selectAction(index)">
      {{item.value}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: ()=>({})
    }
  },
  data(){
    return {
      selectIndex: -1
    }
  },
  methods: {
    selectAction(index){
      this.$emit('select', this.data.name, this.data.skuSpecValueList[index]);
      this.selectIndex = index;
    }
  }
}
</script>

<style scoped lang="scss">
$textColor: #DD1A21; 
.list{
  overflow: hidden;
}
.item{
  margin: 5px;
  padding: 5px;
  border: 1px solid #ddd;
  float: left;
  max-width: 90%;
  &.active{
    color: $textColor;
    border: 1px solid  $textColor;
  }
}
</style>

<style lang="scss">
#detail {
  .select-item-wrap{
    color: #444;
    font-size: 12px;
    margin: 10px 0;
    .title{
      line-height: 32px;
    }
  }
}
</style>