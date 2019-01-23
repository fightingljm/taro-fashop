import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../utils/fa.js'
import OrderModel from '../../models/order.js'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'

import FaBadge from '../../ui/badge/index'
import FaPanel from '../../ui/panel/index'
import FaCell from '../../ui/cell/index'
import FaCellGroup from '../../ui/cell-group/index'
import LoginView from '../../components/login/view/index'
import UnloginUcenter from '../../components/login/ucenter/index'
import './index.scss'
const orderModel = new OrderModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    userInfo: null,
    stateNum: null
  }
  goOrderList = e => {
    Taro.navigateTo({
      url:
        '/pages/order/list/index?state_type=' +
        e.currentTarget.dataset.stateType
    })
  }
  goAddressList = () => {
    Taro.navigateTo({
      url: '/pages/address/list/index'
    })
  }
  goEvaluateList = () => {
    Taro.navigateTo({
      url: '/pages/evaluate/list/index'
    })
  }
  goUserSetting = () => {
    Taro.navigateTo({
      url: '/pages/user/setting/index'
    })
  }
  goRefundList = () => {
    Taro.navigateTo({
      url: '/pages/refund/list/index'
    })
  }

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  onLoginSuccess = () => {
    this.setData({
      userInfo: fa.cache.get('user_info')
    })
  }

  async componentDidShow() {
    const userInfo = fa.cache.get('user_info')
    this.setData({
      loginState: fa.getLoginState(userInfo),
      userInfo: userInfo
    })
    if (userInfo) {
      const stateNum = await orderModel.stateNum()
      this.setData({
        stateNum: stateNum
      })
    }
  }

  onShareAppMessage = () => {
    const shopInfo = fa.cache.get('shop_info')
    return {
      title: shopInfo.name,
      path: `/pages/index/index`
    }
  }
  config = {
    navigationBarTitleText: 'FaShop商城系统'
  }

  render() {
    const { userInfo: userInfo, stateNum: stateNum } = this.state
    return (
      <View className="page-container">
        {userInfo ? (
          <Block>
            <FaPanel className="order-action-area">
              <View className="user-header">
                {/* bindtap="goUserSetting"  fa-cell--access */}
                <View className="fa-cell">
                  <View className="fa-cell__bd">
                    <View className="avatar">
                      <Image src={userInfo.profile.avatar} mode="aspectFit" />
                      <View className="nickname">
                        <Text>{userInfo.profile.nickname}</Text>
                      </View>
                    </View>
                    <View className="setting-action">
                      {/* <text>设置</text> */}
                    </View>
                  </View>
                  <View className="fa-cell__ft" />
                </View>
              </View>
            </FaPanel>
            <FaPanel className="order-action-area">
              <View className="header fa-cell fa-cell--access">
                <View className="fa-cell__bd">
                  <View className="left">
                    <Text>我的订单</Text>
                  </View>
                  <View
                    className="right"
                    data-state-type="all"
                    onClick={this.goOrderList}
                  >
                    <Text>全部订单</Text>
                  </View>
                </View>
                <View className="fa-cell__ft" />
              </View>
              <View className="list">
                <View
                  className="item"
                  data-state-type="state_new"
                  onClick={this.goOrderList}
                >
                  <View className="icon">
                    {stateNum.state_new > 0 && (
                      <FaBadge color="#fff" backgroundColor="red" fontSize="12">
                        {stateNum.state_new}
                      </FaBadge>
                    )}
                    <Image
                      src={require('../../themes/default/user/order/state_new.png')}
                      mode="aspectFit"
                    />
                  </View>
                  <Text>待付款</Text>
                </View>
                <View
                  className="item"
                  data-state-type="state_send"
                  onClick={this.goOrderList}
                >
                  <View className="icon">
                    {stateNum.state_send > 0 && (
                      <FaBadge color="#fff" backgroundColor="red" fontSize="12">
                        {stateNum.state_send}
                      </FaBadge>
                    )}
                    <Image
                      src={require('../../themes/default/user/order/state_pay.png')}
                      mode="aspectFit"
                    />
                  </View>
                  <Text>待收货</Text>
                </View>
                <View
                  className="item"
                  data-state-type="state_success"
                  onClick={this.goOrderList}
                >
                  <View className="icon">
                    <Image
                      src={require('../../themes/default/user/order/state_send.png')}
                      mode="aspectFit"
                    />
                  </View>
                  <Text>已完成</Text>
                </View>
                <View className="item" onClick={this.goEvaluateList}>
                  <View className="icon">
                    {stateNum.state_unevaluate > 0 && (
                      <FaBadge color="#fff" backgroundColor="red" fontSize="12">
                        {stateNum.state_unevaluate}
                      </FaBadge>
                    )}
                    <Image
                      src={require('../../themes/default/user/order/state_unevaluate.png')}
                      mode="aspectFit"
                    />
                  </View>
                  <Text>待评价</Text>
                </View>
                <View className="item" onClick={this.goRefundList}>
                  <View className="icon">
                    {stateNum.state_refund > 0 && (
                      <FaBadge color="#fff" backgroundColor="red" fontSize="12">
                        {stateNum.state_refund}
                      </FaBadge>
                    )}
                    <Image
                      src={require('../../themes/default/user/order/state_refund.png')}
                      mode="aspectFit"
                    />
                  </View>
                  <Text>退款售后</Text>
                </View>
              </View>
            </FaPanel>
            <FaPanel>
              <FaCellGroup>
                <FaCell
                  title="地址管理"
                  isLink="true"
                  url="/pages/user/address/list/index"
                  renderIcon={
                    <Block>
                      <View className="cell-icon">
                        <Image
                          src={require('../../themes/default/user/address.png')}
                          mode="aspectFit"
                          style="width:22px;height: 22px"
                        />
                      </View>
                    </Block>
                  }
                />
                <FaCell
                  title="商品关注"
                  isLink="true"
                  url="/pages/collect/goods/index"
                  renderIcon={
                    <Block>
                      <View className="cell-icon">
                        <Image
                          src={require('../../themes/default/user/collect.png')}
                          mode="aspectFit"
                          style="width:22px;height: 22px"
                        />
                      </View>
                    </Block>
                  }
                />
              </FaCellGroup>
            </FaPanel>
          </Block>
        ) : (
          <Block>
            <UnloginUcenter
              onLogin-success={this.onLoginSuccess}
              onLogin-fail={this.onLoginFail}
            />
          </Block>
        )}
        <View className="fashop-copyright">
          <View className="body">
            <Image
              src={require('../../themes/fashop/copyright.png')}
              mode="aspectFit"
            />
            <Text>提供技术支持</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
