// components/navbar/navbar.js
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
    isOpen:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkFlag(){
      this.setData({
        isOpen: !this.data.isOpen
      })
    },
    publishFound:function(e)
    {
      wx.navigateTo({
        url: '/pages/publishfound/publishfound'
      })
    },
    publishLost:function(e){
      wx.navigateTo({
        url: '/pages/publishlost/publishlost'
      })
    }
  }
})
