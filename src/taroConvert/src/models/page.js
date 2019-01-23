import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'

export default class Order extends Model {
  async info(params) {
    try {
      const { result } = await request(api.page.info, { data: params })
      return result.info
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async portal(params) {
    try {
      const { result } = await request(api.page.portal, { data: params })
      return result.info
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
