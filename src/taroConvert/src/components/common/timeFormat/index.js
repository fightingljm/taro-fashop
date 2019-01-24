import { Block, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    value: null,
    format: 'Y-M-D h:m'
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  state = {
    time: null
  }
  ready = () => {
    this.setData({
      time: this.format(this.data.value, this.data.format)
    })
  }
  formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  format = (number, format) => {
    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
    let returnArr = []
    console.log(number)
    let date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(this.formatNumber(date.getMonth() + 1))
    returnArr.push(this.formatNumber(date.getDate()))

    returnArr.push(this.formatNumber(date.getHours()))
    returnArr.push(this.formatNumber(date.getMinutes()))
    returnArr.push(this.formatNumber(date.getSeconds()))
    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  }
  config = {
    component: true
  }

  render() {
    const { value: value, format: format } = this.props
    const { time: time, timestamp: timestamp } = this.state
    return <Text>
      {time}{timestamp}
    </Text>
  }
}

export default _C
