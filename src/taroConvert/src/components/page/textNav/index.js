import { Block, View, Text, Image } from '@tarojs/components'
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
  onClick = e => {
    this.triggerEvent('click', {
      index: e.currentTarget.dataset.index,
      dataSource: this.data.dataSource
    })
  }
  config = {
    component: true
  }

  render() {
    const { dataSource: dataSource } = this.props
    const {} = this.state
    return (
      <View className="page-text-nav">
        {dataSource.data.map((item, index) => {
          return (
            <Block key="key">
              <Details onClick={this.onClick} data-index={index}>
                <Text>{item.title}</Text>
                <Image src={require('./right.png')} mode="aspectFit" />
              </Details>
            </Block>
          )
        })}
      </View>
    )
  }
}

export default _C
