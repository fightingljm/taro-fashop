import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import GoodsEvaluateModel from '../../../models/goodsEvaluate.js'

import GoodsEvaluateCard from '../../../components/goods/evaluate/card/index'
import './index.scss'
const goodsEvaluateModel = new GoodsEvaluateModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    page: 1,
    rows: 10,
    noMore: false,
    list: []
  }

  async componentWillMount({ goods_id }) {
    this.setData({ goods_id: goods_id })
    this.getList()
  }

  getList = async () => {
    const page = this.data.page
    if (page > 1 && this.data.noMore === true) {
      return
    }
    const rows = this.data.rows
    const list = page === 1 ? [] : this.data.list
    const goods_id = this.data.goods_id
    let requestParam = { page, rows, goods_id }
    const result = await goodsEvaluateModel.list(requestParam)
    console.log(result)
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
  config = {
    navigationBarTitleText: '商品评价'
  }

  render() {
    const { list: list } = this.state
    return (
      <View className="page-container">
        <View className="goods-evaluate-list">
          {list.map((item, index) => {
            return (
              <Block key="key">
                <GoodsEvaluateCard info={item} />
              </Block>
            )
          })}
        </View>
      </View>
    )
  }
}

export default _C
