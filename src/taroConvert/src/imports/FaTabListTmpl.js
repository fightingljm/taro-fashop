import { Block, View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class FaTabListTmpl extends Taro.Component {
  render() {
    const {
      data: { list: list, selectedId: selectedId, height: height }
    } = this.props
    return (
      <Block>
        {list.map((item, index) => {
          return (
            <View
              key="id"
              className={
                'fa-tab__item ' +
                (selectedId == item.id ? 'fa-tab__item--selected' : '')
              }
              data-item-id={item.id}
              onClick={this._handleZanTabChange}
            >
              <View
                className="fa-tab__title"
                style={
                  height
                    ? 'height:' + height + 'px;line-height:' + height + 'px'
                    : ''
                }
              >
                {item.title}
              </View>
            </View>
          )
        })}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
