import addressService from "../services/addressService"

const state = {
  addressList: [],
  selectIndex: 0
}
const getters = {
  selectAddress(state){
    if(state.addressList.length > 0){
      return state.addressList[state.selectIndex];
    }else{
      return null;
    }
  }
}
const mutations = {
  setAddressList(state, value){
    state.addressList = value;
  },
  setSelectIndex(state, value){
    state.selectIndex = value;
  }

}
const actions = {
  async getAddressAction(context){
    console.log('请求地址列表');
    let list = await addressService.requestAddressList();
    context.commit('setAddressList', list);
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}