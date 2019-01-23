import { Block, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    text: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { text: text } = this.props
    const {} = this.state
    return <Text className="goods-body-text">{text}</Text>
  }
}

export default _C
