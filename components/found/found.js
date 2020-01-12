// components/found/found.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // condition:{}

  },

  /**
   * 组件的初始数据
   */
    data: {
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      lists: [],
      // 弹窗
      showModal: false,
      modalList: {
        showMore: true,
      },
      tag: [
        {
          tagId: '1',
          tagName: '全部'
        },
        {
          tagId: '2',
          tagName: '校园卡'
        },
        {
          tagId: '3',
          tagName: '银行卡'
        },
        {
          tagId: '4',
          tagName: '身份证'
        },
        {
          tagId:'5',
          tagName:'水杯'
        },
      ],
      tagIdArr: []
    },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { },
    moved: function () { },
    detached: function () { },
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { console.log('asdas1d') }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready: function () {
    // console.log(condition)
    let that = this;
    wx.request({
      url: 'http://lost.jystudio.top/api/lost-list', //仅为示例，并非真实的接口地址
      data: {
        lost: 1,
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

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { 
      // let that = this;
      // wx.request({
      //   url: 'http://lost.localhost.com/api/lost-list', //仅为示例，并非真实的接口地址
      //   data: {
      //     lost: 1,
      //   },
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   success(res) {
      //     console.log(res.data.data)
      //     that.setData({lists:res.data.data})
      //   }
      // })
    },
    hide: function () { console.log('asdas1d')},
    resize: function () { console.log('asdasd')},
  },
  /**
   * 组件的方法列表
   * 
   */
  methods: {
    bindTapDetail:function(e){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + e.currentTarget.id,
      })
    }
  }
})
