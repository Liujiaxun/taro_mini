import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { Tag } from '@components'
import defaultAvatar from '@assets/default-avatar.png'
import './index.scss'

export default class Recommend extends Component {
  static defaultProps = {
    list: []
  }

  handleClick = (id) => {
    Taro.navigateTo({
      url: `/pages/item/item?itemId=${id}`
    })
  }

  render () {
    const { list } = this.props
    return (
      <View className='home-recommend'>
        <View className='home-recommend__title'>
          <Text className='home-recommend__title-txt'>为你推荐</Text>
        </View>
        <View className='home-recommend__list'>
          {list.map((item) => {
            const { id, cover,title,description,price,price_market, categoryItem } = item
            return (
              <View
                key={id}
                className='home-recommend__list-item'
                onClick={this.handleClick.bind(this, id)}
              >
                <Image className='home-recommend__list-item-img' src={cover} />
                {
                  <Text className='home-recommend__list-item-desc' numberOfLines={1}>
                    {description}
                  </Text>
                }
                <View className='home-recommend__list-item-info'>

                  <Text className='home-recommend__list-item-name' numberOfLines={1}>
                    {title}
                  </Text>

                  <View className='home-recommend__list-item-price-wrap'>
                    <Text className='home-recommend__list-item-price'>
                      ¥{price}
                    </Text>
                    {
                      price !== Number(price_market) &&
                      <Text className='home-recommend__list-item-price--origin'>
                        ¥{price_market}
                      </Text>
                    }
                  </View>

                  {/*{!!(categoryItem.comments && categoryItem.comments[0] && categoryItem.comments[0].content) &&*/}
                  {/*  <View className='home-recommend__list-item-commend'>*/}
                  {/*    <Image*/}
                  {/*      className='home-recommend__list-item-commend-img'*/}
                  {/*      src={categoryItem.comments[0].frontUserAvatar || defaultAvatar}*/}
                  {/*    />*/}
                  {/*    <Text className='home-recommend__list-item-commend-txt' numberOfLines={2}>*/}
                  {/*      {categoryItem.comments[0].content}*/}
                  {/*    </Text>*/}
                  {/*  </View>*/}
                  {/*}*/}
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}
