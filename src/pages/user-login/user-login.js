import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,Button,OpenData } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { ButtonItem } from '@components'
import { CDN } from '@constants/api'
// NOTE 使用统一接口的多端文件进行跨端处理
// auth 中有 index.js/index.weapp.js/index.alipay.js
// 若是编译微信，则实际引入的是 index.weapp.js
// 若是编译 H5，因为不存在 index.h5.js，所以引入的是默认的 index.js
import Auth from './auth'
import './user-login.scss'
import { dispatchLogin } from '../../actions/yixiaocheng'

const LOGO = `${CDN}/a7ba557fde54270c71656222c7837396.png`

// TODO 由于 RN 的 app.js 中 initPxTransform 执行顺序关系，不能在 class 外用到 Taro.pxTransform
// const BUTTON = {
//   marginTop: Taro.pxTransform(30)
// }

@connect(state => state.user, {...actions, dispatchLogin})
class UserLogin extends Component {
  config = {
    navigationBarTitleText: '登录'
  }
  handleClick = r => {}
  goBack = () => {
    Taro.navigateBack();
  }
  authorLogin = res => {
    let _this = this;
    if (res.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({ title: "正在登录", mask: true });
    // 执行微信登录
    wx.login({
      success: function (loginRes) {
        if(loginRes.errMsg ===  "login:ok"){
          _this.props.dispatchLogin({
            code: loginRes.code,
          }).then(r => {
            wx.setStorageSync('token', r);
            wx.showLoading({ title: "登录成功", mask: false });
            Taro.navigateBack();
          });
        }
      }
    });
  }
  render () {
    const BUTTON = {
      marginTop: Taro.pxTransform(30)
    }
    if(process.env.TARO_ENV === 'weapp'){
      return (
        <View className="container">
          <View className="wechatapp">
            <View className="header">
              <OpenData className="" type="userAvatarUrl"></OpenData>
            </View>
          </View>
          <View className="auth-title">申请获取以下权限</View>
          <View className="auth-subtitle">获得你的公开信息（昵称、头像等）</View>
          <Button className="login-btn" openType="getUserInfo" lang="zh_CN" bindgetuserinfo="authorLogin" onClick={this.authorLogin}>授权登录</Button>
          <Button className='back-btn' type="default" onClick={() => this.goBack()}> 返回</Button>
        </View>
      );
    }
    return (<View></View>);
  }
}

export default UserLogin
