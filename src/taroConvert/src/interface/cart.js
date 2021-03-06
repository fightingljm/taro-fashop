import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class CartListInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.list = param.list.map(function(item) {
        return new CartListInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(e, 'CartListInterface interface attribute error')
    }
  }
}

export class CartListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.goods_sku_id = param.goods_sku_id
      this.goods_num = param.goods_num
      this.goods_id = param.goods_id
      this.goods_title = param.goods_title
      this.goods_is_on_sale = param.goods_is_on_sale
      this.goods_freight_fee = param.goods_freight_fee
      this.goods_freight_id = param.goods_freight_id
      this.goods_pay_type = param.goods_pay_type
      this.goods_price = param.goods_price
      this.goods_spec = param.goods_spec
      this.goods_weight = param.goods_weight
      this.goods_stock = param.goods_stock
      this.goods_sku_img = param.goods_sku_img
      this.goods_freight_areas = param.goods_freight_areas
      this.goods_stock = param.goods_stock
      this.create_time = param.create_time
      this.checked = param.is_check === 1
    } catch (e) {
      throw new Exception(e, 'CartListInfoInterface interface attribute error')
    }
  }
}
