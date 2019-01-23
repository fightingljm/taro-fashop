import { Block, View, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Time from '../../../utils/time.js'
import RefundSteps from '../stateSteps/index'
import OrderButton from '../../order/button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onUndo = () => {
    this.triggerEvent('undo', { refundInfo: this.data.refundInfo })
  }
  onTrack = () => {
    this.triggerEvent('track', { refundInfo: this.data.refundInfo })
  }
  config = {
    component: true
  }

  render() {
    const { refundInfo: refundInfo } = this.props
    const { steps: steps } = this.state
    return (
      <View className="order-state-reason">
        {refundInfo.is_close === 0 && refundInfo.handle_state === 0 && (
          <Block>
            <View className="header">
              <Text className="state">
                您已经成功发起退款申请，请耐心等待商家处理。
              </Text>
            </View>
            <View className="body">
              <Span>
                - 商家同意后，请按照给出的退货地址退货，并请记录退货运单号。
              </Span>
              <Span>
                - 如商家拒绝，您可以修改申请后再次发起，商家会重新处理。
              </Span>
              <Span>
                - 如商家超时未处理，退货申请将达成，请按系统给出的退货地址退货
              </Span>
            </View>
            <View className="footer">
              <OrderButton text="撤销申请" onClick={this.onUndo} />
              {/* <order-button text="修改申请"></order-button> */}
            </View>
          </Block>
        )}
        {refundInfo.refund_type === 2 &&
          refundInfo.handle_state === 20 &&
          refundInfo.is_close === 0 &&
          refundInfo.send_expiry_time > 0 && (
            <Block>
              {refundInfo.tracking_time > 0 && (
                <View className="body">
                  <View className="order-address">
                    <View className="info">
                      <View className="user">
                        <Text className="name">
                          {'物流公司：' + refundInfo.tracking_company}
                        </Text>
                      </View>
                      <View className="address">
                        <Text className="phone">
                          {'联系电话：' + refundInfo.tracking_phone}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {!refundInfo.tracking_time && (
                <View className="footer">
                  <OrderButton
                    text="我已寄出，点击填写物流单号"
                    onClick={this.onTrack}
                  />
                </View>
              )}
            </Block>
          )}
        {refundInfo.handle_state === 30 && (
          <Block>
            <View className="refund-success">
              <View className="refund-info">
                <View className="item">
                  <Label>退款总金额</Label>
                  <Text>{'¥' + refundInfo.refund_amount}</Text>
                </View>
                <View className="item">
                  <Label>返回支付方</Label>
                  <Text>{'¥' + refundInfo.refund_amount}</Text>
                </View>
              </View>
              <View className="state-steps">
                <RefundSteps refundInfo={refundInfo} steps={steps} />
              </View>
            </View>
          </Block>
        )}
        {refundInfo.handle_state === 51 && (
          <Block>
            <View className="header">
              <Text className="state">确认收货，自动关闭退款申请</Text>
            </View>
          </Block>
        )}
      </View>
    )
  }
}

export default _C
