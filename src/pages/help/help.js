import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text} from '@tarojs/components'
import {Loading} from '@components'
import {connect} from '@tarojs/redux'
import {getWindowHeight} from '@utils/style'
import {dispathHelpList} from '../../actions/yixiaocheng'
import './help.scss'

@connect(state => state, {dispathHelpList})
class Item extends Component {
  config = {
    navigationBarTitleText: '帮助中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      list: []
    }
  }


  componentDidMount() {
    this.props.dispathHelpList({}).then((res) => {
      console.log(res, 'item-res');
      this.setState({
        loaded: true,
        list: res.list
      })
    })
  }

  render() {
    const {list} = this.state;
    const height = getWindowHeight(false)
    const lists = list.map(item => ({
      ...item,
      content: item.content.replace(/<p>/g, ' ').replace(/<\/p>/g, '')
    }))
    console.log(lists);
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
          {
            lists.map(item => (
              <View className='help-list' key={item.id}>
                <View className="title">{item.title}</View>
                <View className="content">
                  <Text>{
                    item.content
                  }
                  </Text>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

export default Item
