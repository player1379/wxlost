//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.showLoading({

      title: '正在登录',

      mask: true

    })
    let token = wx.getStorageSync('token');
    console.log(token)
    if(token)
    {
      wx.hideLoading()
    }
    else
    {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          wx.request({
            url: 'http://lost.jystudio.top/api/wechat-login', //仅为示例，并非真实的接口地址
            method:'post',
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              if(res.data.code == 0)
              {
                wx.setStorageSync('token', res.data.data)
                wx.showToast({ title: '登录成功', icon: 'success', duration: 1000 });
                wx.hideLoading()
              }
            }
          })
        }
      })
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})