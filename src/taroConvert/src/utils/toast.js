import Taro from '@tarojs/taro'

export default class Toast {
  // todo完善
  show(options) {
    Taro.showToast({
      title: options.title,
      icon: 'none',
      duration: 1000
    })
  }
}
