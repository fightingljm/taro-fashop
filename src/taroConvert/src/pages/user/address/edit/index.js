import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../../utils/fa.js'
import AddressModel from '../../../../models/address.js'
import AreaModel from '../../../../models/area.js'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module.js'

import FixedBottom from '../../../../components/common/fixedBottom/index'
import FaField from '../../../../ui/field/index'
import FaSwitch from '../../../../ui/switch/index'
import FaDialog from '../../../../ui/dialog/index'
import FaButton from '../../../../ui/btn/index'
import FaPanel from '../../../../ui/panel/index'
import './index.scss'
const addressModel = new AddressModel()
const areaModel = new AreaModel()
const Dialog = require('../../../../ui/dialog/dialog.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: null,
    truename: '',
    mobile_phone: '',
    type: '个人',
    area_id: '',
    address: '',
    is_default: 1,
    combine_detail: null,

    onLoaded: false,
    checked: true,
    areaList: []
  }

  async componentWillMount({ id }) {
    const areaCache = fa.cache.get('area_list_level2')
    const areaResult = areaCache
      ? areaCache
      : await areaModel.list({ level: 2 })
    const info = await addressModel.info({ id })
    this.setData({
      id,
      truename: info.truename,
      mobile_phone: info.phone,
      type: info.type,
      area_id: info.area_id,
      address: info.address,
      is_default: info.is_default,
      combine_detail: info.combine_detail,
      areaList: areaResult.list,
      onLoaded: true
    })
  }

  onAreaChange = e => {
    this.setData({
      area_id: e.detail.detail.ids[2]
    })
  }
  onTruenameChange = e => {
    this.setData({
      truename: e.detail.detail.value
    })
  }
  onMobilePhoneChange = e => {
    this.setData({
      mobile_phone: e.detail.detail.value
    })
  }
  onAddressChange = e => {
    this.setData({
      address: e.detail.detail.value
    })
  }
  onIsDefaultChange = e => {
    this.setData({
      is_default: e.detail.detail.checked ? 1 : 0
    })
  }
  onWechatAddressChoose = async () => {
    const self = this
    Taro.chooseAddress({
      success: async function(res) {
        const result = await areaModel.info({
          name: res.countyName
        })
        if (result !== false) {
          self.setData({
            combine_detail: `${result.items[0].name} ${result.items[1].name} ${
              result.items[2].name
            }`,
            area_id: result.items[2].id,
            truename: res.userName,
            mobile_phone: res.telNumber,
            address: res.detailInfo
          })
        } else {
          fa.toast.show({
            title: '微信数据未能匹配成功，请使用其他方式'
          })
        }
        self.setData({
          truename: res.userName,
          mobile_phone: res.telNumber,
          address: res.detailInfo
        })
      }
    })
  }
  onDelete = async () => {
    Dialog({
      message: '您确认删除吗？一旦删除不可恢复',
      selector: '#fa-dialog-confirm',
      buttons: [
        {
          text: '取消',
          type: 'cancel'
        },
        {
          text: '确认',
          color: 'red',
          type: 'ok'
        }
      ]
    }).then(async ({ type }) => {
      if (type === 'ok') {
        const result = await addressModel.del({
          id: this.data.id
        })
        if (result === false) {
          fa.toast.show({
            title: fa.code.parse(addressModel.getException().getCode())
          })
        } else {
          Taro.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
  onSubmit = async () => {
    if (!this.data.truename) {
      return fa.toast.show({ title: '请输入姓名' })
    }
    if (!this.data.mobile_phone) {
      return fa.toast.show({ title: '请输入手机号' })
    }
    if (!this.data.area_id) {
      return fa.toast.show({ title: '请选择所在地区' })
    }
    if (!this.data.address) {
      return fa.toast.show({ title: '请填写楼栋楼层或房间号信息' })
    }
    let data = {
      id: this.data.id,
      truename: this.data.truename,
      mobile_phone: this.data.mobile_phone,
      address: this.data.address,
      is_default: this.data.is_default,
      type: this.data.type,
      area_id: this.data.area_id
    }

    const result = await addressModel.edit(data)
    if (result === false) {
      fa.toast.show({
        title: fa.code.parse(addressModel.getException().getCode())
      })
    } else {
      Taro.navigateBack({
        delta: 1
      })
    }
  }
  config = {
    navigationBarTitleText: '编辑收货地址'
  }

  render() {
    const {
      onLoaded: onLoaded,
      truename: truename,
      mobile_phone: mobile_phone,
      areaList: areaList,
      combine_detail: combine_detail,
      address: address,
      is_default: is_default
    } = this.state
    return (
      <Block>
        <View style="background-color:#F8F8F8;display: block;overflow: hidden">
          {onLoaded === true && (
            <FaPanel>
              <FaField
                title="收货人："
                placeholder="请输入姓名"
                focus="true"
                value={truename}
                onChange={this.onTruenameChange}
              />
              <FaField
                title="联系方式："
                inputType="number"
                maxlength="11"
                placeholder="请输入手机号"
                value={mobile_phone}
                onChange={this.onMobilePhoneChange}
              />
              <FaField
                title="所在地区："
                type="area"
                areaList={areaList}
                areaNames={combine_detail}
                onChange={this.onAreaChange}
              />
              <FaField
                title="详细地址："
                value={address}
                placeholder="填写楼栋楼层或房间号信息"
                onChange={this.onAddressChange}
              />
              <FaField
                title="设置默认地址："
                desc="注：每次下单时会使用该地址"
                type="switch"
                right="true"
                checked={is_default}
                onChange={this.onIsDefaultChange}
              />
            </FaPanel>
          )}
          <View
            className="choice-wechat-address"
            onClick={this.onWechatAddressChoose}
          >
            <Image
              src={require('../../../../themes/default/user/address/wechat.png')}
              mode="aspectFill"
            />
            <Text>使用微信收货地址</Text>
          </View>
          <FixedBottom>
            <View className="button-area">
              <FaButton size="large" onBtnclick={this.onDelete}>
                删除地址
              </FaButton>
              <FaButton type="danger" size="large" onBtnclick={this.onSubmit}>
                保存
              </FaButton>
            </View>
          </FixedBottom>
          {/* <view>在个人中心设置的时候语言要变，或者是把这俩封装成组件 完全分离</view> */}
        </View>
        <FaDialog id="fa-dialog-confirm" />
      </Block>
    )
  }
}

export default _C
