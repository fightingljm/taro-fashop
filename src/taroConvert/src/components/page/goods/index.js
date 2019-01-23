import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    dataSource: null,
    smallImageWidth: null,
    rowsImageWidth: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  attached = () => {
    const systemInfo = Taro.getSystemInfoSync()
    this.setData({
      smallImageWidth: (systemInfo.windowWidth - 18) / 2
    })
  }
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
    const {
      dataSource: dataSource,
      smallImageWidth: smallImageWidth,
      rowsImageWidth: rowsImageWidth
    } = this.props
    const {} = this.state
    return dataSource.options.layout_style === 1 ? (
      <View className="page-goods-list-small-image">
        <Section>
          {dataSource.data.map((item, index) => {
            return (
              <Block key="key">
                <Details
                  style={'width:' + smallImageWidth + 'px'}
                  data-index={index}
                  onClick={this.onClick}
                >
                  <Image
                    src={item.img}
                    style={
                      'width:' +
                      smallImageWidth +
                      'px;height: ' +
                      smallImageWidth +
                      'px'
                    }
                  />
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
    ) : dataSource.options.layout_style === 2 ? (
      <View className="page-goods-list-big-image">
        <Section>
          {dataSource.data.map((item, index) => {
            return (
              <Block key="key">
                <Details data-index={index} onClick={this.onClick}>
                  <Image src={item.img} mode="aspectFit" />
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
    ) : (
      dataSource.options.layout_style === 3 && (
        <View className="page-goods-list-rows">
          <Section>
            {dataSource.data.map((item, index) => {
              return (
                <Block key="key">
                  <Details data-index={index} onClick={this.onClick}>
                    <Image src={item.img} />
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
