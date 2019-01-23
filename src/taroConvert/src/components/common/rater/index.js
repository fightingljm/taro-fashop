import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    size: 12,
    num: 5,
    value: 3
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  ready = () => {
    let list = []
    for (let i = 1; i <= this.data.num; i++) {
      list = i
    }
    this.setData({
      list
    })
  }
  onChange = e => {
    console.log(e.currentTarget.dataset.value)
    this.triggerEvent('change', { value: e.currentTarget.dataset.value })
  }
  config = {
    component: true
  }

  render() {
    const { size: size, num: num, value: value } = this.props
    const { list: list } = this.state
    return (
      <View className="rater-list">
        {list.map((item, index) => {
          return (
            <Block key="key">
              {index < value && (
                <Image
                  src={require('./active.png')}
                  style={'width:' + size + 'px;height: ' + size + 'px'}
                  mode="aspectFill"
                  data-value={index + 1}
                  onClick={this.onChange}
                />
              )}
              {index >= value && (
                <Image
                  src={require('./default.png')}
                  style={'width:' + size + 'px;height: ' + size + 'px'}
                  mode="aspectFill"
                  data-value={index + 1}
                  onClick={this.onChange}
                />
              )}
            </Block>
          )
        })}
      </View>
    )
  }
}

export default _C
