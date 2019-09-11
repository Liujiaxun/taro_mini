import * as Taro from "@tarojs/taro";

export async function setAppStore(weapp=null,h5=null,rn=null){
  if(process.env.TARO_ENV === 'weapp'){

  }

  if(process.env.TARO_ENV === 'h5'){
    h5 && h5();
  }

  if(process.env.TARO_ENV === 'rn'){
    rn && await rn();
  }
}

export function getAppStore(key){
    if(process.env.TARO_ENV === 'weapp'){
      return wx.getStorageSync(key);
    }

    if(process.env.TARO_ENV === 'h5'){
      return JSON.parse(window.localStorage.getItem(key))
    }

    if(process.env.TARO_ENV === 'rn'){
    return new Promise(function (resolve, reject) {
      Taro.getStorage({key}).then(res =>{ resolve(res)})
    })
  }
}
