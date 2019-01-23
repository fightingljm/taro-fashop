import { Block, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    url: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onClick = e => {
    this.triggerEvent('click', e)
  }
  config = {
    component: true
  }

  render() {
    const { url: url } = this.props
    const {} = this.state
    return (
      <Image
        className="goods-body-image"
        src={url}
        mode="widthFix"
        data-url={url}
        onClick={this.onClick}
      />
    )
  }
}

export default _C
