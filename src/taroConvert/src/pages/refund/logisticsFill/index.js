import { Block, View } from '@tarojs/components'
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

/**
 * 添加退货快递单号，只有管理员审核通过(handle_state为20)的退款退货才可以填写订单号
 * @method   post
 * @param  int        id                    退款记录id
 * @param  int        tracking_no        物流单号
 * @param  string    tracking_phone        手机号
 * @param  string    tracking_explain    说明 非必须
 * @param  string    tracking_images    凭证 最多6张
 */

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: null,
    tracking_company: '',
    tracking_no: '',
    tracking_phone: '',
    tracking_explain: '',

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

  async componentWillMount({ id, order_goods_id }) {
    const accessToken = fa.cache.get('user_token')
    const goodsInfoResult = await orderModel.goodsInfo({
      id: order_goods_id
    })
    this.setData({
      id,
      uploaderUrl: api.upload.addImage.url,
      uploaderHeader: {
        'Content-Type': 'multipart/form-data',
        'Access-Token': accessToken.access_token
      },
      goodsInfo: goodsInfoResult.info
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
  onTrackingCompanyChange = e => {
    this.setData({
      tracking_company: e.detail.detail.value
    })
  }
  onTrackingNoChange = e => {
    this.setData({
      tracking_no: parseInt(e.detail.detail.value)
    })
  }
  onTackingPhoneChange = e => {
    this.setData({
      tracking_phone: e.detail.detail.value
    })
  }
  onTrackingExplainChange = e => {
    this.setData({
      tracking_explain: e.detail.detail.value
    })
  }
  onSubmit = async () => {
    if (!this.data.tracking_company) {
      return fa.toast.show({ title: '请填写物流公司' })
    }
    if (!this.data.tracking_no) {
      return fa.toast.show({ title: '请输入物流单号' })
    }

    if (!this.data.tracking_phone) {
      return fa.toast.show({ title: '请填写手机号码' })
    }
    if (!this.data.tracking_explain) {
      return fa.toast.show({ title: '退款说明' })
    }

    let data = {
      id: this.data.id,
      tracking_company: this.data.tracking_company,
      tracking_no: this.data.tracking_no,
      tracking_phone: this.data.tracking_phone,
      tracking_explain: this.data.tracking_explain
    }
    if (this.data.uploaderFiles.length > 0) {
      data['tracking_images'] = this.data.uploaderFiles
    }

    const result = await refundModel.setTrackingNo(data)
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
    navigationBarTitleText: '填写退货物流'
  }

  render() {
    const {
      goodsInfo: goodsInfo,
      tracking_company: tracking_company,
      tracking_no: tracking_no,
      tracking_phone: tracking_phone,
      tracking_explain: tracking_explain,
      uploaderButtonText: uploaderButtonText,
      uploaderFormData: uploaderFormData,
      uploaderUrl: uploaderUrl,
      uploaderHeader: uploaderHeader,
      uploaderFiles: uploaderFiles
    } = this.state
    return (
      <Block>
        <View style="background-color:#F8F8F8;display: block;overflow: hidden">
          <FaPanel>
            <RefundGoodsCard
              goodsTitle={goodsInfo.goods_title}
              goodsImg={goodsInfo.goods_img}
              goodsSpec={goodsInfo.goods_spec_string}
              goodsNum={goodsInfo.goods_num}
            />
          </FaPanel>
          <FaPanel>
            <FaField
              title="物流公司"
              placeholder="请填写物流公司，必填"
              value={tracking_company}
              onChange={this.onTrackingCompanyChange}
            />
            <FaField
              title="物流单号"
              placeholder="请输入物流单号，必填"
              value={tracking_no}
              onChange={this.onTrackingNoChange}
            />
            <FaField
              title="联系电话"
              placeholder="请填写手机号码，必填"
              value={tracking_phone}
              onChange={this.onTackingPhoneChange}
            />
            <FaField
              title="退款说明"
              placeholder="退款说明，必填"
              value={tracking_explain}
              onChange={this.onTrackingExplainChange}
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
        </View>
        <FixedBottom>
          <View className="footer">
            <FaButton type="danger" size="large" onBtnclick={this.onSubmit}>
              提交
            </FaButton>
          </View>
        </FixedBottom>
      </Block>
    )
  }
}

export default _C
