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
      <View className="page-icon-nav-bar">
        {dataSource.options.menu_format === 1 ? (
          <View
            className={
              'page-icon-nav-bar-icon menu-space-' +
              dataSource.options.menu_space
            }
          >
            {dataSource.data.map((item, index) => {
              return (
                <Block key="key">
                  <Details
                    style={'background-color: ' + item.background_color}
                    data-index={index}
                    onClick={this.onClick}
                  >
                    <Image src={item.img.url} mode="aspectFit" />
                    <Text style={'color:' + item.font_color + ';'}>
                      {item.title}
                    </Text>
                  </Details>
                </Block>
              )
            })}
          </View>
        ) : (
          dataSource.options.menu_format === 2 && (
            <View
              className={
                'page-icon-nav-bar-text menu-space-' +
                dataSource.options.menu_space
              }
            >
              {dataSource.data.map((item, index) => {
                return (
                  <Block key="key">
                    <Details
                      style={'background-color: ' + item.background_color}
                      data-index={index}
                      onClick={this.onClick}
                    >
                      <Text style={'color:' + item.font_color + ';'}>
                        {item.title}
                      </Text>
                    </Details>
                  </Block>
                )
              })}
            </View>
          )
        )}
      </View>
    )
  }
}

export default _C
