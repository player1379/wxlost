// pages/index/components/more/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: Array,
      value: []
    },
    brand: {
      type: Array,
      value: []
    },
    loading: {
      type: Boolean,
      value: true
    }
  },
  
  data:{
    searchVal:'',
    startTime:'',
    endTime: '',
    addressArray: ['全部','南湖校区', '鉴湖校区', '升升公寓', '余家头校区','校外'],
    addressIndex:'0'
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 点击标签
     */
    handleTapTag(e) {
      const tagId = e.currentTarget.dataset.tagid
      this.triggerEvent('handleTapTag', {
        tagId
      })
    },

    /**
     * 点击品牌
     */
    handleTapBrand(e) {
      const brandId = e.currentTarget.dataset.brandid
      this.triggerEvent('handleTapBrand', {
        brandId
      })
    },

    /**
     * 点击确定
     */
    handleTapOk() {
      console.log()
      this.triggerEvent('handleTapOk')
    },

    /**
 * 点击确定
 */
    handleTapCancel() {
      console.log('asdasd')
      this.triggerEvent('handleTapOk')
    },

    /**
     * 点击重置
     */
    handReset() {
      this.triggerEvent('handReset')
      this.setData({
        addressIndex:'0',
        startTime:'',
        endTime:'',
        searchVal:''
      })
    },

    /**
     * 阻止滑动
     */
    handleTouchmove() {
      return
    },
    //取消
    canslebtn() {
      this.triggerEvent("canslebtn");
    },
    //确认
    closebtn() {
      this.triggerEvent("closebtn");
    },
    // 调用父组件  事件
    fnbindChange(e) {
      this.triggerEvent("bindChangeEvent", e.detail);
    },
     /**
     * 选择开始时间
     */
    startTimeChange(e){
      this.setData({
        startTime:e.detail.value
      })
    },
    /**
    * 选择结束时间
    */
    endTimeChange(e) {
      this.setData({
        endTime: e.detail.value
      })
    },
    /**
    * 选择捡到地点
    */
    addressPickerChange(e){
      this.setData({
        addressIndex: e.detail.value
      })
    }
  }
})
