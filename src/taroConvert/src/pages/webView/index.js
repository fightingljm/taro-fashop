import { Block, WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    url: null
  }

  componentWillMount(options) {
    this.setData({
      url: options['url'] ? decodeURIComponent(options['url']) : ''
    })
  }

  config = {}

  render() {
    const { url: url } = this.state
    return (
      <Block>
        {/* pages/pointsrule/index.wxml */}
        <WebView src={url} />
      </Block>
    )
  }
} // pages/webView/index.js

export default _C
