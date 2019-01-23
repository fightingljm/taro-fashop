import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { GoodsListInterface } from '../interface/goods.js'
import { GoodsInterface } from '../interface/goodsDetail.js'

export default class Goods extends Model {
  async list(params) {
    try {
      const { result } = await request(api.goods.list, { data: params })
      return new GoodsListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async info(params) {
    try {
      const { result } = await request(api.goods.info, { data: params })
      return new GoodsInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
