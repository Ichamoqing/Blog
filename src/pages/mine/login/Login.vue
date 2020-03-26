<template>
<div class="page modal-page" id="login">
  <app-header title="登录">
    <van-icon class="right-btn" slot="right-btn" @click="close" name="cross" />
  </app-header>
  <div class="content">
    <div class="form-group">
      <input class="form-contrl" type="tel" placeholder="请输入手机号码" v-model="tel"/>
    </div>
    <div class="form-group" v-if="loginMethod">
      <input class="form-contrl" type="password" placeholder="请输入密码" v-model="psd"/>
    </div>
    <div class="form-group" v-else>
      <input class="form-contrl" type="number" placeholder="请输入验证码" v-model="code"/>
      <span class="form-tip" :class="{disabled: disabled}" @click="sendCodeAction">{{btnTip}}</span>
    </div>
    <div class="confirm-btn" @click="loginAction">
      登录
    </div>
    <p class="alert-info" @click="changeAction">{{tip}}登录&gt;&gt;</p>
    <p class="alert-info" @click="goRegAction">没有账号，立即注册&gt;&gt;</p>
  </div>
</div>
</template>

<script>
import mineService from '../../../services/mineService'
const PASSWORD_METHOD = true;
const PHONE_CODE_METHOD = false;
export default {
  data(){
    return {
      loginMethod: PASSWORD_METHOD,
      tel: '',
      psd: '',
      code: '',
      getCode: '',
      btnTip: '发送'
    }
  },
  computed: {
    tip(){
      return this.loginMethod ? '验证码' : '密码'
    },
    disabled(){
      return this.btnTip.endsWith('s');
    }
  },
  methods: {
    close() {
      this.$center.$emit('toggleLogin', false);
    },
    goRegAction(){
      this.$center.$emit('toggleReg', true);
    },
    changeAction(){
      this.loginMethod = !this.loginMethod;
    },
    //登录事件
    async loginAction(){
      if(this.loginMethod){
        //密码登录
        if(!this.tel || !this.psd){
          this.$Toast('请输入完整!');
        }else{
          let error = await mineService.requestLoginByPassword(this.tel, this.psd);
          if(error){
            this.$Toast(error);
          }else{
            this.close();
            this.$store.dispatch('handleLoginAction', true);
          }
        }
      }else{
        //验证码登录
        if(this.disabled){
          // 验证码没有过期
          if(this.code == this.getCode){
            // 下一步，登录
            let error = await mineService.requestLoginByCode(this.tel);
            if(error){
              this.$Toast(error);
            }else{
              //登录了
              this.close();
              this.$store.dispatch('handleLoginAction', true);
            }
          }else{
            // 验证码错误
            this.$Toast('验证码错误!');
          }
        }else{
          //过期了
          this.$Toast('验证码失效，请重新发送!');
        }
        
      }
    },
    async sendCodeAction(){
      if(this.disabled){
        return;
      }
      // 验证电话号码格式
      // 发送验证码
      let result = await mineService.requestSendCode(this.tel);
      if(result){
        this.getCode = result;
        let num = 120;
        const timer = setInterval(() => {
         if(num > 0){
           this.btnTip = `${num--}s`;
         }else{
           this.btnTip = `重新发送`;
           clearInterval(timer);
         }
        }, 1000);
      }else{
        this.$Toast('发送失败,请重试!');
      }
    }
  }
};
</script>

