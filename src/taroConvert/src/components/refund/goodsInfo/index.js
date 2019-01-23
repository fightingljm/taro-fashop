import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderButton from '../../order/button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    refundInfo: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onGoods = () => {
    this.triggerEvent('goods', { refundInfo: this.data.refundInfo })
  }
  config = {
    component: true
  }

  render() {
    const { refundInfo: refundInfo } = this.props
    const {} = this.state
    return (
      <View className="refund-goods-info">
        <View className="header">退款信息</View>
        <View className="body">
          <View className="item" onClick={this.onGoods}>
            <View className="content">
              <View className="image">
                <Image src={refundInfo.goods_img} mode="aspectFill" />
              </View>
              <View className="body">
                <Text>{refundInfo.goods_title}</Text>
                <View className="end">
                  <Text className="spec">{refundInfo.goods_spec_string}</Text>
                  <Label className="number">
                    {'x ' + refundInfo.goods_num}
                  </Label>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
