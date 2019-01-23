import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import TimeFormat from '../../common/timeFormat/index'
import CommonStaticCountdown from '../../common/staticCountdown/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null,
    orderState: null,
    expireTime: null,
    cost: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      refundInfo: refundInfo,
      orderState: orderState,
      expireTime: expireTime,
      cost: cost
    } = this.props
    const {} = this.state
    return (
      <Block>
        {/* 平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货) */}
        <View className="order-state-card">
          {refundInfo.is_close === 0 && refundInfo.handle_state === 0 && (
            <Block>
              <View className="left">
                <Text className="state">请等待商家处理</Text>
              </View>
              <View className="right">
                <Text>还剩</Text>
                <CommonStaticCountdown
                  countdown={refundInfo.handle_expiry_seconds}
                  format="dd天hh时mm分"
                />
              </View>
            </Block>
          )}
          {/* <block wx:if="{{refundInfo.handle_state === 20}}"> */}
          {/* <view class="left"> */}
          {/* <text class="state">订单关闭</text> */}
          {/* </view> */}
          {/* <view class="right"> */}
          {/* </view> */}
          {/* </block> */}
          {refundInfo.refund_type === 2 &&
            refundInfo.handle_state === 20 &&
            refundInfo.is_close === 0 &&
            refundInfo.send_expiry_time > 0 && (
              <Block>
                {!refundInfo.tracking_time && (
                  <Block>
                    <View className="left">
                      <Text className="state">请退货并填写物流信息</Text>
                    </View>
                    <View className="right">
                      <Text>还剩</Text>
                      <CommonStaticCountdown
                        countdown={refundInfo.send_expiry_seconds}
                        format="dd天hh时mm分"
                      />
                    </View>
                  </Block>
                )}
                {refundInfo.tracking_time > 0 && (
                  <Block>
                    <View className="left">
                      <Text className="state">等待商家确认收货中</Text>
                    </View>
                    <View className="right" />
                  </Block>
                )}
              </Block>
            )}
          {refundInfo.handle_state === 30 && (
            <Block>
              <View className="left">
                <Text className="state">退款成功</Text>
              </View>
              <View className="right">
                <Text>
                  <TimeFormat value={refundInfo.handle_time} />
                </Text>
              </View>
            </Block>
          )}
          {refundInfo.is_close === 1 && (
            <Block>
              <View className="left">
                <Text className="state">退款关闭</Text>
              </View>
              <View className="right">
                <Text>
                  <TimeFormat value={refundInfo.handle_time} />
                </Text>
              </View>
            </Block>
          )}
        </View>
      </Block>
    )
  }
}

export default _C
