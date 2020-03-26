import api from '../utils/api'
import Http from '../utils/Http'

export const requestAddOrder = async( goodsid,   name, picUrl,  selectInfo, addressid )=>{
  let result =  Http.post(api.ADD_ORDER_API, {goodsid, name, picUrl, selectInfo, addressid});
  return 0;
}

export const requestOrderList = async ()=>{
  let result = await Http.get(api.ORDER_LIST_API);
  return result.data.data;
}

export default {
  requestAddOrder,
  requestOrderList
}