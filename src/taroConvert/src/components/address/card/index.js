import { Block, View, Icon, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    addressId: null,
    name: null,
    phone: null,
    address: null,
    checked: false
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  onEdit = e => {
    this.triggerEvent('edit', {
      addressId: e.currentTarget.dataset.id
    })
  }
  onChecked = e => {
    console.log(e)
    this.triggerEvent('checked', {
      addressId: e.currentTarget.dataset.id
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      addressId: addressId,
      name: name,
      phone: phone,
      address: address,
      checked: checked
    } = this.props
    const { id: id } = this.state
    return (
      <View className="address-card">
        <View className="info">
          {checked === true && (
            <View
              className="checked"
              data-id={addressId}
              onClick={this.onChecked}
            >
              <Icon
                className="weui-icon-radio"
                type="success"
                size="16"
                color="red"
              />
            </View>
          )}
          <View className="user" data-id={addressId} onClick={this.onChecked}>
            <View className="name-phone">
              <Text className="name">{name}</Text>
              <Text className="phone">{phone}</Text>
            </View>
            <View className="address">{address}</View>
          </View>
        </View>
        <View className="action">
          {/* <image src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg" mode="scaleToFill" /> */}
          <Text className="edit" data-id={id} onClick={this.onEdit}>
            编辑
          </Text>
        </View>
      </View>
    )
  }
}

export default _C
