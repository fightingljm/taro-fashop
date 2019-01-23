import { Block, View, Checkbox, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaButton from '../../../ui/btn/index'
import FaStepper from '../../../ui/stepper/index'
import PageBanner from '../../../components/page/banner/index'
import './index.scss'

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    stepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 1,
      // 最大可到的数字
      max: 1
    },
    cartList: [
      {
        id: 1,
        img: {
          url:
            'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
        },
        title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
        price: 200,
        market_price: 300,
        desc: '描述'
      },
      {
        id: 1,
        img: {
          url:
            'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
        },
        title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
        price: 200,
        market_price: 300,
        desc: '描述'
      },
      {
        id: 1,
        img: {
          url:
            'https://gw.alicdn.com/bao/uploaded/i3/3305375223/TB2DmNta6n85uJjSZFLXXbqMVXa_!!3305375223.jpg'
        },
        title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
        price: 200,
        market_price: 300,
        desc: '描述'
      },
      {
        id: 1,
        img: {
          url:
            'https://gw.alicdn.com/bao/uploaded/i4/22668250/TB24nBEa0PJ3eJjSZFLXXab3FXa_!!22668250.jpg'
        },
        title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
        price: 200,
        market_price: 300,
        desc: '描述'
      }
    ]
  }
  handleZanStepperChange = ({ componentId, stepper }) => {
    // componentId 即为在模板中传入的 componentId
    // 用于在一个页面上使用多个 stepper 时，进行区分
    // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
    this.setData({
      stepper
    })
  }
  config = {
    navigationBarTitleText: '购物车',
    enablePullDownRefresh: true
  }

  render() {
    const { cartList: cartList, stepper: stepper } = this.state
    return (
      <View className="cart">
        编辑/保存
        <Section>
          {cartList.map((item, pagedataindex) => {
            return (
              <Block key="key">
                <Details>
                  <Aside className="left">
                    <Checkbox value="1" checked="true" />
                  </Aside>
                  <Aside className="right">
                    <Image src={item.img.url} />
                    <View className="title-price">
                      <Text>{item.title}</Text>
                      <Label>不计重量 颜色:10.0时</Label>
                      <I>{'¥ ' + item.price}</I>
                    </View>
                    <FaStepper
                      stepper={stepper.stepper}
                      min={stepper.min}
                      max={stepper.max}
                      componentId="stepper"
                      onChange={this.handleZanStepperChange}
                    />
                  </Aside>
                </Details>
              </Block>
            )
          })}
        </Section>
        <Footer>
          <View className="left">
            <Span>
              <Checkbox value="1" checked="true" />全选
            </Span>
            <Details>
              合计:¥<Span>500.00</Span>
            </Details>
          </View>
          <View className="right">
            <FaButton type="danger" size="large">
              去结算<I>(2,000,000)</I>
            </FaButton>
          </View>
        </Footer>
      </View>
    )
  }
} //index.js

export default _C
