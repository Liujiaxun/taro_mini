import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { CheckboxItem, ButtonItem } from '@components'
import './index.scss'

export default class Footer extends Component {
  static defaultProps = {
    cartInfo: [],
    selects:[],
    onToggle: () => {}
  }

  handleUpdateCheck = () => {
    const {cartInfo,selects} = this.props;
    let arr = [];
    if(selects.length !== cartInfo.length){
      for(let i=0;i<cartInfo.length;i++){
          arr.push(i);
      }
    }
    this.props.onUpdateCheck(arr)
  }

  handleOrder = (total) => {
    this.props.onHandleOrder(total);
  }

  render () {
    const { cartInfo,selects } = this.props;
    let total = selects.map(item => {
      const { num, price } = cartInfo[item];
      return Number(num) * Number(price);
    }).reduce((a,b)=>a+b,0);
    return (
      <View className='cart-footer'>
        <View className='cart-footer__select'>
          <CheckboxItem
            checked={selects.length === cartInfo.length}
            onClick={this.handleUpdateCheck}
          >
            <Text className='cart-footer__select-txt'>
              {!cartInfo.selectedCount ? '全选' : `已选(${cartInfo.selectedCount})`}
            </Text>
          </CheckboxItem>
        </View>
        <View className='cart-footer__amount'>
          <Text className='cart-footer__amount-txt'>
            ¥{parseFloat(total).toFixed(2)}
          </Text>
        </View>
        <View className='cart-footer__btn'>
          <ButtonItem
            type='primary'
            text='下单'
            onClick={()=> this.handleOrder(total)}
          />
        </View>
      </View>
    )
  }
}
