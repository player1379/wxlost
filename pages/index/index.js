//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lists: [{
        type: 'video'
      },
      {
        type: 'image'
      }
    ],
    // 弹窗
    showModal: false,
    modalList: {
      showMore: false,
    },
    condition: {tesat:'111'},
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
        tagId: '5',
        tagName: '学生证'
      },
      {
        tagId: '6',
        tagName: '驾驶证'
      },
      {
        tagId: '7',
        tagName: '门禁卡'
      },
      {
        tagId: '8',
        tagName: '钱包'
      },
      {
        tagId: '9',
        tagName: '书包'
      },
      {
        tagId: '10',
        tagName: '耳机'
      },
      {
        tagId: '11',
        tagName: '眼镜'
      },
      {
        tagId: '12',
        tagName: '雨伞'
      },
      {
        tagId: '13',
        tagName: '钥匙'
      },
      {
        tagId: '14',
        tagName: '衣服'
      },
      {
        tagId: '15',
        tagName: '书籍'
      },
      {
        tagId: '16',
        tagName: '手机'
      },
      {
        tagId: '17',
        tagName: '水杯'
      },
      {
        tagId: '18',
        tagName: '充电宝'
      },
      {
        tagId: '19',
        tagName: 'U盘'
      },
      {
        tagId: '20',
        tagName: '其他物品'
      },
    ],
    tagIdArr:[],
    tabIndex:'1'
  },
  /**
   * 关闭弹窗
   */
  handleCloseModal() {
    const modalList = this.data.modalList
    for (let key in modalList) {
      modalList[key] = false
    }
    this.setData({
      showModal: false,
      modalList
    })
  },
  searching:function(e){
    const modalList = this.data.modalList
    for (let key in modalList) {
      modalList[key] = true
    }
    this.setData({
      showModal: true,
      modalList
    })
  },
  /**
   * 更多组件点击了标签
   */
  handleTapTag(e) {
    const tag = this.data.tag
    const tagCopy = JSON.parse(JSON.stringify(tag))
    const tagId = e.detail.tagId
    tag.forEach(item => {
      delete item.selected
      if (item.tagId == tagId){
        item.selected = true
      }
    })
    this.setData({
      tag
    })
  },
  /**
  * 更多组件点击了重置
  */
  handReset() {
    const tag = this.data.tag
    const tagCopy = JSON.parse(JSON.stringify(tag))
    tag.forEach(item => {
      delete item.selected
    })
    this.setData({
      needPageScroll: true,
      tag

    })

  },
   /**
  * 切换tab
  */
  tabSelect(e){
    this.setData({
      tabIndex:e.detail
    })
  },
  

  onLoad: function() {

  },


  lost_request:function(){
    var that=this;
    wx.request({
      url: '/api/lost-list',//仅供参考
      method:"GET",
      data:{
        lost:lost,
        date_start:date_start,
        date_end:date_end,
        title:keywords,
        tagName:types
      },
      success:function(){
        that.setData({
          "code": 0,
          "msg": '发布成功',
          "data": {
          }
        })
      }
    })
  }
})