import Exception from './exception.js'

export default class Interface {
  getException() {
    return this.exception
  }
  setException(exception) {
    if (exception instanceof Exception) {
      this.exception = exception
    } else {
      throw 'Interface Exception must be utils/Exception'
    }
  }
}
