import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    show: false,
    overlay: true,
    showOverlay: true,
    type: 'center'
  }
  _observeProps = []
  handleMaskClick = () => {
    this.triggerEvent('clickmask', {})
  }
  config = {
    component: true
  }

  render() {
    const {
      show: show,
      overlay: overlay,
      showOverlay: showOverlay,
      type: type
    } = this.props
    const {} = this.state
    return (
      <View className={'pop pop--' + type + ' ' + (show ? 'pop--show' : '')}>
        {overlay && (
          <View
            className={'pop__mask ' + (showOverlay ? '' : 'pop__mask--hide')}
            onClick={this.handleMaskClick}
          />
        )}
        <View className="pop__container">{this.props.children}</View>
      </View>
    )
  }
}

export default _C
