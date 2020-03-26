<template>
<div class="page-wrap">
  <div class="page subpage" id="confirm">
    <app-header title="确认订单" :hasBack="true"></app-header>
    <div class="content">
      <p>当前收货地址：{{selectAddress}}</p>
      <br/>
      <button @click="goSelectAddress">选择收货地址</button>
      <br/>
      <br/>

      {{currentOrderInfo}}
      <br/>
      <br/>

      <button @click="addOrderAction">提交订单</button>
    </div>
  </div>
  <!-- 子页面 -->
  <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
  <router-view></router-view>
  </transition>
</div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import orderService from '../../../services/orderService'
export default {
  computed: {
    ...mapState({
      currentGoodsInfo: state=>state.order.currentGoodsInfo,
      currentOrderInfo: state=>state.order.currentOrderInfo
    }),
    ...mapGetters({
      selectAddress: 'address/selectAddress'
    })
  },
  methods: {
    goSelectAddress(){
      this.$router.push({name: 'select-address'});
    },
    async addOrderAction(){
      //提交订单goodsid,   name, picUrl,  selectInfo
      let goodsid = this.currentGoodsInfo.id;
      let name =  this.currentGoodsInfo.name;
      let picUrl =  this.currentOrderInfo.selectImg;
      let selectInfo =  this.currentOrderInfo;
      let addressid = this.selectAddress._id;
      let result = await orderService.requestAddOrder(goodsid, name, picUrl, selectInfo, addressid);
      if(result === 0){
        this.$router.replace('/order');
      }else{
        this.$Toast(result);
      }
    }
  },
  created(){
    console.log('confirm created....')
  }
  
}
</script>

<style>

</style>