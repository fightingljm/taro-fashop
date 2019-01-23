import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import BodyGoodsSeparator from './separator/index'
import BodyGoodsVideo from './video/index'
import BodyGoodsText from './text/index'
import BodyGoodsImage from './image/index'
import BodyGoodsList from './goods/index'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    body: []
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onGoodsClick = e => {
    this.triggerEvent('goods-click', e)
  }
  onImageClick = e => {
    this.triggerEvent('image-click', e)
  }
  config = {
    component: true
  }

  render() {
    const { body: body } = this.props
    const {} = this.state
    return body.map((item, pagedataindex) => {
      return (
        <View key="key">
          {item.type === 'text' && (
            <Block>
              <BodyGoodsText text={item.value.content} />
            </Block>
          )}
          {item.type === 'image' && (
            <Block>
              <BodyGoodsImage
                url={item.value.url}
                onClick={this.onImageClick}
              />
            </Block>
          )}
          {item.type === 'video' && (
            <Block>
              <BodyGoodsVideo url={item.value.url} />
            </Block>
          )}
          {item.type === 'goods' && (
            <Block>
              <BodyGoodsList
                goodsList={item.value}
                onClick={this.onGoodsClick}
              />
            </Block>
          )}
          {item.type === 'separator' && (
            <Block>
              <BodyGoodsSeparator />
            </Block>
          )}
        </View>
      )
    })
  }
}

export default _C
