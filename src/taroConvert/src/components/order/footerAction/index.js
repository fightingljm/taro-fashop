import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderButton from '../button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderInfo: null,
    orderState: null,
    showReceiveBtn: false,
    showCancelBtn: false,
    showDelBtn: false,
    showEvaluateBtn: false,
    showPayBtn: false,
    showLogisticsBtn: false
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = () => {
    this.triggerEvent('click', { orderId: this.data.orderId })
  }
  onCancel = () => {
    this.triggerEvent('cancel', { orderId: this.data.orderId })
  }
  onReceive = () => {
    this.triggerEvent('receive', { orderInfo: this.data.orderInfo })
  }
  onPay = () => {
    this.triggerEvent('pay', { orderInfo: this.data.orderInfo })
  }
  onEvaluate = () => {
    this.triggerEvent('evaluate', { orderInfo: this.data.orderInfo })
  }
  onLogistics = () => {
    this.triggerEvent('logistics', { orderId: this.data.orderId })
  }
  config = {
    component: true
  }

  render() {
    const {
      orderInfo: orderInfo,
      orderState: orderState,
      showReceiveBtn: showReceiveBtn,
      showCancelBtn: showCancelBtn,
      showDelBtn: showDelBtn,
      showEvaluateBtn: showEvaluateBtn,
      showPayBtn: showPayBtn,
      showLogisticsBtn: showLogisticsBtn
    } = this.props
    const {} = this.state
    return (
      <View className="order-footer-action">
        <View className="footer">
          <View className="left">
            {/* <block wx:if="{{showDelBtn === true}}"> */}
            {/* <view class="del-action">删除订单</view> */}
            {/* </block> */}
          </View>
          <View className="right">
            {showCancelBtn === true && (
              <Block>
                <OrderButton text="取消订单" onClick={this.onCancel} />
              </Block>
            )}
            {showPayBtn === true && (
              <Block>
                <OrderButton text="去支付" type="danger" onClick={this.onPay} />
              </Block>
            )}
            {showReceiveBtn === true && (
              <Block>
                <OrderButton
                  text="确认收货"
                  type="danger"
                  onClick={this.onReceive}
                />
              </Block>
            )}
            {showEvaluateBtn === true && (
              <Block>
                <OrderButton text="评价" onClick={this.onEvaluate} />
              </Block>
            )}
            {showLogisticsBtn === true && (
              <Block>
                <OrderButton text="查看物流" onClick={this.onLogistics}>
                  查看物流
                </OrderButton>
              </Block>
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
