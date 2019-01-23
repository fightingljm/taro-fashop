import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import GoodsEvaluateModel from '../../../models/goodsEvaluate.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import OrderCardButton from '../../../components/order/cardButton/index'
import EvaluateCard from '../../../components/evaluate/card/index'
import FaTab from '../../../ui/tab/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'
const goodsEvaluateModel = new GoodsEvaluateModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    page: 1,
    rows: 10,
    noMore: false,
    order_id: 0,
    evaluate_state: 'un_evaluate',
    stateTabs: [
      {
        id: 'un_evaluate',
        title: '待评价'
      },
      {
        id: 'is_evaluate',
        title: '已评价'
      }
    ],
    list: []
  }

  async componentWillMount({ order_id = 0, evaluate_state = 'un_evaluate' }) {
    if (order_id > 0) {
      this.setData({
        order_id,
        evaluate_state
      })
    }
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
    if (this.data.order_id > 0) {
      requestParam['order_id'] = this.data.order_id
    }
    requestParam['evaluate_state'] = this.data.evaluate_state

    const result = await goodsEvaluateModel.mine(requestParam)
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
  onGoods = e => {
    Taro.navigateTo({
      url: '/pages/goods/detail/index?id=' + e.detail.goodsId
    })
  }
  onDetail = e => {
    Taro.navigateTo({
      url:
        '/pages/evaluate/detail/index?order_goods_id=' + e.detail.orderGoodsId
    })
  }
  onAdd = e => {
    Taro.navigateTo({
      url: '/pages/evaluate/add/index?order_goods_id=' + e.detail.orderGoodsId
    })
  }
  onAdditional = e => {
    Taro.navigateTo({
      url:
        '/pages/evaluate/additional/index?order_goods_id=' +
        e.detail.orderGoodsId
    })
  }
  onTabChange = e => {
    this.setData({
      evaluate_state: e.detail,
      page: 1,
      list: []
    })
    this.getList()
  }
  updateListRow = async id => {
    let { list } = this.data
    const listIndex = list.findIndex(row => row.id === id)
    if (listIndex !== -1) {
      let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
      const result = await goodsEvaluateModel.mine(requestParam)
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
    navigationBarTitleText: '评价中心'
  }

  render() {
    const {
      stateTabs: stateTabs,
      evaluate_state: evaluate_state,
      list: list
    } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden">
        <FaTab
          list={stateTabs}
          selectedId={evaluate_state}
          height="40"
          fixed="true"
          onTabchange={this.onTabChange}
        />
        <View>
          {list.map((item, index) => {
            return (
              <Block key="key">
                <EvaluateCard
                  goodsInfo={item}
                  onGoods={this.onGoods}
                  onAdd={this.onAdd}
                  onDetail={this.onDetail}
                  onAdditional={this.onAdditional}
                />
              </Block>
            )
          })}
        </View>
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
