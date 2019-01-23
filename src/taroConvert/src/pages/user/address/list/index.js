import { Block, View, Text, Icon, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../../utils/fa.js'
import AddressModel from '../../../../models/address.js'
import regeneratorRuntime from '../../../../libs/regenerator-runtime/runtime-module.js'

import FixedBottom from '../../../../components/common/fixedBottom/index'
import AddressCard from '../../../../components/address/card/index'
import FaDialog from '../../../../ui/dialog/index'
import FaButton from '../../../../ui/btn/index'
import FaPanel from '../../../../ui/panel/index'
import './index.scss'
const addressModel = new AddressModel()
const Dialog = require('../../../../ui/dialog/dialog.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    page: 1,
    rows: 10,
    noMore: false,
    list: []
  }

  async componentDidShow() {
    this.initList()
  }

  initList = () => {
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
  onChecked = async e => {
    const result = await addressModel.setDefault({
      id: e.currentTarget.dataset.id
    })
    if (result) {
      this.initList()
    } else {
      fa.toast.show({
        title: fa.code.parse(addressModel.getException().getCode())
      })
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
  onEdit = e => {
    Taro.navigateTo({
      url: '/pages/user/address/edit/index?id=' + e.currentTarget.dataset.id
    })
  }
  onDelete = async e => {
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
          id: e.currentTarget.dataset.id
        })
        if (result) {
          this.initList()
        } else {
          fa.toast.show({
            title: fa.code.parse(addressModel.getException().getCode())
          })
        }
      }
    })
  }
  onAdd = () => {
    Taro.navigateTo({
      url: '/pages/user/address/add/index'
    })
  }
  config = {
    navigationBarTitleText: '收货地址'
  }

  render() {
    const { list: list } = this.state
    return (
      <Block>
        <View style="background-color:#F8F8F8;display: block;overflow: hidden;margin-bottom:100px">
          <View>
            {list.map((item, index) => {
              return (
                <Block key="key">
                  <FaPanel>
                    <View className="address-card">
                      <View className="info">
                        <View
                          className="user"
                          data-id={item.id}
                          onClick={this.onChecked}
                        >
                          <View className="name-phone">
                            <Text className="name">{item.truename}</Text>
                            <Text className="phone">{item.phone}</Text>
                          </View>
                          <View className="address">{item.address}</View>
                        </View>
                      </View>
                      <View className="action">
                        {item.is_default === 1 && (
                          <View className="checked" data-id={item.id}>
                            <Icon
                              className="weui-icon-radio"
                              type="success"
                              size="16"
                              color="red"
                            />
                            <Text>默认地址</Text>
                          </View>
                        )}
                        {item.is_default === 0 && (
                          <View
                            className="checked"
                            data-id={item.id}
                            onClick={this.onChecked}
                          >
                            <Icon
                              className="weui-icon-radio"
                              type="success"
                              size="16"
                              color="#ccc"
                            />
                            <Text>设为默认</Text>
                          </View>
                        )}
                        <View className="button-area">
                          <View
                            className="item"
                            data-id={item.id}
                            onClick={this.onEdit}
                          >
                            <Image
                              src={require('../../../../themes/default/user/address/edit.png')}
                              mode="aspectFill"
                            />
                            <Text className="edit">编辑</Text>
                          </View>
                          <View
                            className="item"
                            data-id={item.id}
                            onClick={this.onDelete}
                          >
                            <Image
                              src={require('../../../../themes/default/user/address/del.png')}
                              mode="aspectFill"
                            />
                            <Text className="edit">删除</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </FaPanel>
                </Block>
              )
            })}
          </View>
          <FixedBottom>
            <FaButton size="large" type="danger" onClick={this.onAdd}>
              + 新建地址
            </FaButton>
          </FixedBottom>
        </View>
        <FaDialog id="fa-dialog-confirm" />
      </Block>
    )
  }
}

export default _C
