import Exception from './exception.js'

/**
 * 只要返回错误抛出异常
 * 不同模型多次实例化
 */
export default class Model {
  getException() {
    return this.exception
  }
  setException(exception) {
    if (exception instanceof Exception) {
      this.exception = exception
    } else {
      console.log(exception)
      console.log('Model里继承实例化的Exception Class Error')
      throw 'Exception Class Error'
    }
  }
}
