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
      <View className="page-grid-nav-bar">
        <View className={'body rows-' + dataSource.options.rows}>
          {dataSource.data.map((item, index) => {
            return (
              <Block key="item">
                <Section
                  className={'column-' + dataSource.options.each_row_display}
                  data-index={index}
                  onClick={this.onClick}
                >
                  <Image src={item.img.url} mode="aspectFit" />
                  <Text>{item.title}</Text>
                </Section>
              </Block>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
