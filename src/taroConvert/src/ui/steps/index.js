import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    type: 'horizon',
    hasDesc: false,
    steps: []
  }
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const {
      type: type,
      hasDesc: hasDesc,
      steps: steps,
      className: className
    } = this.props
    const {} = this.state
    return (
      <View
        className={
          'fa-steps fa-steps--' +
          (type == 'vertical' ? 'vsteps' : 'steps') +
          ' fa-steps--' +
          steps.length +
          ' ' +
          className
        }
      >
        {steps.map((step, index) => {
          return (
            <View
              key="unique"
              className={
                'fa-steps__step ' +
                (hasDesc ? 'fa-steps__step--db-title' : '') +
                ' ' +
                (index == 0 ? 'fa-steps__step--first-child' : '') +
                ' ' +
                (index == steps.length - 1
                  ? 'fa-steps__step--last-child'
                  : '') +
                ' ' +
                (step.done ? 'fa-steps__step--done' : '') +
                ' ' +
                (step.current ? 'fa-steps__step--cur' : '')
              }
            >
              <View className="fa-steps__title">{step.text}</View>
              {hasDesc && step.desc && (
                <View className="fa-steps__title fa-steps__title--desc">
                  {step.desc}
                </View>
              )}
              <View className="fa-steps__icons">
                <View className="fa-steps__circle" />
              </View>
              <View className="fa-steps__line" />
            </View>
          )
        })}
      </View>
    )
  }
}

export default _C
