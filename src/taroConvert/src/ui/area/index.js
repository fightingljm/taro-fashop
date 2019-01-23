import { Block, View, Picker, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'
import './index.scss'

@withWeapp('Component')
class _C extends Taro.Component {
  static defaultProps = {
    placeholder: '请选择地区',
    areaNames: null,
    selected: [0, 0, 0],
    areaList: null,
    columnsNum: 3
  }
  static externalClasses = ['mask-class', 'container-class']
  _observeProps = []
  state = {
    displayList: []
  }
  attached = () => {
    this.initDisplayList()
  }
  columnChange = e => {
    let selected = this.data.selected
    selected[e.detail.column] = e.detail.value
    for (let i = 0; i < selected.length; i++) {
      if (e.detail.column < i) {
        selected[i] = 0
      }
    }
    this.setData({
      selected: selected
    })
    this.initDisplayList()
  }
  change = () => {
    const displayList = this.data.displayList
    let selected = this.data.selected
    const areaList = this.data.areaList
    const areaNames =
      displayList[0][selected[0]] +
      ' ' +
      displayList[1][selected[1]] +
      ' ' +
      displayList[2][selected[2]]
    const provinceId = areaList[selected[0]]['id']
    const cityId = areaList[selected[0]]['childs'][selected[1]]['id']
    const areaId =
      areaList[selected[0]]['childs'][selected[1]]['childs'][selected[2]]['id']
    const ids = [provinceId, cityId, areaId]

    this.setData({
      areaNames
    })
    this.triggerEvent('change', {
      value: this.data.selected,
      areaNames,
      ids
    })
  }
  initDisplayList = () => {
    const displayList = []
    const areaList = this.data.areaList
    let selected = this.data.selected

    displayList[0] = areaList.map(function(item) {
      return item.name
    })
    displayList[1] = areaList[selected[0]].childs.map(function(item) {
      return item.name
    })
    displayList[2] = areaList[selected[0]].childs[selected[1]].childs.map(
      function(item) {
        return item.name
      }
    )

    this.setData({
      displayList: displayList
    })
  }
  config = {
    component: true
  }

  render() {
    const {
      placeholder: placeholder,
      areaNames: areaNames,
      selected: selected,
      areaList: areaList,
      columnsNum: columnsNum
    } = this.props
    const { displayList: displayList } = this.state
    return (
      <View className="section">
        <Picker
          mode="multiSelector"
          onChange={this.bindMultiPickerChange}
          onColumnChange={this.bindMultiPickerColumnChange}
          value={selected}
          range={displayList}
          onColumnChange={this.columnChange}
          onChange={this.change}
        >
          <View className="picker">
            {areaNames ? (
              <Block>
                <Text className="text">{areaNames}</Text>
              </Block>
            ) : (
              <Block>
                <Text className="placeholder">{placeholder}</Text>
              </Block>
            )}
          </View>
        </Picker>
      </View>
    )
  }
}

export default _C
