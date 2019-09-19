import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, Button, OpenData, Input} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/user'
import {ButtonItem} from '@components'
import {CDN} from '@constants/api'
// NOTE 使用统一接口的多端文件进行跨端处理
// auth 中有 index.js/index.weapp.js/index.alipay.js
// 若是编译微信，则实际引入的是 index.weapp.js
// 若是编译 H5，因为不存在 index.h5.js，所以引入的是默认的 index.js
import Auth from './auth'
import './user-login.scss'
import {dispatchLogin, dispathGetPhoneCode, dispathH5Login} from '../../actions/yixiaocheng'
import {logo} from '../../config/config'

// TODO 由于 RN 的 app.js 中 initPxTransform 执行顺序关系，不能在 class 外用到 Taro.pxTransform
// const BUTTON = {
//   marginTop: Taro.pxTransform(30)
// }

@connect(state => state.user, {...actions, dispatchLogin, dispathGetPhoneCode, dispathH5Login})
class UserLogin extends Component {
  config = {
    navigationBarTitleText: '登录'
  }

  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      phone: '',
      authencode: '',
    }
  }

  handleClick = r => {
  }
  goBack = () => {
    Taro.navigateBack();
  }
  authorLogin = res => {
    let _this = this;
    if (res.detail.errMsg !== 'getUserInfo:ok') {
      return false;
    }
    wx.showLoading({title: "正在登录", mask: true});
    // 执行微信登录
    wx.login({
      success: function (loginRes) {
        if (loginRes.errMsg === "login:ok") {
          _this.props.dispatchLogin({
            code: loginRes.code,
          }).then(r => {
            wx.setStorageSync('token', r);
            wx.showLoading({title: "登录成功", mask: false});
            Taro.navigateBack();
          });
        }
      }
    });
  }

  onSetData = (val, key) => {
    const value = val.detail.value;
    this.setState({
      [key]: value
    })

    if (key === 'phone' && (/^1[3456789]\d{9}$/.test(value))) {
      this.setState({
        disabled: false
      });
    }
  }
  onLogin = () => {
    this.props.dispathH5Login({
      phone: 15779246854,
      authencode: 2804,
      phone_authencode_id: 1325
    }).then(async res => {
      if(process.env.TARO_ENV === 'h5'){
        window.localStorage.setItem('token',JSON.stringify(res));
      }
      if(process.env.TARO_ENV === 'rn'){
        await Promise.all([
          Taro.setStorage({key:'token',data:res})
        ])
      }
      Taro.navigateTo({
        url:'/pages/home/home'
      })
    });
    if (!(/^1[3456789]\d{9}$/.test(this.state.phone))) {
      Taro.showToast({
        title: '请输入正确的手机号'
      });
      return;
    }
    if (!(/^\d{4}$/.test(this.state.authencode))) {
      Taro.showToast({
        title: '验证码必须是数字'
      });
      return;
    }
    if(!this.state.phone_authencode_id){
      Taro.showToast({
        title: '请先获取验证码'
      });
      return;
    }
    this.props.dispathH5Login({
      phone: this.state.phone,
      authencode: this.state.authencode,
      phone_authencode_id: this.state.phone_authencode_id
    }).then(async res => {
      if(process.env.TARO_ENV === 'h5'){
        window.localStorage.setItem('token',res);
      }
      await Promise.all([
        Taro.setStorage({key:'token',data:res})
      ])
    });
  }
  onGetCode = () => {
    this.props.dispathGetPhoneCode({
      phone: this.state.phone,
      type: 'bind=' + this.state.phone,
    }).then(res => {
      if(res){
        this.setState({
          phone_authencode_id: res.phone_authencode_id
        })
        console.log(res);
        Taro.showToast({
          title: '验证码发送成功'
        });
      }

    });
  }

  render() {
    const BUTTON = {
      marginTop: Taro.pxTransform(30)
    }
    const {disabled} = this.state;
    console.log(disabled);
    if (process.env.TARO_ENV === 'weapp') {
      return (
        <View className="container">
          <View className="wechatapp">
            <View className="header">
              <OpenData className="" type="userAvatarUrl"></OpenData>
            </View>
          </View>
          <View className="auth-title">申请获取以下权限</View>
          <View className="auth-subtitle">获得你的公开信息（昵称、头像等）</View>
          <Button className="login-btn" openType="getUserInfo" lang="zh_CN" bindgetuserinfo="authorLogin"
                  onClick={this.authorLogin}>授权登录</Button>
          <Button className='back-btn' type="default" onClick={() => this.goBack()}> 返回</Button>
        </View>
      );
    }
    return (

        process.env.TARO_ENV !== 'weapp' && <View className='logins'>
          <View className='appLogin'>
            <Image className='logo' src={logo}/>
          </View>
          <View className='inputs'>
            <Input type='text' placeholder='请输入手机号' onChange={val => this.onSetData(val, 'phone')}/>
          </View>

          <View className='ge'>
            <View className='inputs'>
              <Input type='text' placeholder='请输入验证码' onChange={val => this.onSetData(val, 'authencode')}/>
            </View>
            <Button className='getCode' disabled={disabled} onClick={() => this.onGetCode()}>获取验证码</Button>

          </View>

          <View className='loginBtn'>
            <View className='login-btn' onClick={() => this.onLogin()}>
              <Text>登录或注册</Text>
            </View>
          </View>
        </View>

      );
  }
}

export default UserLogin
