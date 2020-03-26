import orderService from '../services/orderService'
const state = {
  // 查看商品详情信息
  currentGoodsInfo: null,
  // 订单信息
  currentOrderInfo: null,
  orderList: []
};
const mutations = {
  setCurrentGoodsInfo(state, value){
    state.currentGoodsInfo = value;
  },
  setCurrentOrderInfo(state, value){
    state.currentOrderInfo = value;
  },
  setOrderList(state, value){
    state.orderList = value;
  }
}
const actions = {
  async getOrderListAction(context){
    let list = await orderService.requestOrderList();
    context.commit('setOrderList', list);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}