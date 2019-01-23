import { Block, View, ScrollView, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    orderId: null,
    goodsList: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    this.triggerEvent('click', { orderId: this.data.orderId })
  }
  config = {
    component: true
  }

  render() {
    const { orderId: orderId, goodsList: goodsList } = this.props
    const {} = this.state
    return goodsList.length > 1 ? (
      <View onClick={this.onClick}>
        <ScrollView
          className="order-card-goods"
          scrollX="true"
          scrollWithAnimation="true"
        >
          <View>
            {goodsList.map((item, index) => {
              return (
                <Block key="item">
                  <View className="item">
                    <Image src={item.goods_img} mode="aspectFill" />
                  </View>
                </Block>
              )
            })}
          </View>
        </ScrollView>
      </View>
    ) : (
      goodsList.length === 1 && (
        <View onClick={this.onClick}>
          <View className="order-card-goods-one">
            {goodsList.map((item, index) => {
              return (
                <Block key="item">
                  {goodsList.map((item, index) => {
                    return (
                      <View className="one-item" key="item">
                        <View className="image">
                          <Image src={item.goods_img} mode="aspectFill" />
                        </View>
                        <View className="body">
                          <Text>{item.goods_title}</Text>
                          <View className="desc">
                            <Label>{item.goods_spec_string}</Label>
                            <I>{'x' + item.goods_num}</I>
                          </View>
                          <Label>{'¥' + item.goods_price}</Label>
                        </View>
                      </View>
                    )
                  })}
                </Block>
              )
            })}
          </View>
        </View>
      )
    )
  }
}

export default _C
