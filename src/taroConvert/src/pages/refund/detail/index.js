import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import RefundModel from '../../../models/refund.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import RefundStateReason from '../../../components/refund/stateReason/index'
import RefundStateCard from '../../../components/refund/stateCard/index'
import RefundGoodsInfo from '../../../components/refund/goodsInfo/index'
import OrderContact from '../../../components/order/contact/index'
import RefundBaseInfo from '../../../components/refund/baseInfo/index'
import FaDialog from '../../../ui/dialog/index'
import FaPanel from '../../../ui/panel/index'
import './index.scss'
const Dialog = require('../../../ui/dialog/dialog.js')

const refundModel = new RefundModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: null,
    refundInfo: null
  }

  async componentWillMount({ id }) {
    this.setData({
      id
    })
  }

  async componentDidShow() {
    this.init()
  }

  init = async () => {
    const refundInfo = await refundModel.info({ id: this.data.id })
    if (refundInfo) {
      console.log(refundInfo)
      this.setData({
        refundInfo
      })
    }
  }
  onGoods = () => {
    Taro.navigateTo({
      url: `/pages/goods/detail/index?id=${this.data.refundInfo.goods_id}`
    })
  }
  onTrack = () => {
    Taro.navigateTo({
      url: `/pages/refund/logisticsFill/index?id=${
        this.data.id
      }&order_goods_id=${this.data.refundInfo.order_goods_id}`
    })
  }
  onUndo = async () => {
    Dialog({
      title: '撤销申请',
      message:
        '您将撤销本次申请，如果问题未解决，您还可以再次发起。确定继续吗？',
      selector: '#fa-dialog-receive',
      buttons: [
        {
          text: '取消',
          type: 'cancel'
        },
        {
          text: '确认',
          color: 'red',
          type: 'ok'
        }
      ]
    }).then(async ({ type }) => {
      if (type === 'ok') {
        const result = await refundModel.revoke({ id: this.data.id })
        if (result) {
          this.init()
        } else {
          fa.cache.toast({
            title: fa.code.parse(refundModel.getException().getCode())
          })
        }
      }
    })
  }
  updateListRow = () => {
    const { id } = this.data
    if (id > 0) {
      const pages = Taro.getCurrentPages()
      const prevPage = pages[pages.length - 2]
      prevPage.updateListRow(id)
    }
  }
  config = {
    navigationBarTitleText: '退款详情'
  }

  render() {
    const { refundInfo: refundInfo } = this.state
    return (
      <Block>
        {refundInfo && (
          <View style="background-color:#F8F8F8;display: block;overflow: hidden">
            <FaPanel>
              <RefundStateCard refundInfo={refundInfo} />
              <RefundStateReason
                refundInfo={refundInfo}
                onUndo={this.onUndo}
                onTrack={this.onTrack}
              />
            </FaPanel>
            <FaPanel>
              <RefundGoodsInfo refundInfo={refundInfo} onGoods={this.onGoods} />
            </FaPanel>
            <FaPanel>
              <RefundBaseInfo refundInfo={refundInfo} />
              <OrderContact />
            </FaPanel>
          </View>
        )}
        <FaDialog id="fa-dialog-receive" />
      </Block>
    )
  }
}

export default _C
