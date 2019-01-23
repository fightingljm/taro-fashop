import { Block, View, Image, Icon } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'
const warn = (msg, getValue) => {
  console.warn(msg)
}

// 处理跳转
function doNavigate() {
  const { url = '' } = this.data
  const type = typeof this.data.isLink

  if (!this.data.isLink || !url || url === 'true' || url === 'false') return

  if (type !== 'boolean' && type !== 'string') {
    warn('isLink 属性值必须是一个字符串或布尔值', this.data.isLink)
    return
  }

  if (
    ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch'].indexOf(
      this.data.linkType
    ) === -1
  ) {
    warn(
      'linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch',
      this.data.linkType
    )
    return
  }
  wx[this.data.linkType].call(wx, { url })
}

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    type: null,
    isLink: '',
    linkType: 'navigateTo',
    icon: '',
    url: ''
  }
  static options = {
    multipleSlots: true
  }
  static relations = {
    '../cell-group/index': {
      type: 'parent'
    }
  }
  _observeProps = []
  state = {
    isLastCell: true
  }
  footerTap = () => {
    // 如果并没有设置只点击 footer 生效，那就不需要额外处理。cell 上有事件会自动处理
    if (!this.data.onlyTapFooter) {
      return
    }

    this.triggerEvent('tap', {})
    doNavigate.call(this)
  }
  cellTap = () => {
    // 如果只点击 footer 生效，那就不需要在 cell 根节点上处理
    if (this.data.onlyTapFooter) {
      return
    }

    this.triggerEvent('tap', {})
    doNavigate.call(this)
  }
  updateIsLastCell = isLastCell => {
    this.setData({ isLastCell })
  }
  config = {
    component: true
  }

  render() {
    const {
      type: type,
      title: title,
      label: label,
      value: value,
      onlyTapFooter: onlyTapFooter,
      isLink: isLink,
      linkType: linkType,
      icon: icon,
      url: url
    } = this.props
    const { isLastCell: isLastCell, files: files } = this.state
    return (
      <View
        onClick={this.cellTap}
        className={
          'fa-cell ' +
          (isLastCell ? 'last-cell' : '') +
          ' ' +
          (isLink ? 'fa-cell--access' : '')
        }
      >
        <View className="fa-cell__icon">
          {icon && (
            <View className="fa-cell_hd">
              <Image
                src={icon}
                style="width:20px;height:20px;margin-right:5px;display:block"
              />
            </View>
          )}
          {this.props.renderIcon}
        </View>
        <View className="fa-cell__bd">
          {type !== 'uploader' ? (
            <Block>
              {title && <View className="fa-cell__text">{title}</View>}
              {label && <View className="fa-cell__desc">{label}</View>}
              {this.props.children}
            </Block>
          ) : (
            <Block>
              <View className="fa-uploader">
                <View className="fa-uploader__hd">
                  <View className="fa-uploader__title">图片上传</View>
                  <View className="fa-uploader__info">
                    {files.length + '/2'}
                  </View>
                </View>
                <View className="fa-uploader__bd">
                  <View className="fa-uploader__files" id="uploaderFiles">
                    {files.map((item, index) => {
                      return (
                        <Block key="*this">
                          <View
                            className="fa-uploader__file"
                            onClick={this.previewImage}
                            id={item}
                          >
                            <Image
                              className="fa-uploader__img"
                              src={item}
                              mode="aspectFill"
                            />
                          </View>
                        </Block>
                      )
                    })}
                    <View className="fa-uploader__file">
                      <Image
                        className="fa-uploader__img"
                        src={require('../images/pic_160.png')}
                        mode="aspectFill"
                      />
                    </View>
                    <View className="fa-uploader__file">
                      <Image
                        className="fa-uploader__img"
                        src={require('../images/pic_160.png')}
                        mode="aspectFill"
                      />
                    </View>
                    <View className="fa-uploader__file">
                      <Image
                        className="fa-uploader__img"
                        src={require('../images/pic_160.png')}
                        mode="aspectFill"
                      />
                    </View>
                    <View className="fa-uploader__file fa-uploader__file_status">
                      <Image
                        className="fa-uploader__img"
                        src={require('../images/pic_160.png')}
                        mode="aspectFill"
                      />
                      <View className="fa-uploader__file-content">
                        <Icon type="warn" size="23" color="#F43530" />
                      </View>
                    </View>
                    <View className="fa-uploader__file fa-uploader__file_status">
                      <Image
                        className="fa-uploader__img"
                        src={require('../images/pic_160.png')}
                        mode="aspectFill"
                      />
                      <View className="fa-uploader__file-content">50%</View>
                    </View>
                  </View>
                  <View className="fa-uploader__input-box">
                    <View
                      className="fa-uploader__input"
                      onClick={this.chooseImage}
                    />
                  </View>
                </View>
              </View>
            </Block>
          )}
        </View>
        <View onClick={this.footerTap} className="fa-cell__ft">
          {value ? (
            <Block>{value}</Block>
          ) : (
            <Block>{this.props.renderFooter}</Block>
          )}
        </View>
      </View>
    )
  }
}

export default _C
