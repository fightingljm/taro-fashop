import { Block, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import LoginLogic from '../../../logics/login.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  state = {
    userInfo: null,
    scopeUserInfo: false
  }
  ready = () => {
    const userInfo = fa.cache.get('user_info')
    if (userInfo) {
      this.setData({
        userInfo
      })
    } else {
      const self = this
      Taro.getSetting({
        success: res => {
          let scopeUserInfo = false
          if (typeof res.authSetting['scope.userInfo'] === 'undefined') {
            scopeUserInfo = false
          } else {
            scopeUserInfo = res.authSetting['scope.userInfo']
          }
          console.log(scopeUserInfo)
          self.setData({
            scopeUserInfo
          })
        }
      })
    }
  }
  onLogin = e => {
    const self = this
    if (
      this.data.scopeUserInfo === true ||
      (e.type === 'getuserinfo' && e.detail.errMsg === 'getUserInfo:ok')
    ) {
      const loginLogic = new LoginLogic({
        success: function(result) {
          if (result.code === 1) {
            self.setData({
              userInfo: fa.cache.get('user_info')
            })
            self.triggerEvent('success', { result })
          } else {
            self.triggerEvent('fail', { result })
          }
        }
      })
      loginLogic.wechatLogin()
    } else {
      self.triggerEvent('fail', {
        result: {}
      })
    }
  }
  config = {
    component: true
  }

  render() {
    const { userInfo: userInfo, scopeUserInfo: scopeUserInfo } = this.state
    return (
      <Block>
        {userInfo === null && (
          <Block>
            {!scopeUserInfo && (
              <Button
                openType="getUserInfo"
                className="getUserInfo"
                onGetuserinfo={this.onLogin}
              >
                {this.props.children}
              </Button>
            )}
            {scopeUserInfo && (
              <Button className="getUserInfo" onClick={this.onLogin}>
                {this.props.children}
              </Button>
            )}
          </Block>
        )}
        {userInfo && <Block>{this.props.children}</Block>}
      </Block>
    )
  }
}

export default _C
