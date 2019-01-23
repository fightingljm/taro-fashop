import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import RefundModel from '../../../models/refund.js'

import RefundCard from '../../../components/refund/card/index'
import CommonCountdown from '../../../components/common/countdown/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'
const refundModel = new RefundModel()

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
    let requestParam = { page, rows }

    const result = await refundModel.list(requestParam)
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
  onDetail = e => {
    Taro.navigateTo({
      url: '/pages/refund/detail/index?id=' + e.detail.refundInfo.id
    })
  }
  updateListRow = async id => {
    let { list } = this.data
    const listIndex = list.findIndex(row => row.id === id)
    if (listIndex !== -1) {
      let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
      const result = await refundModel.list(requestParam)
      if (result) {
        if (result.list.length === 0) {
          list = list.splice(listIndex, 1)
        } else {
          list[listIndex] = result.list[0]
        }
        this.setData({ list })
      }
    }
  }
  config = {
    navigationBarTitleText: '退款/售后'
  }

  render() {
    const { list: list } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden">
        {list.map((item, index) => {
          return (
            <Block key="key">
              <FaPanel>
                <RefundCard refundInfo={item} onClick={this.onDetail} />
              </FaPanel>
            </Block>
          )
        })}
        {list.length === 0 && (
          <Block>
            <View className="list-empty">
              <Image
                src={require('../../../themes/default/order/list-empty.png')}
                mode="aspectFill"
              />
              <Text>暂无相关数据</Text>
            </View>
          </Block>
        )}
      </View>
    )
  }
}

export default _C
