import { Block, View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import FaCellGroup from '../../../ui/cell-group/index'
import FixedBottom from '../../../components/common/fixedBottom/index'
import FaButton from '../../../ui/btn/index'
import FaCell from '../../../ui/cell/index'
import FaPanel from '../../../ui/panel/index'
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
  logout = () => {
    fa.cache.set('user_info', null)
    fa.cache.set('user_token', null)
    Taro.switchTab({
      url: '/pages/user/index'
    })
  }
  config = {
    navigationBarTitleText: '个人设置'
  }

  render() {
    return (
      <Block>
        <View className="user-setting">
          <FaPanel>
            <FaCell
              isLink
              title="点击我设置昵称"
              label="188****8223"
              url="/pages/user/setting/userinfo/index"
              renderIcon={
                <Block>
                  <Image
                    src="https://ws3.sinaimg.cn/large/006tNc79ly1frlfuicj18j303c03cq2v.jpg"
                    mode="aspectFit"
                    className="avatar"
                  />
                </Block>
              }
            />
          </FaPanel>
          <FaPanel>
            <FaCellGroup>
              <FaCell
                isLink
                title="修改密码"
                url="/pages/user/editPassword/index"
              />
              <FaCell
                isLink
                title="账号关联"
                url="/pages/user/setting/bind/index"
              />
            </FaCellGroup>
          </FaPanel>
        </View>
        <FixedBottom>
          <FaButton size="large" onBtnclick={this.logout}>
            退出
          </FaButton>
        </FixedBottom>
      </Block>
    )
  }
}

export default _C
