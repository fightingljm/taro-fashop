import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderButton from '../button/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderInfo: null,
    goodsList: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onRefund = e => {
    this.triggerEvent('goods-refund-click', {
      goodsInfo: e.currentTarget.dataset.goodsInfo
    })
  }
  onRefundDetail = e => {
    this.triggerEvent('goods-refund-detail', {
      goodsInfo: e.currentTarget.dataset.goodsInfo
    })
  }
  onGoodsDetail = e => {
    this.triggerEvent('goods-detail', {
      goodsInfo: e.currentTarget.dataset.goodsInfo
    })
  }
  config = {
    component: true
  }

  render() {
    const { orderInfo: orderInfo, goodsList: goodsList } = this.props
    const {} = this.state
    return (
      <View className="order-goods-list">
        {goodsList.map((item, index) => {
          return (
            <View className="item" key="item">
              <View
                className="content"
                onClick={this.onGoodsDetail}
                data-goods-info={item}
              >
                <View className="image">
                  <Image src={item.goods_img} mode="aspectFill" />
                </View>
                <View className="body">
                  <Text>{item.goods_title}</Text>
                </View>
                <View className="end">
                  <Text className="price">{'¥' + item.goods_price}</Text>
                  <Label className="number">{'x ' + item.goods_num}</Label>
                </View>
              </View>
              {item.refund_state === 1 && (
                <Block>
                  <View className="footer">
                    <OrderButton
                      text="申请退款"
                      size="small"
                      data-goods-info={item}
                      onClick={this.onRefund}
                    />
                  </View>
                </Block>
              )}
              {item.refund_state === 2 && (
                <Block>
                  <View className="footer">
                    <OrderButton
                      text="退款中"
                      size="small"
                      data-goods-info={item}
                      onClick={this.onRefundDetail}
                    />
                  </View>
                </Block>
              )}
              {item.refund_state === 3 && (
                <Block>
                  <View className="footer">
                    <OrderButton
                      text="退款完成"
                      size="small"
                      data-goods-info={item}
                      onClick={this.onRefundDetail}
                    />
                  </View>
                </Block>
              )}
            </View>
          )
        })}
      </View>
    )
  }
}

export default _C
