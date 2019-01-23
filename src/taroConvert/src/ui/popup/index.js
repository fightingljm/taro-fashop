import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import PopManager from '../common/pop-manager/index'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    show: false,
    overlay: true,
    closeOnClickOverlay: true,
    type: 'center'
  }
  _observeProps = []
  handleMaskClick = () => {
    this.triggerEvent('click-overlay', {})

    if (!this.data.closeOnClickOverlay) {
      return
    }
    this.triggerEvent('close', {})
  }
  config = {
    component: true
  }

  render() {
    const {
      show: show,
      overlay: overlay,
      closeOnClickOverlay: closeOnClickOverlay,
      type: type
    } = this.props
    const {} = this.state
    return (
      <PopManager
        show={show}
        type={type}
        showOverlay={overlay}
        onClickmask={this.handleMaskClick}
        onClose={this.togglePopup}
      >
        {this.props.children}
      </PopManager>
    )
  }
}

export default _C
