import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image} from '@tarojs/components'
import {CheckboxItem, InputNumber} from '@components'
import './index.scss'

export default class List extends Component {
  static defaultProps = {
    list: [],
    onUpdate: () => {
    },
    onUpdateCheck: () => {
    }
  }

  getBaseItem = (item) => ({
    skuId: item.skuId,
    type: item.type,
    extId: item.extId,
    cnt: item.cnt,
    checked: item.checked,
    canCheck: true,
    promId: this.props.promId,
    promType: this.props.promType,
    ...item
  })

  handleUpdate = (item, cnt) => {
    const payload = {
      skuList: {...this.getBaseItem(item), cnt}
    }
    this.props.onUpdate(payload)
  }
  handleDelete = id => {
    Taro.showModal({
      title: '是否删除该物品？',
    }).then(res => {
      if(res.confirm){
        this.props.delete(id);
      }
    })
  }

  handleUpdateCheck = (index) => {
    this.props.onUpdateCheck(index);
  }

  handleRemove = () => {
    // XXX 暂未实现左滑删除
  }

  render() {
    const {list,selects} = this.props
    return (
      <View className='cart-list'>
        {list.map((item,index) => (
          <View
            key={index}
            className='cart-list__item'
          >
            <CheckboxItem
              checked={selects.indexOf(index) > -1}
              onClick={this.handleUpdateCheck.bind(this, index)}
            />
            <Image
              className='cart-list__item-img'
              src={item.product.cover}
            />
            <View className='cart-list__item-info'>
              <View className='cart-list__item-title'>
                {!!item.prefix &&
                <Text className='cart-list__item-title-tag'>{item.prefix}</Text>
                }
                <Text className='cart-list__item-title-name' numberOfLines={1}>
                  {item.product.title}
                </Text>
              </View>

              <View className='cart-list__item-spec deleteClick'>
                <Text className='cart-list__item-spec-txt' onClick={r => this.handleDelete(item.id)}>
                  删除
                </Text>
              </View>

              <View className='cart-list__item-wrap'>
                <Text className='cart-list__item-price'>
                  ¥{item.price}
                </Text>
                <View className='cart-list__item-num'>
                  <InputNumber
                    num={Number(item.num)}
                    onChange={(cnt) => this.handleUpdate(item, cnt)}
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}
