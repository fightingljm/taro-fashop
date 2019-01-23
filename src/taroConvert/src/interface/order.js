import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'
import Time from '../utils/time.js'

export class OrderStateNumInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.state_new = param.state_new
      this.state_send = param.state_send
      this.state_success = param.state_success
      this.state_close = param.state_close
      this.state_unevaluate = param.state_unevaluate
      this.state_refund = param.state_refund
    } catch (e) {
      throw new Exception(e, 'OrderStateNumInterface interface attribute error')
    }
  }
}

export class OrderListInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.total_number = param.total_number
      this.list = param.list.map(function(item) {
        return new OrderListInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(e, 'OrderListInterface interface attribute error')
    }
  }
}

export class OrderListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.sn = param.sn
      this.pay_sn = param.pay_sn
      this.create_time = param.create_time
      this.payment_code = param.payment_code
      this.pay_name = param.pay_name
      this.payment_time = param.payment_time
      this.finnshed_time = param.finnshed_time
      this.goods_amount = param.goods_amount
      this.goods_num = param.goods_num
      this.amount = param.amount
      this.pd_amount = param.pd_amount
      this.freight_fee = param.freight_fee
      this.freight_unified_fee = param.freight_unified_fee
      this.freight_template_fee = param.freight_template_fee
      this.state = param.state
      this.refund_amount = param.refund_amount
      this.refund_state = param.refund_state
      this.lock_state = param.lock_state
      this.delay_time = param.delay_time
      this.tracking_no = param.tracking_no
      this.evaluate_state = param.evaluate_state
      this.trade_no = param.trade_no
      this.evaluate_state = param.evaluate_state
      this.state_desc = param.state_desc
      this.payment_name = param.payment_name
      this.extend_order_extend = param.extend_order_extend
      this.extend_order_goods = param.extend_order_goods.map(function(goods) {
        return new OrderListGoodsInterface(goods)
      })
      this.if_cancel = param.if_pay
      this.if_pay = param.if_pay
      this.if_evaluate = param.if_evaluate
      this.if_receive = param.if_receive
    } catch (e) {
      throw new Exception(e, 'OrderListInfoInterface interface attribute error')
    }
  }
}

export class OrderListGoodsInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.goods_id = param.goods_id
      this.order_id = param.order_id
      this.goods_sku_id = param.goods_sku_id
      this.goods_title = param.goods_title
      this.goods_price = param.goods_price
      this.goods_pay_price = param.goods_pay_price
      this.goods_num = param.goods_num
      this.goods_img = param.goods_img
      this.goods_spec = param.goods_spec
      this.goods_type = param.goods_type
      this.goods_freight_way = param.goods_freight_way
      this.goods_freight_fee = param.goods_freight_fee
      this.evaluate_state = param.evaluate_state
      this.evaluate_time = param.evaluate_time
      this.lock_state = param.lock_state
      this.refund_handle_state = param.refund_handle_state
      this.refund_id = param.refund_id
    } catch (e) {
      throw new Exception(
        e,
        'OrderListGoodsInterface interface attribute error'
      )
    }
  }
}

export class OrderGoodsInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.info = param.info
    } catch (e) {
      throw new Exception(
        e,
        'OrderGoodsInfoInterface interface attribute error'
      )
    }
  }
}

export class OrderGoodsInfoInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.goods_id = param.goods_id
      this.order_id = param.order_id
      this.goods_sku_id = param.goods_sku_id
      this.goods_title = param.goods_title
      this.goods_price = parseFloat(param.goods_price)
      this.goods_pay_price = parseFloat(param.goods_pay_price)
      this.goods_num = param.goods_num
      this.goods_img = param.goods_img
      this.goods_spec = param.goods_spec
      this.goods_spec_string = param.goods_spec.map(function(item) {
        return item.value_id > 0 ? `${item.name}:${item.value_name}` : ''
      })
      this.goods_type = param.goods_type
      this.goods_freight_way = param.goods_freight_way
      this.goods_freight_fee = parseFloat(param.goods_freight_fee)
      this.evaluate_state = param.evaluate_state
      this.evaluate_time = param.evaluate_time
      this.lock_state = param.lock_state
      this.refund_handle_state = param.refund_handle_state
      this.refund_id = param.refund_id
    } catch (e) {
      throw new Exception(
        e,
        'OrderGoodsInfoInfoInterface interface attribute error'
      )
    }
  }
}
