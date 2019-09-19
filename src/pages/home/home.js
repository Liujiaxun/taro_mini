import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, ScrollView} from '@tarojs/components'
import {Loading} from '@components'
import {connect} from '@tarojs/redux'
import * as actions from '@actions/home'
import {dispatchCartNum} from '@actions/cart'
import {getWindowHeight} from '@utils/style'
import Banner from './banner'
import Policy from './policy'
import Pin from './pin'
import Operation from './operation'
import Manufactory from './manufactory'
import FlashSale from './flash-sale'
import Popular from './popular'
import Category from './category'
import Recommend from './recommend'
import searchIcon from './assets/search.png'
import './home.scss'
import {dispatchAuthen, dispathUserTemplatePage, dispathPinData, dispathCategoryData} from '../../actions/yixiaocheng'
import {fetch2} from "../../utils/request";
import {Apis} from "../../config/urls";
import {app_token, app_version} from "../../config/config";

const RECOMMEND_SIZE = 20

@connect(state => state.home, {
  ...actions,
  dispatchCartNum,
  dispatchAuthen,
  dispathPinData,
  dispathUserTemplatePage,
  dispathCategoryData
})
class Home extends Component {
  config = {
    navigationBarTitleText: '馨朵'
  }
  constructor(props){
    super(props)
    this.state = {
      page:1,
      isStop:false,
      loaded: false,
      loading: false,
      lastItemId: 0,
      hasMore: true,
    }
  }

  componentDidMount() {
    const that = this;
    fetch2({
      url: Apis.URL_USERAPP_AUTHEN,
      payload: {
        app_token,
        app_version
      },
    }).then(async r => {
      await Taro.setStorage({key:'app',data:r});
      if (process.env.TARO_ENV === 'weapp') {
        Taro.setStorageSync('app',r)
        Taro.login({
          success: res => {
            console.log(r, 'res');
            const data = {
              api_sign: r.api_sign,
              api_token: r.api_token,
              mid: r.user_app_id,
              code: res.code,
              timespan: parseInt((new Date()).getTime() / 1000),
              version: app_version
            }
            Taro.request({
              url: Apis.URL_USER_LOGIN,
              data: data,
              method: 'POST',
              success: async data => {
                console.log(data);
                await Promise.all([
                  Taro.setStorage({key: 'token', data: data.data.data}),
                ])
              },
              fail: err => {
                console.log(err);
              }
            });
          },
          fail: () => {

          }
        });
      }
      await that.init();
    })
  }

  componentDidShow() {
  }

  async init() {
    await this.props.dispathUserTemplatePage({}).then(() => {
      this.setState({loaded: true})
    });
    await this.props.dispathPinData({
      is_groupon: 1, page: 1
    })
    await this.loadRecommend()
  }

  loadRecommend = () => {
    const self = this;
    const {page} = this.state;
    if (this.state.isStop) {
      console.log('到底了');
      return
    }
    this.setState({loading: true})
    this.props.dispathCategoryData({
      type: 'HOME_YXC_TUI_JIAN', page: page, category_id: 0, pageSize: RECOMMEND_SIZE
    }).then((res) => {
      const {currentPage,numPages} = res.paginator;
      const isStop = currentPage === numPages
      self.setState({
        loading: false,
        page:isStop ? page : page+1,
        isStop:isStop
      })
    }).catch(() => {
      this.setState({loading: false})
    })
  }

  handlePrevent = () => {
    // XXX 时间关系，首页只实现底部推荐商品的点击
    Taro.showToast({
      title: '目前只可点击底部推荐商品',
      icon: 'none'
    })
  }

  render() {
    if (!this.state.loaded) {
      return <Loading/>
    }
    const {} = this.state;
    console.log(this.state);
    const {homeInfo, searchCount, elements_arr, yxcPin, yxcAllData} = this.props
    //banner
    let banner = [];
    let yxcPins = [];
    if (elements_arr && elements_arr[0]) {
      banner = elements_arr[0].data.list
    }
    //拼团
    const {list: yxcPinList} = yxcPin
    if (yxcPinList) {
      let yxcPinItem = [];
      for (let i = 1; i <= yxcPinList.length; i++) {
        yxcPinItem.push(yxcPinList[i - 1])
        if (i % 3 === 0) {
          yxcPins.push(yxcPinItem);
          yxcPinItem = [];
        }
      }
    }
    //为你推荐
    const {list: recommend,paginator} = yxcAllData;

    return (
      <View className='home'>
        <View className='home__search'>
          <View className='home__search-wrap' onClick={this.handlePrevent}>
            <Image className='home__search-img' src={searchIcon}/>
            <Text className='home__search-txt'>
              {`搜索商品，共${searchCount}款好物`}
            </Text>
          </View>
        </View>
        <ScrollView
          scrollY
          className='home__wrap'
          onScrollToLower={() => this.loadRecommend(this.state.stop)}
          style={{height: getWindowHeight()}}
        >
          <View onClick={this.handlePrevent}>
            <Banner list={banner}/>
            <Policy list={homeInfo.policyDesc}/>

            {/* 免费拼团 */}
            {/*<Pin*/}
            {/*  banner={[]}*/}
            {/*  list={yxcPins}*/}
            {/*/>*/}

            {/* 不知道叫啥 */}
            {/* <Operation
              list={homeInfo.operationCfg}
              sale={homeInfo.saleCenter}
            /> */}

            {/* 品牌制造 */}
            {/* <Manufactory
              data={homeInfo.manufactory}
              boss={homeInfo.dingBossRcmd}
            /> */}

            {/* 限时购 */}
            {/* <FlashSale data={homeInfo.flashSale} /> */}

            {/* 人气推荐 */}
            {/* <Popular data={homeInfo.popularItems} /> */}

            {/* 类目热销榜 */}
            {/* <Category data={homeInfo.hotCategory} /> */}
          </View>

          {/* 为你推荐 */}
          <Recommend list={recommend}/>

          {this.state.loading &&
          <View className='home__loading'>
            <Text className='home__loading-txt'>正在加载中...</Text>
          </View>
          }
          { this.state.isStop  ?
            <View className='home__loading home__loading--not-more'>
              <Text className='home__loading-txt'>到底了</Text>
            </View> : null
          }
        </ScrollView>
      </View>
    )
  }
}

export default Home
