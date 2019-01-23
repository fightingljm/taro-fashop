import { Block, Button, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    return (
      <Button
        className="order-contact kf-button"
        openType="contact"
        sessionFrom="weapp"
      >
        <Image
          src={require('../../../themes/default/order/customer-service.png')}
          mode="scaleToFill"
        />
        <Text>联系客服</Text>
      </Button>
    )
  }
}

export default _C
