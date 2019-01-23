import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import Time from '../../../utils/time.js'

import FaSteps from '../../../ui/steps/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null,
    steps: []
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  ready = () => {
    const refundInfo = this.data.refundInfo
    this.setData({
      steps: [
        {
          current: false,
          done: true,
          text: '买家退款',
          desc: Time.format('M/D h:m', refundInfo.create_time)
        },
        {
          done: true,
          current: false,
          text: '商家受理',
          desc: Time.format('M/D h:m', refundInfo.create_time)
        },
        {
          done: true,
          current: true,
          text: '退款成功',
          desc: Time.format('M/D h:m', refundInfo.create_time)
        }
      ]
    })
  }
  config = {
    component: true
  }

  render() {
    const { refundInfo: refundInfo, steps: steps } = this.props
    const {} = this.state
    return (
      <View className="refund-steps">
        <FaSteps type="horizon" steps={steps} hasDesc="true" />
      </View>
    )
  }
}

export default _C
