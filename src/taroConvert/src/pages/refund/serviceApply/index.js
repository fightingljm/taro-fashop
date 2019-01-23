import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import RefundModel from '../../../models/refund.js'
import OrderModel from '../../../models/order.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import { UploadImageInterface } from '../../../interface/uploadImage.js'
import { api } from '../../../api.js'

import FaButton from '../../../ui/btn/index'
import FaField from '../../../ui/field/index'
import FaPanel from '../../../ui/panel/index'
import FixedBottom from '../../../components/common/fixedBottom/index'
import RefundGoodsCard from '../../../components/refund/goodsCard/index'
import './index.scss'
const refundModel = new RefundModel()
const orderModel = new OrderModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    delta: 1,
    noMoreThan: 0,

    refundType: 1,
    reasonList: [],
    receiveStateList: ['未收到货', '已收到货'],
    reason: '',
    userReceive: null,
    refundAmount: '',
    userExplain: '',

    goodsInfo: null,
    uploaderFiles: [],
    uploaderName: 'file',
    uploaderFormData: {
      type: 'file'
    },
    uploaderUrl: null,
    uploaderButtonText: '上传凭证(最多6张)',
    uploaderHeader: {}
  }

  async componentWillMount({ order_goods_id, refund_type, delta = 1 }) {
    // delta 传的话
    const accessToken = fa.cache.get('user_token')
    const goodsInfoResult = await orderModel.goodsInfo({
      id: typeof order_goods_id !== 'undefined' ? order_goods_id : 414
    })
    const refundType = parseInt(refund_type) !== 1 ? 2 : 1
    const result = await refundModel.reasonList({
      refund_type: refundType
    })
    const reasonList = result.list.map(function(item) {
      return item.title
    })
    const noMoreThan =
      parseFloat(goodsInfoResult.info.goods_pay_price) +
      parseFloat(goodsInfoResult.info.goods_freight_fee)
    this.setData({
      refundType,
      delta: parseInt(delta),
      uploaderUrl: api.upload.addImage.url,
      uploaderHeader: {
        'Content-Type': 'multipart/form-data',
        'Access-Token': accessToken.access_token
      },
      refundAmount: noMoreThan,
      noMoreThan,
      goodsInfo: goodsInfoResult.info,
      reasonList
    })
  }

  onUploadFileSuccess = e => {
    const result = new UploadImageInterface(e.detail.result)
    let files = this.data.uploaderFiles
    this.setData({
      uploaderFiles: files.concat(result.origin.path)
    })
  }
  onUploadFileDelete = e => {
    this.setData({
      uploaderFiles: fa.remove(this.data.uploaderFiles, e.detail.url)
    })
  }
  onRefundAmountChange = e => {
    this.setData({
      refundAmount: parseFloat(
        isNaN(e.detail.detail.value) || !e.detail.detail.value
          ? 0
          : e.detail.detail.value
      ).toFixed(2)
    })
  }
  onReceiveStateChange = e => {
    this.setData({
      userReceive: parseInt(e.detail.detail.value)
    })
  }
  onResonChange = e => {
    this.setData({
      reason: e.detail.detail.value
    })
  }
  onUserExplainChange = e => {
    this.setData({
      userExplain: e.detail.detail.value
    })
  }
  onSubmit = async () => {
    if (!this.data.reason) {
      return fa.toast.show({ title: '请选择退款原因' })
    }
    if (!this.data.refundAmount) {
      return fa.toast.show({ title: '请输入退款金额' })
    }
    if (parseFloat(this.data.refundAmount) > this.data.noMoreThan) {
      return fa.toast.show({
        title: '退款金额不得超过¥' + this.data.noMoreThan
      })
    }
    if (!this.data.userExplain) {
      return fa.toast.show({ title: '请填写退款说明' })
    }
    if (
      !this.data.refundType === 2 &&
      typeof this.data.userReceive !== 'number'
    ) {
      return fa.toast.show({ title: '请选择货物状态' })
    }
    let data = {
      refund_type: this.data.refundType,
      order_goods_id: this.data.goodsInfo.id,
      reason: this.data.reasonList[this.data.reason],
      refund_amount: this.data.refundAmount,
      user_explain: this.data.userExplain
    }
    if (this.data.uploaderFiles.length > 0) {
      data['images'] = this.data.uploaderFiles
    }
    if (this.data.refundType === 2) {
      data['user_receive'] = this.data.userReceive + 1
    }
    const result = await refundModel.apply(data)
    if (result === false) {
      fa.toast.show({
        title: fa.code.parse(refundModel.getException().getCode())
      })
    } else {
      Taro.navigateBack({
        delta: this.data.delta
      })
    }
  }
  config = {
    navigationBarTitleText: '申请退款'
  }

  render() {
    const {
      goodsInfo: goodsInfo,
      refundType: refundType,
      receiveStateList: receiveStateList,
      userReceive: userReceive,
      reason: reason,
      reasonList: reasonList,
      noMoreThan: noMoreThan,
      refundAmount: refundAmount,
      userExplain: userExplain,
      uploaderButtonText: uploaderButtonText,
      uploaderFormData: uploaderFormData,
      uploaderUrl: uploaderUrl,
      uploaderHeader: uploaderHeader,
      uploaderFiles: uploaderFiles
    } = this.state
    return (
      goodsInfo && (
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
            {refundType === 2 && (
              <FaField
                type="picker"
                title="货物状态"
                placeholder="请选择"
                range={receiveStateList}
                value={userReceive}
                onChange={this.onReceiveStateChange}
                right="true"
              />
            )}
            <FaField
              type="picker"
              title="退款原因"
              placeholder="请选择"
              value={reason}
              range={reasonList}
              onChange={this.onResonChange}
              right="true"
            />
            <FaField
              type="input"
              inputType="digit"
              title="退款金额"
              placeholder={'¥' + noMoreThan}
              value={refundAmount ? refundAmount : noMoreThan}
              onBlur={this.onRefundAmountChange}
              desc={
                '最多¥' +
                noMoreThan +
                '，含发货邮费¥' +
                goodsInfo.goods_freight_fee
              }
              right="true"
            />
            <FaField
              title="退款说明"
              placeholder="必填"
              value={userExplain}
              onChange={this.onUserExplainChange}
              right="true"
            />
            <FaField
              type="uploader"
              title="图片上传"
              uploaderButtonText={uploaderButtonText}
              uploaderFormData={uploaderFormData}
              uploaderUrl={uploaderUrl}
              uploaderHeader={uploaderHeader}
              uploaderFiles={uploaderFiles}
              uploaderCount="6"
              uploaderAllowDel="true"
              onSuccess={this.onUploadFileSuccess}
              onChange={this.handleFieldChange}
              onDelete={this.onUploadFileDelete}
            />
          </FaPanel>
          <FixedBottom>
            <View className="footer">
              <FaButton type="danger" size="large" onBtnclick={this.onSubmit}>
                提交
              </FaButton>
            </View>
          </FixedBottom>
        </View>
      )
    )
  }
}

export default _C
