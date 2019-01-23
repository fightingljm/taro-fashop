import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class RefundResonListInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.list = param.list.map(function(item) {
        return new RefundResonInfoInterface(item)
      })
    } catch (e) {
      throw new Exception(
        e,
        'RefundResonListInterface interface attribute error'
      )
    }
  }
}

export class RefundResonInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.title = param.title
    } catch (e) {
      throw new Exception(
        e,
        'RefundResonInfoInterface interface attribute error'
      )
    }
  }
}
