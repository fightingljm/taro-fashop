import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module.js'
import PageModel from '../../models/page.js'
import GoodsCategoryModel from '../../models/goodsCategory.js'
import PageVideo from '../../components/page/video/index'
import PageTextNav from '../../components/page/textNav/index'
import PageColumnTitle from '../../components/page/columnTitle/index'
import PagePlaceholderLine from '../../components/page/placeholderLine/index'
import PageIconNavBar from '../../components/page/iconNavBar/index'
import PagePicWindow from '../../components/page/picWindow/index'
import PageGoodsSearch from '../../components/page/goodsSearch/index'
import PageDivider from '../../components/page/divider/index'
import PageGoodsList from '../../components/page/goodsList/index'
import PageGoods from '../../components/page/goods/index'
import PageGridNavBar from '../../components/page/gridNavBar/index'
import PageBanner from '../../components/page/banner/index'
const pageModel = new PageModel()
const categoryModel = new GoodsCategoryModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    pageData: [],
    backgroundColor: '#f8f8f8'
  }

  componentWillMount() {
    Taro.showShareMenu({
      withShareTicket: true
    })
    this.initPage()
  }

  onBannerClick = e => {
    const dataSource = e.detail.dataSource
    const info = dataSource.data[e.detail.index]
    this.handelLink(info.link)
  }
  onGridNavBarClick = e => {
    const dataSource = e.detail.dataSource
    const info = dataSource.data[e.detail.index]
    this.handelLink(info.link)
  }
  onGoodsClick = e => {
    const dataSource = e.detail.dataSource
    const goods = dataSource.data[e.detail.index]
    const link = {
      action: 'goods',
      param: {
        id: goods.id
      }
    }
    this.handelLink(link)
  }
  onIconNavClick = e => {
    const dataSource = e.detail.dataSource
    const info = dataSource.data[e.detail.index]
    this.handelLink(info.link)
  }
  onTextNavClick = e => {
    const dataSource = e.detail.dataSource
    const info = dataSource.data[e.detail.index]
    this.handelLink(info.link)
  }
  onShopWindowClick = e => {
    const dataSource = e.detail.dataSource
    const info = dataSource.data[e.detail.index]
    this.handelLink(info.link)
  }
  onSearchClick = () => {
    Taro.navigateTo({
      url: `/pages/goods/search/index`
    })
  }
  initPage = async () => {
    const page = await pageModel.portal()
    this.setData({
      pageData: page.body,
      backgroundColor: page.background_color
    })
    Taro.setNavigationBarTitle({
      title: page.name
    })
  }
  onPullDownRefresh = () => {
    this.initPage()
    Taro.stopPullDownRefresh()
  }
  handelLink = async link => {
    switch (link.action) {
      case 'portal':
        Taro.switchTab({
          url: '/pages/index/index'
        })
        break
      case 'goods':
        Taro.navigateTo({
          url: `/pages/goods/detail/index?id=${link.param.id}`
        })
        break
      case 'page':
        Taro.navigateTo({
          url: `/pages/page/index?id=${link.param.id}`
        })
        break
      case 'goods_category':
        const category = await categoryModel.info({
          id: link.param.id
        })
        Taro.navigateTo({
          url: `/pages/goods/search/index?category_id=${
            link.param.id
          }&category_keywords=${category.name}`
        })
        break
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
    navigationBarTitleText: 'FaShop商城系统',
    enablePullDownRefresh: true
  }

  render() {
    const { backgroundColor: backgroundColor, pageData: pageData } = this.state
    return (
      <View
        style={
          'background-color:' +
          backgroundColor +
          ';display: block;overflow: hidden'
        }
      >
        {pageData.map((item, pagedataindex) => {
          return (
            <View key="key">
              {item.type === 'image_ads' ? (
                <Block>
                  <PageBanner dataSource={item} onClick={this.onBannerClick} />
                </Block>
              ) : item.type === 'image_nav' ? (
                <Block>
                  <PageGridNavBar
                    dataSource={item}
                    onClick={this.onGridNavBarClick}
                  />
                </Block>
              ) : item.type === 'goods' ? (
                <Block>
                  <PageGoodsList
                    dataSource={item}
                    onClick={this.onGoodsClick}
                  />
                </Block>
              ) : item.type === 'goods_list' ? (
                <Block>
                  <PageGoodsList
                    dataSource={item}
                    onClick={this.onGoodsClick}
                  />
                </Block>
              ) : item.type === 'separator' ? (
                <Block>
                  <PageDivider dataSource={item} />
                </Block>
              ) : item.type === 'goods_search' ? (
                <Block>
                  <PageGoodsSearch
                    dataSource={item}
                    onClick={this.onSearchClick}
                  />
                </Block>
              ) : item.type === 'shop_window' ? (
                <Block>
                  <PagePicWindow
                    dataSource={item}
                    onClick={this.onShopWindowClick}
                  />
                </Block>
              ) : item.type === 'top_menu' ? (
                <Block>
                  <PageIconNavBar
                    dataSource={item}
                    onClick={this.onIconNavClick}
                  />
                </Block>
              ) : item.type === 'auxiliary_blank' ? (
                <Block>
                  <PagePlaceholderLine dataSource={item} />
                </Block>
              ) : item.type === 'title' ? (
                <Block>
                  <PageColumnTitle dataSource={item} />
                </Block>
              ) : item.type === 'text_nav' ? (
                <Block>
                  <PageTextNav
                    dataSource={item}
                    onClick={this.onTextNavClick}
                  />
                </Block>
              ) : (
                item.type === 'video' && (
                  <Block>
                    <PageVideo dataSource={item} />
                  </Block>
                )
              )}
            </View>
          )
        })}
      </View>
    )
  }
}

export default _C
