import Exception from '../utils/exception.js'
import Interface from '../utils/interface.js'

export class GoodsCategoryListInterface extends Interface {
  constructor(params) {
    super()
    try {
      if (params.list.length > 0) {
        this.list = params.list.map(function(item) {
          return new GoodsCategoryListChildInterface(item)
        })
      } else {
        this.list = []
      }
    } catch (e) {
      throw new Exception(
        e,
        'GoodsCategoryListInterface interface attribute error'
      )
    }
  }
}

export class GoodsCategoryListChildInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.id = param.id
      this.name = param.name
      this.pid = param.pid
      this.icon = param.icon
      if (typeof param._child !== 'undefined' && param._child.length > 0) {
        this.childs = param._child.map(function(item) {
          return new GoodsCategoryListChildInterface(item)
        })
      } else {
        this.childs = []
      }
    } catch (e) {
      throw new Exception(
        e,
        'GoodsCategoryListChildInterface interface attribute error'
      )
    }
  }
}
