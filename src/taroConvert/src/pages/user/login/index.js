import { Block, View, Input, Label, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import UserModel from '../../../models/user.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import fa from '../../../utils/fa.js'
import validator from '../../../libs/validator/validator.js'

import FaStepper from '../../../ui/stepper/index'
import FaPopup from '../../../ui/popup/index'
import FaButton from '../../../ui/btn/index'
import StarRate from '../../../components/rate/index'
import FaBadge from '../../../ui/badge/index'
import FaPanel from '../../../ui/panel/index'
import FaCol from '../../../ui/col/index'
import FaRow from '../../../ui/row/index'
import FaCell from '../../../ui/cell/index'
import FaCellGroup from '../../../ui/cell-group/index'
import FaTag from '../../../ui/tag/index'
import FaTab from '../../../ui/tab/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  userModel = new UserModel()
  state = {
    login_type: 'password',
    username: '13502176003',
    password: '123456'
  }

  async componentWillMount() {}

  passwordLogin = async () => {
    if (validator.isEmpty(this.data.username) === true) {
      fa.toast.show({
        title: fa.code.parse('user_phone_format_error')
      })
      return
    }
    if (validator.isEmpty(this.data.password) === true) {
      fa.toast.show({
        title: fa.code.parse('user_password_require')
      })
      return
    }
    if (validator.isMobilePhone(this.data.username, 'zh-CN') !== true) {
      fa.toast.show({
        title: fa.code.parse('user_phone_format_error')
      })
    }

    const result = await this.userModel.login({
      login_type: 'password',
      username: this.data.username,
      password: this.data.password
    })
    if (result) {
      fa.cache.set('user_token', result)
      const user_info = await this.userModel.self()
      fa.cache.set('user_info', user_info)
    } else {
      fa.toast.show({
        title: fa.code.parse(this.userModel.getException().getCode())
      })
    }
  }
  _wechatLogin = async data => {
    const userModel = this.userModel
    const token = await userModel.login(data)
    if (token) {
      fa.cache.set('user_token', token)
      const user_info = await userModel.self()
      fa.cache.set('user_info', user_info)
    } else {
      return false
    }
  }
  wechatRegister = async () => {
    const self = this
    const userModel = this.userModel
    const result = await Taro.login({
      success: async function(res) {
        if (res.code) {
          const code = res.code
          Taro.getUserInfo({
            withCredentials: true,
            success: async function(userResult) {
              const register = await userModel.register({
                register_type: 'wechat_mini',
                wechat_mini_param: {
                  code: code,
                  encryptedData: userResult.encryptedData,
                  iv: userResult.iv
                }
              })
              if (register) {
                await Taro.login({
                  success: async function(loginResult) {
                    await self._wechatLogin({
                      login_type: 'wechat_mini',
                      wechat_mini_code: loginResult.code
                    })
                  }
                })
              } else {
                fa.toast.show({
                  title: fa.code.parse(userModel.getException().getCode())
                })
              }
            }
          })
        } else {
          fa.toast.show({
            title: res.errMsg
          })
        }
      }
    })
    console.log(result)
  }
  wechatLogin = async () => {
    const self = this
    const result = await Taro.login({
      success: async function(res) {
        const login = await self._wechatLogin({
          login_type: 'wechat_mini',
          wechat_mini_code: res.code
        })
        if (login === false) {
          self.wechatRegister()
        }
      }
    })
    console.log(result)
    console.log('最后才应该是我')
  }
  bindUsername = event => {
    this.setData({
      username: event.detail.value
    })
  }
  bindPassword = event => {
    this.setData({
      password: event.detail.value
    })
  }
  config = {
    navigationBarTitleText: 'FaShop商城系统'
  }

  render() {
    const { username: username, password: password } = this.state
    return (
      <View className="page-container">
        <View className="login">
          <View className="login-form">
            <View className="username input-item">
              <Input
                placeholder="手机号"
                type="number"
                onInput={this.bindUsername}
                value={username}
              />
            </View>
            <View className="password input-item">
              <View className="password-input">
                <Input
                  placeholder="请输入密码"
                  onInput={this.bindPassword}
                  value={password}
                />
              </View>
              <View className="forget-password">
                <Label>忘记密码</Label>
              </View>
            </View>
            <View className="btn-area">
              <FaButton type="danger" onBtnclick={this.passwordLogin}>
                登陆
              </FaButton>
            </View>
          </View>
          <View className="register">
            <Text>新用户注册</Text>
          </View>
          <View className="other-login-type">
            <View className="content">
              <View className="title">
                <Text>其他登陆方式</Text>
                <Label />
              </View>
              <View className="login-type-list">
                <View className="item">
                  <Image
                    className="share"
                    src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                    mode="scaleToFill"
                    onClick={this.wechatLogin}
                  />
                  <Text>微信登陆</Text>
                </View>
              </View>
            </View>
            {/* <view class="privacy"> */}
            {/* <view>登陆即代表您已经同意<text>隐私政策</text></view> */}
            {/* </view> */}
          </View>
        </View>
      </View>
    )
  }
}

export default _C
