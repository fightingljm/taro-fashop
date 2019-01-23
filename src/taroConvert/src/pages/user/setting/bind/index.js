import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaCellGroup from '../../../../ui/cell-group/index'
import FaCell from '../../../../ui/cell/index'
import FaPanel from '../../../../ui/panel/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    address: {
      name: '韩文博',
      phone: '13502176003',
      address: '天津市 河西区 龙博花园16-1-2'
    }
  }
  config = {
    navigationBarTitleText: '账号绑定'
  }

  render() {
    return (
      <View className="user-setting-bind">
        <FaPanel>
          <FaCellGroup>
            <FaCell
              title="手机号"
              isLink
              renderIcon={
                <Block>
                  <View className="icon">
                    <Image
                      src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                      mode="aspectFit"
                    />
                  </View>
                </Block>
              }
              renderFooter={
                <Block>
                  <Text>未绑定/已绑定</Text>
                </Block>
              }
            />
            <FaCell
              title="微信"
              isLink
              renderIcon={
                <Block>
                  <View className="icon">
                    <Image
                      src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                      mode="aspectFit"
                    />
                  </View>
                </Block>
              }
              renderFooter={
                <Block>
                  <Text>未绑定/已绑定</Text>
                </Block>
              }
            />
          </FaCellGroup>
        </FaPanel>
        <View className="footer">
          <Text>账号关联之后，用户可使用微信或手机号登录FaShop。</Text>
          <Text>
            在各个渠道进行购物时，均可同步FaShop账号，享受FaShop特权，同步订单信息。
          </Text>
          <Text>FaShop承诺保障您的账号隐私安全。</Text>
        </View>
      </View>
    )
  }
} //index.js

export default _C
