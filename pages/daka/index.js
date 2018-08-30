// daka/pages/daka/index.js
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
import initCalendar, { getSelectedDay, jumpToToday, setTodoLabels, switchView, setMarkLabels } from '../../template/calendar/index';
import initDatepicker from '../../template/datepicker/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    actionSheetHidden: true,
    actionSheetHidden1: true,
    actionSheetItems: [
      { bindtap: 'deleteContent', txt: '删除' },


    ],
    actionSheetItems1: [
      { bindtap: 'Menu2', txt: '投诉' },
    ],
    isdaka: false,
    isShare: false
  },

  saveimg(e){
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

  share(e){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.poster',
      data: {
        m: 'hw_signin',
        cid: this.data.id,
        'type': 'diary_poster',
        diary_id: e.currentTarget.id
      },
      success(res) {
        console.log(res.data.data)
        that.setData({
          shareimg: res.data.data.url,
          isShare: true
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },



  closeshare(){
    this.setData({
      isShare: false
    })
  },

  preview(e) {
    let that = this
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.images,
      success(res){
        return;
      },
      fail(res){
        console.log(res)
        return;
      }
    })
  },

  tocomment(e){
    console.log(e)
    wx.navigateTo({
      url: '../comment/index?id=' + this.data.id + "&type=" + 1 + "&did=" + e.currentTarget.id,
    })
  },

  tofabiao() {
    this.setData({
      isdaka: false,
    })
    wx.navigateTo({
      url: '../fabiao/index?id=' + this.data.id + "&type=" + 1,
    })
  },

  close(){
    this.setData({
      isdaka: false
    })
  },

  touserinfo(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../usercenter/index?id=' + this.data.id + "&type=" + this.data.type + "&openid=" + e.currentTarget.id,
    })
  },

  tochangjing2(){
    wx.navigateTo({
      url: '../changjing/index?id=' + this.data.id,
    })
  },

  daka(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.signin',
      data: {
        m: 'hw_signin',
        cid: this.data.id,
      },
      success(res){
        console.log(res)
        let markday = that.data.markday
        let dayObj = {
          id: res.data.data.id,
          cid: res.data.data.cid,
          day: res.data.data.date.day * 1,
          month: res.data.data.date.day.month * 1,
          year: res.data.data.date.day.year,
          status: 1
        }

        markday.push(dayObj)
        let info = that.data.indexInfo
        info.records = 1
        that.setData({
          indexInfo: info,
          isdaka: true,
          dakainfo: res.data.data,
          markday: markday
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  dian(e) {
    console.log(e)
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.zan',
      data: {
        m: 'hw_signin',
        diary_id: e.currentTarget.id,
      },
      success(res) {
        console.log(res)
        let list = that.data.riliList
        let index = list.findIndex(item => item.id == e.currentTarget.id)

        if (list[index].iszan == 0) {
          list[index].iszan = 1
          // list[index].zan_count += 1
          that.setData({
            riliList: list
          })
          setTimeout(function () {
            wx.showToast({
              icon: 'none',
              title: '点赞成功!',
            })
          }, 500)
          that.getRili()
        } else {
          list[index].iszan = 0
          // list[index].zan_count -= 1
          that.setData({
            riliList: list
          })
          setTimeout(function(){
            wx.showToast({
              icon: 'none',
              title: '取消点赞成功!',
            })
            that.getRili()
          },500)
        }

      }
    })
  },

  bindMenu2() {


    wx.showToast({
      icon: "none",
      title: '您的投诉已经提交了哦~',
    })
    this.setData({
      actionSheetHidden1: !this.data.actionSheetHidden1,

    })
  },

  toinfo(e) {
    console.log(e.currentTarget.id, e.currentTarget.dataset.self)
    if (e.currentTarget.dataset.self) {
      this.setData({ actionSheetHidden: false, did: e.currentTarget.id })
    } else {
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

  binddeleteContent() {
    console.log(this.data.did)
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.diary.del',
      data: {
        m: 'hw_signin',
        id: this.data.did,
      },
      success(res) {
        console.log(res)



        let list = that.data.list

        list.splice(list.findIndex(item => item.id == that.data.did), 1)

        that.setData({
          actionSheetHidden: true,
          list: list
        })

        setTimeout(function () {
          wx.showToast({
            title: '删除成功',
          })
        }, 1000)
      }
    })
  },

  toPaihangbang(){
    wx.navigateTo({
      url: '../paihangbang/index?id=' + this.data.id + "&select=0",
    })
  },

  toPaihangbang2(){
    this.setData({
      isshare: false
    })
    wx.navigateTo({
      url: '../paihangbang/index?id=' + this.data.id + "&select=2",
    })
  },

  tochangjing(){
    wx.navigateTo({
      url: '../changjingxinxi/index?id=' + this.data.id,
    })
  },

  selected(e) {
    console.log(e)
    this.setData({
      select: e.currentTarget.id
    })
  },

  getRili(){
    let that =this
    app.util.request({
      url: 'entry/wxapp/signin.diary',
      data:{
        m: 'hw_signin',
        cid: that.data.id,
        'type': 1,
        keyword: '',
        date: '',
        sort: '',
        limit: 1
      },
      success(res){
        // console.log(res.data.data)
        that.setData({
          riliList: res.data.data
        })
      }
    })
  },

  getMember(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.enroll',
      data: {
        m: 'hw_signin',
        type: 1,
        cid: that.data.id
      },
      success(res){
        // console.log(res.data.data)
        that.setData({
          member: res.data.data
        })
      }
    })
  },

  getInfo(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.details',
      data: {
        m: 'hw_signin',
        id: that.data.id
      },
      success(res) {
        console.log(res.data.data, "详情")
        // that.setData({
        //   detail: res.data.data
        // })
        WxParse.wxParse('article', 'html', res.data.data.details, that, 0);
      }
    })
    
  },

  canyu(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.enroll.add',
      data: {
        m: 'hw_signin',
        cid: that.data.id
      },
      success(res) {
        that.init()
        that.getMember()
      }
    })
  },

  init(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.index',
      data: {
        m: 'hw_signin',
        id: that.data.id
      },
      success(res){
        console.log("111")
        that.setData({
          indexInfo: res.data.data,
          type: res.data.data.type,
          markday: res.data.data.records_list
        })
        if (res.data.data.records_list) {
          that.weeksInit()
        }
       
      }
    })
  },
  weeksInit(){
    let that = this
    let weekdays = [];
    let day = new Date().getDay()
    var dayBefore = new Date().getTime() - 24 * 60 * 60 * day * 1000;;
    var result = new Date(dayBefore).getTime()
    console.log(result);
    for (let i = 0; i < 7; i++) {
      let item = new Date(result + i * 24 * 3600 * 1000).getDate();
      let day = {}
      day.day = item

      weekdays.push(day)
    }
    let mark = that.data.markday
    mark.forEach(function(item){
      console.log(item)
      weekdays.map(value => {
        if (value.day == item.day ) {
          value.status = 1
        }
      })
    })
    console.log(weekdays)
    this.setData({
      weekdays: weekdays
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      id: options.id
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
    this.init()
    this.getRili()
    this.getMember()
    this.getInfo()
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
    return {
      title: '快打卡',
      imageUrl: this.data.shareimg || '',
    }
  }
})