// daka/pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toindex(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  updateUserInfo(res) {
    console.log(res)
    let that = this
    if (res.detail.errMsg == "getUserInfo:fail auth deny") {

    }

    if (res.detail.errMsg == "getUserInfo:ok") {
      var app = getApp()
      //拿到用户数据时，通过app.util.getUserinfo将加密串传递给服务端
      //服务端会解密，并保存用户数据，生成sessionid返回
      app.util.getUserInfo(function (userInfo) {
        //这回userInfo为用户信息
        console.log(userInfo)
        wx.switchTab({
          url: '../index/index',
        })
      }, res.detail)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})