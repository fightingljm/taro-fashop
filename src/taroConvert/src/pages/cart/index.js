import { Block, View, Text, Icon, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import CartModel from '../../models/cart.js'
import fa from '../../utils/fa.js'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
import CartLogic from '../../logics/cart.js'
import LoginLogic from '../../logics/login.js'
import GoodsModel from '../../models/goods.js'

import GoodsSkuPopup from '../../components/goods/popupSku/index'
import FaButton from '../../ui/btn/index'
import FaCell from '../../ui/cell/index'
import FaPanel from '../../ui/panel/index'
import FaStepper from '../../ui/stepper/index'
import CartCardEdit from '../../components/cart/editCard/index'
import CartCard from '../../components/cart/card/index'
import './index.scss'
const cartModel = new CartModel()
const goodsModel = new GoodsModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    cartListLoadedState: false,
    onLoaded: false,
    goodsId: null,
    specClickGoodsId: null,
    specClickGoodsSkuId: null,
    inCartNumber: 0,
    goodsInfo: null,
    goodsSkuId: null,
    removeCheckSkuIds: [],
    specIdValueIdsChecked: [],
    isSaveMode: false,
    cartSkuShow: false,
    stepper: 1,
    cartList: [],
    total: 0,
    totalNum: 0,
    checkedGoodsSkuInfoIds: [],
    checkedCartIds: [],
    allChecked: false,
    userInfo: null
  }
  onRemove = async () => {
    await cartModel.del({
      goods_sku_ids: this.data.removeCheckSkuIds
    })
    await this.initCartList()
  }
  onRemoveChecked = e => {
    console.log(e)
    const id = e.currentTarget.dataset.goodsSkuId
    let ids = this.data.removeCheckSkuIds
    !fa.inArray(id, ids) ? ids.push(id) : (ids = fa.remove(ids, id))
    this.setData({
      removeCheckSkuIds: ids
    })
    this.initCartList()
  }
  onAllRemoveChecked = () => {
    let ids = this.data.removeCheckSkuIds
    const allIds = this.data.cartList.map(function(item) {
      return item.goods_sku_id
    })
    ids = allIds.length === ids.length ? [] : allIds
    this.setData({
      removeCheckSkuIds: ids
    })
    this.initCartList()
  }
  onChecked = async e => {
    await cartModel.check({
      goods_sku_ids: [e.currentTarget.dataset.goodsSkuId],
      is_check: fa.inArray(
        this.data.cartList[e.currentTarget.dataset.index].goods_sku_id,
        this.data.checkedGoodsSkuInfoIds
      )
        ? 0
        : 1
    })
    this.initCartList()
  }
  onAllChecked = async () => {
    const cartLength = this.data.cartList.length
    const checkedLength = this.data.checkedGoodsSkuInfoIds.length
    const goodsSkuIds = this.data.cartList.map(function(item) {
      return item.goods_sku_id
    })

    await cartModel.check({
      goods_sku_ids: goodsSkuIds,
      is_check: cartLength === checkedLength ? 0 : 1
    })
    this.initCartList()
  }
  toggleGoodsSkuSelect = () => {
    this.setData({
      cartSkuShow: false
    })
  }
  onCartGoodsSpecClick = async e => {
    this.setData({
      specIdValueIdsChecked:
        e.detail.goodsSkuId !== this.data.goodsSkuId
          ? []
          : this.data.specIdValueIdsChecked,
      goodsId: e.detail.goodsId,
      specClickGoodsId: e.detail.goodsId,
      specClickGoodsSkuId: e.detail.goodsSkuId,
      goodsSkuId: e.detail.goodsSkuId,
      cartSkuShow: true
    })
    await this.initGoodsInfo()
  }
  bindToggleSave = e => {
    this.setData({
      removeCheckSkuIds: [],
      isSaveMode: !this.data.isSaveMode
    })
    this.initCartList()
  }
  goOrderFill = () => {
    Taro.navigateTo({
      url:
        '/pages/cart/orderFill/index?cart_ids=' +
        JSON.stringify(this.data.checkedCartIds)
    })
  }
  goGoodsDetail = e => {
    console.log(e)
    Taro.navigateTo({
      url: `/pages/goods/detail/index?id=${e.detail.goodsId}`
    })
  }
  login = async () => {
    const self = this
    const loginLogic = new LoginLogic({
      success: function(result) {
        if (result.code === 1) {
          self.setData({
            userInfo: fa.cache.get('user_info')
          })
        }
      }
    })
    await loginLogic.wechatLogin()
    this.init()
  }
  onPullDownRefresh = async () => {
    await cartModel.list()
    Taro.stopPullDownRefresh()
  }
  inCartNumberChange = async e => {
    const goods_sku_id = this.data.cartList[e.detail.index].goods_sku_id
    const number = e.detail.number

    const cartLogic = new CartLogic()
    const result = await cartLogic.save(goods_sku_id, number)
    if (result !== false) {
      this.initCartList()
    } else {
      fa.toast.show({
        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
      })
    }
  }

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  async componentDidShow() {
    await this.init()
  }

  init = async () => {
    const user_info = fa.cache.get('user_info')
    this.setData({
      userInfo: user_info ? user_info : null,
      onLoaded: true
    })
    if (fa.cache.get('user_info')) {
      await this.initCartList()
    }
  }
  initCartList = async () => {
    // 计算金额
    let total = 0
    let totalNum = 0
    let checkedGoodsSkuInfoIds = []
    let checkedCartIds = []
    const result = await cartModel.list()
    if (result.list) {
      const cartList = result.list
      for (let i = 0; i < cartList.length; i++) {
        cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function(
          item
        ) {
          return `${item.name}:${item.value_name}`
        })

        if (cartList[i].checked === true) {
          checkedCartIds.push(cartList[i].id)
          checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id)
          // todo 多个float相加有bug 暂时想不通
          total +=
            parseFloat(cartList[i].goods_price).toFixed(2) *
            cartList[i].goods_num
          totalNum += cartList[i].goods_num
        }

        if (fa.inArray(cartList[i].goods_sku_id, this.data.removeCheckSkuIds)) {
          cartList[i]['remove_checked'] = true
        } else {
          cartList[i]['remove_checked'] = false
        }
      }
      total = total.toFixed(2)

      this.setData({
        cartListLoadedState: true,
        checkedCartIds,
        checkedGoodsSkuInfoIds,
        total,
        totalNum,
        cartList
      })
    } else {
      fa.toast.show({
        title: fa.code.parse(cartModel.getException().getCode())
      })
    }
  }
  initGoodsInfo = async () => {
    const result = await goodsModel.info({
      id: this.data.goodsId
    })
    if (result) {
      let goodsInfo = result.info
      for (let i = 0; i < this.data.cartList.length; i++) {
        if (this.data.cartList[i].goods_sku_id === this.data.goodsSkuId) {
          this.setData({
            stepper: this.data.cartList[i].goods_num
          })
          break
        }
      }
      this.setData({
        goodsInfo
      })
    } else {
      fa.toast.show({
        title: fa.code.parse(goodsModel.getException().getCode())
      })
    }
  }
  onStepperChange = e => {
    this.setData({
      stepper: e.detail
    })
  }
  onGoodsSkuMatchSuccess = async e => {
    this.setData({
      goodsSkuInfo: e.detail.goodsSkuInfo
    })
    const cartGoods = await cartModel.info({
      goods_sku_id: e.detail.goodsSkuInfo.id
    })
    if (cartGoods) {
      this.setData({
        cartGoods: cartGoods,
        inCartNumber: cartGoods.goods_num
      })
    }
  }
  onGoodsSkuMatchFail = async e => {
    this.setData({
      specIdValueIdsChecked: e.detail.specIdValueIdsChecked,
      goodsSkuInfo: null,
      cartGoods: null,
      inCartNumber: 0
    })
  }
  changeSkuConfirm = async () => {
    const stepper = this.data.stepper
    const goodsSkuInfo = this.data.goodsSkuInfo
    const specClickGoodsSkuId = this.data.specClickGoodsSkuId
    if (!goodsSkuInfo) {
      return false
    } else {
      if (stepper > goodsSkuInfo.stock) {
        fa.toast.show({
          title: '库存不足' // todo 加入到code
        })
      } else {
        const cartLogic = new CartLogic()
        const result = await cartLogic.change(
          specClickGoodsSkuId,
          goodsSkuInfo.id,
          stepper
        )
        if (result !== false) {
          this.initCartList()
          this.toggleGoodsSkuSelect()
        } else {
          fa.toast.show({
            title: fa.code.parse(cartLogic.cartModel.getException().getCode())
          })
        }
      }
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
    navigationBarTitleText: '购物车',
    enablePullDownRefresh: true
  }

  render() {
    const {
      onLoaded: onLoaded,
      userInfo: userInfo,
      cartList: cartList,
      isSaveMode: isSaveMode,
      goods_pay_type: goods_pay_type,
      checkedGoodsSkuInfoIds: checkedGoodsSkuInfoIds,
      total: total,
      totalNum: totalNum,
      removeCheckSkuIds: removeCheckSkuIds,
      cartListLoadedState: cartListLoadedState,
      goodsInfo: goodsInfo,
      cartSkuShow: cartSkuShow,
      inCartNumber: inCartNumber,
      stepper: stepper
    } = this.state
    return (
      <Block>
        {onLoaded && (
          <View className="cart">
            {userInfo !== null && (
              <Block>
                {cartList.length > 0 && (
                  <Block>
                    {isSaveMode === false ? (
                      <Block>
                        <FaPanel className="save-action-panel">
                          <View className="header">
                            <Text
                              className="edit-save"
                              onClick={this.bindToggleSave}
                            >
                              编辑商品
                            </Text>
                          </View>
                        </FaPanel>
                        <FaPanel>
                          <Section>
                            {cartList.map((item, index) => {
                              return (
                                <Block key="key">
                                  <Details>
                                    <Aside className="left">
                                      <Icon
                                        type="success"
                                        size="16"
                                        data-index={index}
                                        data-goods-sku-id={item.goods_sku_id}
                                        data-id={item.id}
                                        color={item.checked ? 'red' : '#ccc'}
                                        onClick={this.onChecked}
                                      />
                                    </Aside>
                                    <Aside className="right">
                                      <CartCard
                                        index={index}
                                        image={item.goods_sku_img}
                                        title={item.goods_title}
                                        price={item.goods_price}
                                        spec={
                                          (goods_pay_type === 2
                                            ? item.goods_weight > 0
                                              ? '重量:' +
                                                item.goods_weight +
                                                'kg'
                                              : '不计重量'
                                            : '') +
                                          (item.goods_spec[0].id !== 0
                                            ? item.goods_spec_string
                                            : '')
                                        }
                                        canSkuSelect={
                                          item.goods_spec[0].id !== 0
                                            ? true
                                            : false
                                        }
                                        num={item.goods_num}
                                        goodsSkuId={item.goods_sku_id}
                                        goodsId={item.goods_id}
                                        onClick={this.goGoodsDetail}
                                        onSpecClick={this.onCartGoodsSpecClick}
                                        onNumberChange={this.inCartNumberChange}
                                      />
                                    </Aside>
                                  </Details>
                                </Block>
                              )
                            })}
                          </Section>
                        </FaPanel>
                        <Footer className="un-save-mode">
                          <View className="footer">
                            <View className="left">
                              <View
                                className="all-action"
                                onClick={this.onAllChecked}
                              >
                                <Icon
                                  type="success"
                                  size="16"
                                  color={
                                    checkedGoodsSkuInfoIds.length ===
                                    cartList.length
                                      ? 'red'
                                      : '#ccc'
                                  }
                                />
                                <Span>全选</Span>
                              </View>
                              <Details>
                                合计：<Span>{'¥' + total}</Span>
                              </Details>
                            </View>
                            <View className="right">
                              <FaButton
                                type="danger"
                                size="large"
                                onBtnclick={this.goOrderFill}
                              >
                                去结算<I>{'(' + totalNum + '件)'}</I>
                              </FaButton>
                            </View>
                          </View>
                        </Footer>
                      </Block>
                    ) : (
                      <Block>
                        <FaPanel className="save-action-panel">
                          <View className="header">
                            <Text
                              className="edit-save"
                              onClick={this.bindToggleSave}
                            >
                              完成
                            </Text>
                          </View>
                        </FaPanel>
                        <FaPanel>
                          <Section>
                            {cartList.map((item, pagedataindex) => {
                              return (
                                <Block key="key">
                                  <Details>
                                    <Aside className="left">
                                      <Icon
                                        type="success"
                                        size="16"
                                        data-index={index}
                                        data-goods-sku-id={item.goods_sku_id}
                                        color={
                                          item.remove_checked ? 'red' : '#ccc'
                                        }
                                        onClick={this.onRemoveChecked}
                                      />
                                    </Aside>
                                    <Aside className="right">
                                      <CartCardEdit
                                        image={item.goods_sku_img}
                                        title={item.goods_title}
                                        price={item.goods_price}
                                        spec={
                                          (item.goods_pay_type === 2
                                            ? item.goods_weight > 0
                                              ? '重量:' +
                                                item.goods_weight +
                                                'kg'
                                              : '不计重量'
                                            : '') +
                                          (item.goods_spec.length > 1
                                            ? item.goods_spec_string
                                            : '')
                                        }
                                        num={item.goods_num}
                                        goodsSkuId={item.goods_sku_id}
                                        goodsId={item.goods_id}
                                        onClick={this.goGoodsDetail}
                                        cartId={item.id}
                                      />
                                    </Aside>
                                  </Details>
                                </Block>
                              )
                            })}
                          </Section>
                        </FaPanel>
                        <Footer className="is-save-mode">
                          <View className="footer">
                            <View className="left">
                              <View
                                className="all-action"
                                onClick={this.onAllRemoveChecked}
                              >
                                <Icon
                                  type="success"
                                  size="16"
                                  color={
                                    removeCheckSkuIds.length === cartList.length
                                      ? 'red'
                                      : '#ccc'
                                  }
                                />
                                <Span>全选</Span>
                              </View>
                            </View>
                            <View className="right">
                              {/* <fa-button class="collect" type="warn" size="small" bind:btnclick="onCollect">移入收藏 */}
                              {/* </fa-button> */}
                              <FaButton
                                type="danger"
                                size="small"
                                onBtnclick={this.onRemove}
                              >
                                删除
                              </FaButton>
                            </View>
                          </View>
                        </Footer>
                      </Block>
                    )}
                  </Block>
                )}
                {cartListLoadedState === true && cartList.length === 0 && (
                  <Block>
                    <View className="cart-empty">
                      <Image
                        src={require('../../themes/default/cart/empty.png')}
                        mode="aspectFill"
                      />
                      <Text>购物车居然是空的，再逛逛吧</Text>
                    </View>
                  </Block>
                )}
              </Block>
            )}
            {userInfo === null && (
              <Block>
                <View className="unlogin">
                  <Image
                    src={require('../../themes/default/cart/unlogin.png')}
                    mode="aspectFill"
                  />
                  <Text>您还未登录，无法查看购物车</Text>
                  <FaButton type="danger" size="small" onBtnclick={this.login}>
                    去登陆
                  </FaButton>
                </View>
              </Block>
            )}
          </View>
        )}
        {goodsInfo && (
          <GoodsSkuPopup
            show={cartSkuShow}
            goodsInfo={goodsInfo}
            inCartNumber={inCartNumber}
            stepperNumber={stepper}
            onClose={this.toggleGoodsSkuSelect}
            onClick-overlay={this.toggleGoodsSkuSelect}
            onConfirm-click={this.changeSkuConfirm}
            onStepper-change={this.onStepperChange}
            onGoods-sku-match-success={this.onGoodsSkuMatchSuccess}
            onGoods-sku-match-fail={this.onGoodsSkuMatchFail}
          />
        )}
      </Block>
    )
  }
}

export default _C
