<template>
<div class="page subpage" id="edit-address">
  <app-header :title="title" :hasBack="true"></app-header>
  <app-scroll class="content">

    <van-address-edit
      :area-list="areaList"
      show-postal
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      :address-info="defaultValue"
      @save="onSave"
    />


  </app-scroll>
</div>
</template>

<script>
import {AddressEdit} from 'vant'
import addressService from '../../../services/addressService'
import areaList from '../../../utils/city'
import {mapState} from 'vuex'
export default {
  components: {
    [AddressEdit.name]: AddressEdit
  },
  data(){
    let title = '修改地址';
    let isNew = false;
    if(this.$route.query && (this.$route.query.flag == undefined)){
      title = '新增地址'
      isNew = true;
    }
    return {
      title,
      isNew,
      currentInfo: null,
      areaList,
      searchResult: [],
      // 地址初始值
      defaultValue: {}
    }
  },
  computed: {
    ...mapState({
      addressList: state=>state.address.addressList
    })
  },
  methods: {
     async onSave(result){
      
      if(this.isNew){
        //新增
        const detail = `${result.province} ${result.city} ${result.county} ${result.addressDetail}`;
        let res =  await addressService.requestAddAddress(result.name, result.tel, detail, result.postalCode, result.areaCode);
        if(res === 0){
          // 返回上一页
          this.$router.back();
          // 刷新地址列表
          this.$center.$emit('change-address-list');
        }else{
          this.$Toast('新增失败，请重试！');
        }
      }else{
        //修改的代码
      }
      
    }

  },

  created(){
    // 取得当前的地址
    if(!this.isNew){
      let index = this.$route.query.flag;
      let value = this.addressList[index];
      console.log(value);
      let arr = value.address.split(' ');
      console.log(arr);
      this.defaultValue = {
        id: value.id,
        name: value.name,
        province: arr[0],
        city:arr[1],
        county:arr[2],
        addressDetail:arr[3],
        postalCode: value.code,
        tel: value.tel,
        areaCode: value.areaCode
      }
    }
  }
}
</script>

<style>

</style>