import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaButton from '../../../ui/btn/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    orderId: null,
    paySn: null,
    payAmount: null,
    showBottomPopup: true
  }

  componentWillMount({ order_id, pay_sn, pay_amount }) {
    this.setData({
      orderId: order_id,
      paySn: pay_sn,
      payAmount: pay_amount
    })
  }

  goPortal = () => {
    Taro.switchTab({
      url: '/pages/index/index'
    })
  }
  goDetail = () => {
    Taro.redirectTo({
      url: '/pages/order/detail/index?id=' + this.data.orderId
    })
  }
  config = {
    navigationBarTitleText: '支付成功'
  }

  render() {
    const { payAmount: payAmount } = this.state
    return (
      <View className="pay-result">
        <View className="result">
          <Image
            className="icon"
            src={require('../../../themes/default/pay/pay-success.png')}
          />
          <Text className="desc">支付成功</Text>
          <Text className="price">{'¥' + payAmount}</Text>
          <Label className="way">微信支付</Label>
        </View>
        <View className="button-area">
          <FaButton className="portal" type="danger" onBtnclick={this.goPortal}>
            返回首页
          </FaButton>
          <FaButton
            className="order-detail"
            plain="true"
            type="danger"
            onBtnclick={this.goDetail}
          >
            查看订单
          </FaButton>
        </View>
      </View>
    )
  }
}

export default _C
