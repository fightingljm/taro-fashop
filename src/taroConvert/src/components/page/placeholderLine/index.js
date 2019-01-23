import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    dataSource: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { dataSource: dataSource } = this.props
    const {} = this.state
    return (
      <View
        className="page-placeholder-line"
        style={'background-color: #F8F8F8;height: ' + dataSource.options.height}
      />
    )
  }
}

export default _C
