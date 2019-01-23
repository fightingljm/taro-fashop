import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderState: null,
    expireSeconds: null,
    cost: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  ready = () => {
    this.setData({
      timeText: this.toHourMinute(this.data.expireSeconds)
    })
  }
  toHourMinute = seconds => {
    return (
      Math.floor(seconds / 3600) +
      '小时' +
      Math.floor((seconds % 3600) / 60) +
      '分'
    )
  }
  config = {
    component: true
  }

  render() {
    const {
      orderState: orderState,
      expireSeconds: expireSeconds,
      cost: cost
    } = this.props
    const {} = this.state
    return (
      <Block>
        {orderState === 40 && (
          <Block>
            <View className="noticebar">
              <Image
                src={require('../../../themes/default/order/horn.png')}
                mode="widthFix"
              />
              <Text>
                为了您的财产安全，不要点击陌生链接、不要向任何人透露银行卡或验证码信息、谨防诈骗！
              </Text>
            </View>
          </Block>
        )}
        <View className="order-state-card">
          {orderState === 10 ? (
            <Block>
              <View className="left">
                <Image
                  src={require('../../../themes/default/order/order-state-wait.png')}
                  mode="scaleToFill"
                />
                <Text className="state">待付款</Text>
              </View>
              <View className="right">
                {/* <text>剩余：{{timeText}}</text> */}
                <Label>{'需付款：¥' + cost}</Label>
              </View>
            </Block>
          ) : orderState === 20 ? (
            <Block>
              <View className="left">
                <Image
                  src={require('../../../themes/default/order/order-state-wait.png')}
                  mode="scaleToFill"
                />
                <Text className="state">待发货</Text>
              </View>
              <View className="right" />
            </Block>
          ) : orderState === 30 ? (
            <Block>
              <View className="left">
                <Image
                  src={require('../../../themes/default/order/order-state-wait.png')}
                  mode="scaleToFill"
                />
                <Text className="state">待收货</Text>
              </View>
              <View className="right">
                {/* <text>圆通快递</text> */}
                {/* <label>预计5月18日送达</label> */}
              </View>
            </Block>
          ) : (
            orderState === 40 && (
              <Block>
                <View className="left">
                  <Image
                    src={require('../../../themes/default/order/order-state-success.png')}
                    mode="scaleToFill"
                  />
                  <Text className="state">完成</Text>
                </View>
                <View className="right" />
              </Block>
            )
          )}
        </View>
      </Block>
    )
  }
}

export default _C
