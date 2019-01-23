import {
  Block,
  View,
  Text,
  Textarea,
  Input,
  Picker,
  Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaSwitch from '../switch/index'
import FaArea from '../area/index'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    type: 'input',
    inputType: 'text',
    pickerMode: 'selector',
    mode: 'normal',
    range: [],
    rangeKey: null,
    maxlength: 140,
    areaNames: null,
    areaList: [],
    uploaderCount: 1,
    uploaderFiles: [],
    uploaderName: 'image',
    uploaderUrl: null,
    uploaderHeader: {},
    uploaderFormData: {},
    uploaderAllowDel: false
  }
  behaviors = ['wx://form-field']
  _observeProps = []
  handleFieldChange = event => {
    const { detail = {} } = event
    const { value = '' } = detail
    this.setData({ value })
    this.triggerEvent('change', event)
  }
  handleFieldFocus = event => {
    this.triggerEvent('focus', event)
  }
  handleFieldBlur = event => {
    this.triggerEvent('blur', event)
  }
  uploaderChooseImage = e => {
    let that = this
    if (that.data.uploaderFiles.length >= that.data.uploaderCount) {
      return false
    } else {
      Taro.chooseImage({
        count: that.data.uploaderCount,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          // todo 优化先预览后返回覆盖
          const tempFilePaths = res.tempFilePaths
          for (let i = 0; i < tempFilePaths.length; i++) {
            Taro.uploadFile({
              url: that.data.uploaderUrl,
              filePath: tempFilePaths[i],
              name: that.data.uploaderName,
              header: that.data.uploaderHeader,
              formData: that.data.uploaderFormData,
              success: function(res) {
                that.triggerEvent('success', JSON.parse(res.data))
              }
            })
          }
        }
      })
    }
  }
  uploaderPreviewImage = e => {
    Taro.previewImage({
      current: e.currentTarget.id,
      urls: this.data.uploaderFiles
    })
  }
  uploaderDelImage = e => {
    console.log(e)
    this.triggerEvent('delete', {
      index: e.currentTarget.dataset.index,
      url: e.currentTarget.dataset.url
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      title: title,
      desc: desc,
      type: type,
      disabled: disabled,
      loading: loading,
      checked: checked,
      inputType: inputType,
      pickerMode: pickerMode,
      placeholder: placeholder,
      focus: focus,
      mode: mode,
      range: range,
      rangeKey: rangeKey,
      right: right,
      error: error,
      maxlength: maxlength,
      areaNames: areaNames,
      areaList: areaList,
      uploaderCount: uploaderCount,
      uploaderFiles: uploaderFiles,
      uploaderName: uploaderName,
      uploaderUrl: uploaderUrl,
      uploaderButtonText: uploaderButtonText,
      uploaderHeader: uploaderHeader,
      uploaderFormData: uploaderFormData,
      uploaderAllowDel: uploaderAllowDel
    } = this.props
    const { value: value, index: index } = this.state
    return (
      <Block>
        {type === 'textarea' && (
          <View
            className={
              'fa-cell fa-field ' +
              (error ? 'fa-field--error' : '') +
              ' ' +
              (mode === 'wrapped' ? 'fa-field--wrapped' : '')
            }
          >
            <View className="fa-cell__hd">
              {title && <Text className="fa-field__title">{title}</Text>}
              {desc && <View className="fa-cell__desc">{desc}</View>}
            </View>
            <Textarea
              autoHeight
              disabled={disabled}
              focus={focus}
              value={value}
              placeholder={placeholder}
              maxlength={maxlength}
              className={
                'fa-field__textarea fa-cell__bd ' +
                (right ? 'fa-field__input--right' : '')
              }
              placeholderClass="fa-field__placeholder"
              onInput={this.handleFieldChange}
              onFocus={this.handleFieldFocus}
              onBlur={this.handleFieldBlur}
            />
          </View>
        )}
        {type !== 'textarea' && (
          <View
            className={
              'fa-cell fa-field ' +
              (error ? 'fa-field--error' : '') +
              ' ' +
              (mode === 'wrapped' ? 'fa-field--wrapped' : '')
            }
          >
            {type !== 'uploader' ? (
              <Block>
                <View className="fa-cell__hd">
                  {title && <Text className="fa-field__title">{title}</Text>}
                  {desc && <View className="fa-cell__desc">{desc}</View>}
                </View>
                {/* 多层if elif有bug 临时改为if */}
                {type === 'input' && (
                  <Input
                    type={inputType || 'text'}
                    disabled={disabled}
                    focus={focus}
                    value={value}
                    placeholder={placeholder}
                    maxlength={maxlength}
                    className={
                      'fa-field__input fa-cell__bd ' +
                      (right ? 'fa-field__input--right' : '')
                    }
                    placeholderClass="fa-field__placeholder"
                    onInput={this.handleFieldChange}
                    onFocus={this.handleFieldFocus}
                    onBlur={this.handleFieldBlur}
                  />
                )}
                {type === 'picker' && (
                  <Picker
                    mode={pickerMode || 'selector'}
                    className={
                      'fa-field__input fa-cell__bd ' +
                      (right ? 'fa-field__input--right' : '')
                    }
                    placeholderClass="fa-field__placeholder"
                    onChange={this.handleFieldChange}
                    value={index}
                    range={range}
                  >
                    <View className="picker">
                      {value || value === 0 ? range[value] : placeholder}
                    </View>
                  </Picker>
                )}
                {type === 'area' && (
                  <FaArea
                    areaNames={areaNames}
                    placeholder={placeholder}
                    className={
                      'fa-field__input fa-cell__bd ' +
                      (right ? 'fa-field__input--right' : '')
                    }
                    placeholderClass="fa-field__placeholder"
                    areaList={areaList}
                    onChange={this.handleFieldChange}
                    onFocus={this.handleFieldFocus}
                    onBlur={this.handleFieldBlur}
                  />
                )}
                {type === 'switch' && (
                  <FaSwitch
                    checked={checked}
                    loading={loading}
                    disabled={disabled}
                    className={
                      'fa-field__input fa-cell__bd ' +
                      (right ? 'fa-field__input--right' : '')
                    }
                    onChange={this.handleFieldChange}
                    onFocus={this.handleFieldFocus}
                    onBlur={this.handleFieldBlur}
                  />
                )}
              </Block>
            ) : (
              <Block>
                <View className="fa-cell__bd">
                  <View className="fa-uploader">
                    {title && (
                      <View className="fa-uploader__hd">
                        <View className="fa-uploader__title">{title}</View>
                        {/* <view class="fa-uploader__info">{{files.length}}/2</view> */}
                      </View>
                    )}
                    <View className="fa-uploader__bd">
                      <View className="fa-uploader__files" id="uploaderFiles">
                        {uploaderFiles.map((item, uploader_image_index) => {
                          return (
                            <Block key="*this">
                              <View className="fa-uploader__file">
                                <Image
                                  className="fa-uploader__img"
                                  src={item}
                                  mode="aspectFill"
                                  onClick={this.uploaderPreviewImage}
                                  id={item}
                                />
                                {uploaderAllowDel === true && (
                                  <View
                                    className="fa-icon-delete"
                                    onClick={this.uploaderDelImage}
                                    data-index={uploader_image_index}
                                    data-url={item}
                                  >
                                    x
                                  </View>
                                )}
                              </View>
                            </Block>
                          )
                        })}
                      </View>
                      {uploaderButtonText ? (
                        <Block>
                          <View
                            className="fa-uploader__input-box-type-text"
                            onClick={this.uploaderChooseImage}
                          >
                            <Text>{uploaderButtonText}</Text>
                          </View>
                        </Block>
                      ) : (
                        <Block>
                          <View className="fa-uploader__input-box">
                            <View
                              className="fa-uploader__input"
                              onClick={this.uploaderChooseImage}
                            />
                          </View>
                        </Block>
                      )}
                    </View>
                  </View>
                </View>
              </Block>
            )}
          </View>
        )}
      </Block>
    )
  }
}

export default _C
