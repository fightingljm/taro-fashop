import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    size: null,
    text: null,
    type: null,
    active: false
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    this.triggerEvent('click', e)
  }
  config = {
    component: true
  }

  render() {
    const { size: size, text: text, type: type, active: active } = this.props
    const {} = this.state
    return (
      <View
        className={
          'order-button ' +
          size +
          ' order-button-type-' +
          type +
          ' ' +
          (active === true ? 'active' : '')
        }
        onClick={this.onClick}
      >
        {text}
      </View>
    )
  }
}

export default _C
