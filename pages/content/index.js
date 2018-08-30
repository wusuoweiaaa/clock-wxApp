// daka/pages/content/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit: 1,
    list: [],
    info: false,
    actionSheetHidden: true,
    actionSheetHidden1: true,
    actionSheetItems: [
      { bindtap: 'deleteContent', txt: '删除' },
      

    ],
    actionSheetItems1: [
      { bindtap: 'Menu2', txt: '投诉' },
    ],
    daodi: false
    
  },
  
  bindMenu2(){
    
  
    wx.showToast({
      icon: "none",
      title: '您的投诉已经提交了哦~',
    })
    this.setData({
      actionSheetHidden1: !this.data.actionSheetHidden1,
      
    })
  },

  dianzan(e){
    console.log(e)
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.list.zan',
      data: {
        m: 'hw_checkin',
        id: e.currentTarget.id,
        cid: that.data.cid
      },
      success(res){
        console.log(res)
        let list = that.data.list
        let index = list.findIndex(item => item.id == e.currentTarget.id)

        if(list[index].iszan == 0){
          list[index].iszan = 1
          list[index].zan_count += 1
          that.setData({
            list: list
          })
        }else {
          list[index].iszan = 0
          list[index].zan_count -= 1
          that.setData({
            list: list
          })
        }
        
      }
    })
  },

  viewImage(e){
    console.log(e.currentTarget.dataset.src)
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.images // 需要预览的图片http链接列表
    })
  },
  

  toinfo(e){
    console.log(e.currentTarget.id, e.currentTarget.dataset.self)
    if (e.currentTarget.dataset.self){
      this.setData({ actionSheetHidden: false, did: e.currentTarget.id}) 
    }else {
      this.setData({ actionSheetHidden1: false })
    }
  },

  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetbindchange1: function () {
    this.setData({
      actionSheetHidden1: !this.data.actionSheetHidden1
    })
  },
  
  binddeleteContent(){
    console.log(this.data.did)
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.list.del',
      data: {
        m: 'hw_checkin',
        id: this.data.did,
      },
      success(res){
        console.log(res)
        
        
        
        let list = that.data.list

        list.splice(list.findIndex(item => item.id == that.data.did), 1)

        that.setData({
          actionSheetHidden: true,
          list: list
        })

        setTimeout(function(){
          wx.showToast({
            title: '删除成功！',
          })
        },1000)
      }
    })
  },

  getList(limit,cid){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.list',
      data: {
        m: 'hw_checkin',
        cid: cid,
        keyword: '',
        date: '',
        sort: '',
        limit: limit || 1,
      },
      success(res) {
        console.log(res)
        let data = res.data.data.data
        // data.forEach(function (item) {
        //   console.log(item.createtime)
        //   let day = new Date(Number(item.createtime * 1000));
        //   let Y = day.getFullYear() + '-';
        //   let M = (day.getMonth() + 1 < 10 ? '0' + (day.getMonth() + 1) : day.getMonth() + 1) + '-';
        //   let D = (day.getDate() < 10 ? '0' + day.getDate() : day.getDate()) + ' ';
        //   let h = (day.getHours() < 10 ? '0' + day.getHours() : day.getHours()) + ':';
        //   let m = (day.getMinutes() < 10 ? '0' + day.getMinutes() : day.getMinutes()) + ':';
        //   let s = day.getSeconds() < 10 ? '0' + day.getSeconds() : day.getSeconds();

        //   item.createtime = Y + M + D + h + m + s
        // })
        let list = that.data.list.concat(res.data.data.data)
        that.setData({
          list: list,
          
          limit: that.data.limit + 1,
          daodi: false
        })
      },
      fail(res){
        console.log(res)
        // wx.showModal({
        //   title: '已经是全部了哦~',
        //   content: '',
        // })
        that.setData({
          daodi: true
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let user = JSON.parse(options.user)
    that.getList("", options.cid)
    that.setData({
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
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.list',
      data: {
        m: 'hw_checkin',
        cid: that.data.cid,
        keyword: '',
        date: '',
        sort: '',
        limit: 1,
      },
      success(res) {
        console.log(res)
        let data = res.data.data.data
        
        that.setData({
          list: data,

          
          daodi: false
        })
        setTimeout(function () {
          wx.showToast({
            icon: 'none',
            title: '刷新成功~',
          })
        })
      },
      fail(res) {
        console.log(res)
        // wx.showModal({
        //   title: '已经是全部了哦~',
        //   content: '',
        // })
        that.setData({
          daodi: true
        })
        
      }
    })
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList(this.data.limit, this.data.cid)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let openid = wx.getStorageSync("openid")
    let title = wx.getStorageSync("title")
    return {
      title: title,
      path: 'daka/pages/index/index?cid=' + this.data.cid + "&openid=" + openid
    }
  }
})