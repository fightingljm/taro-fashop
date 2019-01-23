import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsTitle: null,
    goodsImg: null,
    goodsNum: null,
    goodsSpec: null,
    goodsInfo: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = currentTarget => {
    this.triggerEvent('click', { currentTarget })
  }
  config = {
    component: true
  }

  render() {
    const {
      goodsTitle: goodsTitle,
      goodsImg: goodsImg,
      goodsNum: goodsNum,
      goodsSpec: goodsSpec,
      goodsInfo: goodsInfo
    } = this.props
    const {} = this.state
    return (
      <View className="refund-goods-card">
        <View className="body">
          <View className="item">
            <View className="content">
              <View className="image">
                <Image src={goodsImg} mode="aspectFill" />
              </View>
              <View className="body">
                <Text>{goodsTitle}</Text>
                <View className="end">
                  <Text className="spec">{goodsSpec}</Text>
                  <Label className="number">{'x ' + goodsNum}</Label>
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
