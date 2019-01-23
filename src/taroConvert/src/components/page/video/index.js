import { Block, View, Video } from '@tarojs/components'
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
  onMaskClick = () => {
    if (this.data.cancelWithMask) {
      this.cancelClick()
    }
  }
  cancelClick = () => {
    this.triggerEvent('cancel')
  }
  handleBtnClick = ({ currentTarget = {} }) => {
    const dataset = currentTarget.dataset || {}
    const { index } = dataset
    this.triggerEvent('actionclick', { index })
  }
  config = {
    component: true
  }

  render() {
    const { dataSource: dataSource } = this.props
    const {} = this.state
    return (
      <View className="page-video">
        <Video src={dataSource.data.url} controls="controls" />
      </View>
    )
  }
}

export default _C
