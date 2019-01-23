import { Block, View, Image, Text, Label } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import CommonRater from '../../../common/rater/index'
import TimeFormat from '../../../common/timeFormat/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    info: null
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  previewImage = e => {
    Taro.previewImage({
      current: e.currentTarget.dataset.url,
      urls: e.currentTarget.dataset.images
    })
  }
  config = {
    component: true
  }

  render() {
    const { info: info } = this.props
    const {} = this.state
    return (
      <View className="goods-evaluate-item">
        <View className="header">
          <View className="avatar">
            <Image src={info.avatar} mode="aspectFill" />
            <View className="nickname">
              <Text>{info.nickname}</Text>
              <Label>
                <TimeFormat value={info.create_time} />
              </Label>
            </View>
          </View>
          <View className="star">
            <CommonRater size="12" num="5" value={info.score} />
          </View>
        </View>
        {info.content && <View className="content">{info.content}</View>}
        {info.images && (
          <Block>
            <View className="photo-list">
              {info.images.map((item, index) => {
                return (
                  <Block key="key">
                    <Image
                      src={item}
                      mode="aspectFill"
                      data-url={item}
                      onClick={this.previewImage}
                      data-images={info.images}
                    />
                  </Block>
                )
              })}
            </View>
          </Block>
        )}
        {info.reply_content && (
          <View className="reply-content">
            <Label>客服：</Label>
            <Text>{info.reply_content}</Text>
          </View>
        )}
        {(info.additional_content || info.additional_images) && (
          <View className="content">
            <Label>
              {(info.additional_interval_day === 0
                ? '当天'
                : info.additional_interval_day + '天后') + '追评'}
            </Label>
            {info.additional_content && <Text>{info.additional_content}</Text>}
          </View>
        )}
        {info.additional_images && (
          <Block>
            <View className="photo-list">
              {info.additional_images.map((item, index) => {
                return (
                  <Block key="key">
                    <Image
                      src={item}
                      mode="aspectFill"
                      data-url={item}
                      onClick={this.previewImage}
                      data-images={info.additional_images}
                    />
                  </Block>
                )
              })}
            </View>
          </Block>
        )}
        {info.reply_content2 && (
          <View className="reply-content">
            <Label>客服：</Label>
            <Text>{info.reply_content2}</Text>
          </View>
        )}
        {info.goods_spec_string && (
          <View className="spec">{'规格：' + info.goods_spec_string}</View>
        )}
      </View>
    )
  }
}

export default _C
