import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    dataSource: null,
    justifyContent: {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center'
    }
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
    const {
      dataSource: dataSource,
      justifyContent: justifyContent
    } = this.props
    const {} = this.state
    return (
      <View className="page-column-title">
        <Details
          style={
            'justify-content:' +
            justifyContent[dataSource.options.align] +
            ';background-color: ' +
            dataSource.options.background_color
          }
        >
          <Image src={dataSource.options.leading_image.url} mode="aspectFit" />
          <Text style={'color:' + dataSource.options.font_color}>
            {dataSource.options.title}
          </Text>
        </Details>
      </View>
    )
  }
}

export default _C
