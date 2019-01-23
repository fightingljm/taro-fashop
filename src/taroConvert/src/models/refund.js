import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module.js'
import { api, request } from '../api.js'
import Model from '../utils/model.js'
import {
  RefundListInterface,
  RefundInfoInterface
} from '../interface/refund.js'
import { RefundResonListInterface } from '../interface/refundReson.js'

export default class Refund extends Model {
  async reasonList(params) {
    try {
      const { result } = await request(api.refund.reasonList, { data: params })
      return new RefundResonListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async list(params) {
    try {
      const { result } = await request(api.refund.list, { data: params })
      return new RefundListInterface(result)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async info(params) {
    try {
      const { result } = await request(api.refund.info, { data: params })
      return new RefundInfoInterface(result.info)
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async apply(params) {
    try {
      await request(api.refund.apply, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async setTrackingNo(params) {
    try {
      await request(api.refund.setTrackingNo, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
  async revoke(params) {
    try {
      await request(api.refund.revoke, { data: params })
      return true
    } catch (e) {
      this.setException(e)
      return false
    }
  }
}
