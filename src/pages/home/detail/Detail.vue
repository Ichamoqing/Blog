<template>
<div class="page-wrap">

  <div class="page subpage" id="detail">

    <app-header :title="title" :hasBack="true"/>

    <app-scroll class="content">
      <banner :data="goodsData.banner" :playInfo="goodsData.videoInfo" @play="handlePlay"/>
      <h1 class="title">{{title}}</h1>
      <div class="detail-content" v-html="goodsData.detail"></div>
    </app-scroll>

    <selectPanel ref="selectPanel" v-if="show" v-model="show" :data="goodsData.sku" :defaultData="selectDefaultData"/>
    
    <div class="buy-btn" @click="buyAction">{{buyBtnText}}</div>

    <play v-if="goodsData.videoInfo && goodsData.videoInfo.webmVideoUrl && showVideo" 
      :data="goodsData.videoInfo" @close="handlePlay"/>

  </div>

  <!-- 子页面 -->
  <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
    <router-view></router-view>
  </transition>

</div>
</template>

<script>
import {requestGoodsDetailData} from '../../../services/homeService'
import banner from './children/banner'
import selectPanel from './children/select-panel'
import play from './children/play'
import {mapState} from 'vuex'
export default {
  components: {
    banner,
    selectPanel,
    play
  },
  props: {
    id: String
  },
  data(){
    return {
      show: false,
      showVideo: false,
      goodsData: {}
    }
  },
  computed: {
    ...mapState({
      isLogin: 'isLogin',
      title: state=>state.order.currentGoodsInfo.name
    }),
    selectDefaultData(){
      return {
        picUrl: this.goodsData.banner && this.goodsData.banner[0],
        retailPrice: this.goodsData.retailPrice,
        counterPrice: this.goodsData.counterPrice
      }
    },
    buyBtnText(){
      if(this.show){
        return '下一步';
      }else{
        return '立即购买';
      }
    }
  },
  methods: {
    async initData(){
      this.goodsData = await requestGoodsDetailData(this.id);
    },
    buyAction(){
      if(this.show){
        //购买,调用子组件的事件，获得用户选择的信息
        let result = this.$refs.selectPanel.getSelectInfo();
        if(result){
          //下一步购买
          if(this.isLogin){
            // 进入订单页面
            this.$router.push({name: 'confirm'}, ()=>{
              //设置订单数据
              this.$store.commit('order/setCurrentOrderInfo', {
                title: this.title,
                ...result
              });
            });
          }else{
            this.$center.$emit('toggleLogin', true);
          }
        }
      }else{
        //展示
        if(!this.goodsData.banner)
          return;
        this.show = true;
      }
    },
    // 展示并执行播放,如果已经展示了就关闭
    handlePlay(){
      this.showVideo = !this.showVideo;
    }
  },
  created(){
    this.initData();
  }
}
</script>

<style scoped lang="scss">
$textColor: #DD1A21;
.title{
  line-height: 50px;
  font-size: 18px;
  padding: 10px;
}
.content{
  bottom: 45px;
}
.buy-btn{
  position: absolute;
  left: 0;
  bottom: 0;
  height: 45px;
  width: 100%;
  color: #fff;
  background: $textColor;
  text-align: center;
  line-height: 45px;
}
</style>

<style>
#detail .detail-content img{
  width: 100%;
}
</style>