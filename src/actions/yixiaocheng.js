// https://api.yixiaocheng.com/userapp/authen?app_token=xcxpay001&app_version=1.01
import {createYxcAction} from '@utils/redux';
import {Apis} from "../config/urls";

/**
 * @param payload
 * @returns {*}
 */
// eslint-disable-next-line import/prefer-default-export
//获取app_id等
export const dispatchAuthen = payload => createYxcAction({
  url: 'https://api.yixiaocheng.com/userapp/authen',
  type: '',
  payload
});

export const dispatchLogin = payload => createYxcAction({
  url: Apis.URL_USER_LOGIN,
  type: '',
  method:'POST',
  payload
});

// https://api.yixiaocheng.com/usertemplatepage/info?
//获取banner等
export const dispathUserTemplatePage = payload => createYxcAction({
  url: 'https://api.yixiaocheng.com/usertemplatepage/info',
  type: 'HOME_YXC_BANNER',
  payload
})
//获取分类
export const dispathCategory = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/category/list',
  type: 'CATE_YXC_CATEGORY',
  payload
})

// 获取一个分类的数据
export const dispathCategoryData = payload => {
  const options = {
    url: 'https://request.hao-a.com/xcx/product/list',
    type: payload.type ? payload.type : 'CATE_YXC_CATEGORY_DATA',
    payload
  }
  return createYxcAction(options)
}

//拼团
// ?is_groupon=1&page=1
export const dispathPinData = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/product/list',
  type: 'HOME_YXC_PIN_DATA',
  payload
})
//获取单个商品信息
// ?id=14149&uid=380995&version=1.01&timespan=1567999290&mid=3153&api_token=223456&api_sign=6f2a9af7
export const dispathItemInfo = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/product/info',
  type: '',
  payload
})

//添加至购物车
export const dispathCartAdd = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/cart/save',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});

export const dispathCartList = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/cart/list',
  type: '',
  payload:{
    pageSize: 1000,
    ...payload,
  }
});

export const dispathCartUpdate = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/cart/update',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});
export const dispathCartDelete = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/cart/delete',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});

// export const dispathProductInfo = payload => createYxcAction({
//   url: 'https://request.hao-a.com/xcx/order/productinfo',
//   type: '',
//   method:'post',
//   payload:{
//     ...payload,
//   }
// });

//获取商品信息
export const dispathProductInfo = payload => {
  console.log(payload);
  return createYxcAction({
    url: 'https://request.hao-a.com/xcx/order/productinfo',
    type: '',
    method:'POST',
    payload:{
      ...payload,
    }
  });
}

//获取地址
//   uid=380995&version=1.01&timespan=1568107071&mid=3153&api_token=223456&api_sign=baa9a421
export const dispathGetAddress = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/useraddress/list',
  type: '',
  payload:{
    ...payload,
  }
});
// 获取设置
// ?type=order&k=is_needcard&version=1.01&timespan=1568107071&mid=3153&api_token=223456&api_sign=ebfea718
export const dispathSysSetting = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/syssetting/info',
  type: '',
  payload:{
    ...payload,
  }
});
//创建订单

export const dispathOrderCreate = payload => createYxcAction({
  url: 'https://request.hao-a.com/xcx/order/create',
  type: '',
  method:'POST',
  payload:{
    ...payload,
  }
});
