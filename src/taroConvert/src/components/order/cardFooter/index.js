import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaDialog from '../../../ui/dialog/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderInfo: null,
    orderId: null,
    goodsNumber: null,
    totalCost: null,
    showEvaluateBtn: false,
    showPayBtn: false,
    showReceiveBtn: false,
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
      orderId: orderId,
      goodsNumber: goodsNumber,
      totalCost: totalCost,
      showEvaluateBtn: showEvaluateBtn,
      showPayBtn: showPayBtn,
      showReceiveBtn: showReceiveBtn,
      showLogisticsBtn: showLogisticsBtn
    } = this.props
    const { showCancelBtn: showCancelBtn } = this.state
    return (
      <View className="order-card-footer">
        <View className="header">
          <Text className="number">{'共' + goodsNumber + '件商品'}</Text>
          <Text className="price-desc">实付款：</Text>
          <Text className="price">{'¥' + totalCost}</Text>
        </View>
        {(showCancelBtn ||
          showEvaluateBtn ||
          showPayBtn ||
          showReceiveBtn ||
          showLogisticsBtn) && (
          <View className="footer">
            {showCancelBtn === true && (
              <Block>
                <View className="btn" onClick={this.onCancel}>
                  取消
                </View>
              </Block>
            )}
            {showEvaluateBtn === true && (
              <Block>
                <View className="btn btn-danger" onClick={this.onEvaluate}>
                  评价
                </View>
              </Block>
            )}
            {showPayBtn === true && (
              <Block>
                <View className="btn btn-danger" onClick={this.onPay}>
                  去支付
                </View>
              </Block>
            )}
            {showReceiveBtn === true && (
              <Block>
                <View className="btn btn-danger" onClick={this.onReceive}>
                  确认收货
                </View>
              </Block>
            )}
            {showLogisticsBtn === true && (
              <Block>
                <View className="btn" onClick={this.onLogistics}>
                  查看物流
                </View>
              </Block>
            )}
          </View>
        )}
      </View>
    )
  }
}

export default _C
