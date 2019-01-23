import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    goodsList: []
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = ({ currentTarget = {} }) => {
    this.triggerEvent('click', { currentTarget })
  }
  config = {
    component: true
  }

  render() {
    const { goodsList: goodsList } = this.props
    const {} = this.state
    return (
      goodsList.length > 0 && (
        <View className="page-goods-list-rows">
          <Section>
            {goodsList.map((item, pagedataindex) => {
              return (
                <Block key="key">
                  <Details onClick={this.onClick}>
                    <Image src={item.img.url} />
                    <View className="title-price">
                      <Text>{item.title}</Text>
                      <I>{'¥ ' + item.price}</I>
                    </View>
                  </Details>
                </Block>
              )
            })}
          </Section>
        </View>
      )
    )
  }
}

export default _C
