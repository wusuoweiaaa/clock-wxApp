// daka/pages/paihangbang/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    select2: 0,
  },

  saveimg(e) {
    let that = this
    wx.getImageInfo({
      src: that.data.shareimg,
      success: function (res) {
        console.log(res.path)
        let path = res.path
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(res) {
            wx.showToast({
              icon: 'none',
              title: '成功保存到本地！',
            })
          }
        })
      }
    })

  },

  pengyouquan() {

    wx.showToast({
      icon: 'none',
      title: '先保存到手机，再分享到朋友圈哦~',
      duration: 2000
    })

  },

  share() {
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.poster',
      data: {
        m: 'hw_signin',
        cid: that.data.id,
        'type': 'day_poster',
      },
      success(res) {
        
        console.log(res.data.data)
        that.setData({
          shareimg: res.data.data.url,
        })
      },
      fail(res) {
        console.log(res)
        if (res.data.message) {
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })

        }
      }
    })
  },

  selected(e) {
    console.log(e)
    this.setData({
      select: e.currentTarget.id
    })
    if (this.data.select == 2) {
      this.share()
    }
  },
  selected2(e) {
    let that = this
    console.log(e)
    this.setData({
      select2: e.currentTarget.id
    })
    
  },

  getList(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.ranking',
      data: {
        m: 'hw_signin',
        cid: that.data.id,
        day: ''
      },
      success(res){
        console.log(res)
        that.setData({
          list: res.data.data.ranking
        })
      }
    })
  },

  getXunzhang(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.medal',
      data: {
        m: 'hw_signin',
        cid: that.data.id,
      },
      success(res){
        console.log(res)
        that.setData({
          medals: res.data.data
        })
      }
    })
  },

  getHaibao(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.poster',
      data: {
        m: 'hw_signin',
        cid: that.data.id,
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id: options.id,
      select: options.select
    })
    this.getList()
    this.getXunzhang()
    if (this.data.select == 2) {
      this.share()
    }
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