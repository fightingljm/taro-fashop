import { Block, View, Label, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import TimeFormat from '../../common/timeFormat/index'
import OrderButton from '../button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderInfo: null,
    orderNumber: null,
    createTime: null,
    payTime: null,
    payment: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  setClipboardData = () => {
    Taro.setClipboardData({
      data: `${this.data.orderNumber}`
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      orderInfo: orderInfo,
      orderNumber: orderNumber,
      createTime: createTime,
      payTime: payTime,
      payment: payment
    } = this.props
    const {} = this.state
    return (
      orderInfo && (
        <View className="order-base-info">
          <View className="item">
            <View className="row">
              <Label>订单编号：</Label>
              <Text>{orderNumber}</Text>
              <OrderButton
                text="复制"
                size="small"
                onClick={this.setClipboardData}
              />
            </View>
            <View className="row">
              <Label>下单时间：</Label>
              <TimeFormat className="time" value={orderInfo.create_time} />
            </View>
          </View>
          {payTime > 0 && (
            <View className="item">
              <View className="row">
                <Label>支付方式：</Label>
                <Text>{payment}</Text>
              </View>
              <View className="row">
                <Label>支付时间：</Label>
                <TimeFormat className="time" value={payTime} />
              </View>
            </View>
          )}
        </View>
      )
    )
  }
}

export default _C
