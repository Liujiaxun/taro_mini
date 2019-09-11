import Taro from '@tarojs/taro'
import {API_USER, API_USER_LOGIN} from '@constants/api'
import { Apis } from '../config/urls';
import {app_version, timeSpan, yxcId} from "../config/config";

const CODE_SUCCESS = '200'
const CODE_AUTH_EXPIRED = '600'

export function getStorage(key) {
  return Taro.getStorage({key}).then(res => res.data).catch(() => '')
}

function updateStorage(data = {}) {
  return Promise.all([
    // Taro.setStorage({key: 'token', data: data['3rdSession'] || '1233333'}),
    // Taro.setStorage({key: 'uid', data: data['uid'] || ''})
  ])
}

/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  const {url, payload, method = 'GET', showToast = true, autoLogin = true} = options
  const token = await getStorage('token')
  const header = token ? {'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token} : {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }

  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const {code, data} = res.data
    if (code !== CODE_SUCCESS) {
      if (code === CODE_AUTH_EXPIRED) {
        await updateStorage({})
      }
      return Promise.reject(res.data)
    }

    if (url === API_USER_LOGIN) {
      await updateStorage(data)
    }

    // XXX 用户信息需展示 uid，但是 uid 是登录接口就返回的，比较蛋疼，暂时糅合在 fetch 中解决
    if (url === API_USER) {
      const uid = await getStorage('uid')
      return {...data, uid}
    }

    return data
  }).catch((err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({message: defaultMsg, ...err})
  })
}
function setAppStorage(data={}) {
  return Promise.all([
    Taro.setStorage({key: 'app', data: data }),
  ]);
}
export function getAppStorage(key) {
  return new Promise((resolve, reject) => {
    Taro.getStorage({key}).then(res =>
    {
      resolve(res)
    }).catch((err) => {reject(err)})
  })
}
/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export async function fetch2(options) {
  const {url, payload, method = 'GET', showToast = true, autoLogin = true} = options
  let token = await getStorage('token')
  let app = await getStorage('app')
  if(!app || !app.api_token){
    app = Taro.getStorageSync('app');
  }
  if(!token || !token.id){
    token = Taro.getStorageSync('token') || JSON.parse(window.localStorage.getItem('token'));
  }
  let newData = {...payload}
  if(url !== Apis.URL_USERAPP_AUTHEN && app && app.api_secret && app.api_token && app.app_id){
    // newData.id= payload.id ? payload.id : yxcId
    newData.version=app_version
    newData.timespan=timeSpan
    newData.mid=app.user_app_id
    newData.api_token=app.api_token
    newData.api_sign=app.api_secret
  }
  if(token && token.id && url !== Apis.URL_USER_LOGIN){
    newData.uid = token.id
  }
  // const header = token ? {'WX-PIN-SESSION': token, 'X-WX-3RD-Session': token} : {}
  const header =  {}
  if (method === 'POST') {
    header['content-type'] = 'application/json'
  }
  if(process.env.TARO_ENV === 'h5'){
    // header.mode = 'cors'
  }
  return Taro.request({
    url,
    method,
    data: newData,
    header,
  }).then(async (res) => {
    const {data} = res.data;
    if (res.statusCode !== 200) {
      return Promise.reject(res.data);
    }
    if (url === Apis.URL_USERAPP_AUTHEN) {
      // await setAppStorage(data);
    }
    return data;
  }).catch((err) => {
    const defaultMsg = err.code === CODE_AUTH_EXPIRED ? '登录失效' : '请求异常'
    if (showToast) {
      Taro.showToast({
        title: err && err.errorMsg || defaultMsg,
        icon: 'none'
      })
    }

    if (err.code === CODE_AUTH_EXPIRED && autoLogin) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }

    return Promise.reject({message: defaultMsg, ...err})
  })
}
