import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderInfo: null,
    orderId: null,
    state: null,
    sn: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onDelete = () => {
    this.triggerEvent('delete')
  }
  onClick = e => {
    this.triggerEvent('click', { orderId: this.data.orderId })
  }
  onPay = () => {
    this.triggerEvent('pay', { orderInfo: this.data.orderInfo })
  }
  config = {
    component: true
  }

  render() {
    const {
      orderInfo: orderInfo,
      orderId: orderId,
      state: state,
      sn: sn
    } = this.props
    const {} = this.state
    return (
      <View className="order-card-header">
        <View className="left">
          <Text>{'单号：' + sn}</Text>
        </View>
        <View className="right">
          {state === 0 && (
            <Block>
              <Span className="state state-0">已取消</Span>
            </Block>
          )}
          {state === 10 && (
            <Block>
              <Span className="state state-10">等待付款</Span>
              {/* <image class="del-icon" src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg" mode="scaleToFill"></image> */}
            </Block>
          )}
          {state === 20 && (
            <Block>
              <Span className="state state-20">待发货</Span>
            </Block>
          )}
          {state === 30 && (
            <Block>
              <Span className="state state-30">已发货</Span>
            </Block>
          )}
          {state === 40 && (
            <Block>
              <Span className="state state-40">已完成</Span>
            </Block>
          )}
        </View>
      </View>
    )
  }
}

export default _C
