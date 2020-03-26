<template>
<div class="select-wrap">
  <div class="select-cover" @click="hideAction()"></div>
  <app-scroll class="select-content">
    <div class="wrap">
      <div class="main">
      <div class="img"><img :src="selectImg" alt=""></div>
      <div class="info">
        <p class="price text-overflow">
          <span>价格:¥{{price.retailPrice}}</span>
          <span v-if="defaultData.counterPrice">¥{{price.counterPrice}}</span>
        </p>
        <p class="select-tip text-overflow">
          <span>已选择：</span>
          <span>{{tip.join(',')}}</span>
        </p>
      </div>
    </div>
    <select-item v-for="(data, index) in data.list" :key="index" 
      :data="data" @select="handleSelect"></select-item>
    
    <div class="select-item-wrap">
      <h3 class="title">数量</h3>
      <div class="handle-count">
        <span :class="{disabled: count<=1}" @click="handleCountAction(-1)">-</span>
        <span>{{count}}</span>
        <span :class="{disabled: count>=5}" @click="handleCountAction(+1)">+</span>
      </div>
    </div>
    </div>
  </app-scroll>
</div>
</template>

<script>
import selectItem from './select-item'
export default {
  components: {
    selectItem
  },
  props: {
    defaultData: {
      type: Object,
      default: ()=>({})
    },
    data: {
      type: Object,
      default: ()=>({
        map: {},
        list: []
      })
    }
  },
  data(){
    return {
      selectMap: {},
      selectImg: this.defaultData.picUrl,
      count: 1
    }
  },
  computed: {
      // 判断用户选择了吗
    isSelect(){
      return Object.entries(this.selectMap).length > 0;
    },
    tip(){
      //没有选择过
      if(!this.isSelect){
        return ['请选择规格数量'];
      }
      //选择了
      else{
        let tmp = [];
        this.data.list.forEach(({name})=>{
          if(this.selectMap[name])
            tmp.push(this.selectMap[name].value);
        })
        return tmp;
      }
    },
    price(){
      let defaultResult = {
        retailPrice: this.defaultData.retailPrice,
        counterPrice: this.defaultData.counterPrice
      };
      //没有选择
      if(!this.isSelect){
        return defaultResult;
      }
      //选择了
      else{
        let tmp = [];
        this.data.list.forEach(({name})=>{
          if(this.selectMap[name])
            tmp.push(this.selectMap[name].id);
        })
        let key = tmp.join(';');
        // 取价格
        let result = this.data.map[key];
        //判断是否有值，没有值取默认值
        return result || defaultResult;
      }
      
    }
  },
  methods: {
    hideAction(){
      this.$emit('input', false);
    },
    // 处理选择的点击事件
    handleSelect(name, item){
      // 记录选择的信息
      this.selectMap = {
        ...this.selectMap,
        [name]: item
      };
      //this.selectMap[name] = item;

      // 修改选择的图片
      if(item.picUrl){
        this.selectImg = item.picUrl;
      }
    },
    handleCountAction(num){
      if((this.count + num) > 5){
        this.$Toast('不能超过5件');
      }else if((this.count + num) < 1){
        this.$Toast('不能再少了');
      }else{
        this.count += num;
      }
    },

    getSelectInfo(){
      // 判断用户选择完整了吗
      if(this.data.list.length > Object.entries(this.selectMap).length){
        //没有选择完整
        this.$Toast('请先选择');
        return;
      }else{
        // 选择完整了
        let select = {};
        Object.keys(this.selectMap).forEach((key)=>{
          select[key] = this.selectMap[key].value;
        })
        return {
          ...select,
          count: this.count,
          selectImg: this.selectImg,
          price: this.price.retailPrice
        }
      }
    }

  }
}
</script>

<style scoped lang="scss">
$textColor: #DD1A21;
.select-wrap{
  width: 100%;
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 45px;
  .select-cover{
    width: 100%;
    height: 100%;
    background: rgba($color: #000, $alpha: 0.7);
  }
  .select-content{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    max-height: 60%;
    background: #fff;
    .wrap{
      padding: 10px;
    }
    .main{
      display: flex;
      .img{
        width: 80px;
        img{
          width: 100%;
        }
      }
      .info{
        margin-left: 10px;
        flex: 1;
        line-height: 24px;
        .price{
          span{
            padding: 0 2px;
          }
          span:nth-of-type(1){
            color: $textColor;
            font-size: 14px;
          }
          span:nth-of-type(2){
            color: #666;
            font-size: 12px;
            text-decoration: line-through;
          }
        }
        .select-tip{
          color: #666;
          font-size: 12px;
          width: 200px;
        }
      }
    }
  }
  .handle-count{
    span{
      padding: 5px 10px;
      font-size: 12px;
      color: #333;
      border: 1px solid #999;
      &.disabled{
        color: #666;
        border: 1px solid #ddd;
      }
    }
    span:nth-of-type(1){
      border-right: none;
    }
    span:nth-of-type(3){
      border-left: none;
    }
  }
}

</style>