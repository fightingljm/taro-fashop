import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    dataSource: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = () => {
    this.triggerEvent('click')
  }
  config = {
    component: true
  }

  render() {
    const { dataSource: dataSource } = this.props
    const {} = this.state
    return (
      <View
        className="page-goods-search"
        style={'background-color: ' + dataSource.options.background_color}
      >
        <section onClick={this.onClick}>
          <Image src={require('./goods-search-icon.png')} mode="aspectFit" />
          <Text>搜索商品</Text>
        </section>
      </View>
    )
  }
}

export default _C
