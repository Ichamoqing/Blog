<template>
<div class="page" id="order">
  <app-header title="订单"></app-header>
  <van-tabs v-model="selectSatus" class="nav">
    <van-tab title="全部"></van-tab>
    <van-tab title="待付款"></van-tab>
    <van-tab title="待发货"></van-tab>
    <van-tab title="待收货"></van-tab>
  </van-tabs>
  <app-scroll class="content" v-if="isLogin">
    

    <ul>
      <li v-for="item in showList" :key="item._id">
        <img :src="item.selectInfo.selectImg" alt="" width="80">
        {{item}}
        <br/>
        <br/>
      </li>
    </ul>


  </app-scroll>

  <div class="login-tip" v-else @click="loginAction">
    <span class="text">请先登录</span>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {Tabs, Tab} from 'vant'
export default {
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab
  },
  data(){
    return {
      selectSatus: 0//-1 全部 0待付款,1待发货,2待收货,3完成。
    }
  },
  computed: {
    ...mapState({
      isLogin: 'isLogin',
      // 全部
      orderList: state=>state.order.orderList
    }),
    showList(){
      // 全部
      if(this.selectSatus === 0){
        return this.orderList;
      }
      // 各种状态数据的过滤
      return this.orderList.filter(item=>{
        return item.status === (this.selectSatus-1);
      });
    }
  },
  methods: {
    loginAction(){
      this.$center.$emit('toggleLogin', true);
    }
  },
  activated(){
    this.$store.dispatch('order/getOrderListAction');
  }
}
</script>

<style scoped lang="scss">
.nav{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
}
.content{
  top: 88px;
}
.login-tip{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 30px;
  background: #F5053D;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 30px;
  border-radius: 15px;
}
</style>