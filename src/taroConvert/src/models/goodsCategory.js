import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { GoodsCategoryListInterface } from '../interface/goodsCategory.js'

export default class GoodsCategory extends Model {
  async list(params) {
    try {
      const { result } = await request(api.goodsCategory.list, { data: params })
      return new GoodsCategoryListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async info(params) {
    try {
      const { result } = await request(api.goodsCategory.info, { data: params })
      return result.info
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
