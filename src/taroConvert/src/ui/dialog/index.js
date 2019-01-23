import { Block, View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaButton from '../btn/index'
import PopManager from '../common/pop-manager/index'
import './index.scss'
const defaultData = require('./data.js')

const _f = function() {}

@withWeapp('Component')
class _C extends Taro.Component {
  _observeProps = []
  state = {
    ...defaultData,
    key: '',
    show: false,
    showCustomBtns: false,
    promiseFunc: {}
  }
  handleButtonClick = e => {
    const { currentTarget = {} } = e
    const { dataset = {} } = currentTarget

    // 获取当次弹出框的信息
    const { resolve = _f, reject = _f } = this.data.promiseFunc || {}

    // 重置展示
    this.setData({
      show: false
    })

    // 自定义按钮，全部 resolve 形式返回，根据 type 区分点击按钮
    if (this.data.showCustomBtns) {
      resolve({
        type: dataset.type
      })
      return
    }

    // 默认按钮，确认为 resolve，取消为 reject
    if (dataset.type === 'confirm') {
      resolve({
        type: 'confirm'
      })
    } else {
      reject({
        type: 'cancel'
      })
    }
  }
  config = {
    component: true
  }

  render() {
    const {
      show: show,
      title: title,
      message: message,
      buttonsShowVertical: buttonsShowVertical,
      buttons: buttons
    } = this.state
    return (
      <PopManager show={show} type="center">
        <View className="fa-dialog--container">
          {title && <View className="fa-dialog__header">{title}</View>}
          <View
            className={
              'fa-dialog__content ' + (title ? 'fa-dialog__content--title' : '')
            }
          >
            <Text>{message}</Text>
          </View>
          <View
            className={
              'fa-dialog__footer ' +
              (buttonsShowVertical
                ? 'fa-dialog__footer--vertical'
                : 'fa-dialog__footer--horizon')
            }
          >
            {buttons.map((item, index) => {
              return (
                <Block key={item.text + '-' + item.type}>
                  <FaButton
                    className="fa-dialog__button"
                    customClass={
                      index === 0
                        ? 'fa-dialog__button-inside--first'
                        : 'fa-dialog__button-inside'
                    }
                    data-type={item.type}
                    onBtnclick={this.handleButtonClick}
                  >
                    <View style={'color: ' + (item.color || '#333')}>
                      {item.text}
                    </View>
                  </FaButton>
                </Block>
              )
            })}
          </View>
        </View>
      </PopManager>
    )
  }
}

export default _C
