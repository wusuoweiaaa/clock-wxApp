// daka/pages/pocket/moneyDetail/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: '跑步达人',
        time: '2018-07-30 15:21:30',
        jifen: 1
      },
      {
        name: '跑步达人',
        time: '2018-07-30 15:21:30',
        jifen: -1
      },
      {
        name: '跑步达人',
        time: '2018-07-30 15:21:30',
        jifen: 1
      },
      {
        name: '跑步达人',
        time: '2018-07-30 15:21:30',
        jifen: -1
      },
    ]
  },

  getlist(page){
    app.util.request({
      url: 'entry/wxapp/user.money.detail',
      data: {
        m: 'hw_signin',
        limit: page || 1
      },
      success(res){
        console.log(res.data.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
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