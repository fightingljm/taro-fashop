import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { GoodsEvaluateListInterface } from '../interface/goods.js'
import {
  GoodsEvaluateListInterface as GoodsEvaluateMineInterface,
  GoodsEvaluateInfoInterface
} from '../interface/goodsEvaluate.js'

export default class GoodsEvaluate extends Model {
  async list(params) {
    try {
      const { result } = await request(api.goodsEvaluate.list, { data: params })
      return new GoodsEvaluateListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async mine(params) {
    try {
      const { result } = await request(api.goodsEvaluate.mine, { data: params })
      return new GoodsEvaluateMineInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async add(params) {
    try {
      await request(api.goodsEvaluate.add, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async info(params) {
    try {
      const { result } = await request(api.goodsEvaluate.info, { data: params })
      return new GoodsEvaluateInfoInterface(result.info)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async append(params) {
    try {
      await request(api.goodsEvaluate.append, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async isEvaluated(params) {
    try {
      await request(api.goodsEvaluate.isEvaluated, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
