export default class Exception {
  constructor(message, code) {
    console.log(message, code)
    this.message = message
    this.code = code
  }

  getCode() {
    return this.code
  }

  getMessage() {
    return this.message
  }
}
