// components/modal/index.js

Component({
  /**
   * 开启多slot
   */
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    position: {
      type: String,
      value: 'center'
    },
    canClose: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: undefined
  },

  /**
   * 创建组件
   */
  ready() {
    const systemInfo = wx.getSystemInfoSync()

    /**
     * 顶部适配
     */
    // const statusBarHeight = systemInfo.statusBarHeight
    // let style = `top:${ 44 + statusBarHeight }px`

    // if (this.data.position === 'center') {
    //   style += ';justify-content: center'
    // } else if (this.data.position === 'top') {
    //   style += ';justify-content: flex-start'
    // } else if (this.data.position === 'bottom') {
    //   style += ';justify-content: flex-end'
    // }

    // this.setData({
    //   style
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 关闭弹窗
     */
    handleCloseModal() {
      if (!this.data.canClose) {
        return
      }
      this.triggerEvent('handleCloseModal')
    },

    /**
     * 阻止滑动
     */
    handleTouchmove() {
      return
    }
  }
})
