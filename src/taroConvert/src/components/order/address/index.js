import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    name: null,
    phone: null,
    address: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  config = {
    component: true
  }

  render() {
    const { name: name, phone: phone, address: address } = this.props
    const {} = this.state
    return (
      <View className="order-address">
        <View className="info">
          <View className="user">
            <Image
              src={require('../../../themes/default/order/buyer-address.png')}
              mode="scaleToFill"
            />
            <Text className="name">{name}</Text>
            <Text className="phone">{phone}</Text>
          </View>
          <View className="address">{'地址：' + address}</View>
        </View>
      </View>
    )
  }
}

export default _C
