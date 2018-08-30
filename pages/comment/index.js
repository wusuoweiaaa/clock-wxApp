// daka/pages/comment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  toback(){
    wx.navigateBack({
      
    })
  },

  input(e) {
    // console.log(e.detail.value)
    this.setData({
      text: e.detail.value,
    })
  },
  fabiao(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.comment',
      data: {
        m: 'hw_signin',
        diary_id: that.data.id,
        text: that.data.text
      },
      success(res) {
        console.log(res)
        wx.navigateBack({
          id: res.data.data.id
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.did
    })
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