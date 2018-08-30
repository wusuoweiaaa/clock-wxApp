// daka/pages/changjingxinxi/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toArticle(e){
    if (e.currentTarget.dataset.status == 1) {
      wx.navigateTo({
        url: '../article/index?id=' + e.currentTarget.id + "&cid=" + e.currentTarget.dataset.cid,
      })
    }else {
      wx.showToast({
        icon: 'none',
        title: '文章尚未解锁哦~',
      })
    }
   
  },

  getList(id, limit){
    let that = this
    app.util.request({
      url: 'entry/wxapp/articles.list',
      data: {
        m: 'hw_signin',
        cid: id,
        keyword: '',
        limit: limit || 1,
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          list: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(options.id)
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