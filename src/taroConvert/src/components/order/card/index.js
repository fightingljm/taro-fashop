import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    return <View className="order-card">{this.props.children}</View>
  }
}

export default _C
