import { Block, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import withWeapp from '@tarojs/with-weapp'

@withWeapp('Component')
class _C extends Taro.Component {
  static relations = {
    '../cell/index': {
      type: 'child',
      linked() {
        this._updateIsLastCell()
      },
      linkChanged() {
        this._updateIsLastCell()
      },
      unlinked() {
        this._updateIsLastCell()
      }
    }
  }
  state = {
    cellUpdateTimeout: 0
  }
  _updateIsLastCell = () => {
    // 用 setTimeout 减少计算次数
    if (this.data.cellUpdateTimeout > 0) {
      return
    }

    const cellUpdateTimeout = setTimeout(() => {
      this.setData({ cellUpdateTimeout: 0 })
      let cells = this.getRelationNodes('../cell/index')

      if (cells.length > 0) {
        let lastIndex = cells.length - 1

        cells.forEach((cell, index) => {
          cell.updateIsLastCell(index === lastIndex)
        })
      }
    })

    this.setData({ cellUpdateTimeout })
  }
  config = {
    component: true
  }

  render() {
    return <View className="cell-group">{this.props.children}</View>
  }
}

export default _C
