import { Block, View, Icon, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    keywords: null,
    categoryId: null,
    categoryKeywords: null,
    showSearchBar: true
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  state = {
    inputFoucs: false
  }
  ready = () => {
    if (!this.data.categoryId) {
      this.setData({
        inputFoucs: true
      })
    }
  }
  showInput = () => {
    this.setData({
      inputFoucs: true
    })
  }
  hideInput = () => {
    this.setData({
      keywords: '',
      inputFoucs: false
    })
  }
  clearInput = () => {
    this.setData({
      keywords: ''
    })
  }
  onInput = e => {
    const keywords = e.detail.value.substring(0, 20)
    if (this.categoryId) {
      this.setData({
        categoryKeywords: this.data.categoryKeywords + keywords,
        keywords: keywords
      })
    } else {
      this.setData({
        keywords: keywords
      })
    }
  }
  onSearch = e => {
    this.setData({
      inputFoucs: false
    })
    this.triggerEvent('search-confirm', {
      keywords: this.data.keywords,
      categoryId: this.data.categoryId,
      categoryKeywords: this.data.categoryKeywords
    })
  }
  onCategoryCancel = () => {
    this.setData({
      keywords: '',
      inputFoucs: true
    })
  }
  onInputBlur = () => {
    this.setData({
      inputFoucs: false
    })
  }
  onInputFocus = () => {
    this.setData({
      inputFoucs: true
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      keywords: keywords,
      categoryId: categoryId,
      categoryKeywords: categoryKeywords,
      showSearchBar: showSearchBar
    } = this.props
    const { inputFoucs: inputFoucs } = this.state
    return (
      <Block>
        <View className="weui-search-bar">
          <View className="weui-search-bar__form">
            <View className="weui-search-bar__box">
              <Icon
                className="weui-icon-search_in-box"
                type="search"
                size="14"
              />
              {categoryKeywords + keywords && !inputFoucs && (
                <View
                  className="category-search"
                  onClick={this.onCategoryCancel}
                >
                  {categoryKeywords + keywords + '  x'}
                </View>
              )}
              <Input
                type="text"
                className="weui-search-bar__input"
                placeholder="搜索"
                value={keywords}
                focus={inputFoucs}
                onInput={this.onInput}
                onConfirm={this.onSearch}
                onBlur={this.onInputBlur}
                onFocus={this.onInputFocus}
              />
              {keywords.length > 0 && (
                <View className="weui-icon-clear" onClick={this.clearInput}>
                  <Icon type="clear" size="14" />
                </View>
              )}
            </View>
            {/* <label class="weui-search-bar__label" hidden="true" bindtap="showInput"> */}
            {/* <icon class="weui-icon-search" type="search" size="14"></icon> */}
            {/* <view class="weui-search-bar__text">搜索</view> */}
            {/* </label> */}
          </View>
          {/* <view class="weui-search-bar__cancel-btn" hidden="{{!inputShowed}}" bindtap="hideInput">取消</view> */}
        </View>
        {/* <view class="weui-cells searchbar-result" wx:if="{{keywords.length > 0}}"> */}
        {/* <navigator url="" class="weui-cell" hover-class="weui-cell_active"> */}
        {/* <view class="weui-cell__bd"> */}
        {/* <view>实时搜索文本</view> */}
        {/* </view> */}
        {/* </navigator> */}
        {/* </view> */}
      </Block>
    )
  }
}

export default _C
