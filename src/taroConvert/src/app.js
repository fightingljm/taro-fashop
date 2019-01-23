import { Block } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import regeneratorRuntime from 'libs/regenerator-runtime/runtime-module'
import ShopModel from './models/shop.js'
import AreaModel from './models/area.js'
import fa from './utils/fa.js'
import LoginLogic from './logics/login.js'

import './app.scss'
const shopModel = new ShopModel()
const areaModel = new AreaModel()
const loginLogic = new LoginLogic()

class App extends Taro.Component {
  async componentWillMount() {
    this.$app.globalData = this.globalData

    // 防止token过期
    const existUserInfo = fa.cache.get('user_info')
    if (typeof existUserInfo['id'] !== 'undefined') {
      await loginLogic.wechatLogin(false)
    }
    // 店铺配置信息
    const result = await shopModel.info()
    if (result) {
      fa.cache.set('shop_info', result)
    }
    // 地址预加载
    areaModel.list({ level: 2 }).then(function(data) {
      fa.cache.set('area_list_level2', data)
    })
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/category/index',
      'pages/cart/index',
      'pages/goods/detail/index',
      'pages/goods/search/index',
      'pages/user/index',
      'pages/address/add/index',
      'pages/user/address/add/index',
      'pages/user/address/list/index',
      'pages/user/address/edit/index',
      'pages/page/index',
      'pages/refund/list/index',
      'pages/refund/serviceApply/index',
      'pages/address/list/index',
      'pages/order/detail/index',
      'pages/refund/detail/index',
      'pages/evaluate/list/index',
      'pages/evaluate/additional/index',
      'pages/evaluate/add/index',
      'pages/order/list/index',
      'pages/address/edit/index',
      'pages/evaluate/detail/index',
      'pages/collect/goods/index',
      'pages/refund/logisticsFill/index',
      'pages/goods/evaluateList/index',
      'pages/cart/orderFill/index',
      'pages/goods/list/index',
      'pages/user/login/index',
      'pages/pay/result/index',
      'pages/user/setting/bind/phone/index',
      'pages/user/setting/bind/index',
      'pages/user/setting/userinfo/index',
      'pages/user/setting/index',
      'pages/cart/listing/index',
      'pages/refund/serviceType/index',
      'pages/user/register/smscode/index',
      'pages/user/register/password/index',
      'pages/user/register/index',
      'pages/user/editPassword/index',
      'pages/user/editPassword/password/index',
      'pages/user/findPassword/password/index',
      'pages/user/findPassword/index',
      'pages/user/findPassword/smscode/index',
      'pages/webView/index'
    ],
    window: {
      navigationBarTitleText: 'FaShop',
      navigationBarBackgroundColor: '#F8F8F8',
      navigationBarTextStyle: 'black',
      backgroundTextStyle: 'dark',
      backgroundColorTop: '#F8F8F8',
      backgroundColorBottom: '#F8F8F8'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          iconPath: 'themes/default/tabbar/home.png',
          selectedIconPath: 'themes/default/tabbar/home-a.png',
          text: '首页'
        },
        {
          pagePath: 'pages/category/index',
          iconPath: 'themes/default/tabbar/category.png',
          selectedIconPath: 'themes/default/tabbar/category-a.png',
          text: '分类'
        },
        {
          pagePath: 'pages/cart/index',
          iconPath: 'themes/default/tabbar/cart.png',
          selectedIconPath: 'themes/default/tabbar/cart-a.png',
          text: '购物车'
        },
        {
          pagePath: 'pages/user/index',
          iconPath: 'themes/default/tabbar/user.png',
          selectedIconPath: 'themes/default/tabbar/user-a.png',
          text: '我的'
        }
      ]
    },
    networkTimeout: {
      request: 10000,
      downloadFile: 10000
    },
    debug: true
  }

  render() {
    return null
  }
}

export default App
Taro.render(<App />, document.getElementById('app'))
