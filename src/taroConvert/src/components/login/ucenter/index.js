import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import LoginView from '../view/index'
import FaPanel from '../../../ui/panel/index'
import FaCell from '../../../ui/cell/index'
import FaCellGroup from '../../../ui/cell-group/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = currentTarget => {
    this.triggerEvent('click', { currentTarget })
  }
  onLogin = currentTarget => {
    this.triggerEvent('login', { currentTarget })
  }
  onSuccess = e => {
    const result = e.detail.result
    this.triggerEvent('login-success', { result })
  }
  onFail = e => {
    const result = e.detail.result
    this.triggerEvent('login-fail', { result })
  }
  config = {
    component: true
  }

  render() {
    return (
      <Block>
        <FaPanel className="order-action-area">
          <View className="user-header">
            <LoginView onSuccess={this.onSuccess} onFail={this.onFail}>
              <View className="fa-cell fa-cell--access">
                <View className="fa-cell__bd">
                  <View className="avatar">
                    <Image
                      src={require('../../../themes/default/user/default-avatar.png')}
                      mode="aspectFit"
                    />
                    <View className="nickname">
                      <Text>点击登录</Text>
                    </View>
                  </View>
                </View>
                <View className="fa-cell__ft" />
              </View>
            </LoginView>
          </View>
        </FaPanel>
        <FaPanel className="order-action-area">
          <View className="header fa-cell fa-cell--access">
            <View className="fa-cell__bd">
              <View className="left">
                <Text>我的订单</Text>
              </View>
              <LoginView
                className="right"
                data-state="0"
                onSuccess={this.onSuccess}
                onFail={this.onFail}
              >
                <Text>全部订单</Text>
              </LoginView>
            </View>
            <View className="fa-cell__ft" />
          </View>
          <LoginView onSuccess={this.onSuccess} onFail={this.onFail}>
            <View className="list">
              <View className="item" data-state="1">
                <View className="icon">
                  <Image
                    src={require('../../../themes/default/user/order/state_new.png')}
                    mode="aspectFit"
                  />
                </View>
                <Text>待付款</Text>
              </View>
              <View className="item" data-state="1">
                <View className="icon">
                  <Image
                    src={require('../../../themes/default/user/order/state_pay.png')}
                    mode="aspectFit"
                  />
                </View>
                <Text>待收货</Text>
              </View>
              <Iew className="item" data-state="1">
                <View className="icon">
                  <Image
                    src={require('../../../themes/default/user/order/state_send.png')}
                    mode="aspectFit"
                  />
                </View>
                <Text>已完成</Text>
              </Iew>
              <View className="item" data-state="1">
                <View className="icon">
                  <Image
                    src={require('../../../themes/default/user/order/state_unevaluate.png')}
                    mode="aspectFit"
                  />
                </View>
                <Text>待评价</Text>
              </View>
              <View className="item" data-state="1">
                <View className="icon">
                  <Image
                    src={require('../../../themes/default/user/order/state_refund.png')}
                    mode="aspectFit"
                  />
                </View>
                <Text>退款售后</Text>
              </View>
            </View>
          </LoginView>
        </FaPanel>
        <FaPanel>
          <LoginView onSuccess={this.onSuccess} onFail={this.onFail}>
            <FaCellGroup>
              <FaCell
                title="地址管理"
                isLink={true}
                renderIcon={
                  <Block>
                    <View className="cell-icon">
                      <Image
                        src={require('../../../themes/default/user/address.png')}
                        mode="aspectFit"
                        style="width:22px;height: 22px"
                      />
                    </View>
                  </Block>
                }
              />
              <FaCell
                title="商品关注"
                onSuccess={this.onSuccess}
                onFail={this.onFail}
                isLink={true}
                renderIcon={
                  <Block>
                    <View className="cell-icon">
                      <Image
                        src={require('../../../themes/default/user/collect.png')}
                        mode="aspectFit"
                        style="width:22px;height: 22px"
                      />
                    </View>
                  </Block>
                }
              />
            </FaCellGroup>
          </LoginView>
        </FaPanel>
      </Block>
    )
  }
}

export default _C
