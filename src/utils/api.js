// 管理api
// export const HOST = 'http://localhost:9000';





/* 
#### 发送验证码
**method:** get
**参数:** tel   
*/
const SEND_CODE_API = '/api/user/send_code';


/* 
#### 注册
**method:** post
**参数:** tel      password
*/
const REGIESTER_API = '/api/user/regiester';

/* 
#### 登录
**method:** post
**参数:** tel   type('code',  'password' )  value 
*/
const LOGIN_API = '/api/user/login';

/*
检查登录
参数：无
*/
const CHECK_LOGIN = '/api/user/check_login'

/*
退出登录
参数：无
*/
const LOGOUT_API = '/api/user/logout';


/*
商品列表接口
*/
///api/home/catelist/itemlist
const GOODS_LIST_API = '/api/goods/list';

/*
商品详情接口
参数：id
*/
///api/item/detail
const GOODS_DETAIL_API = '/api/goods/detail';




// 新增地址接口
const ADD_ADDRESS_API = '/api/address/add';

// 获得地址列表接口
const ADDRESS_LIST_API = '/api/address/find_by_user';

// 新增订单
const ADD_ORDER_API = '/api/order/add';

// 订单列表
const ORDER_LIST_API = '/api/order/find_by_user';

export default {
  SEND_CODE_API,
  REGIESTER_API,
  LOGIN_API,
  CHECK_LOGIN,
  LOGOUT_API,
  GOODS_LIST_API,
  GOODS_DETAIL_API,
  ADD_ADDRESS_API,
  ADDRESS_LIST_API,
  ADD_ORDER_API,
  ORDER_LIST_API
}
