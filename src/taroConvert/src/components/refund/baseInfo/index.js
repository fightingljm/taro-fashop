import { Block, View, Label, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import TimeFormat from '../../common/timeFormat/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null,
    reason: null,
    amount: null,
    num: null,
    createTime: null,
    refundNumber: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      refundInfo: refundInfo,
      reason: reason,
      amount: amount,
      num: num,
      createTime: createTime,
      refundNumber: refundNumber
    } = this.props
    const {} = this.state
    return (
      refundInfo && (
        <View className="refund-base-info">
          <View className="item">
            <View className="row">
              <Label>退款原因：</Label>
              <Text>{refundInfo.user_reason}</Text>
            </View>
            <View className="row">
              <Label>退款金额：</Label>
              <Text>{refundInfo.refund_amount}</Text>
            </View>
            <View className="row">
              <Label>申请件数：</Label>
              <Text>{refundInfo.goods_num}</Text>
            </View>
            <View className="row">
              <Label>申请时间：</Label>
              <TimeFormat value={refundInfo.create_time} />
            </View>
            <View className="row">
              <Label>退款编号：</Label>
              <Text>{refundInfo.refund_sn}</Text>
            </View>
          </View>
        </View>
      )
    )
  }
}

export default _C
