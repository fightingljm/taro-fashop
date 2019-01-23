import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    checked: false,
    loading: false,
    disabled: false
  }
  _observeProps = []
  handleZanSwitchChange = () => {
    if (this.data.loading || this.data.disabled) {
      return
    }
    let checked = !this.data.checked
    this.triggerEvent('change', {
      checked,
      loading: this.data.loading
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      checked: checked,
      loading: loading,
      disabled: disabled
    } = this.props
    const {} = this.state
    return (
      <View
        className={
          'fa-switch fa-switch--' +
          (checked ? 'on' : 'off') +
          ' ' +
          (disabled ? 'fa-swtich--disabled' : '')
        }
        checked={checked}
        loading={loading}
        disabled={disabled}
        onClick={this.handleZanSwitchChange}
      >
        <View className="fa-switch__circle">
          <View hidden={!loading} className="fa-switch__loading" />
        </View>
        <View className="fa-switch__bg" />
      </View>
    )
  }
}

export default _C
