import { Block, View, Image, Text, Input, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaButton from '../../../ui/btn/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    showBottomPopup: true,
    stepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      // 最大可到的数字
      max: 1
    },
    list: [
      {
        id: '1',
        title: '商品'
      },
      {
        id: '2',
        title: '评价'
      },
      {
        id: '3',
        title: '详情'
      }
    ],
    selectedId: '1',
    detail: {
      title: '2018新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款',
      images: [
        {
          url:
            'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
        },
        {
          url:
            'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
        },
        {
          url:
            'https://gw.alicdn.com/bao/uploaded/i3/3305375223/TB2DmNta6n85uJjSZFLXXbqMVXa_!!3305375223.jpg'
        },
        {
          url:
            'https://gw.alicdn.com/bao/uploaded/i4/22668250/TB24nBEa0PJ3eJjSZFLXXab3FXa_!!22668250.jpg'
        }
      ]
    }
  }

  componentWillMount() {}

  toggleGoodsSkuSelect = () => {
    console.log('toggleGoodsSkuSelect')
    this.setData({
      showBottomPopup: !this.data.showBottomPopup
    })
  }
  config = {
    navigationBarTitleText: '修改密码'
  }

  render() {
    return (
      <View className="page-container">
        <View className="page">
          <View className="form">
            <View className="header">
              <Image
                src="https://ws4.sinaimg.cn/large/006tNc79ly1frmnce8ekrj302d02d749.jpg"
                mode="aspectFit"
              />
              <Text>请输入(+86)13502176003收到的验证码</Text>
            </View>
            <View className="username input-item">
              <Input placeholder="请输入验证码" type="number" autoFocus />
              <Label>重新发送(119)</Label>
            </View>
            <View className="username input-item">
              <Input placeholder="请输入验证码" type="number" autoFocus />
              <Label className="onemore">重新发送</Label>
            </View>
            <View className="btn-area">
              <FaButton type="danger">下一步</FaButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default _C
