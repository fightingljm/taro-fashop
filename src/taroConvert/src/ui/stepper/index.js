import { Block, View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    stepper: 1,
    min: 1,
    max: Infinity,
    step: 1
  }
  _observeProps = []
  handleZanStepperChange = (e, type) => {
    const { dataset = {} } = e.currentTarget
    const { disabled } = dataset
    const { step } = this.data
    let { stepper } = this.data

    if (disabled) return null

    if (type === 'minus') {
      stepper -= step
    } else if (type === 'plus') {
      stepper += step
    }

    this.triggerEvent('change', stepper)
    this.triggerEvent(type)
  }
  handleZanStepperMinus = e => {
    this.handleZanStepperChange(e, 'minus')
  }
  handleZanStepperPlus = e => {
    this.handleZanStepperChange(e, 'plus')
  }
  handleZanStepperBlur = e => {
    let { value } = e.detail
    const { min, max } = this.data

    if (!value) {
      setTimeout(() => {
        this.triggerEvent('change', min)
      }, 16)
      return
    }

    value = +value
    if (value > max) {
      value = max
    } else if (value < min) {
      value = min
    }

    this.triggerEvent('change', value)
  }
  config = {
    component: true
  }

  render() {
    const {
      size: size,
      stepper: stepper,
      min: min,
      max: max,
      step: step
    } = this.props
    const {} = this.state
    return (
      <View
        className={
          'fa-stepper ' + (size === 'small' ? 'fa-stepper--small' : '')
        }
      >
        <View
          className={
            'fa-stepper__minus ' +
            (stepper <= min ? 'fa-stepper--disabled' : '')
          }
          data-disabled={stepper <= min}
          onClick={this.handleZanStepperMinus}
        >
          -
        </View>
        <Input
          className={
            'fa-stepper__text ' + (min >= max ? 'fa-stepper--disabled' : '')
          }
          type="number"
          value={stepper}
          disabled={min >= max}
          onBlur={this.handleZanStepperBlur}
        />
        <View
          className={
            'fa-stepper__plus ' + (stepper >= max ? 'fa-stepper--disabled' : '')
          }
          data-disabled={stepper >= max}
          onClick={this.handleZanStepperPlus}
        >
          +
        </View>
      </View>
    )
  }
}

export default _C
