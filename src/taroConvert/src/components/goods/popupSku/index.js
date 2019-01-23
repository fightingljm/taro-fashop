import { Block, View, Image, Text, Label, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'

import FaButton from '../../../ui/btn/index'
import LoginView from '../../login/view/index'
import FaPopup from '../../../ui/popup/index'
import FaStepper from '../../../ui/stepper/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    show: false,
    goodsSkuId: null,
    confirmButtonText: '确定',
    stepperNumber: 0,
    inCartNumber: 0,
    goodsInfo: null,
    goodsSkuInfo: null,
    priceSeparator: ' - ',
    specValueIdsChecked: [],
    specIdValueIdsChecked: []
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  state = {
    prcie: null,
    spec_list: [],
    prevGoodsId: null,
    userInfo: null
  }
  ready = () => {
    let price = this.generatePice()
    this.setData({
      userInfo: fa.cache.get('user_info'),
      price
    })
    // 单商品主动模拟触发点击事件
    if (this.data.goodsInfo.sku_list[0].spec_sign === '[0]') {
      this.setData(
        {
          specIdValueIdsChecked: ['0'] // 不设为string写会有bug 原因不详
        },
        () => {
          this.onSpecClick({
            currentTarget: {
              dataset: {
                specValueId: 0,
                specId: 0
              }
            }
          })
        }
      )
    }
  }
  onLoginSuccess = () => {
    this.setData({
      userInfo: fa.cache.get('user_info')
    })
  }
  onSpecClick = e => {
    const goodsInfo = this.data.goodsInfo
    const specValueId = e.currentTarget.dataset.specValueId
    const specId = e.currentTarget.dataset.specId
    let specIdValueIdsChecked = this.data.specIdValueIdsChecked

    // 取消选中
    if (specIdValueIdsChecked[specId] === specValueId) {
      delete specIdValueIdsChecked[specId]
    } else {
      // 选中
      specIdValueIdsChecked[specId] = specValueId
    }
    this.setData({
      specIdValueIdsChecked
    })
    this.initSpecList()
    // 判断是否有匹配的sku
    let specValueIdsChecked = []
    for (let i = 0; i < specIdValueIdsChecked.length; i++) {
      if (typeof specIdValueIdsChecked[i] !== 'undefined') {
        specValueIdsChecked.push(specIdValueIdsChecked[i])
      }
    }
    this.setData({
      specValueIdsChecked
    })
    let goodsSkuInfo = null
    if (this.data.goodsInfo.spec_list.length === specValueIdsChecked.length) {
      const matchResult = this.matchSku()
      goodsSkuInfo = matchResult.goodsSkuInfo
      console.log(goodsSkuInfo)
      console.log('goods-sku-match-success')
      this.triggerEvent('goods-sku-match-success', {
        goodsSkuInfo: matchResult.goodsSkuInfo,
        skuListIndex: matchResult.skuListIndex,
        specIdValueIdsChecked: this.data.specIdValueIdsChecked
      })
    } else {
      this.triggerEvent('goods-sku-match-fail', {
        specIdValueIdsChecked: this.data.specIdValueIdsChecked
      })
    }
    let price = this.generatePice()
    this.setData({
      prevGoodsId: goodsInfo === null ? null : goodsInfo.id,
      price,
      goodsSkuInfo
    })
  }
  matchSku = () => {
    const goodsInfo = this.data.goodsInfo
    const spec_value_sign = this.data.specValueIdsChecked.sort(function(a, b) {
      return a - b
    })
    let goodsSkuInfo = null
    let skuListIndex = null
    const spec_value_sign_string = JSON.stringify(spec_value_sign)
    for (let i = 0; i < goodsInfo.sku_list.length; i++) {
      if (goodsInfo.sku_list[i].spec_value_sign === spec_value_sign_string) {
        goodsSkuInfo = goodsInfo.sku_list[i]
        skuListIndex = i
        break
      }
    }
    return {
      goodsSkuInfo,
      skuListIndex
    }
  }
  initSpecList = () => {
    const goodsInfo = this.data.goodsInfo
    let specIdValueIdsChecked = this.data.specIdValueIdsChecked
    goodsInfo.spec_list = goodsInfo.spec_list.map(function(item) {
      return {
        id: item.id,
        name: item.name,
        value_list: item.value_list.map(function(sub) {
          return {
            id: sub.id,
            name: sub.name,
            checked: sub.id === specIdValueIdsChecked[item.id]
          }
        })
      }
    })
    this.setData({
      goodsInfo
    })
  }
  generatePice = () => {
    const goodsInfo = this.data.goodsInfo
    let price = goodsInfo.sku_list[0].price
    // 如果是有规格商品
    if (goodsInfo.sku_list.length > 1) {
      let prices = goodsInfo.sku_list.map(function(item) {
        return item.price
      })
      // 如果是多条就区间
      prices = prices.sort(function(a, b) {
        return a - b
      })
      // 如果价格相同
      if (prices[0] !== prices[prices.length - 1]) {
        price = `${prices[0]}${this.data.priceSeparator}${
          prices[prices.length - 1]
        }`
      }
    }
    return price
  }
  onClick = () => {
    this.triggerEvent('click', {
      goodsSkuId: this.data.goodsSkuId
    })
  }
  onPopupClose = () => {
    this.setData({
      specIdValueIdsChecked: [],
      specValueIdsChecked: []
    })

    this.triggerEvent('close')
  }
  onConfirmClick = () => {
    if (this.data.userInfo !== null) {
      this.triggerEvent('confirm-click')
    }
  }
  onStepperChange = e => {
    this.triggerEvent('stepper-change', e.detail)
  }
  _inArray = (search, array) => {
    for (let i in array) {
      if (array[i] === search) {
        return true
      }
    }
    return false
  }
  _remove = (arr, item) => {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== item) {
        result.push(arr[i])
      }
    }
    return result
  }
  config = {
    component: true
  }

  render() {
    const {
      show: show,
      goodsSkuId: goodsSkuId,
      confirmButtonText: confirmButtonText,
      stepperNumber: stepperNumber,
      inCartNumber: inCartNumber,
      goodsInfo: goodsInfo,
      goodsSkuInfo: goodsSkuInfo,
      priceSeparator: priceSeparator,
      specValueIdsChecked: specValueIdsChecked,
      specIdValueIdsChecked: specIdValueIdsChecked
    } = this.props
    const { price: price } = this.state
    return (
      <View className="popup-sku">
        <FaPopup show={show} type="bottom" onClose={this.onPopupClose}>
          <View className="choice-spec">
            <View className="header">
              <View className="goods-img">
                <Image src={goodsInfo.img} mode="aspectFill" />
                <View className="goods-title">
                  <Text>{'¥ ' + price}</Text>
                  {goodsSkuInfo === null && <Label>{goodsInfo.title}</Label>}
                  {goodsSkuInfo !== null && (
                    <Label>
                      {'已选：' + goodsSkuInfo.title}
                      {inCartNumber > 0 && <Block>{inCartNumber + '件'}</Block>}
                    </Label>
                  )}
                </View>
              </View>
              <View className="close-action" onClick={this.onPopupClose}>
                <Image
                  src={require('./goods-sku-close.png')}
                  mode="aspectFill"
                />
              </View>
            </View>
            {goodsInfo.spec_list[0].id > 0 && (
              <ScrollView
                scrollY="true"
                scrollWithAnimation="true"
                style="max-height: 50vh"
              >
                <View className="spec-list">
                  {goodsInfo.spec_list.map((spec, spec_index) => {
                    return (
                      <Block key="spec_list">
                        <View className="item">
                          <Text className="title">{spec.name}</Text>
                          <View className="spec">
                            {spec.value_list.map((value, value_index) => {
                              return (
                                <Block key="value_list">
                                  {value.checked === true ? (
                                    <Block>
                                      <Text
                                        className="spec-title active"
                                        data-spec-id={spec.id}
                                        data-spec-value-id={value.id}
                                        onClick={this.onSpecClick}
                                      >
                                        {value.name}
                                      </Text>
                                    </Block>
                                  ) : (
                                    <Block>
                                      <Text
                                        className="spec-title"
                                        data-spec-id={spec.id}
                                        data-spec-value-id={value.id}
                                        onClick={this.onSpecClick}
                                      >
                                        {value.name}
                                      </Text>
                                    </Block>
                                  )}
                                  {/* <text class="{{value.checked===true ? 'spec-title-active' : 'spec-title'}}">这样写有bug 具体原因不详</text> */}
                                </Block>
                              )
                            })}
                          </View>
                        </View>
                      </Block>
                    )
                  })}
                </View>
              </ScrollView>
            )}
            <View className="number">
              <Text>数量</Text>
              <FaStepper
                stepper={stepperNumber}
                min="1"
                max="999"
                onChange={this.onStepperChange}
              />
            </View>
            <View className="footer">
              <LoginView onSuccess={this.onLoginSuccess}>
                <FaButton
                  type="danger"
                  size="large"
                  onBtnclick={this.onConfirmClick}
                  disabled={!goodsSkuInfo}
                >
                  {confirmButtonText}
                </FaButton>
              </LoginView>
            </View>
          </View>
        </FaPopup>
      </View>
    )
  }
}

export default _C
