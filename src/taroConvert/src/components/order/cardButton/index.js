import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderId: null,
    text: null,
    active: false
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    this.triggerEvent('click', { orderId: this.data.orderId })
  }
  config = {
    component: true
  }

  render() {
    const { orderId: orderId, text: text, active: active } = this.props
    return <View className="cart-botton" />
  }
}

export default _C
