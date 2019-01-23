import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class BuyCalculateInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.goods_amount = param.goods_amount
      this.pay_amount = param.pay_amount
      this.goods_freight_list = param.goods_freight_list
      this.freight_unified_fee = param.freight_unified_fee
      this.freight_template_fee = param.freight_template_fee
      this.pay_freight_fee = param.pay_freight_fee
      this.subtotal = param.goods_amount + param.pay_freight_fee
    } catch (e) {
      throw new Exception(e, 'CartCalculateInterface interface attribute error')
    }
  }
}
