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
  attached = () => {
    const systemInfo = Taro.getSystemInfoSync()
    console.log(systemInfo.windowWidth * 0.48)
    this.setData({
      smallImageWidth: (systemInfo.windowWidth - 18) / 2
    })
  }
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
      <View
        className="page-divier"
        style={
          'border-bottom:1px ' +
          dataSource.options.style +
          ' ' +
          dataSource.options.color
        }
      />
    )
  }
}

export default _C
