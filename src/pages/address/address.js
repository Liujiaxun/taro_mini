import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView,Text,Checkbox,Icon,Input, Picker, Button, CheckboxGroup} from '@tarojs/components'
import {Popup, Loading} from '@components'
import {connect} from '@tarojs/redux'

import {getWindowHeight} from '@utils/style'

import './address.scss'
import {dispathGetAddress,dispathGetProvince, dispathGetCity, dispathGetDistrict, dispathSaveAddress, dispathUpdateAddress, dispathDeteleAddress, dispathSelectAddress} from '../../actions/yixiaocheng'

@connect(state => state, {dispathGetAddress,dispathGetProvince, dispathGetCity,dispathGetDistrict, dispathSaveAddress, dispathUpdateAddress, dispathDeteleAddress, dispathSelectAddress})
class Item extends Component {
  config = {
    navigationBarTitleText: '我的地址'
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      list:[],
      Province:[],
      City:[],
      District:[],
      visible:false,
      visibleType: 'add',
      id:'',
      provinceSelected:{
        name:''
      },
      citySelected:{
        name:''
      },
      districtSelected:{
        name:''
      }
    }
  }

  componentDidMount() {
    this.init();
    this.props.dispathGetProvince({}).then(res => {
      this.setState({
        Province: res
      })
    });
  }

  init() {
    this.props.dispathGetAddress({pageSize: 1000}).then(res => {
      this.setState({
        loaded:true,
        list:res.list
      })
    })
  }

  onDelete = item => {
    Taro.showModal({
      title:'确认删除该地址？'
    }).then(res => {
      if(res.confirm){
        this.props.dispathDeteleAddress({
          ids:item.id
        }).then(e => {
          Taro.showToast({
            title: '删除成功！'
          });
          this.init();
        });
      }
    })
  }
  onClose = () => {
    this.setState({
      visible:false,
      phone:'',
      realname:'',
      address:'',
      provinceSelected:{
        name:''
      },
      citySelected:{
        name:''
      },
      districtSelected:{
        name:''
      }
    })
  }
  onAdd = () => {
    this.setState({
      visible:true,
      visibleType:'add',
      phone:'',
      realname:'',
      address:'',
      provinceSelected:{
        name:''
      },
      citySelected:{
        name:''
      },
      districtSelected:{
        name:''
      }
    })
  }
  onSave = () => {
    const { visibleType } = this.state;
    let payload = {
      province_id: this.state.provinceSelected.id,
      city_id: this.state.citySelected.id,
      district_id: this.state.districtSelected.id,
      phone: this.state.phone,
      realname: this.state.realname,
      address: this.state.address,
    }
    console.log(payload);
    if(visibleType === 'add'){
      this.props.dispathSaveAddress(payload).then(res => {
        this.onClose();
        Taro.showToast({title:'添加成功'});
        this.init();
      });
    }else{
      payload.id = this.state.id;
      this.props.dispathUpdateAddress(payload).then(res => {
        this.onClose();
        Taro.showToast({title:'修改成功'});
        this.init();
      });
    }
  }

  setDefault = item => {

    const payload = {
      ...item,
      status: 2
    }
    this.props.dispathUpdateAddress(payload).then(res => {
      this.init();
    })
  }

  onUpdate = (item) => {
    this.setState({
      visible:true,
      visibleType: 'edit',
      id:item.id,
      phone:item.phone,
      realname:item.realname,
      address:item.address,
      provinceSelected:{
        name:item.province,
        id:item.province_id
      },
      citySelected:{
        name:item.city,
        id:item.city_id
      },
      districtSelected:{
        name:item.district,
        id:item.district_id
      }
    },() => {
      this.getCity(item.province_id)
      this.getDistrict(item.city_id)
    })
  }

  PickerChange = (val,type) => {
    const {Province, City, District} = this.state;
    const index = val.detail.value;
    let value;
    if(type === 1){
      value = Province[index]
      this.getCity(value.id);
      this.setState({
        provinceSelected: value,
      })
    }
    if(type === 2){
      value = City[index]
      this.setState({
        citySelected: value,
      })
      this.getDistrict(value.id)
    }
    if(type === 3){
      value = District[index]
        this.setState({
          districtSelected: value,
        })
    }
  }
  getCity = (id) => {
    this.props.dispathGetCity({
      province_id: id
    }).then(res => {
      this.setState({
        City:res
      })
    });
  }
  getDistrict = id => {
    this.props.dispathGetDistrict({
      city_id: id
    }).then(res => {
      this.setState({
        District:res
      })
    });
  }

  onSelectAddress = index => {
    if(this.$router.params.url === 'pages/order/order'){
      console.log(this.props);
      this.props.dispathSelectAddress({
        index
      });
      Taro.navigateBack();
    }
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
              list.map((item,index) => (
              <View className='addressBoxs' key={item.id} >
                <View className="content" onClick={() => this.onSelectAddress(index)}>
                  <View className="name">
                    <Text >{`${item.realname}    ${item.phone}`}</Text>
                  </View>
                  <View className="city">
                    <Text > {`${item.province} ${item.city} ${item.district} ${item.address} `}</Text>
                  </View>
                </View>
                <View className='tool'>
                  <CheckboxGroup onChange={() => this.setDefault(item)}>
                    <Checkbox value='选中' checked={item.status === '2'} disabled={item.status === '2'} >{item.status === '2' ? '已设为默认':'设为默认'}</Checkbox>
                  </CheckboxGroup>
                    <View className='bj'>
                    <Text onClick={() => this.onUpdate(item)}>编辑</Text>
                    <Text onClick={() => this.onDelete(item)}>删除</Text>
                  </View>
                </View>
              </View>
            ))
          }
          <View className='add'>
            <View className="add-btn" onClick={() => this.onAdd()}> 添加地址 </View>
          </View>
          {
            this.state.visible ? <View className='pageModal'>
              <View className='modal-body'>
                <View className="body-header">
                  <Text>添加地址</Text>
                </View>
                <View className='name'>
                  <View className='names'>
                    <Input type='text' className='input' placeholder='姓名' onChange={v => this.setState({realname: v.target.value})}  value={this.state.realname} />
                  </View>
                  <View className='names'>
                    <Input type='text'  className='input' placeholder='电话'  onChange={v => this.setState({phone: v.target.value})}  value={this.state.phone} />
                  </View>
                </View>
                <View className='name pickers'>
                  <Picker className='pickers_item' mode='selector' range={this.state.Province.map(item => item.name)} onChange={v => this.PickerChange(v,1)}>
                    <View className='picker'>
                      {this.state.provinceSelected.name === '' ? '请选择省': this.state.provinceSelected.name }
                    </View>
                  </Picker>
                  <Picker className='pickers_item' mode='selector' range={this.state.City.map(item => item.name)} onChange={v => this.PickerChange(v,2)}>
                    <View className='picker'>
                      {this.state.citySelected.name === '' ? '请选择市': this.state.citySelected.name }
                    </View>
                  </Picker>
                  <Picker className='pickers_item' mode='selector' range={this.state.District.map(item => item.name)} onChange={v => this.PickerChange(v,3)}>
                    <View className='picker'>
                      {this.state.districtSelected.name === '' ? '请选择区': this.state.districtSelected.name }
                    </View>
                  </Picker>
                </View>
                <View className='name'>
                  <Input type='text'  className='input' placeholder='请输入详细地址' onChange={v => this.setState({address: v.target.value})}  value={this.state.address} />
                </View>
                <View className="btns">
                  <View className="btn save">
                    <Button className='btn-1' onClick={this.onSave}>保存</Button>
                  </View>
                  <View className="btn close">
                    <Button className='btn-1' onClick={this.onClose}>取消</Button>
                  </View>
                </View>
              </View>
            </View> : null
          }
        </ScrollView>
      </View>
    )
  }
}

export default Item
