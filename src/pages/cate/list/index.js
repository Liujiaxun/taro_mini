import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class List extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (item) => {
    Taro.navigateTo({
      url: `/pages/item/item?itemId=${item.id}`
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='cate-list'>
        {list.map((item, index)=> (
            <View
              className={'list_items ' + ((index+1) % 2 === 0?'marginLeft':'')}
              onClick={this.handleClick.bind(this, item)}
            >
              <View className={'items_imgs'}>
                <Image className='items_img' src={item.cover} />
              </View>
              <View className='item_text'>
                <Text className='cate-list__item-txt'>{item.title}</Text>
              </View>
            </View>
        ))}
      </View>
    )
  }
}
