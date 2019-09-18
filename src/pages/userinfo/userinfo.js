import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Text, Image, Input, Picker} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'

import {getWindowHeight} from '@utils/style'

import './userinfo.scss'
import {dispathSaveUserInfo, dispathGetUserInfo} from '../../actions/yixiaocheng'
import {getAppStore} from "../../utils/func";

@connect(state => state, {dispathGetUserInfo, dispathSaveUserInfo})
class Item extends Component {
  config = {
    navigationBarTitleText: '我的资料'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selector: ['男', '女'],
      gender: '',
      date: '',
      phone:'',
      realname: '',
      is_wechatphone: 0
    }
  }

  componentDidMount() {
    this.init();
    if(process.env.TARO_ENV === 'weapp'){
      this.setState({
        is_wechatphone : 1
      })
    }
  }

  onChange = (key, data) => {
    console.log(key, data);
    let value = data.detail.value;

    this.setState({
      [key]: value
    })
  }
  setValue = (data,key) => {
    const value = data.detail.value;
    this.setState({
      [key]: value
    })
  }

  init(status = '') {
    this.props.dispathGetUserInfo({}).then(res => {
      console.log(res);
      this.setState({
        loaded: true,
        user: res
      })
    })
  }

  onSave = () => {
    const {user} = this.state;
    const payload = {
      birthday: this.state.date ? this.state.date: user.birthday,
      gender: this.state.gender ? this.state.gender + 1: user.gender,
      phone: this.state.phone ? this.state.phone: user.phone,
      realname: this.state.realname ? this.state.realname: user.realname,
      sex: "1",
      is_wechatphone: this.state.is_wechatphone
    }
    this.props.dispathSaveUserInfo(payload).then(res => {
      Taro.showToast({
        title: '资料保存成功'
      });
    });
  }

  render() {
    const {user} = this.state;
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
          <View className='cover'>
            <View className='cover-1'>
              <Text>头像</Text>
            </View>
            <Image className='cover-1' src={user.headurl}/>
          </View>

          <View className='info'>
            <View className='inputs'>
              <View className='title'>
                <Text>姓名</Text>
              </View>
              <View className="input">
                <Input type='text' placeholder='请输入姓名' onChange={val => this.setValue(val,'realname')} value={this.state.realname ? this.state.realname : user.realname  || '' }/>
              </View>
            </View>
            <View className='inputs'>
              <View className='title'>
                <Text>手机号码</Text>
              </View>
              <View className="input">
                <Input type='text' placeholder='请输入手机号' onChange={val => this.setValue(val,'phone')} value={ this.state.phone ? this.state.phone : user.phone  || '' }/>
              </View>
            </View>
            <View className='inputs'>
              <View className='title'>
                <Text>性别</Text>
              </View>
              <View className="input">
                <Picker mode='selector' range={this.state.selector} onChange={(val) => this.onChange('gender', val)}
                        className='picker'>
                  <View className='picker'>
                    {
                      this.state.gender !== '' ? this.state.selector[this.state.gender] : user.gender ? this.state.selector[user.gender - 1] :  '请选择性别'
                    }
                  </View>
                </Picker>
              </View>
            </View>
            <View className='inputs'>
              <View className='title'>
                <Text>生日</Text>
              </View>
              <View className="input">
                <Picker mode='date' className='picker' onChange={(val) => this.onChange('date', val)}>
                  <View className='picker'>
                    {
                      this.state.date !== '' ?  this.state.date :user.birthday ? user.birthday : '请选择生日'
                    }
                  </View>
                </Picker>
              </View>
            </View>
          </View>

          <View className='saveBtn' onClick={() => this.onSave()}>
            <Text>保存资料</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Item
