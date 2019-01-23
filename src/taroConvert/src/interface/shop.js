import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class ShopInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.info = param.info
    } catch (e) {
      throw new Exception(e, 'ShopInfoInterface interface attribute error')
    }
  }
}

export class ShopInfoInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.name = param.name
      this.logo = param.logo
      this.contact_number = param.contact_number
      this.description = param.description
      this.color_scheme = param.color_scheme
      this.portal_template_id = param.portal_template_id
      this.wechat_platform_qr = param.wechat_platform_qr
      this.goods_category_style = param.goods_category_style
      this.host = param.host
      this.order_auto_close_expires = param.order_auto_close_expires
      this.order_auto_confirm_expires = param.order_auto_confirm_expires
      this.order_auto_close_refound_expires =
        param.order_auto_close_refound_expires
    } catch (e) {
      throw new Exception(e, 'ShopInfoInfoInterface interface attribute error')
    }
  }
}
