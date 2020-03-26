<template>
<div class="item-wrap">
  <div class="item" @click="goDetailAction(data.id)">
    <img class="item-img" v-lazy="data.picUrl" alt="">
    <h3 class="item-name text-overflow">{{data.name}}</h3>
    <p class="item-price">
      <span>¥{{data.retailPrice}}</span>
      <span v-if="data.counterPrice">¥{{data.counterPrice}}</span>
    </p>
    <p class="item-tag">
      <span v-for="tag in data.itemTagList" :key="tag.tagId">{{tag.name}}</span>
    </p>
  </div>
</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    goDetailAction(id){
      this.$router.push(`/home/detail/${id}`);
      this.$store.commit('order/setCurrentGoodsInfo', this.data);
    }
  }
}
</script>

<style scoped lang="scss">
$textColor: #DD1A21;;
.item-wrap{
  width: 50%;
  padding: 10px;
  float: left;
  box-sizing: border-box;
  .item{
    width: 100%;
    .item-img{
      width: 100%;
      background: #f3f3f3;
    }
    .item-name{
      color: #333;
      font-size: 14px;
      width: 100%;
      line-height: 28px;
    }
    .item-price{
      line-height: 20px;
      height: 20px;
      span{
        padding: 0 2px;
      }
      span:nth-of-type(1){
        font-size: 14px;
        color: $textColor;
      }
      span:nth-of-type(2){
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
      }
    }
    .item-tag{
      span{
        font-size: 12px;
        border: 1px solid $textColor;
        color: $textColor;
        border-radius: 10px;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 5px;
        transform: scale(0.7);
        transform-origin: top left;
      }
    }
  }
}
</style>