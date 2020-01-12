// components/tab/tab.js
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
    tabIndex:'1',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabSelect(e){
      const index = e.currentTarget.dataset.index
      this.setData({
        tabIndex: index
      })
      this.triggerEvent('tabSelect',index)
    },
    searching:function(){
      var searchingOption={}
      this.triggerEvent('searching',searchingOption)
    },
    handleTapOk:function(e)
    {
      console.log('awdawdawdawd')
    }

  }
})
