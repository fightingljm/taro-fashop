import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    col: 0,
    offset: 0
  }
  static externalClasses = ['col-class']
  static relations = {
    '../row/index': {
      type: 'parent'
    }
  }
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { col: col, offset: offset } = this.props
    const {} = this.state
    return (
      <View
        className={
          'col-class fa-col ' +
          (col ? 'fa-col-' + col : '') +
          ' ' +
          (offset ? 'fa-col-offset-' + offset : '')
        }
      >
        {this.props.children}
      </View>
    )
  }
}

export default _C
