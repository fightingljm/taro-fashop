import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    plain: false,
    disabled: false
  }
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { type: type, plain: plain, disabled: disabled } = this.props
    const {} = this.state
    return (
      <View
        className={
          'fa-tag ' +
          (type ? 'fa-tag--' + type : '') +
          ' ' +
          (disabled ? 'fa-tag--disabled' : '') +
          ' ' +
          (plain ? 'fa-tag--plain' : '')
        }
      >
        {this.props.children}
      </View>
    )
  }
}

export default _C
