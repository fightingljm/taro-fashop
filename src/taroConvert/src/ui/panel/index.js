import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    title: '',
    hideTop: false,
    hideBorder: false
  }
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      title: title,
      hideTop: hideTop,
      hideBorder: hideBorder
    } = this.props
    const {} = this.state
    return (
      <View className="fa-panel">
        {title && <View className="fa-panel__title">{title}</View>}
        <View
          className={
            'fa-panel__content ' +
            (hideBorder ? 'fa-panel--without-border' : '')
          }
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default _C
