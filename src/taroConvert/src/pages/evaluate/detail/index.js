import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import fa from '../../../utils/fa.js'
import GoodsEvaluate from '../../../models/goodsEvaluate.js'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module.js'

import TimeFormat from '../../../components/common/timeFormat/index'
import CommonRater from '../../../components/common/rater/index'
import './index.scss'
const goodsEvaluateModel = new GoodsEvaluate()

@withWeapp('Page')
class _C extends Taro.Component {
  state = {
    order_goods_id: null,
    evaluate: null
  }

  componentWillMount({ order_goods_id }) {
    this.setData({
      order_goods_id
    })
  }

  previewImage = e => {
    Taro.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.images
    })
  }

  async componentDidShow() {
    const { order_goods_id } = this.data
    const evaluate = await goodsEvaluateModel.info({
      order_goods_id
    })
    this.setData({
      evaluate
    })
    this.updateListRow()
  }

  updateListRow = () => {
    const { id } = this.data.evaluate
    if (id > 0) {
      const pages = Taro.getCurrentPages()
      const prevPage = pages[pages.length - 2]
      prevPage.updateListRow(id)
    }
  }
  config = {
    navigationBarTitleText: '评价详情'
  }

  render() {
    const { evaluate: evaluate, goodsInfo: goodsInfo } = this.state
    return (
      evaluate && (
        <View className="evaluate-detail">
          <View className="goods-evaluate-item">
            <View className="header">
              <View className="avatar">
                <Image src={evaluate.avatar} mode="aspectFill" />
                <View className="nickname">
                  <Text>{evaluate.nickname}</Text>
                  <Label>
                    <TimeFormat value={evaluate.create_time} />
                  </Label>
                </View>
              </View>
              <View className="star">
                <CommonRater size="12" num="5" value={evaluate.score} />
              </View>
            </View>
            {evaluate.content && (
              <View className="content">{evaluate.content}</View>
            )}
            {evaluate.images && (
              <Block>
                <View className="photo-list">
                  {evaluate.images.map((item, index) => {
                    return (
                      <Block key="key">
                        <Image
                          src={item}
                          mode="aspectFill"
                          data-url={item}
                          onClick={this.previewImage}
                          data-images={evaluate.images}
                        />
                      </Block>
                    )
                  })}
                </View>
              </Block>
            )}
            {evaluate.reply_content && (
              <View className="reply-content">
                <Label>客服：</Label>
                <Text>{evaluate.reply_content}</Text>
                <TimeFormat value={evaluate.reply_time} />
              </View>
            )}
            {(evaluate.additional_content || evaluate.additional_images) && (
              <View className="content">
                <Label>
                  {(evaluate.additional_interval_day === 0
                    ? '当天'
                    : evaluate.additional_interval_day + '天后') + '追评'}
                </Label>
                {evaluate.additional_content && (
                  <Text>{evaluate.additional_content}</Text>
                )}
              </View>
            )}
            {evaluate.additional_images && (
              <Block>
                <View className="photo-list">
                  {evaluate.additional_images.map((item, index) => {
                    return (
                      <Block key="key">
                        <Image
                          src={item}
                          mode="aspectFill"
                          data-url={item}
                          onClick={this.previewImage}
                          data-images={evaluate.additional_images}
                        />
                      </Block>
                    )
                  })}
                </View>
              </Block>
            )}
            {evaluate.reply_content2 && (
              <View className="reply-content">
                <Label>客服：</Label>
                <Text>{evaluate.reply_content2}</Text>
                <TimeFormat value={evaluate.reply_time2} />
              </View>
            )}
            <View className="spec">{goodsInfo.goods_spec_string}</View>
            <View className="goods-evaluate">
              <Image src={goodsInfo.goods_img} mode="aspectFill" />
              <Text>{goodsInfo.goods_title}</Text>
            </View>
          </View>
        </View>
      )
    )
  }
}

export default _C
