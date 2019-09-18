import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { Loading } from '@components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/cate'
import { getWindowHeight } from '@utils/style'
import Menu from './menu'
import List from './list'
import Banner from './banner/index'
import './cate.scss'
import {dispathCategory, dispathCategoryData} from  '../../actions/yixiaocheng'
@connect(state => state.cate, { ...actions,dispathCategory, dispathCategoryData})
class Cate extends Component {
  config = {
    navigationBarTitleText: '分类'
  }

  state = {
    current: -1,
    loaded: false,
    loading: false,
    page:1
  }

  componentDidMount() {
    this.init();
  }
   init (){
    this.props.dispathCategory({}).then((res) => {
      this.setState({
        loaded: true,
        current: res[0].id
      })
      this.getCategoryData(res[0].id)
    });
  }
  getCategoryData(category_id,page=1){
    this.props.dispathCategoryData({
      page,
      category_id
    }).then(res=>{
      this.setState({loading:false})
    })
  }
  handleMenu = (id) => {
    this.setState({ loading: true }, () => {
      this.getCategoryData(id)
      this.setState({ current: id})
    })
  }

  render () {
    const { yxcCategory,yxcCategoryData } = this.props
    const { current, loading } = this.state
    const banner = yxcCategory && yxcCategory.map(item => ({id:item.id,image:item.image}))
    const {list, paginator} = yxcCategoryData;
    const height = getWindowHeight()
    if (!this.state.loaded) {
      return <Loading />
    }
    return (
      <View className='cate'>
        <ScrollView
          scrollY
          className='cate__menu'
          style={{ height }}
        >
          <Menu
            current={current}
            list={yxcCategory}
            onClick={this.handleMenu}
          />
        </ScrollView>
        {/* 通过切换元素实现重置 ScrollView 的 scrollTop */}
        {loading ?
          <View /> :
          <ScrollView
            scrollY
            className='cate__list'
            style={{ height }}
          >
            <View className='cate__list-wrap'>
              <Banner banner={banner} current={current} />
              <List list={list} />
            </View>
          </ScrollView>
        }
      </View>
    )
  }
}

export default Cate
