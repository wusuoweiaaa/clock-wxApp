// daka/pages/tianjia/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  toAdd2(e){
    wx.navigateTo({
      url: '../addDaka/index?type=' + 2,
    })
  },
  toAdd3(e) {
    wx.navigateTo({
      url: '../addDaka/index?type=' + 3,
    })
  },
  toAdd(e){
    console.log(e.currentTarget.dataset.title)
    if (e.currentTarget.dataset.title && e.currentTarget.dataset.status) {
      wx.navigateTo({
        url: '../addDaka/index?title=' + e.currentTarget.dataset.title + "&disabled=" + e.currentTarget.dataset.status + "&type=" + 1,
      })
      return;
    }
    wx.navigateTo({
      url: '../addDaka/index?type=1',
    })
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