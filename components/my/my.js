// components/my/my.js
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
    myLost:{},
    context:"1234567",
    lists:[
      // {
      //   type:'1'
      // },
      {
        type: '2'
      },
      {
        type: '3'
      },
    ]
  },


  ready:function(){
    var that = this;
    wx.request({
      url: 'http://lost.jystudio.top/api/my-lost?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      method: 'get',
      data: {
        // code: res.code,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({ title: '查询成功', icon: 'success', duration: 1000 });
          that.setData({myLost:res.data.data})
        }

      },
      fail() {
        wx.showToast({ title: '查询失败,请检查网络链接', icon: 'loading', duration: 1000 });
      },
      complete() {
        wx.hideLoading()
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    editqq: function (e) {
      console.log(e.detail.value);
    },
  }
})
