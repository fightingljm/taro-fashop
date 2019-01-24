import { Block, View, ScrollView, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import GoodsCategoryModel from '../../models/goodsCategory.js'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
import fa from '../../utils/fa.js'
import ShopModel from '../../models/shop.js'
import GoodsModel from '../../models/goods.js'

import './index.scss'
const shopModel = new ShopModel()
const goodsCategoryModel = new GoodsCategoryModel()
const goodsModel = new GoodsModel()
// todo 需要重构 如果模板多就不好管理了，初期对微信小程序的理解不够 架构的坑

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    style: 1,
    style1: {
      categoryList: [],
      mainNavClickIndex: 0,
      mainNavScrollIndex: 0,
      mainNavScrollPoints: [],
      categoryId: null
    },
    style2: {
      categoryList: [],
      categoryId: null
    },
    style3: {
      page: 1,
      rows: 10,
      noMore: false,
      list: [],
      style: 3,
      categoryList: [],
      smallImageWidth: 0,
      categoryId: null,
      categoryClickIndex: -1
    }
  }

  async componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    // 店铺配置信息
    const result = await shopModel.info()
    if (result) {
      this.setData({
        style: result.info.goods_category_style + 1
      })
      fa.cache.set('shop_info', result)
      this.init()
    }
  }

  onPullDownRefresh = () => {
    this.init()
    Taro.stopPullDownRefresh()
  }
  init = async () => {
    switch (this.data.style) {
      case 1:
        const categoryListResult = await goodsCategoryModel.list()
        const categoryList = categoryListResult.list

        let mainNavScrollPoints = []
        // 算出主菜单位置
        for (let i = 0; i < categoryList.length; i++) {
          mainNavScrollPoints.push({
            index: i,
            start: 103 * i * parseInt(categoryList[i].childs.length / 3),
            end: 103 * (i + 1) * parseInt(categoryList[i].childs.length / 3)
          })
        }

        this.setData({
          'style1.categoryList': categoryList,
          'style1.mainNavScrollPoints': mainNavScrollPoints
        })
        break
      case 2:
        const categoryListResult2 = await goodsCategoryModel.list()
        const categoryList2 = categoryListResult2.list
        this.setData({
          'style2.categoryList': categoryList2
        })
        break
      case 3:
        const systemInfo = Taro.getSystemInfoSync()
        const categoryListResult3 = await goodsCategoryModel.list()
        const categoryList3 = categoryListResult3.list
        this.setData({
          'style3.smallImageWidth': (systemInfo.windowWidth - 18) / 2,
          'style3.categoryList': categoryList3
        })
        this.style3GetGoodsList()
        break
    }
  }
  mainNavTap = e => {
    this.setData({
      'style1.mainNavClickIndex': e.currentTarget.dataset.index
    })
  }
  subNavScroll = e => {
    const mainNavScrollPoints = this.data.style1.mainNavScrollPoints
    for (let i = 0; 0 <= mainNavScrollPoints.length - 1; i++) {
      // console.log(`当前位置是：${e.detail.scrollTop}，${mainNavScrollPoints[i].start}---${mainNavScrollPoints[i].end}`)
      if (
        mainNavScrollPoints[i].start <= e.detail.scrollTop &&
        e.detail.scrollTop < mainNavScrollPoints[i].end
      ) {
        this.setData({
          'style1.mainNavScrollIndex': mainNavScrollPoints[i].index
        })
        break
      }
    }
  }
  onReachBottom = async () => {
    switch (this.data.style) {
      case 3:
        if (this.data.style3.noMore === true) {
          return false
        } else {
          this.style3GetGoodsList()
        }
        break
    }
  }
  style3GetGoodsList = async () => {
    const { style3 } = this.data
    const page = style3.page
    if (page > 1 && style3.noMore === true) {
      return
    }
    const rows = style3.rows
    const list = page === 1 ? [] : style3.list
    let requestParam = { page, rows }
    if (style3.categoryId > 0) {
      requestParam['category_ids'] = [parseInt(style3.categoryId)]
    }
    const result = await goodsModel.list(requestParam)
    if (result) {
      let data = { page: page + 1 }
      if (result.list.length === 0) {
        data['noMore'] = true
      }
      data['list'] = list.concat(result.list)
      this.setData({
        style3: {
          ...this.data.style3,
          ...data
        }
      })
    }
  }
  style3CategoryClick = e => {
    this.setData({
      'style3.page': 1,
      'style3.categoryId': e.currentTarget.dataset.categoryId,
      'style3.categoryClickIndex': parseInt(e.currentTarget.dataset.index)
    })
    this.style3GetGoodsList()
  }
  goGoodsDetail = e => {
    Taro.navigateTo({
      url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
    })
  }
  categoryClick = e => {
    Taro.navigateTo({
      url: `/pages/goods/search/index?category_id=${
        e.currentTarget.dataset.categoryId
      }&category_keywords=${e.currentTarget.dataset.categoryName}`
    })
  }
  onShareAppMessage = () => {
    const shopInfo = fa.cache.get('shop_info')
    return {
      title: shopInfo.name,
      path: `/pages/index/index`
    }
  }
  config = {
    navigationBarTitleText: '商品分类',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'dark',
    enablePullDownRefresh: true
  }

  render() {
    const {
      style: style,
      style1: style1,
      style2: style2,
      style3: style3
    } = this.state
    return (
      <Block>
        <View style="background-color:#F8F8F8;display: block;overflow: hidden">
          {style === 1 && (
            <Block>
              <View className="goods-category-style-1">
                <aside>
                  <ScrollView scrollY="true" scrollWithAnimation="true">
                    {style1.categoryList.map((item, index) => {
                      return (
                        <Block key="item">
                          <View id={'category_main_' + index}>
                            <details
                              data-id={item.id}
                              data-index={index}
                              onClick={this.mainNavTap}
                              className={
                                style1.mainNavScrollIndex === index
                                  ? 'active'
                                  : ''
                              }
                            >
                              <Text>{item.name}</Text>
                            </details>
                          </View>
                        </Block>
                      )
                    })}
                  </ScrollView>
                </aside>
                <aside>
                  <ScrollView
                    scrollY="true"
                    scrollWithAnimation="true"
                    scrollIntoView={
                      'category_parents_' + style1.mainNavClickIndex
                    }
                    onScroll={this.subNavScroll}
                  >
                    {style1.categoryList.map((item, index) => {
                      return (
                        <Block data-index={index} key="item">
                          <section id={'category_parents_' + index}>
                            {item.childs.map((sub, index) => {
                              return (
                                <Block key="sub">
                                  <dSeetails
                                    data-index={index}
                                    data-category-id={sub.id}
                                    data-category-name={sub.name}
                                    onClick={this.categoryClick}
                                  >
                                    <Image src={sub.icon} mode="aspectFit" />
                                    <Text>{sub.name}</Text>
                                  </dSeetails>
                                </Block>
                              )
                            })}
                          </section>
                        </Block>
                      )
                    })}
                  </ScrollView>
                </aside>
                <View className="line" />
              </View>
            </Block>
          )}
          {style === 2 && (
            <Block>
              <View className="goods-category-style-2">
                <aside>
                  {style2.categoryList.map((item, index) => {
                    return (
                      <Block data-index={index} key="item">
                        <title>
                          <em className="before" />
                          {item.name}
                          <em className="after" />
                        </title>
                        <section data-index={index}>
                          {item.childs.map((sub, index) => {
                            return (
                              <Block key="sub">
                                <details
                                  data-category-id={sub.id}
                                  data-category-name={sub.name}
                                  onClick={this.categoryClick}
                                >
                                  <Image src={sub.icon} mode="aspectFit" />
                                  <Text>{sub.name}</Text>
                                </details>
                              </Block>
                            )
                          })}
                        </section>
                      </Block>
                    )
                  })}
                </aside>
              </View>
            </Block>
          )}
          {style === 3 && (
            <Block>
              <View className="goods-category-style-3">
                <aside>
                  <ScrollView scrollX="true" scrollWithAnimation="true">
                    <details
                      data-id="0"
                      data-index="-1"
                      onClick={this.style3CategoryClick}
                    >
                      <Text
                        className={
                          style3.categoryClickIndex === -1 ? 'active' : ''
                        }
                      >
                        全部
                      </Text>
                    </details>
                    {style3.categoryList.map((item, index) => {
                      return (
                        <Block key="item">
                          <details
                            data-id={item.id}
                            data-index={index}
                            data-category-id={item.id}
                            onClick={this.style3CategoryClick}
                          >
                            <Text
                              className={
                                style3.categoryClickIndex === index
                                  ? 'active'
                                  : ''
                              }
                            >
                              {item.name}
                            </Text>
                          </details>
                        </Block>
                      )
                    })}
                  </ScrollView>
                </aside>
                <section>
                  {style3.list.map((item, pagedataindex) => {
                    return (
                      <Block key="key">
                        <details
                          style={'width:' + style3.smallImageWidth + 'px'}
                          data-id={item.id}
                          onClick={this.goGoodsDetail}
                        >
                          <Image
                            src={item.img}
                            style={
                              'width:' +
                              style3.smallImageWidth +
                              'px;height: ' +
                              style3.smallImageWidth +
                              'px'
                            }
                            mode="aspectFill"
                          />
                          <View className="title-price">
                            <Text>{item.title}</Text>
                            <I>{'¥ ' + item.price}</I>
                          </View>
                        </details>
                      </Block>
                    )
                  })}
                </section>
                <View className="line" />
              </View>
            </Block>
          )}
        </View>
        {/* <view class="change-style-button" bindtap="changeStyle">切换样式</view> */}
      </Block>
    )
  }
}

export default _C
