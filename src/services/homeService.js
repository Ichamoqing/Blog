import api from '../utils/api'
import Http from '../utils/Http'

// 请求商品列表数据
export const requestGoodsListData = async ()=>{
  // 发送请求
  const {data: result} = await Http.get(api.GOODS_LIST_API);
  // 判断请求的结果
  if(result.status === 0){
    // 处理数据
    const {currentCategory, categoryItemList} = result.data;
    //轮播图数据
    const bannerData = currentCategory.bannerList.map((item, index)=>({
      picUrl: item.picUrl,
      id: index
    }));
    // 处理商品列表数据
    const goodsData = categoryItemList.map(item=>{
      return {
        name: item.category.name,
        desc: item.category.frontDesc,
        itemList: item.itemList.map(goodsItem=>({
          id: goodsItem.id,
          name: goodsItem.name,
          picUrl: goodsItem.listPicUrl,
          retailPrice: goodsItem.retailPrice,
          counterPrice: goodsItem.counterPrice,
          itemTagList: goodsItem.itemTagList ? goodsItem.itemTagList.map(({tagId, name})=>({tagId, name})) : []
        }))
      }
    })
    return {
      bannerData,
      goodsData
    }
  }else{
    // 失败了
    throw new Error(result.message);
  }
}


export const requestGoodsDetailData = async (goodsId)=>{
  const {data: result} = await Http.get(api.GOODS_DETAIL_API, {id: goodsId});
  let banner = [result.data.listPicUrl];
  Object.entries(result.data.itemDetail).forEach(([key, value])=>{
    key.startsWith('picUrl') && banner.push(value);
  })
  // 原价
  let retailPrice = result.data.retailPrice;
  // 现价
  let counterPrice = result.data.counterPrice;
  // 详情
  let detail = result.data.itemDetail.detailHtml;
  // 视频
  let videoInfo = result.data.itemDetail.videoInfo;
  // 选择列表
  let skuSpecList = [...result.data.skuSpecList];
  //  价格列表
  let skuMap = {};
  Object.entries(result.data.skuMap).forEach(([key, value])=>{
    skuMap[key] = {
      counterPrice: value.counterPrice,
      retailPrice: value.retailPrice
    }
  });
  return {
    retailPrice,
    counterPrice,
    banner,
    detail,
    videoInfo,
    sku: {
      map: skuMap,
      list: skuSpecList
    }
  }
}

export default {
  requestGoodsListData,
  requestGoodsDetailData
}