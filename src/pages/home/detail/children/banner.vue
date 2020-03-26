<template>
<div class="banner-wrap">
  <van-swipe class="banner" 
    :show-indicators="false" 
    :autoplay="3000" 
    @change="changeAction">
    <van-swipe-item v-for="(item, index) in data" :key="index">
      <img :src="item"/>
    </van-swipe-item>
  </van-swipe>
  <span class="info">{{activeIndex}}/{{data.length}}</span>
  <van-icon @click="playAction" v-if="playInfo && playInfo.webmVideoUrl" class="play" name="play-circle-o" />
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  props: {
    data: {
      type: Array,
      default: ()=>[]
    },
    playInfo: {
      type: Object,
      default: ()=>{}
    }
  },
  data(){
    return {
      activeIndex: 1
    }
  },
  methods: {
    changeAction(index){
      this.activeIndex = index+1;
    },
    playAction(){
      console.log('播放....');
      this.$emit('play');
    }
  }
}
</script>

<style scoped lang="scss">
.banner-wrap{
  position: relative;
  .banner img{
    width: 100%;
  }
  .info{
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 2px 5px;
    border: 1px solid #eee;
    border-radius: 2px;
    font-size: 12px;
    color: #333;
    background: #fff;
    transform: scale(0.7);
  }
  .play{
    position: absolute;
    bottom: 10px;
    left: 10px;
    font-size: 28px;
    color: #555;
  }
}

</style>