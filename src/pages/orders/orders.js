import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text, Image} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'

import {getWindowHeight} from '@utils/style'

import './orders.scss'
import {dispathGetOrders, dispathCancelOrder, dispathTwoCreate} from '../../actions/yixiaocheng'

@connect(state => state, {dispathGetOrders, dispathCancelOrder, dispathTwoCreate})
class Item extends Component {
  config = {
    navigationBarTitleText: '我的订单'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      list: [],
      status: this.$router.params.status || ''
    }
  }

  componentDidMount() {
    this.init();
  }

  init(status = '') {
    this.props.dispathGetOrders({status}).then(res => {
      console.log(res);
      this.setState({
        loaded: true,
        list: res.list,
        status
      })
    })
  }

  onClickBar = status => {
    if (status === this.state.status) {
      return;
    }
    this.init(status)
  }
  cancelOrder = (orderno) => {
   this.props.dispathCancelOrder({orderno}).then(res => {
     this.init(this.state.status);
   });
  }
  goPay = orderno => {
    this.props.dispathTwoCreate({orderno}).then(res => {
      const {timeStamp, taxation, signType,prepay_id, paySign, package:Packages, orderno, nonceStr, groupon, freight, appId, amount } = res;
      if(process.env.TARO_ENV === 'weapp' && this.state.payType !== 6){
        Taro.requestPayment({
          timeStamp,
          nonceStr,
          signType,
          paySign,
          package:Packages,
          success: res => {
            Taro.showToast({
              title: '支付成功',
              icon: 'success',
            });
          },
          fail: err => {
            Taro.showModal({
              title: '取消支付或者支付失败',
            })
          },
          complete:function(){
          }
        })
      }
    })
  }
  render() {
    const {list} = this.state;
    const height = getWindowHeight(false)

    if (!this.state.loaded) {
      return <Loading/>
    }

    return (
      <View className='item'>
        <ScrollView
          scrollY
          className='item__wrap'
          style={{height}}
        >
          <View className='ordersBar'>
            <View className={this.state.status === '' ? 'barItem active' : 'barItem'}
                  onClick={e => this.onClickBar('')}>
              <Text>全部</Text>
            </View>
            <View className={this.state.status === 0 ? 'barItem active' : 'barItem'} onClick={() => this.onClickBar(0)}>
              <Text>待付款</Text>
            </View>
            <View className={this.state.status === 1 ? 'barItem active' : 'barItem'} onClick={() => this.onClickBar(1)}>
              <Text>待发货</Text>
            </View>
            <View className={this.state.status === 3 ? 'barItem active' : 'barItem'} onClick={() => this.onClickBar(3)}>
              <Text>待收货</Text>
            </View>
            <View className={this.state.status === 4 ? 'barItem active' : 'barItem'} onClick={() => this.onClickBar(4)}>
              <Text>已完成</Text>
            </View>
          </View>
          <Text className='hint'>仅显示普通商品订单</Text>
          {
            list.length === 0 && <View className='empty'>
              <Text>暂无相关订单记录</Text>
            </View>
          }
          <View className='orderList'>
            {
              list.map((item, index) => (
                <View className="listItem" key={index}>
                  <View className='itemHeader'>
                    <Text>{item.orderno}</Text>
                    <Text>{item.status_string}</Text>
                  </View>
                  <View className='itemBody'>
                    {
                      item.orderproduct && item.orderproduct.map((product, i) => (
                        <View className="shop">
                          <View className='cover'>
                            <Image className='img' src={product.cover}/>
                          </View>
                          <View className="shopInfo">
                            <Text className='title'>{product.product_title}</Text>
                            <Text className='price'>￥{product.product_price}/件 <Text
                              className='n'>x{product.product_num}</Text></Text>
                          </View>
                        </View>
                      ))
                    }
                  </View>
                  <View className='itemFooter'>
                    <View className='i top'>
                      ￥{item.amount}
                    </View>
                    <View className='i bottom'>
                      {item.status >= 0 && <Text className='qx' onClick={() => this.cancelOrder({orderno: item.orderno})}>取消订单</Text>}
                      {
                        item.status == 0 && <Text className='goPay' onClick={() => this.goPay(item.orderno)}>去付款</Text>

                      }
                      {
                        // item.status < 0 && <Text className='goPay'>重新下单</Text>
                      }
                      {
                        item.status == 1 || item.status == 2 && <Text className='goPay'>申请退款</Text>
                      }

                    </View>
                  </View>
                </View>
              ))
            }

          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Item
