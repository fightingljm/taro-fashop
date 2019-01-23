import { Block, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const nativeButtonBehavior = require('./native-button-behaviors.js')

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    formType: null,
    type: '',
    size: '',
    plain: false,
    disabled: false,
    loading: false
  }
  static externalClasses = ['custom-class']
  behaviors = [nativeButtonBehavior]
  static relations = {
    '../btn-group/index': {
      type: 'parent',
      linked() {
        this.setData({ inGroup: true })
      },
      unlinked() {
        this.setData({ inGroup: false })
      }
    }
  }
  _observeProps = []
  state = {
    inGroup: false,
    isLast: false
  }
  handleTap = () => {
    if (this.data.disabled) {
      this.triggerEvent('disabledclick')
      return
    }
    this.triggerEvent('btnclick')
  }
  switchLastButtonStatus = (isLast = false) => {
    this.setData({ isLast })
  }
  config = {
    component: true
  }

  render() {
    const {
      formType: formType,
      type: type,
      size: size,
      plain: plain,
      disabled: disabled,
      loading: loading
    } = this.props
    const {
      inGroup: inGroup,
      isLast: isLast,
      openType: openType,
      appParameter: appParameter,
      hoverStopPropagation: hoverStopPropagation,
      hoverStartTime: hoverStartTime,
      hoverStayTime: hoverStayTime,
      lang: lang,
      sessionFrom: sessionFrom,
      sendMessageTitle: sendMessageTitle,
      sendMessagePath: sendMessagePath,
      sendMessageImg: sendMessageImg,
      showMessageCard: showMessageCard
    } = this.state
    return (
      <Button
        className={
          'custom-class fa-btn ' +
          (inGroup ? 'fa-btn--group' : '') +
          ' ' +
          (isLast ? 'fa-btn--last' : '') +
          ' ' +
          (size ? 'fa-btn--' + size : '') +
          ' ' +
          (size === 'mini' ? 'fa-btn--plain' : '') +
          ' ' +
          (plain ? 'fa-btn--plain' : '') +
          ' ' +
          (type ? 'fa-btn--' + type : '') +
          ' ' +
          (loading ? 'fa-btn--loading' : '') +
          ' ' +
          (disabled ? 'fa-btn--disabled' : '')
        }
        openType={openType}
        appParameter={appParameter}
        hoverStopPropagation={hoverStopPropagation}
        hoverStartTime={hoverStartTime}
        hoverStayTime={hoverStayTime}
        lang={lang}
        sessionFrom={sessionFrom}
        sendMessageTitle={sendMessageTitle}
        sendMessagePath={sendMessagePath}
        sendMessageImg={sendMessageImg}
        showMessageCard={showMessageCard}
        onClick={this.handleTap}
        onContact={this.bindcontact}
        onGetuserinfo={this.bindgetuserinfo}
        onGetphonenumber={this.bindgetphonenumber}
        onError={this.binderror}
      >
        {this.props.children}
      </Button>
    )
  }
}

export default _C
