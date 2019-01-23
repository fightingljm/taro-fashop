import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import AddressModel from '../../../models/address.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import FixedBottom from '../../../components/common/fixedBottom/index'
import AddressCard from '../../../components/address/card/index'
import FaButton from '../../../ui/btn/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'
const addressModel = new AddressModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    page: 1,
    rows: 10,
    noMore: false,
    list: []
  }

  async componentDidShow() {
    this.setData({
      page: 1
    })
    this.getList()
  }

  getList = async () => {
    const page = this.data.page
    if (page > 1 && this.data.noMore === true) {
      return
    }
    const rows = this.data.rows
    const list = page === 1 ? [] : this.data.list
    const result = await addressModel.list({
      page,
      rows
    })
    if (result) {
      let data = { page: page + 1 }
      if (result.list.length === 0) {
        data['noMore'] = true
      }
      data['list'] = list.concat(result.list)
      this.setData(data)
    }
  }
  onReachBottom = async () => {
    if (this.data.noMore === true) {
      return false
    } else {
      this.getList()
    }
  }
  onAddressChecked = e => {
    fa.cache.set('address_checked_id', e.detail.addressId)
    Taro.navigateBack({
      delta: 1
    })
  }
  goEdit = e => {
    Taro.navigateTo({
      url: '/pages/address/edit/index?id=' + e.currentTarget.dataset.id
    })
  }
  goAdd = () => {
    Taro.navigateTo({
      url: '/pages/address/add/index'
    })
  }
  config = {
    navigationBarTitleText: '收货地址'
  }

  render() {
    const { list: list } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden;margin-bottom:100px">
        <View>
          <FaPanel>
            {list.map((item, index) => {
              return (
                <Block key="key">
                  <AddressCard
                    name={item.truename}
                    phone={item.phone}
                    addressId={item.id}
                    address={item.combine_detail}
                    checked={item.is_default === 1}
                    data-index={index}
                    data-id={item.id}
                    onEdit={this.goEdit}
                    onChecked={this.onAddressChecked}
                  />
                </Block>
              )
            })}
          </FaPanel>
        </View>
        <FixedBottom>
          <FaButton size="large" onClick={this.goAdd}>
            + 新建地址
          </FaButton>
        </FixedBottom>
      </View>
    )
  }
}

export default _C
