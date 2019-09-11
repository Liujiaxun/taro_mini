import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {ButtonItem, ItemList, Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/cart'
import {API_CHECK_LOGIN} from '@constants/api'
import fetch from '@utils/request'
import {getWindowHeight} from '@utils/style'
import Tip from './tip'
import Gift from './gift'
import Empty from './empty'
import List from './list'
import Footer from './footer'
import {dispathCartList, dispathCartUpdate, dispathCartDelete} from '../../actions/yixiaocheng'
import './cart.scss'
import {getAppStore} from '../../utils/func'
@connect(state => state.cart, {...actions, dispathCartList, dispathCartUpdate, dispathCartDelete})
class Index extends Component {
  config = {
    navigationBarTitleText: '购物车'
  }

  state = {
    loaded: false,
    login: false,
    list: [],
    selects: [],
  }

  componentDidShow() {
    this.setState({
      selects:[]
    })
    this.props.dispathCartList().then(res => {
      this.setState({
        list: res.list,
        loaded: true,
      })
    });
  }

  init = () => {
    this.props.dispathCartList().then(res => {
      this.setState({
        list: res.list,
        loaded: true
      })
    });
  }
  onDelete = id => {
    this.props.dispathCartDelete({
      ids: id
    }).then(res => {
      this.init();
    });

  }
  onChecked = index => {
    let isSelect = this.state.selects;
    const i = isSelect.indexOf(index);
    if (i > -1) {
      isSelect.splice(i, 1)
    } else {
      isSelect.push(index);
    }
    this.setState({
      selects: isSelect
    })
  }

  onAllSelect = arr => {
    this.setState({
      selects: arr
    })
  }

  onHandleOrder = total => {
    const {selects,list} = this.state;
    const product = selects.map(item => list[item].id);
    Taro.navigateTo({
      url: `/pages/order/order?type=2&ids=${product.join()}`,
    });
  }

  toLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
  }



  cartUpdate = (payload) => {
    this.props.dispathCartUpdate({
      id: payload.skuList.id,
      num: payload.skuList.cnt
    }).then(res => {
      this.init();
    });
  }

  render() {
    const {list, selects} = this.state;
    const isEmpty = !list.length
    const isShowFooter = !isEmpty
    if (!this.state.loaded) {
      return <Loading/>
    }
    const token = getAppStore('token') || null;

    if (!token && token.id && process.env.TARO_ENV !== 'weapp') {
      return (
        <View className='cart cart--not-login'>
          <Empty text='未登陆'/>
          <View className='cart__login'>
            <ButtonItem
              type='primary'
              text='登录'
              onClick={this.toLogin}
              compStyle={{
                background: '#b59f7b',
                borderRadius: Taro.pxTransform(4)
              }}
            />
          </View>
        </View>
      )
    }

    return (
      <View className='cart'>
        <ScrollView
          scrollY
          className='cart__wrap'
          style={{height: getWindowHeight()}}
        >
          {/*<Tip list={cartInfo.policyDescList}/>*/}
          {isEmpty && <Empty/>}

          {/*{!isEmpty && <Gift data={cartGroupList[0]}/>}*/}

          <List
            list={list}
            onUpdate={(payload) => this.cartUpdate(payload)}
            delete={id => this.onDelete(id)}
            onUpdateCheck={id => this.onChecked(id)}
            selects={selects}
          />
          {/* 相关推荐 */}
          {/*{extList.map((ext, index) => (*/}
          {/*  <ItemList key={`${ext.id}_${index}`} list={ext.itemList}>*/}
          {/*    <View className='cart__ext'>*/}
          {/*      {!!ext.picUrl && <Image className='cart__ext-img' src={ext.picUrl}/>}*/}
          {/*      <Text className='cart__ext-txt'>{ext.desc}</Text>*/}
          {/*    </View>*/}
          {/*  </ItemList>*/}
          {/*))}*/}

          {/* 猜你喜欢 */}
          {/*<ItemList list={recommend.itemList}>*/}
          {/*  <View className='cart__recommend'>*/}
          {/*    <Text className='cart__recommend-txt'>{recommend.desc}</Text>*/}
          {/*  </View>*/}
          {/*</ItemList>*/}

          {isShowFooter &&
          <View className='cart__footer--placeholder'/>
          }
        </ScrollView>

        {isShowFooter &&
        <View className='cart__footer'>
          <Footer
            cartInfo={list}
            onUpdateCheck={arr => this.onAllSelect(arr)}
            selects={selects}
            onHandleOrder={total => this.onHandleOrder(total)}
          />
        </View>
        }
      </View>
    )
  }
}

export default Index
