import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    value: 0,
    count: 5,
    size: 44,
    color: '#e5e5e5',
    activeColor: '#fdb757',
    readonly: false,
    padding: 20
  }
  behaviors = []
  _observeProps = []
  state = {}
  handlerRate = e => {
    if (this.data.readonly) {
      return
    }
    var score = e.target.dataset.score
    if (score) {
      this.setData({
        value: score
      })
      var detail = e.detail
      detail.value = score
      var option = {}
      this.triggerEvent('rate', detail, option)
    }
  }
  config = {
    component: true
  }

  render() {
    const {
      value: value,
      count: count,
      size: size,
      color: color,
      activeColor: activeColor,
      readonly: readonly,
      padding: padding
    } = this.props
    const { _pid: _pid } = this.state
    return (
      <View className="rate" onClick={this.handlerRate}>
        {count.map((item, index) => {
          return (
            <Block key="index">
              <Text
                className="rate__icon"
                style={'margin-right: ' + padding + 'rpx;'}
                type={value - 1 >= index ? 'star-active' : 'star'}
                size={size}
                color={value - 1 >= index ? activeColor : color}
                data-score={index + 1}
                pid={_pid}
              />
            </Block>
          )
        })}
      </View>
    )
  }
}

export default _C
