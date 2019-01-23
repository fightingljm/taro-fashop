import fa from '../../../utils/fa'
import RefundModel from '../../../models/refund'
import OrderModel from '../../../models/order'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import { UploadImageInterface } from '../../../interface/uploadImage'
import { api } from '../../../api'

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

Page({
    data: {
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
        uploaderHeader: {},
    },
    async onLoad({ id, order_goods_id }) {
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
    },
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.data.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setData({
            uploaderFiles: fa.remove(this.data.uploaderFiles, e.detail.url)
        })
    },
    onTrackingCompanyChange(e) {
        this.setData({
            tracking_company: e.detail.detail.value
        })
    },
    onTrackingNoChange(e) {
        this.setData({
            tracking_no: parseInt(e.detail.detail.value)
        })
    },
    onTackingPhoneChange(e) {
        this.setData({
            tracking_phone: e.detail.detail.value
        })
    },
    onTrackingExplainChange(e) {
        this.setData({
            tracking_explain: e.detail.detail.value
        })
    },
    async onSubmit() {
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
            tracking_explain: this.data.tracking_explain,
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
            wx.navigateBack({
                delta: this.data.delta
            })
        }
    }
})
