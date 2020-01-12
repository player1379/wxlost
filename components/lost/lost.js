// components/lost/lost.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    lists:[]


  },

  ready: function () {
    let that = this;
    wx.request({
      url: 'http://lost.jystudio.top/api/lost-list', //仅为示例，并非真实的接口地址
      data: {
        lost: 0,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        that.setData({ lists: res.data.data })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTapDetail: function (e) {
      wx.navigateTo({
        url: '/pages/finding/finding?id=' + e.currentTarget.id,
      })
    }
  }
})
