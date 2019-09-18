import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text, Image, Input} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/item'
import {dispatchAdd} from '@actions/cart'
import {getWindowHeight} from '@utils/style'
import './order.scss'
import '../item/item.scss'
import {dispathProductInfo, dispathGetAddress, dispathSysSetting, dispathOrderCreate, dispathSelectAddress} from '../../actions/yixiaocheng'

@connect(state => state.item, {dispathProductInfo, dispathGetAddress, dispathSysSetting, dispathOrderCreate, dispathSelectAddress})
class Item extends Component {
  config = {
    navigationBarTitleText: '支付确认'
  }

  constructor(props) {
    super(props)
    this.state = {
      address: [],
      shop: {
        list: [], productAmountTotal: 0
      },
      payType: 0
    }
    // this.shopIds = this.$router.params.ids
    this.shopIds = this.$router.params.ids
    this.type = this.$router.params.type
    this.product_id = this.$router.params.product_id
    this.num = this.$router.params.num
    this.message = ''
  }

  componentDidMount() {
    this.init();
    // if(!this.shopIds){
    //   Taro.navigateTo({
    //     url: '/pages/home/home'
    //   })
    // }
    // if(process.env.TARO_ENV === 'weapp'){
    //
    // }
  }

  // type=1&product_id=14149&num=1&sku_id=0&promotion_product_id=0&form_id=the%20formId%20is%20a%20mock%20one&storehouse_id=
  async init() {
    let payloadProductInfo = {
      is_group: 1,
      products: [],
      shoppingcart_ids: [],
      type: this.type,
    }

    if (this.type == 2) {
      payloadProductInfo.shoppingcart_ids = this.shopIds.split(',');
    }

    if(this.type == 1){
      payloadProductInfo.products = [{
        product_id: this.product_id, sku_id: "0", num: this.num
      }]
      payloadProductInfo.promotion_product_id =  "0"
    }

    this.props.dispathProductInfo(payloadProductInfo).then(res => {
      this.setState({
        shop: res
      })
    });
    this.props.dispathGetAddress({pageSize: 100}).then(res => {
      this.setState({
        address: res.list,
        loaded: true
      })
    })
  }

  orderCreate = () => {
    const self = this;
    const {address} = this.state;
    let defaultAddress = address.find(item => item.status === '2') || null;
    if(this.props.addressIndex !== -1){
      defaultAddress = address[this.props.addressIndex]
    }
    let user_address_id;
    const receivetime = new Date();
    let message = this.message && this.message.target ? this.message.target.value : ''
    if (!defaultAddress) {
      Taro.showToast({
        title: '请先添加地址'
      });
      return;
    }else{
      user_address_id = defaultAddress.id;
    }
    let payload = {
      anonymous: 0,
      form_id: "the formId is a mock one",
      ifself: 0,
      message: message,
      needcard: 0,
      products: {},
      receivetime: `${receivetime.getFullYear()}-${receivetime.getMonth()+1}-${receivetime.getDate()} 上午/下午`,
      shoppingcart_ids: [],
      user_address_id: user_address_id,
      user_coupon_id: 0,
      type: this.type,
    };
    if (this.type === '2') {
      payload.shoppingcart_ids = this.shopIds.split(',');
    }
    if(this.type == 1){
      payload.products = [{
        product_id: this.product_id, sku_id: "0", num: this.num
      }]
      payload.promotion_product_id =  "0"
    }
    this.props.dispathOrderCreate(payload).then(res => {
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
              }).then(res => {
                Taro.navigateTo({
                  url: '/pages/orders/orders'
                });
              })
            },
            complete:function(){
              self.props.dispathSelectAddress({
                index: -1
              })
            }
          })
      }
    });
  }

  goAddress = () => {
    Taro.navigateTo({
      url: '/pages/address/address?url=pages/order/order'
    });
  }

  render() {
    // XXX RN 的 transform 写法不同，这块可以统一放到 @utils/style 的 postcss() 中处理
    const popupStyle = process.env.TARO_ENV === 'rn' ?
      {transform: [{translateY: Taro.pxTransform(-100)}]} :
      {transform: `translateY(${Taro.pxTransform(-100)})`}

    if (!this.state.loaded) {
      return <Loading/>
    }
    const {addressIndex} = this.props;
    const {address, shop} = this.state;

    let defaultAddress = address.find(item => item.status === '2') || {};
    if(addressIndex != -1){
      defaultAddress = address[addressIndex]
    }
    const height = getWindowHeight(false)
    return (
      <View className='item' style={{backgroundColor: 'rgb(249, 249, 249)'}}>
        <ScrollView
          scrollY
          className='item__wrap'
          style={{height}}
        >
          <View className='addressBox' onClick={() => this.goAddress()}>
            {
              address.length ? (
                <View className='addressBoxHas'>
                  <View className='address'>
                    <View className='i-top'>
                      <Text>{defaultAddress.realname}</Text>
                      <Text>{defaultAddress.phone}</Text>
                    </View>
                    <View>
                      {defaultAddress.province} {defaultAddress.city} {defaultAddress.district} {defaultAddress.address}
                    </View>
                  </View>
                  <Image class='addressIcon' src={'https://qiniufile.zhixiangke.com/xcx/templates/shop/open_26.png'}/>
                </View>
              ) : (
                <Text>没有地址,点击添加地址</Text>
              )
            }
          </View>
          <Image class='order_img' src={'https://qiniufile.zhixiangke.com/xcx/templates/shop/line_750_5.png'}/>
          <View className='order_box'>
            <View className='order_list'>
              {
                shop.list && shop.list.map((item, index) => (
                  <View className='item' key={index}>
                    <View className='Img'>
                      <Image className='cover' src={item.product.cover}/>
                    </View>
                    <View className='Info'>
                      <View className='title'>
                        <View className='name'>
                          <Text className='tx'>{item.product.title}</Text>
                        </View>
                      </View>
                      <View className='pr'>
                        <Text>数量：{item.num}</Text>
                        <Text>￥{item.product.price}</Text>
                      </View>
                    </View>
                  </View>
                ))
              }
            </View>
            <View className='count'>
              <Text>合计：</Text>
              <Text>￥{shop.productAmountTotal}</Text>
            </View>

            <View className='count'>
              <Text>买家留言：</Text>
              <Input type='text' placeholder='给卖家留言' onChange={ val => this.message = val} />
            </View>

            <View className='count'>
              <Text>总计：</Text>
              <Text className='countColor'>￥{shop.productAmountTotal}</Text>
            </View>
          </View>

          <View className='silde'>
            <Text>支付方式：</Text>
            <Text>微信支付</Text>
          </View>

          <View className='silde'>
            <Text>运费：</Text>
            <Text>包邮</Text>
          </View>
        </ScrollView>


        <View className='item__footer'>
          <View className='footer_box'>
            <View className='pays-price'>
              <Text>
                合计：<Text className='color'>￥{shop.productAmountTotal}</Text>
              </Text>
            </View>
            <View className='pays' onClick={() => this.orderCreate()}>
              微信支付
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Item
