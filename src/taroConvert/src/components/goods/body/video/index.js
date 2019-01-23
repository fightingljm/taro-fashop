import { Block, View, Video } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    url: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { url: url } = this.props
    const {} = this.state
    return (
      <View className="page-video">
        <Video src={url} controls="controls" />
      </View>
    )
  }
}

export default _C
