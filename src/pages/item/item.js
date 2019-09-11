import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/item'
import {dispatchAdd} from '@actions/cart'
import {getWindowHeight} from '@utils/style'
import Gallery from './gallery'
import InfoBase from './info-base'
import InfoParam from './info-param'
import Detail from './detail'
import Footer from './footer'
import Spec from './spec'
import './item.scss'
import {dispathItemInfo,dispathCartAdd} from '../../actions/yixiaocheng'

@connect(state => state.item, {...actions, dispatchAdd, dispathItemInfo,dispathCartAdd})
class Item extends Component {
  config = {
    navigationBarTitleText: '商品详情'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {},
      info: {},
      cnt: 1
    }
    this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    this.props.dispathItemInfo({id: this.itemId}).then((res) => {
      console.log(res, 'item-res');
      this.setState({loaded: true, info: res})
    })
  }

  handleSelect = (selected) => {
    this.setState({selected})
  }

  handleCntChange = (cnt)=>{
    console.log(cnt);
    this.setState({
      cnt
    })
  }

  handleAdd = () => {
    if (!this.state.visible) {
      this.setState({visible: true})
      return;
    }
    // 添加购物车是先从 skuSpecValueList 中选择规格，再去 skuMap 中找 skuId，多个规格时用 ; 组合
    const info = this.state.info;
    const payload = {
      skuId: info.id,
      cnt: this.state.cnt,
      id:info.id,
      num:this.state.cnt,
      product_id:info.id
    }
    this.props.dispathCartAdd(payload).then(() => {
      this.setState({visible: false})
      Taro.showToast({
        title: '加入购物车成功',
        icon: 'none'
      })
    })
  }

  goOrder  = () => {
    const itemId = this.itemId;
    const {cnt} = this.state;
    if (!this.state.visible) {
      this.setState({visible: true})
      return;
    }
     Taro.navigateTo({
       url:`/pages/order/order?type=1&product_id=${itemId}&num=${cnt}&sku_id=0`
     });
  }
  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible,
      selected: {}
    })
  }

  render() {
    const {itemInfo} = this.props
    const {itemDetail = {}} = itemInfo
    const {cover, content} = this.state.info;
    const gallery = [cover];
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
          className='item__wrap'
          style={{height}}
        >
          <Gallery list={gallery}/>
          <InfoBase data={this.state.info}/>
          {/*<InfoParam list={itemInfo.attrList} />*/}
          <Detail html={content}/>
        </ScrollView>

        {/* NOTE Popup 一般的实现是 fixed 定位，但 RN 不支持，只能用 absolute，要注意引入位置 */}
        <Popup
          visible={this.state.visible}
          onClose={this.toggleVisible}
          compStyle={popupStyle}
        >
          <Spec
            data={this.state.info}
            selected={this.state.selected}
            onSelect={this.handleSelect}
            onCntChange={this.handleCntChange}
          />
        </Popup>

        <View className='item__footer'>
          <Footer onAdd={this.handleAdd} oncreate={this.goOrder} />
        </View>
      </View>
    )
  }
}

export default Item
