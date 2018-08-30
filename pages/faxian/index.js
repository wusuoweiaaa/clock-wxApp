const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
  },

  todaka(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../daka/index?id=' + e.currentTarget.id,
    })
  },

  imgload(e){
    console.log(e);
    let winWidth = wx.getSystemInfoSync().screenWidth - 70
    let imgW = e.detail.width
    let imgH = e.detail.height
    console.log(winWidth)
    let height = winWidth * imgH / imgW + 'px';
    console.log(height) 
    this.setData({
      height: height
    })
  },

  toDetail: function (e) {
    let that = this
    console.log(e)
    wx.navigateTo({
      url: '../newdetail/index?id=' + e.currentTarget.id + "&cid=" + that.data.cid,
    })
  },
  getList(cid) {
    let that = this
    app.util.request({
      url: 'entry/wxapp/index.find',
      data: {
        m: 'hw_signin',
        type: '',
        limit: ''
      },
      success(res) {
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
    console.log(options)
    this.getList()
    
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
    let openid = wx.getStorageSync("openid")
    let title = wx.getStorageSync("title")
    return {
      title: title,
      path: 'daka/pages/index/index?cid=' + this.data.cid + "&openid=" + openid,
    }
  }
})