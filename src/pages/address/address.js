import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView,Text,Checkbox} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'

import {getWindowHeight} from '@utils/style'

import './address.scss'
import {dispathGetAddress} from '../../actions/yixiaocheng'

@connect(state => state, {dispathGetAddress})
class Item extends Component {
  config = {
    navigationBarTitleText: '我的地址'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      list:[]
    }
  }

  componentDidMount() {
    this.props.dispathGetAddress({pageSize: 1000}).then(res => {
      console.log(res);
      this.setState({
        loaded:true,
        list:res.list
      })
    })
  }

  render() {
    const {list} = this.state;
    const height = getWindowHeight(false)

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
            list.map(item => (
              <View className='addressBox' key={item.id}>
                <View className="content">
                  <View className="name">
                    <Text >{`${item.realname}    ${item.phone}`}</Text>
                  </View>

                  <View className="city">
                    <Text > {`${item.province} ${item.city} ${item.district} ${item.address} `}</Text>
                  </View>
                </View>
                <View className='tool'>
                  <Checkbox value='选中' checked={item.status === '2'}>{item.status === '2' ? '已设为默认':'设为默认'}</Checkbox>
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
