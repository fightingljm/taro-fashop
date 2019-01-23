import { Block, View, Image, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaCellGroup from '../../../../ui/cell-group/index'
import FaButton from '../../../../ui/btn/index'
import FaCell from '../../../../ui/cell/index'
import FixedBottom from '../../../../components/common/fixedBottom/index'
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
    navigationBarTitleText: '资料设置'
  }

  render() {
    return (
      <Block>
        <View className="user-setting-userinfo">
          <FaPanel>
            <FaCellGroup>
              <FaCell
                title="头像"
                isLink
                renderFooter={
                  <Block>
                    <Image
                      src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                      mode="aspectFit"
                      className="avatar"
                    />
                  </Block>
                }
              />
              <FaCell
                title="昵称"
                renderFooter={
                  <Block>
                    <Input placeholder="请输入昵称" />
                  </Block>
                }
              />
            </FaCellGroup>
          </FaPanel>
        </View>
        <FixedBottom>
          <FaButton size="large" type="danger">
            保存
          </FaButton>
        </FixedBottom>
      </Block>
    )
  }
} //index.js

export default _C
