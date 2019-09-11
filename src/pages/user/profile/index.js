import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,OpenData } from '@tarojs/components'
import defaultAvatar from '@assets/default-avatar.png'
import Vip from './vip'
import bg from './assets/bg.png'
import qrCode from './assets/qr-code.png'
import level01 from './assets/level-01.png'
import './index.scss'

export default class Profile extends Component {
  static defaultProps = {
    userInfo: {}
  }

  handleLogin = () => {
    if (!this.props.userInfo.login) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }
  }


  render () {
    let tokens = '';
    if(process.env.TARO_ENV === 'weapp'){
      tokens = wx.getStorageSync('token');
    }
    if(process.env.TARO_ENV === 'h5'){
      tokens = JSON.parse( window.localStorage.getItem('token'));
    }
    return (
      <View className='user-profile'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        <Image
          className='user-profile__bg'
          src={bg}
          mode='widthFix'
        />

        <View className='user-profile__wrap'>
          <View className='user-profile__avatar'>
            {
              process.env.TARO_ENV === 'weapp' && tokens && tokens.id ? (
              <View>
                <OpenData className="" lang="zh_CN" type="userAvatarUrl"></OpenData>
              </View>
              ):(
                  tokens && tokens.id ? <Image
                    className='user-profile__avatar-img'
                    src={tokens.headurl}
                  />:<Image
                    className='user-profile__avatar-img'
                    src={defaultAvatar}
                    onClick={this.handleLogin}
                  />
              )
            }
          </View>
          <View className='user-profile__info' >
              {
                process.env.TARO_ENV === 'weapp' && tokens && tokens.id ? (
                  <OpenData className="" lang="zh_CN" type="userNickName"></OpenData>
                ):(<View><Text className='user-profile__info-name'>{ tokens && tokens.id ? tokens.nickname :'未登录'}</Text>   <Text onClick={this.handleLogin} className='user-profile__info-tip' onClick={() => this.handleLogin()}>{ tokens && tokens.id ? '':'点击登录账号'}</Text></View>)
              }
          </View>

        </View>
      </View>
    )
  }
}
