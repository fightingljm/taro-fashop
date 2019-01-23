import { Block, View, Image } from '@tarojs/components'
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
      <View className="page-pic-window">
        {dataSource.options.layout_style === 1 && (
          <Block>
            <View className="page-pic-window-mix">
              {dataSource.data.map((item, index) => {
                return (
                  <Block key="key">
                    <Image
                      src={item.img.url}
                      mode="aspectFill"
                      data-index={index}
                      onClick={this.onClick}
                    />
                  </Block>
                )
              })}
            </View>
          </Block>
        )}
        {dataSource.options.layout_style === 2 && (
          <Block>
            <View className="page-pic-window-rows">
              {dataSource.data.map((item, index) => {
                return (
                  <Block key="key">
                    <Image
                      src={item.img.url}
                      mode="aspectFill"
                      data-index={index}
                      onClick={this.onClick}
                    />
                  </Block>
                )
              })}
            </View>
          </Block>
        )}
      </View>
    )
  }
}

export default _C
