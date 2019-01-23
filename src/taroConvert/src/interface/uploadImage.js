import Interface from '../utils/interface.js'
import Exception from '../utils/exception.js'

export class UploadImageInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.origin = new UploadImageInfoInterface(param.origin)
      this.bmid = new UploadImageInfoInterface(param.bmid)
      this.thumb = new UploadImageInfoInterface(param.thumb)
    } catch (e) {
      throw new Exception(e, 'UploadImageInterface interface attribute error')
    }
  }
}

export class UploadImageInfoInterface extends Interface {
  constructor(param) {
    super()
    try {
      this.name = param.name
      this.path = param.path
      this.size = param.size
      this.type = param.type
    } catch (e) {
      throw new Exception(
        e,
        'UploadImageInfoInterface interface attribute error'
      )
    }
  }
}
