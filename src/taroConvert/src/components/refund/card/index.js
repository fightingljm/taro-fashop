import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderButton from '../../order/button/index'
import CommonStaticCountdown from '../../common/staticCountdown/index'
import RefundGoodsCard from '../goodsCard/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    const refundInfo = this.data.refundInfo
    this.triggerEvent('click', { refundInfo })
  }
  config = {
    component: true
  }

  render() {
    const { refundInfo: refundInfo } = this.props
    const {} = this.state
    return (
      <View className="refund-card">
        <View className="header" onClick={this.onClick}>
          <RefundGoodsCard
            goodsTitle={refundInfo.goods_title}
            goodsImg={refundInfo.goods_img}
            goodsSpec={refundInfo.goods_spec_string}
            goodsNum={refundInfo.goods_num}
          />
        </View>
        <View className="body" onClick={this.onClick}>
          {/* 平台处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货) */}
          {/* 申请类型:1为仅退款,2为退货退款,默认为1 */}
          <View className="icon">
            {refundInfo.handle_state === 30 ||
            refundInfo.handle_state === 51 ? (
              <Block>
                <Image
                  src={require('../../../themes/default/refund/refund-success.png')}
                  mode="aspectFill"
                  alt="¥"
                />
              </Block>
            ) : (
              <Block>
                <Image
                  src={require('../../../themes/default/refund/refund-ing.png')}
                  mode="aspectFill"
                  alt="退"
                />
              </Block>
            )}
          </View>
          <Text>{refundInfo.refund_type === 1 ? '仅退款' : '退货退款'}</Text>
          {refundInfo.handle_state === 30 && (
            <Block>
              <Label>退款完成</Label>
            </Block>
          )}
          {refundInfo.handle_state === 50 && (
            <Block>
              <Label>已撤销退款申请</Label>
            </Block>
          )}
          {refundInfo.handle_state === 51 && (
            <Block>
              <Label>确认收货，自动关闭退款申请</Label>
            </Block>
          )}
          {refundInfo.is_close === 1 && (
            <Block>
              <Label>退款关闭</Label>
            </Block>
          )}
          {refundInfo.refund_type === 2 &&
            refundInfo.handle_state === 20 &&
            refundInfo.is_close === 0 &&
            refundInfo.send_expiry_time > 0 && (
              <Block>
                <Label>
                  待买家发货 还剩
                  <CommonStaticCountdown
                    countdown={refundInfo.send_expiry_seconds}
                    format="dd天hh时mm分"
                  />
                </Label>
              </Block>
            )}
          {refundInfo.is_close === 0 && refundInfo.handle_state === 0 && (
            <Block>
              <Label>
                退款待处理 还剩
                <CommonStaticCountdown
                  countdown={refundInfo.handle_expiry_seconds}
                  format="dd天hh时mm分"
                />
              </Label>
            </Block>
          )}
        </View>
        <View className="footer">
          <OrderButton text="查看详情" onClick={this.onClick} />
        </View>
      </View>
    )
  }
}

export default _C
