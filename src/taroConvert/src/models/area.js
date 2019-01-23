import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { AreaListInterface, AreaInfoInterface } from '../interface/area.js'

export default class Area extends Model {
  async list(params) {
    try {
      const { result } = await request(api.area.list, { data: params })
      return new AreaListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async info(params) {
    try {
      const { result } = await request(api.area.info, { data: params })
      return new AreaInfoInterface(result.info)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
