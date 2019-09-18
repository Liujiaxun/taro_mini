import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Image, Button, OpenData} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'
import {getWindowHeight} from '@utils/style'
import './pay.scss'
import onLine from './online.png'
import successSVG from './success.svg'
import errorSVG from './error.svg'

@connect(state => state, {})
class Item extends Component {
  config = {
    navigationBarTitleText: '支付'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      session_key: 0,
      payStatus: null,
      isOnline: true,
      ispay: false,
      URL: ''
    }
    // options = {
    //   order_id:'123123123123123',
    //   user_id:166674,
    //   type:'release',
    //   appname:'huamei'
    // }
    this.user_id = this.$router.params.user_id
    this.type = this.$router.params.type
    this.order_id = this.$router.params.order_id
    this.appname = this.$router.params.appname
  }

  componentDidMount() {
    const self = this;
    if (process.env.TARO_ENV === 'weapp') {
      Taro.request({
        url: 'https://service-2n52jp3c-1258951790.gz.apigw.tencentcs.com/release/wxminiDomain',
        method: 'GET',
        success: function (res) {
          self.setState({
            loaded: true
          })
          const urlData = res.data.data[self.appname] || [];
          if (!urlData) {
            Taro.showToast({title: '没有配置后台信息,无法支付'});
            return;
          }
          const URL = urlData[self.type] || '';
          if (!URL) {
            Taro.showToast({title: '没有配置请求地址,无法支付'});
            return
          }
          self.setState({
            URL
          })
          Taro.login({
            success: function (loginRes) {
              const code = loginRes.code;
              if (code) {
                self.getPayOptions(URL, code);
              }
            }
          })
        }
      })
      //
    }
  }

  getPayOptions = (url, code = '') => {
    const self = this;
    Taro.showToast({
      icon: 'loading'
    })
    Taro.request({
      url,
      method: 'POST',
      data: {
        "code": code,
        "session_key": self.state.session_key || 0,
        "user_id": self.user_id,
        "order_id": self.order_id
      },
      success: function (res) {
        if (res.data.status) {
          let session_key = res.data.data.wx_user_info.session_key || 0;
          self.setState({
            session_key: session_key
          })
          let payInfo = res.data.data.pay_info;
          let packages = payInfo.package;
          let signType = payInfo.signType;
          let timeStamp = payInfo.timeStamp;
          let nonceStr = payInfo.nonceStr;
          let paySign = payInfo.paySign;
          self.Pay(timeStamp, nonceStr, packages, paySign, signType);
        } else {
          Taro.showToast({
            title: res.statusCode + res.data.msg + `请求报错无法调起支付----${url}`,
            icon: 'none'
          });
          self.setState({
            isOnline: false,
            payStatus: false
          })
        }
      },
      fail: function (err) {
        Taro.showToast({
          title: url + '请求报错无法调起支付',
          icon: 'none'
        });
        self.setState({
          isOnline: false,
          payStatus: false
        })
      }
    })
  }

  Pay = (timeStamp, nonceStr, packages, paySign, signType) => {
    const self = this;
    Taro.requestPayment({
      timeStamp,
      nonceStr,
      signType,
      paySign,
      package: packages,
      success: res => {
        Taro.showToast({
          title: '支付成功,请返回查看',
          icon: 'success',
        });
        self.setState({
          PayStatus: true
        })
      },
      fail: err => {
        Taro.showToast({
          title: '支付失败',
          icon: 'none',
        });
        self.setState({
          PayStatus: false
        })
      },
      complete: function () {
        self.setState({
          ispay: true,
          isOnline: false
        })
      }
    })
  }

  againPay = () => {
    this.getPayOptions(this.state.URL)
  }

  render() {

    const height = getWindowHeight(false)
    // XXX RN 的 transform 写法不同，这块可以统一放到 @utils/style 的 postcss() 中处理
    const popupStyle = process.env.TARO_ENV === 'rn' ?
      {transform: [{translateY: Taro.pxTransform(-100)}]} :
      {transform: `translateY(${Taro.pxTransform(-100)})`}

    if (!this.state.loaded) {
      return <Loading/>
    }

    return (
      <View className='item'>
        <ScrollView
          scrollY
          style={{height}}
        >
          <View className='body'>
            {
              this.state.isOnline ? (
                <View className='payStatusImg'>
                  <Image className="img" src={onLine}></Image>
                </View>
              ) : (
                <View className='payStatusImg'>
                  <Image className="img" src={this.state.payStatus ? successSVG : errorSVG}></Image>
                </View>
              )
            }

            {
              !this.state.isOnline &&
              <View className='payStatustitle'>
                <View className='title'>{this.state.payStatus ? '支付成功' : '支付失败'} </View>
              </View>
            }


            <View className='btnGroup'>
              {
                !this.state.payStatus && this.state.ispay &&
                <Button className="btns again" onClick={() => this.againPay()}>
                  重新支付
                </Button>
              }

              {
                process.env.TARO_ENV === 'weapp' &&
                <button class="btns  return_btn" open-type="launchApp" app-parameter={this.state.PayStatus}
                        binderror="launchAppError">
                  返回应用
                </button>
              }

            </View>
          </View>
        </ScrollView>


      </View>
    )
  }
}

export default Item
