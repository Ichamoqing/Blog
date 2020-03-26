import api from '../utils/api'
import Http from '../utils/Http'

export const requestAddAddress = async (name, tel, address, code, areaCode)=>{
  let result =  await Http.post(api.ADD_ADDRESS_API, {name, tel, address, code, areaCode});
  return 0;
}

export const requestAddressList = async ()=>{
  let result =  await Http.get(api.ADDRESS_LIST_API);
  console.log(result);
  let newData = result.data.data.map(item=>{item.id = item._id; return item;});
  return newData;
}

export default {
  requestAddAddress,
  requestAddressList
}