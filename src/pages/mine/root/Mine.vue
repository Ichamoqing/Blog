<template>
<div class="page-wrap">
  <div class="page" id="mine">
    <app-header title="我的"></app-header>
    <app-scroll class="content">

      <button @click="logoutAction">退出</button>

    </app-scroll>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import store from '../../../store'
import Vue from 'vue'
import mineService from '../../../services/mineService'
export default {
  // 路由守卫
  beforeRouteEnter(to, from, next){
    // 没有登录，进去登录页面
    if(!store.state.isLogin){
      Vue.$center.$emit('toggleLogin', true);
      next(false);
    }else{
      next();
    }
  },
  methods: {
    async logoutAction(){
      // 发送退出请求
      let result = await mineService.requestLogOut();
      //派发登录状态为false
      this.$store.dispatch('handleLoginAction', false);
      // 展示登录界面
      Vue.$center.$emit('toggleLogin', true);
      // 跳转到首页
      this.$router.replace('/home');
    }
  }
}
</script>

<style>

</style>