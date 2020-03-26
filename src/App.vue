<template>
<div id="app">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <tab-bar></tab-bar>

  <transition :enter-active-class="hasAnimate?'slideInDown':''" leave-active-class="slideOutDown">
    <component v-if="showCom" :is="comName"/>
  </transition>

</div>
</template>

<script>
import TabBar from './components/tab-bar'
import Login from './pages/mine/login/Login'
import Regiester from './pages/mine/regiester/Regiester'
export default {
  components: {
    [TabBar.name]: TabBar,
    Login,
    Regiester
  },
  data(){
    return {
      showCom: false,
      comName: 'Login',
      hasAnimate: true
    }
  },
  created(){
    // 监听展示登录组件
    this.$center.$on('toggleLogin', (value)=>{
      if(this.showCom && value){
        this.hasAnimate = false;
      }else{
        this.hasAnimate = true;
      }
      this.showCom = value;
      this.comName = 'Login';
    })
    // 监听展示注册组件
    this.$center.$on('toggleReg', (value)=>{
      if(this.showCom && value){
        this.hasAnimate = false;
      }else{
        this.hasAnimate = true;
      }
      this.showCom = value;
      this.comName = 'Regiester';
    })
    // 检查是否登录过
    this.$store.dispatch('checkLoginAction');
  }
}
</script>

<style lang="scss">

/* 
内容   0-100          0-1000

界面   100-200

mark  200-300
 */
</style>



