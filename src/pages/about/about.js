import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {Loading} from '@components'
import {connect} from '@tarojs/redux'
import {getWindowHeight} from '@utils/style'
import Detail from '../item/detail'
import {dispathAboutUs} from '../../actions/yixiaocheng'

@connect(state => state, {dispathAboutUs})
class Item extends Component {
  config = {
    navigationBarTitleText: '关于我们'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      cnt: 1,
      content: ''
    }
  }


  componentDidMount() {
    this.props.dispathAboutUs({k: '关于我们'}).then((res) => {
      console.log(res, 'item-res');
      this.setState({
        loaded: true,
        content: res ? res.v :  '<p><img src=\"asdad" alt=\"暂无相关内容"/></p>'
      })
    })
  }

  render() {
    const {content} = this.state;
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
          <Detail html={content}/>
          {
            process.env.TARO_ENV === 'h5' &&
            {content}
          }
          {
           !content && <View><Text>暂无相关内容</Text></View>
          }
        </ScrollView>
      </View>
    )
  }
}

export default Item
