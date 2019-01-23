import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import CartModel from '../../../models/cart.js'
import BuyModel from '../../../models/buy.js'
import AddressModel from '../../../models/address.js'

import FaCellGroup from '../../../ui/cell-group/index'
import CartOrderFillCard from '../../../components/cart/orderFillCard/index'
import FaCell from '../../../ui/cell/index'
import FaPanel from '../../../ui/panel/index'
import FaButton from '../../../ui/btn/index'
import FixedBottom from '../../../components/common/fixedBottom/index'
import './index.scss'
const cartModel = new CartModel()
const buyModel = new BuyModel()
const addressModel = new AddressModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    delta: 1,
    way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
    calculate: null,
    cartList: [],
    cartIds: [],
    addressId: [],
    address: {},
    message: null,
    payState: false,
    total: 0
  }
  onMessageChange = e => {
    this.setData({
      message: e.detail.value
    })
  }
  goAddressAdd = () => {
    Taro.navigateTo({
      url: '/pages/address/add/index'
    })
  }
  goAddressList = () => {
    Taro.navigateTo({
      url: '/pages/address/list/index'
    })
  }

  async componentWillMount(options) {
    console.log(options)
    // 清空被选中，为了带过来列表返回的
    fa.cache.set('address_checked_id', null)
    let cartIds = JSON.parse(options.cart_ids)
    this.setData({
      cartIds
    })
    let way = 'cart'
    let delta = this.data.delta
    if (typeof options['way'] !== 'undefined' && options['way'] === 'buy_now') {
      way = 'buy_now'
      delta = 1
    } else {
      delta = 2
    }
    console.log(way)
    this.setData({
      cartIds,
      way,
      delta
    })
  }

  initCalculate = async () => {
    const cartIds = this.data.cartIds
    const calculate = await buyModel.calculate({
      cart_ids: cartIds,
      address_id: this.data.addressId
    })
    if (calculate) {
      this.setData({
        calculate
      })
    } else {
      fa.toast.show({
        title: fa.code.parse(buyModel.getException().getCode())
      })
    }
  }
  initAddress = async () => {
    let address = []
    if (this.data.addressId > 0) {
      address = await addressModel.info({
        id: this.data.addressId
      })
    } else {
      address = await addressModel.getDefault()
    }
    if (address) {
      this.setData({
        addressId: address.id,
        address
      })
      return address
    } else {
      return false
    }
  }

  async componentDidShow() {
    const payState = this.data.payState
    if (payState === false) {
      const addressId = fa.cache.get('address_checked_id')
      if (addressId > 0) {
        this.setData({ addressId })
      }
      const cartListState = await this.initCartList()
      if (cartListState === true) {
        const address = await this.initAddress()
        if (address.id > 0) {
          await this.initCalculate()
        }
      } else {
        fa.toast.show({
          title: '支付商品状态已变，请重新选择'
        })
        setTimeout(function() {
          Taro.navigateBack({ delta: this.data.delta })
        }, 1500)
      }
    }
  }

  initCartList = async () => {
    const cartIds = this.data.cartIds
    let checkedGoodsSkuInfoIds = []
    let checkedCartIds = []
    let total = 0
    const result = await cartModel.list({
      ids: cartIds
    })
    if (result.list.length > 0) {
      const cartList = result.list
      for (let i = 0; i < cartList.length; i++) {
        total +=
          parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
        cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function(
          item
        ) {
          return `${item.name}:${item.value_name}`
        })
      }
      this.setData({
        checkedCartIds,
        checkedGoodsSkuInfoIds,
        cartList,
        total
      })
      return true
    } else {
      return false
    }
  }
  onCreateOrder = async () => {
    const self = this
    if (!this.data.addressId) {
      fa.toast.show({
        title: '请选择收货地址'
      })
      return
    }
    const result = await buyModel.create({
      way: this.data.way,
      address_id: this.data.addressId,
      cart_ids: this.data.cartIds,
      message: this.data.message
    })
    const userInfo = fa.cache.get('user_info')
    if (result) {
      // 支付modal也算onShow 这儿临时限制下
      this.setData({
        payState: true
      })
      const pay_amount = this.data.calculate.pay_amount
      // 发起支付，未填写openid是因为本次开发小程序为必须微信授权登陆
      const payResult = await buyModel.pay({
        order_type: 'goods_buy',
        pay_sn: result.pay_sn,
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
            Taro.redirectTo({
              url: `/pages/pay/result/index?pay_amount=${pay_amount}&order_id=${
                result.order_id
              }&pay_sn=${result.pay_sn}`
            })
          },
          fail: function(res) {
            fa.toast.show({
              title: '支付被取消'
            })
            setTimeout(function() {
              Taro.redirectTo({
                url: `/pages/order/detail/index?id=${result.order_id}`
              })
            }, 1000)
          }
        })
      } else {
        fa.toast.show({
          title: '支付失败：' + fa.code.parse(buyModel.getException().getCode())
        })
        Taro.navigateBack({ delta: self.data.delta })
      }
    } else {
      fa.toast.show({
        title: +fa.code.parse(buyModel.getException().getCode())
      })
    }
  }
  config = {
    navigationBarTitleText: '提交订单'
  }

  render() {
    return <View />
  }
}

export default _C
