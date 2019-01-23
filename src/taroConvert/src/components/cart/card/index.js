import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaStepper from '../../../ui/stepper/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    index: null,
    id: null,
    checked: false,
    image: null,
    title: null,
    spec: null,
    price: null,
    num: null,
    goodsId: null,
    goodsSkuId: null,
    canSkuSelect: false
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    this.triggerEvent('click', {
      goodsSkuId: this.data.goodsSkuId,
      goodsId: this.data.goodsId
    })
  }
  bindNumberChange = e => {
    this.triggerEvent('numberChange', {
      index: e.currentTarget.id,
      number: e.detail
    })
  }
  bindSpecClick = e => {
    this.triggerEvent('specClick', {
      goodsSkuId: this.data.goodsSkuId,
      goodsId: this.data.goodsId
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      index: index,
      id: id,
      checked: checked,
      image: image,
      title: title,
      spec: spec,
      price: price,
      num: num,
      goodsId: goodsId,
      goodsSkuId: goodsSkuId,
      canSkuSelect: canSkuSelect
    } = this.props
    const {} = this.state
    return (
      <View className="cart-card">
        <Image src={image} mode="aspectFill" onClick={this.onClick} />
        {/* 当sku就一条的时候不可以选 */}
        <View className="title-price">
          <Text className="title" onClick={this.onClick}>
            {title}
          </Text>
          {canSkuSelect === true ? (
            <Block>
              <View
                className="spec can-sku-select"
                onClick={this.bindSpecClick}
              >
                <Text>{spec}</Text>
                <Image
                  src={require('../../../themes/default/cart/slices.png')}
                  mode="widthFix"
                />
              </View>
            </Block>
          ) : (
            <Block>
              <View className="spec" onClick={this.onClick}>
                <Text>{spec}</Text>
              </View>
            </Block>
          )}
          <View className="footer">
            <I className="price" onClick={this.onClick}>
              {'¥ ' + price}
            </I>
            <FaStepper
              id={index}
              size="small"
              stepper={num}
              min="1"
              max="99999"
              data-component-id={index}
              onChange={this.bindNumberChange}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default _C
