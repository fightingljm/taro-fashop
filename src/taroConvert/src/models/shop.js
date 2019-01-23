import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { ShopInfoInterface } from '../interface/shop.js'

export default class Shop extends Model {
  async info(params) {
    try {
      const { result } = await request(api.shop.info, { data: params })
      return result
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
