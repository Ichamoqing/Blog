<template>
<div class="page modal-page" id="regiester">
  <app-header title="注册">
    <van-icon class="right-btn" slot="right-btn" @click="close" name="cross" />
  </app-header>
  <div class="content">
    <div class="form-group">
      <input class="form-contrl" type="tel" placeholder="请输入手机号码" v-model="tel"/>
    </div>
    <div class="form-group">
      <input class="form-contrl" type="password" placeholder="请设置密码" v-model="psd"/>
    </div>
    <div class="form-group">
      <input class="form-contrl" type="password" placeholder="请确认密码" v-model="rePsd"/>
    </div>
    <div class="form-group">
      <input class="form-contrl" type="number" placeholder="请输入验证码" v-model="code"/>
      <span class="form-tip" :class="{disabled: disabled}" @click="sendCodeAction">{{tip}}</span>
    </div>
    <div class="confirm-btn" @click="regiesterAction">
      注册
    </div>
    <p class="alert-info" @click="goLoginAction">已有账号，立即登录&gt;&gt;</p>
    

  </div>
</div>
</template>

<script>
import {Field, CellGroup} from 'vant'
import mineService from '../../../services/mineService'
export default {
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
  },
  data(){
    return {
      tip: '发送',
      tel: '',
      getCode: null,
      code: '',
      psd: '',
      rePsd: ''
    }
  },
  computed: {
    disabled(){
      return this.tip.endsWith('s');
    }
  },
  methods: {
    close(){
      this.$center.$emit('toggleReg', false);      
    },
    goLoginAction(){
      this.$center.$emit('toggleLogin', true);
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
           this.tip = `${num--}s`;
         }else{
           this.tip = `重新发送`;
           clearInterval(timer);
         }
        }, 1000);
      }else{
        this.$Toast('发送失败,请重试!');
      }
    },
    async regiesterAction(){
      // 校验验证码
      // 是否过期
      if(this.disabled){
        //没有过期
        if(this.getCode == this.code){
          // 没有问题
          console.log('没有问题,下一步注册');
          // 验证密码
          if(!this.psd || !this.rePsd){
            this.$Toast('请输入完整!');
          }else if(this.psd != this.rePsd){
            this.$Toast('两次密码输入不一致!');
          }else{
            //发送注册的请求
            let result = await mineService.requestRegiester(this.tel, this.psd);
            if(result){
              //注册失败
              this.$Toast(result);
            }else{
              // 注册成功
              this.$Toast('注册成功');
              this.goLoginAction();
            }
          }
        }else{
          this.$Toast('验证码错误!');
        }
      }else{
        //过期了
        this.$Toast('验证码失效，请重新发送!');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled{

}
</style>