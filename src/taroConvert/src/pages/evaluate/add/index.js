import { Block, View, Image, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import GoodsEvaluateModel from '../../../models/goodsEvaluate.js'
import OrderModel from '../../../models/order.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'
import { UploadImageInterface } from '../../../interface/uploadImage.js'
import { api } from '../../../api.js'

import FaButton from '../../../ui/btn/index'
import FaField from '../../../ui/field/index'
import FaPanel from '../../../ui/panel/index'
import CommonRater from '../../../components/common/rater/index'
import FixedBottom from '../../../components/common/fixedBottom/index'
import RefundGoodsCard from '../../../components/refund/goodsCard/index'
import './index.scss'
const goodsEvaluateModel = new GoodsEvaluateModel()
const orderModel = new OrderModel()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    id: 0,
    delta: 1,
    score: 5,
    orderGoodsId: 0,
    content: '',
    goodsInfo: null,
    uploaderFiles: [],
    uploaderName: 'file',
    uploaderFormData: {
      type: 'file'
    },
    uploaderCount: 9,
    uploaderUrl: null,
    uploaderButtonText: '上传图片(最多9张)',
    uploaderHeader: {}
  }

  async componentWillMount({ order_goods_id = 440, delta = 1 }) {
    const accessToken = fa.cache.get('user_token')
    const goodsInfoResult = await orderModel.goodsInfo({
      id: order_goods_id
    })

    this.setData({
      id: goodsInfoResult.info.id,
      delta: typeof delta !== 'undefined' ? delta : 1,
      uploaderUrl: api.upload.addImage.url,
      uploaderHeader: {
        'Content-Type': 'multipart/form-data',
        'Access-Token': accessToken.access_token
      },
      goodsInfo: goodsInfoResult.info,
      orderGoodsId: order_goods_id
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
  onContentChange = e => {
    this.setData({
      content: e.detail.detail.value
    })
  }
  onScoreChange = e => {
    this.setData({
      score: parseInt(e.detail.value)
    })
  }
  onSubmit = async () => {
    if (!this.data.score) {
      return fa.toast.show({ title: '请选择评分' })
    }
    if (!this.data.content) {
      return fa.toast.show({ title: '请输入评价内容' })
    }

    let data = {
      order_goods_id: this.data.orderGoodsId,
      is_anonymous: 0,
      content: this.data.content,
      score: this.data.score
    }
    if (this.data.uploaderFiles.length > 0) {
      data['images'] = this.data.uploaderFiles
    }

    const result = await goodsEvaluateModel.add(data)
    if (result === false) {
      fa.toast.show({
        title: fa.code.parse(goodsEvaluateModel.getException().getCode())
      })
    } else {
      this.updateListRow()
      Taro.navigateBack({
        delta: this.data.delta
      })
    }
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
    navigationBarTitleText: '评价晒单'
  }

  render() {
    const {
      goodsInfo: goodsInfo,
      score: score,
      content: content,
      uploaderButtonText: uploaderButtonText,
      uploaderFormData: uploaderFormData,
      uploaderUrl: uploaderUrl,
      uploaderHeader: uploaderHeader,
      uploaderFiles: uploaderFiles,
      uploaderCount: uploaderCount
    } = this.state
    return (
      <Block>
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
                      <Text>商品评价</Text>
                      <CommonRater
                        num="5"
                        value={score}
                        size="20"
                        onChange={this.onScoreChange}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </FaPanel>
          <FaPanel>
            <FaField
              type="textarea"
              title
              placeholder="请输入您要评价的内容"
              value={content}
              onChange={this.onContentChange}
            />
            <FaField
              type="uploader"
              title
              uploaderButtonText={uploaderButtonText}
              uploaderFormData={uploaderFormData}
              uploaderUrl={uploaderUrl}
              uploaderHeader={uploaderHeader}
              uploaderFiles={uploaderFiles}
              uploaderCount={uploaderCount}
              uploaderAllowDel="true"
              onSuccess={this.onUploadFileSuccess}
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
