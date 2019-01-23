import { Block, View, Input, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaCellGroup from '../../../../../ui/cell-group/index'
import FixedBottom from '../../../../../components/common/fixedBottom/index'
import FaButton from '../../../../../ui/btn/index'
import FaCell from '../../../../../ui/cell/index'
import FaPanel from '../../../../../ui/panel/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {}
  config = {
    navigationBarTitleText: '手机绑定'
  }

  render() {
    return (
      <Block>
        <View className="user-setting-bind-phone">
          <FaPanel>
            <FaCellGroup>
              <FaCell
                title="手机号"
                renderFooter={
                  <Block>
                    <Input placeholder="请输入手机号" />
                  </Block>
                }
              />
              <FaCell
                title="验证码"
                placeholder="请输入验证码"
                renderFooter={
                  <Block>
                    <View className="smscode">
                      <Input placeholder="请输入验证码" />
                      <FaButton size="small">发送验证码</FaButton>
                    </View>
                  </Block>
                }
              />
              <FaCell
                title="密码"
                placeholder="设置密码"
                renderFooter={
                  <Block>
                    <Input placeholder="请输入密码" />
                  </Block>
                }
              />
            </FaCellGroup>
          </FaPanel>
          <View className="footer">
            <Text>绑定成功后，下次登录即可使用手机号进行登录</Text>
          </View>
        </View>
        <FixedBottom>
          <FaButton size="large" type="danger">
            确认绑定
          </FaButton>
        </FixedBottom>
      </Block>
    )
  }
}

export default _C
