import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import OrderModel from '../../../models/order.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import FaCell from '../../../ui/cell/index'
import FaCellGroup from '../../../ui/cell-group/index'
import FaTab from '../../../ui/tab/index'
import FaPanel from '../../../ui/panel/index'
import RefundGoodsCard from '../../../components/refund/goodsCard/index'
import './index.scss'
const orderModel = new OrderModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    goodsInfo: null
  }

  async componentWillMount(options) {
    const goodsInfoResult = await orderModel.goodsInfo({
      id:
        typeof options['order_goods_id'] !== 'undefined'
          ? options['order_goods_id']
          : 414
    })
    this.setData({
      goodsInfo: goodsInfoResult.info
    })
  }

  onClick = e => {
    Taro.navigateTo({
      url: `/pages/refund/serviceApply/index?order_goods_id=${
        this.data.goodsInfo.id
      }&delta=2&refund_type=${e.currentTarget.dataset.refundType}`
    })
  }
  config = {
    navigationBarTitleText: '选择服务类型'
  }

  render() {
    const { goodsInfo: goodsInfo } = this.state
    return (
      <View style="background-color:#F8F8F8;display: block;overflow: hidden">
        <FaPanel>
          <View className="refund-goods-card">
            <View className="body">
              <View className="item">
                <View className="content">
                  <View className="image">
                    <Image src={goodsInfo.goods_img} mode="aspectFill" />
                  </View>
                  <View className="body">
                    <Text>{goodsInfo.goods_title}</Text>
                    <View className="end">
                      <Text className="spec">
                        {goodsInfo.goods_spec_string}
                      </Text>
                      <Label className="number">
                        {'x ' + goodsInfo.goods_num}
                      </Label>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </FaPanel>
        <FaPanel>
          <FaCellGroup>
            <FaCell
              isLink="true"
              title="仅退款"
              label="未收到货（包含未签收），或卖家协商同意前提现"
              data-refund-type="1"
              onTap={this.onClick}
              icon={require('../../../themes/default/refund/refund-type-1.png')}
            />
            <FaCell
              isLink="true"
              title="退货退款"
              label="已收到货，需要退换已收到的货物"
              data-refund-type="2"
              onTap={this.onClick}
              icon={require('../../../themes/default/refund/refund-type-2.png')}
            />
          </FaCellGroup>
        </FaPanel>
      </View>
    )
  }
}

export default _C
