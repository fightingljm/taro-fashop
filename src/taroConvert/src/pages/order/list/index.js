import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import OrderModel from '../../../models/order.js'
import BuyModel from '../../../models/buy.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import OrderStateCard from '../../../components/order/stateCard/index'
import OrderLogistics from '../../../components/order/logistics/index'
import OrderFooterAction from '../../../components/order/footerAction/index'
import OrderCostList from '../../../components/order/costList/index'
import OrderCardContact from '../../../components/order/contact/index'
import OrderCardHeader from '../../../components/order/cardHeader/index'
import OrderCardGoods from '../../../components/order/cardGoods/index'
import OrderCardFooter from '../../../components/order/cardFooter/index'
import OrderCardButton from '../../../components/order/cardButton/index'
import OrderCard from '../../../components/order/card/index'
import OrderBaseInfo from '../../../components/order/baseInfo/index'
import OrderAddress from '../../../components/order/address/index'
import FaDialog from '../../../ui/dialog/index'
import FaTab from '../../../ui/tab/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'
const Dialog = require('../../../ui/dialog/dialog.js')
const orderModel = new OrderModel()
const buyModel = new BuyModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    page: 1,
    rows: 10,
    noMore: false,
    orderStateTabs: [
      {
        id: 'all',
        title: '全部'
      },
      {
        id: 'state_new',
        title: '待付款'
      },
      {
        id: 'state_pay',
        title: '待发货'
      },
      {
        id: 'state_send',
        title: '待收货'
      },
      {
        id: 'state_success',
        title: '已完成'
      }
    ],
    list: [],
    state_type: 'all'
  }

  async componentWillMount({ state_type = 'all' }) {
    this.setData({
      state_type
    })
  }

  componentDidShow() {
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
    if (this.data.state_type !== 'all') {
      requestParam['state_type'] = this.data.state_type
    }
    const result = await orderModel.list(requestParam)
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
  goDetail = e => {
    Taro.navigateTo({
      url: '/pages/order/detail/index?id=' + e.detail.orderId
    })
  }
  onTabChange = e => {
    this.setData({
      state_type: e.detail,
      page: 1,
      list: []
    })
    this.getList()
  }
  onCancel = async e => {
    const orderInfo = e.detail.orderInfo
    const result = await orderModel.cancel({
      id: orderInfo.id
    })
    if (result) {
      this.getList()
    } else {
      fa.toast.show({
        title: fa.code.parse(orderModel.getException().getCode())
      })
    }
  }
  onEvaluate = e => {
    const orderInfo = e.detail.orderInfo
    Taro.navigateTo({
      url: '/pages/evaluate/list/index?order_id=' + orderInfo.id
    })
  }
  onReceive = async e => {
    Dialog({
      message: '您确认收货吗？状态修改后不能变更',
      selector: '#fa-dialog-receive',
      buttons: [
        {
          text: '取消',
          type: 'cancel'
        },
        {
          // 按钮文案
          text: '确认',
          // 按钮文字颜色
          color: 'red',
          // 按钮类型，用于在 then 中接受点击事件时，判断是哪一个按钮被点击
          type: 'ok'
        }
      ]
    }).then(async ({ type }) => {
      if (type === 'ok') {
        const orderInfo = e.detail.orderInfo
        const result = await orderModel.confirmReceipt({
          id: orderInfo.id
        })
        if (result) {
          this.updateListRow(orderInfo.id)
        } else {
          fa.toast.show({
            title: fa.code.parse(orderModel.getException().getCode())
          })
        }
      }
    })
  }
  onPay = async e => {
    const userInfo = fa.cache.get('user_info')
    const orderInfo = e.detail.orderInfo
    const self = this
    // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
    const payResult = await buyModel.pay({
      order_type: 'goods_buy',
      pay_sn: orderInfo.pay_sn,
      payment_code: 'wechat',
      payment_channel: 'wechat_mini',
      openid: userInfo.wechat_mini_openid
    })
    if (payResult) {
      Taro.requestPayment({
        timeStamp: payResult.timeStamp,
        nonceStr: payResult.nonceStr,
        package: payResult.package,
        signType: payResult.signType,
        paySign: payResult.paySign,
        success: function() {
          self.setData({
            page: 1
          })
          this.updateListRow(orderInfo.id)
        },
        fail: function(res) {
          fa.toast.show({
            title: res
          })
        }
      })
    } else {
      fa.toast.show({
        title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
      })
    }
  }
  updateListRow = async id => {
    let { list } = this.data
    const listIndex = list.findIndex(row => row.id === id)
    if (listIndex !== -1) {
      let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
      const result = await orderModel.list(requestParam)
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
  onLogistics = async e => {
    const result = await orderModel.logistics({
      id: e.detail.orderId
    })
    if (result) {
      // 跳转
      // const url = encodeURIComponent("https://m.kuaidi100.com/index_all.html?type=emsguoji&postid=BE960265852US");
      const url = encodeURIComponent(result.info.url)
      Taro.navigateTo({
        url: `/pages/webView/index?url=${url}`
      })
    } else {
      fa.toast.show({
        title: fa.code.parse(orderModel.getException().getCode())
      })
    }
  }
  config = {
    navigationBarTitleText: '我的订单'
  }

  render() {
    const {
      orderStateTabs: orderStateTabs,
      state_type: state_type,
      list: list
    } = this.state
    return (
      <Block>
        <View style="background-color:#F8F8F8;display: block;overflow: hidden">
          <FaTab
            list={orderStateTabs}
            selectedId={state_type}
            height="40"
            fixed="true"
            onTabchange={this.onTabChange}
          />
          <View>
            {list.map((item, index) => {
              return (
                <Block key="key">
                  <FaPanel>
                    <OrderCard>
                      <OrderCardHeader
                        orderId={item.id}
                        state={item.state}
                        sn={item.sn}
                      />
                      <OrderCardGoods
                        orderId={item.id}
                        goodsList={item.extend_order_goods}
                        onClick={this.goDetail}
                      />
                      <OrderCardFooter
                        orderInfo={item}
                        orderId={item.id}
                        goodsNumber={item.goods_num}
                        totalCost={item.amount}
                        showEvaluateBtn={item.if_evaluate}
                        showPayBtn={item.if_pay}
                        showReceiveBtn={item.if_receive}
                        showLogisticsBtn={
                          item.state === 30 || item.state === 40
                        }
                        onPay={this.onPay}
                        onReceive={this.onReceive}
                        onCancel={this.onCancel}
                        onEvaluate={this.onEvaluate}
                        onLogistics={this.onLogistics}
                      />
                    </OrderCard>
                  </FaPanel>
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
        <FaDialog id="fa-dialog-receive" />
      </Block>
    )
  }
}

export default _C
