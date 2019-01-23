import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class GoodsListInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.total_number = param.total_number
      this.list = param.list.map(function(item) {
        return new GoodsListInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(e, 'GoodsListInterface interface attribute error')
    }
  }
}

export class GoodsListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.title = param.title
      this.images = param.images.map(function(item) {
        return new GoodsListInfoImagesInterface(item)
      })
      this.category_ids = param.category_ids
      this.base_sale_num = param.base_sale_num
      this.freight_id = param.freight_id
      // todo body
      this.body = param.body
      this.is_on_sale = param.is_on_sale
      this.image_spec_id = param.image_spec_id
      this.image_spec_images = param.image_spec_images
      this.sku_list = param.sku_list.map(function(item) {
        return new GoodsListInfoSkuListInfoInterface(item)
      })
      this.create_time = param.create_time
      this.price = param.price
      this.update_time = param.update_time
      this.evaluate_good_star = param.evaluate_good_star
      this.evaluate_count = param.evaluate_count
      this.sale_num = param.sale_num
      this.sale_time = param.sale_time
      this.delete_time = param.delete_time
      this.spec_list = param.spec_list
      this.img = param.img
      this.pay_type = param.pay_type
      this.freight_fee = param.freight_fee
    } catch (e) {
      throw new Exception(e, 'GoodsListInfoInterface interface attribute error')
    }
  }
}

export class GoodsListInfoSkuListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.price = param.price
      this.stock = param.stock
      this.code = param.code
      this.img = param.img
      this.weight = param.weight
      this.spec_list = param.spec.map(function(item) {
        return new GoodsListInfoSkuListInfoSpecListInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(
        e,
        'GoodsListInfoSkuListInfoInterface interface attribute error'
      )
    }
  }
}

export class GoodsListInfoImagesInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.url = param.url
      this.is_default = param.is_default
    } catch (e) {
      throw new Exception(
        e,
        'GoodsListInfoImagesInterface interface attribute error'
      )
    }
  }
}

export class GoodsListInfoSkuListInfoSpecListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.spec_id = param.spec_id
      this.spec_name = param.spec_name
      this.spec_value_id = param.spec_value_id
      this.spec_value_name = param.spec_value_name
    } catch (e) {
      throw new Exception(
        e,
        'GoodsListInfoSkuListInfoSpecListInfoInterface interface attribute error'
      )
    }
  }
}

export class GoodsEvaluateListInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.total_number = param.total_number
      this.list = param.list.map(function(item) {
        return new GoodsEvaluateListInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(
        e,
        'GoodsEvaluateListInterface interface attribute error'
      )
    }
  }
}

export class GoodsEvaluateListInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.score = param.score
      this.goods_img = param.goods_img
      this.content = param.content
      this.create_time = param.create_time
      this.images = param.images
      this.additional_content = param.additional_content
      this.additional_images = param.additional_images
      this.additional_time = param.additional_time
      this.additional_interval_day = param.additional_time
        ? parseInt((param.additional_time - param.create_time) / 86400)
        : null
      this.reply_content = param.reply_content
      this.reply_time = param.reply_time
      this.reply_content2 = param.reply_content2
      this.reply_time2 = param.reply_time2
      this.display = param.display
      this.top = param.top
      // this.goods_spec = param.goods_spec
      // this.goods_spec_string = param.goods_spec.map(function (item) {
      //     return `${item.value_name}`
      // }).join(' ')
      this.phone = param.phone
      this.nickname = param.nickname
      this.avatar = param.avatar
    } catch (e) {
      throw new Exception(
        e,
        'GoodsEvaluateListInfoInterface interface attribute error'
      )
    }
  }
}
