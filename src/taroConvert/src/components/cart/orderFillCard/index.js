import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsSkuId: null,
    cart_id: null,
    checked: false,
    image: null,
    title: null,
    spec: null,
    price: null,
    num: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    console.log(e)
    this.triggerEvent('click', {
      goods_sku_id: this.data.goodsSkuId
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      goodsSkuId: goodsSkuId,
      cart_id: cart_id,
      checked: checked,
      image: image,
      title: title,
      spec: spec,
      price: price,
      num: num
    } = this.props
    const {} = this.state
    return (
      <Block>
        <View className="cart-card">
          <Image src={image} mode="aspectFill" onClick={this.onClick} />
          <View className="title-price">
            <Text className="title" data-goods-sku-id onClick={this.onClick}>
              {title}
            </Text>
            <View className="spec" onClick={this.onClick}>
              <Text>{spec}</Text>
            </View>
            <View className="footer">
              <I className="price" onClick={this.onClick}>
                {'¥ ' + price}
              </I>
            </View>
          </View>
        </View>
        <FaCell>
          <View className="one-item">
            <View className="image">
              <Image
                src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                mode="scaleToFill"
              />
            </View>
            <View className="body">
              <Text className="title">
                新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款
              </Text>
              <View className="spec">
                <Text>0.5kg 长款 红色</Text>
                <Text>x2</Text>
              </View>
              <Text className="price">¥112.00</Text>
            </View>
          </View>
        </FaCell>
      </Block>
    )
  }
}

export default _C
