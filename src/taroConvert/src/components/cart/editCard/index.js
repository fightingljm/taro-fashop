import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsId: null,
    goodsSkuId: null,
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
    this.triggerEvent('click', {
      goodsSkuId: this.data.goodsSkuId,
      goodsId: this.data.goodsId
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      goodsId: goodsId,
      goodsSkuId: goodsSkuId,
      checked: checked,
      image: image,
      title: title,
      spec: spec,
      price: price,
      num: num
    } = this.props
    const {} = this.state
    return (
      <View className="cart-card">
        <Image src={image} mode="aspectFill" onClick={this.onClick} />
        <View className="title-price">
          <Text className="title" onClick={this.onClick}>
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
    )
  }
}

export default _C
