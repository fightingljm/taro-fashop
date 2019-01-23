import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const DEFAULT_COLOR = '#fff'
const DEFAULT_BACKGROUND_COLOR = '#FF635C'
const DEFAULT_FONT_SIZE = 10
const DEFAULT_BOX_SHADOW = '0 0 0 2px #fff'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    color: DEFAULT_COLOR,
    backgroundColor: DEFAULT_BACKGROUND_COLOR,
    fontSize: DEFAULT_FONT_SIZE,
    boxShadow: DEFAULT_BOX_SHADOW
  }
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      color: color,
      backgroundColor: backgroundColor,
      fontSize: fontSize,
      boxShadow: boxShadow
    } = this.props
    const {} = this.state
    return (
      <View className="fa-badge">
        <View
          className="fa-badge__text"
          style={
            'color: ' +
            color +
            '; background-color: ' +
            backgroundColor +
            ';font-size: ' +
            fontSize * 2 +
            'px; box-shadow: ' +
            boxShadow +
            ';'
          }
        >
          {this.props.children}
        </View>
      </View>
    )
  }
}

export default _C
