import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import GoodsCollectModel from '../../../models/goodsCollect.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import './index.scss'
const goodsCollectModel = new GoodsCollectModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    imageWidth: 0,
    page: 1,
    rows: 10,
    noMore: false,
    list: []
  }

  async componentWillMount() {
    const systemInfo = Taro.getSystemInfoSync()
    this.setData({
      imageWidth: (systemInfo.windowWidth - 18) / 2
    })
    this.getList()
  }

  getList = async () => {
    const page = this.data.page
    if (page > 1 && this.data.noMore === true) {
      return
    }
    const rows = this.data.rows
    const list = page === 1 ? [] : this.data.list
    let requestParam = { page, rows }

    const result = await goodsCollectModel.list(requestParam)
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
  config = {
    navigationBarTitleText: '我的收藏',
    navigationBarTextStyle: 'black',
    backgroundTextStyle: 'dark'
  }

  render() {
    const { list: list, imageWidth: imageWidth } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden">
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
        {list.length === 0 && (
          <Block>
            <View className="list-empty">
              <Image
                src={require('../../../themes/default/order/list-empty.png')}
                mode="aspectFill"
              />
              <Text>暂无相关数据</Text>
            </View>
          </Block>
        )}
      </View>
    )
  }
}

export default _C
