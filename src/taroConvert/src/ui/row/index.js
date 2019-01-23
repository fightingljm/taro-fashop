import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['row-class']
  static relations = {
    '../col/index': {
      type: 'child'
    }
  }
  config = {
    component: true
  }

  render() {
    return <View className="row-class fa-row">{this.props.children}</View>
  }
}

export default _C
