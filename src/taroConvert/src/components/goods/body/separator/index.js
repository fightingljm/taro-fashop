import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['mask-class', 'container-class']
  config = {
    component: true
  }

  render() {
    return (
      <View className="page-divier" style="border-bottom:1px dotted #999" />
    )
  }
}

export default _C
