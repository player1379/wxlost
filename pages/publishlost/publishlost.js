const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isImg: false,
    imgUrl: "",
    formData: { 'lost': '捡到' },
    
    types: ['校园卡', '银行卡', '身份证', '学生证','驾驶证','升升门禁卡','钱包','书包','耳机','眼镜','雨伞','钥匙','衣服','书籍','手机','水杯','充电宝','U盘','其他物品'],
    areas: ['南湖校区', '鉴湖校区', '升升公寓', '余家头校区', '校外'],
    imgs:[],
    picPaths:[],
    lostTime:''
  },

  methods: {
  },
  desInputChange: function (e) {
    this.data.formData.description = e.detail.html;
    this.setData({
      formData: this.data.formData
    })
  },
  formInputChange: function (e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    console.log(this.data.formData);
  },
  selectCat: function (e) {
    console.log(e);
    this.data.mydialog.show = true;
    this.setData({
      mydialog: this.data.mydialog
    })
  },
  areaChange: function (e) {

    let areaChecked2 = {};
    areaChecked2[e.detail.value] = "checked";

    this.data.formData.cat = e.detail.value;
    for (let i = 0; i < this.data.areas.length; i++) {
      if (this.data.areas[i][1] == e.detail.value) {
        this.setData({
          area: this.data.areas[i][0]
        });
        break;
      }
    }
    this.setData({
      areaChecked: areaChecked2,
      formData: this.data.formData
    })
  },
  dialogButtonTap: function (e) {
    console.log(e);
    this.data.mydialog.show = false;
    this.setData({
      mydialog: this.data.mydialog
    })
  },
  mySwitchChange: function (e) {
    console.log(e);
    if (e.detail.value) {
      this.data.formData.bargain = 1;
    } else {
      this.data.formData.bargain = 0;
    }
    this.setData({
      formData: this.data.formData
    })
  },
  picInputChange: function (e) {

  },
  formSubmit: function (e) {
    wx.showLoading({

      title: '正在发布',

      mask: true

    })
    console.log(this.data.formData)
    wx.request({
      url: 'http://lost.jystudio.top/api/send-lost?token=' + wx.getStorageSync('token'), //仅为示例，并非真实的接口地址
      method: 'post',
      data: this.data.formData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 0) {
          wx.showToast({ title: '发布成功', icon: 'success', duration: 1000 });
          setTimeout(function () {
            wx.navigateBack({
              delta: 2
            })
          }, 1500)

        }
        else {
          wx.showToast({ title: '发布失败', icon: 'loading', duration: 1000 });
        }
      },
      fail() {
        wx.showToast({ title: '发布失败,请检查网络链接', icon: 'loading', duration: 1000 });
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  onLaunch: function (e) {
    wx.setNavigationBarTitle({
      title: '发布物品'
    })
  },
  
  onEditorReady: function (e) {
    let that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.setData({
        editorCtx: res.context
      });
      console.log("设置context成功");
    }).exec(function (e) {
      console.log(that.data.editorCtx);
    });
  },
  bindPickerTypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);//index为数组点击确定后选择的item索引
    this.setData({
      [`formData.${'type'}`]: this.data.types[e.detail.value]
    });
  },
  bindPickerAreaChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);//index为数组点击确定后选择的item索引
    this.setData({
      [`formData.${'area'}`]: this.data.areas[e.detail.value]
    });
  },
  lostTimeChange(e) {
    this.setData({
      lostTime: e.detail.value
    })
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
  chooseWxImage: function (type) {
    var that = this;
    var imgsPaths = that.data.imgs;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0]);
        that.upImgs(res.tempFilePaths[0], 0) //调用上传方法
      }
    })
  },
  //上传服务器
  upImgs: function (imgurl, index) {
    var that = this;
    wx.showLoading({

      title: '正在发布',

      mask: true

    })
    wx.uploadFile({
      url: 'http://lost.jystudio.top/api/upload-img?token=' + wx.getStorageSync('token'),//
      filePath: imgurl,
      name: 'image',
      header: {
        'content-type': 'multipart/form-data'
      },
      formData: null,
      success: function (res) {
        var data = JSON.parse(res.data)
        if (data.code == 0) {
          that.data.isImg = true
          that.data.imgUrl = data.data.showUrl
          that.data.formData.img = data.data.baseUrl
          that.setData({ isImg: that.data.isImg, formData: that.data.formData, imgUrl: that.data.imgUrl })
          wx.showToast({ title: '上传成功', icon: 'success', duration: 1000 });
        } else {
          wx.showToast({ title: '上传失败,请检查网络链接', icon: 'loading', duration: 1000 });
        }




        // that.data.picPaths.push(data['msg'])
        // that.setData({
        //   picPaths: that.data.picPaths
        // })
        // console.log(that.data.picPaths)
      },
      fail() {
        wx.showToast({ title: '上传失败,请检查网络链接', icon: 'loading', duration: 1000 });
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
});
