import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import GoodsModel from '../../../models/goods.js'
import fa from '../../../utils/fa.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import CommonSearch from '../../../components/common/search/index'
import './index.scss'
const goodsModel = new GoodsModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    keywords: '',
    categoryId: 1,
    categoryKeywords: '',
    imageWidth: 0,
    page: 1,
    rows: 10,
    noMore: false,
    list: []
  }

  async componentWillMount({
    keywords = '',
    category_id = '',
    category_keywords = ''
  }) {
    const systemInfo = Taro.getSystemInfoSync()
    this.setData({
      keywords,
      categoryId: category_id,
      categoryKeywords: category_keywords,
      imageWidth: (systemInfo.windowWidth - 18) / 2
    })
    if (category_id) {
      this.getList()
    }
  }

  getList = async () => {
    const page = this.data.page
    if (page > 1 && this.data.noMore === true) {
      return
    }
    const rows = this.data.rows
    const list = page === 1 ? [] : this.data.list
    let requestParam = { page, rows }
    if (this.data.categoryId > 0) {
      requestParam['category_ids'] = [parseInt(this.data.categoryId)]
    }
    if (this.data.keywords) {
      requestParam['keywords'] = this.data.keywords
    }
    const result = await goodsModel.list(requestParam)
    if (result) {
      let data = { page: page + 1 }
      if (result.list.length === 0) {
        data['noMore'] = true
      }
      data['list'] = list.concat(result.list)
      this.setData(data)
    }
  }
  onReachBottom = async () => {
    if (this.data.noMore === true) {
      return false
    } else {
      this.getList()
    }
  }
  goGoodsDetail = e => {
    Taro.navigateTo({
      url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
    })
  }
  onSearchConfirm = e => {
    this.setData({
      keywords: e.detail.keywords,
      categoryId: e.detail.categoryId,
      categoryKeywords: e.detail.categoryKeywords,
      page: 1
    })
  }
  config = {
    navigationBarTitleText: '商品搜索',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'dark'
  }

  render() {
    const {
      keywords: keywords,
      categoryId: categoryId,
      categoryKeywords: categoryKeywords,
      list: list,
      imageWidth: imageWidth
    } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden">
        <CommonSearch
          keywords={keywords}
          showSearchBar="true"
          categoryId={categoryId}
          categoryKeywords={categoryKeywords}
          onSearch-confirm={this.onSearchConfirm}
        />
        {list.length > 0 && (
          <Block>
            <View className="goods-list">
              <Section>
                {list.map((item, pagedataindex) => {
                  return (
                    <Block key="key">
                      <Details
                        style={'width:' + imageWidth + 'px'}
                        onClick={this.goGoodsDetail}
                        data-id={item.id}
                      >
                        <Image
                          src={item.img}
                          style={
                            'width:' +
                            imageWidth +
                            'px;height: ' +
                            imageWidth +
                            'px'
                          }
                          mode="aspectFill"
                        />
                        <View className="title-price">
                          <Text>{item.title}</Text>
                          <I>{'¥ ' + item.price}</I>
                        </View>
                      </Details>
                    </Block>
                  )
                })}
              </Section>
              <View className="line" />
            </View>
          </Block>
        )}
      </View>
    )
  }
}

export default _C
