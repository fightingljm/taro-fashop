import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    countdown: 0,
    format: 'dd天hh时mm分ss秒',
    numStyle: '',
    symbolStyle: ''
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = [
    {
      name: 'countdown',
      observer: 'init'
    }
  ]
  state = {
    computeTime: 0,
    endTimeMs: 0
  }
  detached = () => {
    this.onPageHide()
  }
  init = () => {
    let { countdown, format } = this.data
    // countdown seconds
    this.computeTime = countdown
    // time format
    this.format = format

    const now = Date.now()
    // end timestamp (millisecond)
    this.endTimeMs = now + this.computeTime * 1000

    this.initCountdown()
  }
  initCountdown = () => {
    clearInterval(this._timer)

    const now = Date.now()
    // countdown milliseconds
    let computeTimeMs = this.endTimeMs - now
    // countdown interval
    let timeout = computeTimeMs % 1000 || 0
    this._timer = setTimeout(() => {
      this.initCountdown()
    }, timeout)

    this.setCountdownTimeItems(computeTimeMs)
  }
  setCountdownTimeItems = computeTimeMs => {
    this.computeTime = parseInt(Math.ceil(computeTimeMs / 1000))
    this.emitRunCount(this.computeTime)

    if (this.computeTime <= 0) {
      clearInterval(this._timer)
      this.emitEndCount()
    }

    let timeItems = this.getTimeItems(this.computeTime, this.format)
    this.setData({
      timeItems
    })
  }
  getTimeItems = (computeTime, format) => {
    if (computeTime < 0) {
      computeTime = 0
    }
    let arr = format.match(/[a-zA-Z]{1,3}/g) || []
    let symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || []
    let time = this.getTime(computeTime, format)
    return arr.map((item, i) => {
      return {
        num: time[item],
        symbol: symbolArr[i]
      }
    })
  }
  getTime = (leftseconds, format) => {
    let d = leftseconds
    let [s, m, h] = [60, 60, 24].map(unit => {
      let num = d % unit
      d = Math.floor(d / unit)
      return num
    })

    if (leftseconds > 86400 && format.indexOf('d') === -1) {
      h += d * 24
    }

    if (leftseconds > 3600 && format.indexOf('h') === -1) {
      m += h * 60
    }

    if (leftseconds > 60 && format.indexOf('m') === -1) {
      s += m * 60
    }

    return {
      dd: this.formatTime(d),
      hh: this.formatTime(h),
      mm: this.formatTime(m),
      ss: this.formatTime(s),
      d,
      h,
      m,
      s
    }
  }
  formatTime = val => {
    return val < 10 ? `0${val}` : val
  }
  emitRunCount = () => {
    this.triggerEvent('runcount', {
      computeTime: this.computeTime
    })
  }
  emitEndCount = () => {
    this.triggerEvent('endcount')
  }
  onPageShow = () => {
    const now = Date.now()
    if (this.format && this.endTimeMs) {
      this.computeTime = parseInt((this.endTimeMs - now) / 1000)
      this.initCountdown()
    }
  }
  onPageHide = () => {
    clearInterval(this._timer)
  }
  config = {
    component: true
  }

  render() {
    const {
      countdown: countdown,
      format: format,
      numStyle: numStyle,
      symbolStyle: symbolStyle
    } = this.props
    const { timeItems: timeItems } = this.state
    return (
      <View className="countdown">
        {timeItems.map((item, index) => {
          return (
            <View className="countdown__item" key="countdown">
              <View className="countdown__item--num" style={numStyle}>
                {item.num}
              </View>
              <View className="countdown__item--symbol" style={symbolStyle}>
                {item.symbol}
              </View>
            </View>
          )
        })}
      </View>
    )
  }
}

export default _C
