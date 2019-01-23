import { Block, Swiper, SwiperItem, Image, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    dataSource: null,
    height: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  attached = () => {
    const systemInfo = Taro.getSystemInfoSync()
    this.setData({
      height: systemInfo.windowWidth * 0.48
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
    const { dataSource: dataSource, height: height } = this.props
    const {} = this.state
    return dataSource.options.layout_style === 1 ? (
      <Block>
        <Swiper
          className="page-banner-swiper"
          indicatorDots="true"
          autoplay="true"
          interval="5000"
          duration="1000"
          style={'height: ' + height + 'px'}
        >
          {dataSource.data.map((item, index) => {
            return (
              <Block key="item">
                <SwiperItem>
                  <Image
                    src={item.img.url}
                    mode="scaleToFill"
                    style={'height: ' + height + 'px'}
                    data-index={index}
                    onClick={this.onClick}
                  />
                </SwiperItem>
              </Block>
            )
          })}
        </Swiper>
      </Block>
    ) : (
      <Block>
        <View className="page-banner-list">
          {dataSource.data.map((item, index) => {
            return (
              <Block key="item">
                <Image
                  src={item.img.url}
                  mode="widthFix"
                  data-index={index}
                  onClick={this.onClick}
                />
              </Block>
            )
          })}
        </View>
      </Block>
    )
  }
}

export default _C
