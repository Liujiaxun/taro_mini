//api1 +  /userapp/authen?app_token=xcxpay001&app_version=1.01
import {createYxcAction} from '@utils/redux';
import {Apis} from "../config/urls";
const api2 = Apis.yHost;
const api1 = Apis.mHost;
/**
 * @param payload
 * @returns {*}
 */
export const dispathSelectAddress = payload => ({
  type: 'SELECT_ADDRESS',
  payload
});
// eslint-disable-next-line import/prefer-default-export
//获取app_id等
export const dispatchAuthen = payload => createYxcAction({
  url: api1 + '/userapp/authen',
  type: '',
  payload
});

export const dispatchLogin = payload => createYxcAction({
  url: Apis.URL_USER_LOGIN,
  type: '',
  method:'POST',
  payload
});

//api1 +  /usertemplatepage/info?
//获取banner等
export const dispathUserTemplatePage = payload => createYxcAction({
  url: api2 + '/slide/list',
  type: 'HOME_YXC_BANNER',
  payload
})
//获取分类
export const dispathCategory = payload => createYxcAction({
  url: api2 + '/category/list',
  type: 'CATE_YXC_CATEGORY',
  payload
})

// 获取一个分类的数据
export const dispathCategoryData = payload => {
  const options = {
    url: api2 + '/product/list',
    type: payload.type ? payload.type : 'CATE_YXC_CATEGORY_DATA',
    payload
  }
  return createYxcAction(options)
}

//拼团
// ?is_groupon=1&page=1
export const dispathPinData = payload => createYxcAction({
  url: api2 + '/product/list',
  type: 'HOME_YXC_PIN_DATA',
  payload
})
//获取单个商品信息
// ?id=14149&uid=380995&version=1.01&timespan=1567999290&mid=3153&api_token=223456&api_sign=6f2a9af7
export const dispathItemInfo = payload => createYxcAction({
  url: api2 + '/product/info',
  type: '',
  payload
})

//添加至购物车
export const dispathCartAdd = payload => createYxcAction({
  url: api2 + '/cart/save',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});

export const dispathCartList = payload => createYxcAction({
  url: api2 + '/cart/list',
  type: '',
  payload:{
    pageSize: 1000,
    ...payload,
  }
});

export const dispathCartUpdate = payload => createYxcAction({
  url: api2 + '/cart/update',
  type: '',
  method:'POST',
  isPayload: true,
  payload:{
    ...payload,
  }
});
export const dispathCartDelete = payload => createYxcAction({
  url: api2 + '/cart/delete',
  type: '',
  method:'POST',
  isPayload: true,
  payload:{
    ...payload,
  }
});


//获取商品信息
export const dispathProductInfo = payload => {
  return createYxcAction({
    url: api2 + '/order/productinfo',
    type: '',
    method:'POST',
    isPayload: process.env.TARO_ENV === 'h5' ? true : false,
    payload:{
      ...payload,
    }
  });
}

//获取地址
//   uid=380995&version=1.01&timespan=1568107071&mid=3153&api_token=223456&api_sign=baa9a421
export const dispathGetAddress = payload => createYxcAction({
  url: api2 + '/useraddress/list',
  type: '',
  payload:{
    ...payload,
  }
});
// 获取设置
// ?type=order&k=is_needcard&version=1.01&timespan=1568107071&mid=3153&api_token=223456&api_sign=ebfea718
export const dispathSysSetting = payload => createYxcAction({
  url: api2 + '/syssetting/info',
  type: '',
  payload:{
    ...payload,
  }
});
//创建订单
export const dispathOrderCreate = payload => createYxcAction({
  url: api2 + '/order/create',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});

export const dispathGetProvince = payload => createYxcAction({
  url: api1 + '/area/province',
  type: '',
  payload:{
    ...payload,
  }
});

export const dispathGetCity = payload => createYxcAction({
  url: api1 + '/area/city',
  type: '',
  payload:{
    ...payload,
  }
});

export const dispathGetDistrict = payload => createYxcAction({
  url: api1 + '/area/district',
  type: '',
  payload:{
    ...payload,
  }
});

export const dispathSaveAddress = payload => createYxcAction({
  url: api2 + '/useraddress/save',
  type: '',
  method:'POST',
  isPayload: true,
  payload:{
    ...payload,
  }
});

export const dispathUpdateAddress = payload => createYxcAction({
  url: api2 + '/useraddress/update',
  type: '',
  method:'POST',
  isPayload: true,
  payload:{
    ...payload,
  }
});

export const dispathDeteleAddress = payload => createYxcAction({
  url: api2 + '/useraddress/delete',
  type: '',
  method:'POST',
  isPayload: true,
  payload:{
    ...payload,
  }
});

export const dispathGetOrders = payload => createYxcAction({
  url: api2 + '/order/list',
  type: '',
  payload:{
    ...payload,
  }
});

//获取用户资料
export const dispathGetUserInfo = payload => createYxcAction({
  url: api2 + '/user/info',
  type: '',
  payload:{
    ...payload,
  }
});

//保存用户资料
export const dispathSaveUserInfo = payload => createYxcAction({
  url: api2 + '/user/bind',
  type: '',
  isPayload: true,
  method: 'POST',
  payload:{
    ...payload,
  }
});

//H5等login
export const dispathH5Login = payload => createYxcAction({
  url: api2 + '/user/applogin',
  type: '',
  isPayload: true,
  method: 'POST',
  payload:{
    ...payload,
  }
});

export const dispathGetPhoneCode = payload => createYxcAction({
  url: api2 + '/phoneauthencode/send',
  type: '',
  isPayload: true,
  method: 'POST',
  payload:{
    ...payload,
  }
});

//重新支付
export const dispathTwoCreate = payload => createYxcAction({
  url: api2 + '/pay/order',
  type: '',
  isPayload: false,
  method: 'POST',
  payload:{
    ...payload,
  }
});

//取消订单
export const dispathCancelOrder = payload => createYxcAction({
  url: api2 + '/order/cancel',
  type: '',
  isPayload: false,
  method: 'POST',
  payload:{
    ...payload,
  }
});

//关于我们
export const dispathAboutUs = payload => createYxcAction({
  url: api2 + '/syssetting/info',
  type: '',
  payload:{
    ...payload,
  }
});


export const dispathHelpList = payload => createYxcAction({
  url: api2 + '/question/list',
  type:'',
  payload:{
    ...payload
  }
});









