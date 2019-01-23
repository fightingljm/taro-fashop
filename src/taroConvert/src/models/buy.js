import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import { BuyCalculateInterface } from '../interface/buyCalculate.js'
import {
  BuyCreateOrderInterface,
  BuyPayResultInterface
} from '../interface/buyCreateOrder.js'

export default class Buy extends Model {
  async calculate(params) {
    try {
      const { result } = await request(api.buy.calculate, { data: params })
      return new BuyCalculateInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async create(params) {
    try {
      const { result } = await request(api.buy.create, { data: params })
      return new BuyCreateOrderInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async pay(params) {
    try {
      const { result } = await request(api.buy.pay, { data: params })
      return new BuyPayResultInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
