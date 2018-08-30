// daka/pages/user/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexArray: ['男','女'],
    index: 0,
    customItem: '全部',
    region: [],
  },

  topocket(){
    wx.navigateTo({
      url: '../pocket/index?cid=' + this.data.cid,
    })
  },

  tomall(){
    wx.navigateTo({
      url: '../mall/index?cid=' + this.data.cid,
    })
  },

  toshare(){
    wx.navigateTo({
      url: '../share/index?cid=' + this.data.cid,
    })
  },

  toUseredit(e){
    console.log(e)
    let value = e.currentTarget.dataset.value || ''
    wx.navigateTo({
      url: '../useredit/index?name=' + e.currentTarget.dataset.name + '&text=' + e.currentTarget.dataset.text + '&value=' + value + '&cid=' + this.data.cid,
    })
  },

  bindPickerChange: function (e) {
    let that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    let v = parseInt(e.detail.value) || e.detail.value
    app.util.request({
      url: 'entry/wxapp/user.set',
      data:{
        m: 'hw_checkin',
        cid: that.data.cid,
        name: 'sex',
        value: v + 1
      },
      success(res){
        console.log(res)
        that.setData({
          index: v
        })
        wx.showToast({
          title: '已经修改性别',
        })
      }
    })
  },
  
  edit() {
    wx.navigateTo({
      url: '../edit/index?cid=' + this.data.cid + "&text=" + this.data.user.nickname,
    })
  },

  init(cid){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.index',
      data: {
        m: 'hw_checkin',
        cid: cid || 1
      },
      success(res){
        console.log(res,res.data.data.data)
        let data = res.data.data.data
        let region = that.data.region
        region.push(data.country)
        region.push(data.province)
        region.push(data.city)
        that.setData({
          data: res.data.data.data,
          index: res.data.data.data.sex - 1,
          region: region,
          share: res.data.data.setting.isshare
        })
      }
    })
  },

  set(){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // let user = JSON.parse(options.user)
   
    let user = wx.getStorageSync('userInfo')
    console.log(user)
    this.setData({
      user: user.wxInfo,
      index: user.sex - 1,
      cid: options.cid
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
    this.init(this.data.cid)
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