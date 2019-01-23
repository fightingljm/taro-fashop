import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import OrderModel from '../../../models/order.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import BuyModel from '../../../models/buy.js'

import OrderContact from '../../../components/order/contact/index'
import OrderStateCard from '../../../components/order/stateCard/index'
import OrderGoodsList from '../../../components/order/goodsList/index'
import OrderLogistics from '../../../components/order/logistics/index'
import OrderFooterAction from '../../../components/order/footerAction/index'
import OrderCostList from '../../../components/order/costList/index'
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
const orderModel = new OrderModel()
const buyModel = new BuyModel()
const Dialog = require('../../../ui/dialog/dialog.js')

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: null,
    orderInfo: null,
    orderLog: null
  }

  async componentWillMount({ id }) {
    this.setData({
      id
    })
  }

  onRefund = e => {
    const orderInfo = this.data.orderInfo
    const { goodsInfo } = e.detail
    // 根据类型跳转到是退款还是退款退货  订单状态：0(已取消)10(默认):未付款;20:已付款;30:已发货;40:已收货;    多少天后不可退的业务逻辑
    if (orderInfo.state === 20) {
      // 直接跳转到申请发货
      Taro.navigateTo({
        url: `/pages/refund/serviceApply/index?order_goods_id=${
          goodsInfo.id
        }&refund_type=1`,
        delta: 1
      })
    } else if (orderInfo.state === 30 || orderInfo.state === 40) {
      // 选择是退款还是退款并退货
      Taro.navigateTo({
        url: `/pages/refund/serviceType/index?order_goods_id=${goodsInfo.id}`
      })
    }
  }
  onRefundDetail = e => {
    const { goodsInfo } = e.detail
    Taro.navigateTo({
      url: `/pages/refund/detail/index?id=${goodsInfo.refund_id}`
    })
  }

  async componentDidShow() {
    this.init()
  }

  init = async () => {
    const result = await orderModel.detail({ id: this.data.id })
    if (result) {
      this.setData({
        orderInfo: result.info,
        orderLog: result.order_log
      })
    }
  }
  onGoodsDetail = e => {
    const { goodsInfo } = e.detail
    Taro.navigateTo({
      url: `/pages/goods/detail/index?id=${goodsInfo.goods_id}`
    })
  }
  onCancel = async e => {
    const orderInfo = e.detail.orderInfo
    const result = await orderModel.cancel({
      id: orderInfo.id
    })
    if (result) {
      this.init()
      this.updateListRow(orderInfo.id)
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
          text: '确认',
          color: 'red',
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
          this.init()
          this.updateListRow(orderInfo.id)
        } else {
          fa.toast.show({
            title: fa.code.parse(orderModel.getException().getCode())
          })
        }
      }
    })
  }
  onPay = async () => {
    const userInfo = fa.cache.get('user_info')
    const orderInfo = this.data.orderInfo
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
          self.init()
          self.updateListRow()
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
  updateListRow = () => {
    const { id } = this.data
    if (id > 0) {
      const pages = Taro.getCurrentPages()
      const prevPage = pages[pages.length - 2]
      prevPage.updateListRow(id)
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
    navigationBarTitleText: '订单详情'
  }

  render() {
    const { orderInfo: orderInfo, serviceNumber: serviceNumber } = this.state
    return (
      <Block>
        {orderInfo && (
          <View style="background-color:#F8F8F8;display: block;overflow: hidden">
            <FaPanel>
              <OrderStateCard
                orderState={orderInfo.state}
                expireSeconds="1000"
                cost={orderInfo.amount}
              />
              <OrderAddress
                name={orderInfo.extend_order_extend.reciver_name}
                phone={orderInfo.extend_order_extend.receiver_phone}
                address={orderInfo.extend_order_extend.reciver_name}
              />
            </FaPanel>
            <FaPanel>
              <OrderGoodsList
                orderInfo={orderInfo}
                goodsList={orderInfo.extend_order_goods}
                onGoods-detail={this.onGoodsDetail}
                onGoods-refund-click={this.onRefund}
                onGoods-refund-detail={this.onRefundDetail}
              />
              <OrderContact number={serviceNumber} />
            </FaPanel>
            <FaPanel>
              <OrderBaseInfo
                orderInfo={orderInfo}
                orderNumber={orderInfo.sn}
                createTime={orderInfo.create_time}
                payment="微信支付"
                payTime={orderInfo.payment_time}
              />
            </FaPanel>
            <FaPanel>
              <OrderCostList
                goodsTotal={orderInfo.goods_amount}
                freight={orderInfo.freight_fee}
                totalCost={orderInfo.amount}
              />
              <OrderFooterAction
                orderInfo={orderInfo}
                orderState={orderInfo.state}
                showDelBtn="false"
                showEvaluateBtn={orderInfo.if_evaluate}
                showPayBtn={orderInfo.if_pay}
                showLogisticsBtn={
                  orderInfo.state === 30 || orderInfo.state === 40
                }
                showReceiveBtn={orderInfo.if_receive}
                onPay={this.onPay}
                onReceive={this.onReceive}
                onCancel={this.onCancel}
                onEvaluate={this.onEvaluate}
                onLogistics={this.onLogistics}
              />
            </FaPanel>
          </View>
        )}
        <FaDialog id="fa-dialog-receive" />
      </Block>
    )
  }
}

export default _C
