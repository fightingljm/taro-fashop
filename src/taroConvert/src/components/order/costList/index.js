import { Block, View, Label, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsTotal: null,
    freight: null,
    totalCost: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      goodsTotal: goodsTotal,
      freight: freight,
      totalCost: totalCost
    } = this.props
    const {} = this.state
    return (
      <View className="order-cost-list">
        <View className="item">
          <View className="row">
            <Label>商品总额：</Label>
            <Text>{'¥' + goodsTotal}</Text>
          </View>
          <View className="row">
            <Label>运费：</Label>
            <Text>{'¥' + freight}</Text>
          </View>
        </View>
        <View className="footer">
          <Label>实付款：</Label>
          <Text>{'¥' + totalCost}</Text>
        </View>
      </View>
    )
  }
}

export default _C
