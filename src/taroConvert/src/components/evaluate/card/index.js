import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderButton from '../../order/button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsInfo: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onGoods = () => {
    this.triggerEvent('goods', { goodsId: this.data.goodsInfo.goods_id })
  }
  onDetail = () => {
    this.triggerEvent('detail', { orderGoodsId: this.data.goodsInfo.id })
  }
  onAdd = () => {
    this.triggerEvent('add', { orderGoodsId: this.data.goodsInfo.id })
  }
  onAdditional = () => {
    this.triggerEvent('additional', { orderGoodsId: this.data.goodsInfo.id })
  }
  config = {
    component: true
  }

  render() {
    const { goodsInfo: goodsInfo } = this.props
    const {} = this.state
    return (
      <View className="evaluate-goods-card">
        <View className="body">
          <View className="item">
            <View className="content">
              <View className="image" onClick={this.onGoods}>
                <Image src={goodsInfo.goods_img} mode="aspectFill" />
              </View>
              <View className="body">
                <Text onClick={this.onGoods}>{goodsInfo.goods_title}</Text>
                <View className="button-area">
                  {goodsInfo.evaluate_state > 0 && (
                    <OrderButton
                      text="查看评价"
                      size="small"
                      onClick={this.onDetail}
                    />
                  )}
                  {goodsInfo.evaluate_state === 0 && (
                    <OrderButton
                      text="去评价"
                      size="small"
                      type="danger"
                      onClick={this.onAdd}
                    />
                  )}
                  {goodsInfo.evaluate_state === 1 && (
                    <OrderButton
                      text="追加评价"
                      size="small"
                      type="danger"
                      onClick={this.onAdditional}
                    />
                  )}
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
