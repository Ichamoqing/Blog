<template>
<div class="page-wrap">
  <div class="page subpage" id="address">
    <app-header title="选择地址" :hasBack="true"></app-header>
    <app-scroll class="content">

       <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        @edit="onEdit"
        @select="selectAction"
      />

    </app-scroll>
    <div class="add-btn" @click="addAction">新增</div>

  </div>
   <!-- 子页面 -->
  <transition enter-active-class="slideInRight" leave-active-class="slideOutRight">
  <router-view></router-view>
  </transition>
</div>
</template>

<script>

import { AddressList } from 'vant';
import {mapState} from 'vuex'
export default {
  components: {
    [AddressList.name]: AddressList
  },
  data(){
    return {
      chosenAddressId: 1
    }
  },
  computed: {
    ...mapState({
      addressList: state=>state.address.addressList
    })
  },

  methods: {
    addAction(){
      this.$router.push({name: 'edit-address'})
    },
    onEdit(info, index){
      console.log(info);
      this.$router.push({name: 'edit-address', query: {flag: index}});
    },
    goEditAction(){
      this.$router.push({name: 'edit-address', })
    },
    getData(){
      this.$store.dispatch('address/getAddressAction');
    },
    selectAction(info, index){
      //选择了地址的事件
      this.$store.commit('address/setSelectIndex', index);
      // 返回
      this.$router.back();
    }
  },
  created(){
    // 请求地址列表
    this.getData();
    // 监听地址的变化
    this.$center.$on('change-address-list', this.getData);
  },
  mounted(){
    // 删除vant组件内部的button
    document.querySelector('.van-button.van-button--danger').style.display = 'none';
  }
}
</script>

<style scoped lang="scss">
#address{
  .content{
    bottom: 45px;
  }
  .add-btn{
    width: 100%;
    height: 45px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #DD1A21;
    color: #fff;
    text-align: center;
    line-height: 45px;
  }
}
</style>