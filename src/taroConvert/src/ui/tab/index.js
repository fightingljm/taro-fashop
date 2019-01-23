import { Block, View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import FaTabListTmpl from '../../imports/FaTabListTmpl.js'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    scroll: false,
    fixed: false,
    height: 0,
    list: [],
    selectedId: ''
  }
  static externalClasses = 'class'
  _observeProps = []
  _handleZanTabChange = e => {
    const selectedId = e.currentTarget.dataset.itemId

    this.setData({
      selectedId
    })

    this.triggerEvent('tabchange', selectedId)
  }
  config = {
    component: true
  }

  render() {
    const {
      scroll: scroll,
      fixed: fixed,
      height: height,
      list: list,
      selectedId: selectedId
    } = this.props
    const { item: item } = this.state
    return (
      <Block>
        <View
          className="fa-tab"
          style={height ? 'height:' + height + 'px' : ''}
        >
          {scroll ? (
            <Block>
              <ScrollView
                className={
                  'fa-tab__bd fa-tab__bd--scroll ' +
                  (fixed ? 'fa-tab__bd--fixed' : '')
                }
                scrollX="true"
                style={'height: ' + (height ? height + 'px' : 'auto')}
              >
                <FaTabListTmpl data={(list, selectedId, height)} />
              </ScrollView>
            </Block>
          ) : (
            <Block>
              <View
                className={'fa-tab__bd ' + (fixed ? 'fa-tab__bd--fixed' : '')}
                style={'height: ' + (height ? height + 'px' : 'auto')}
              >
                <FaTabListTmpl data={(list, selectedId, height)} />
              </View>
            </Block>
          )}
        </View>
        {/*  插入内容  */}
        {this.props.children}
      </Block>
    )
  }
}

export default _C
