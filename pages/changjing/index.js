
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
import initCalendar, { getSelectedDay, jumpToToday, setTodoLabels, switchView, setMarkLabels } from '../../template/calendar/index';
import initDatepicker from '../../template/datepicker/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toPaihangbang() {
    wx.navigateTo({
      url: '../paihangbang/index?id=' + this.data.id + "&select=0",
    })
  },

  toPaihangbang2() {
    wx.navigateTo({
      url: '../paihangbang/index?id=' + this.data.id + "&select=2",
    })
  },

  
  init() {
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.calendar',
      data: {
        m: 'hw_signin',
        id: that.data.id
      },
      success(res) {
        console.log(res.data.data)
        let data = res.data.data
        that.setData({
          top: data.signdetails,
          signin: data.signin,
          user: data.user
        })
       

      }
    })
  },

  getrili(date){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.month',
      data: {
        m: 'hw_signin',
        cid: that.data.id,
        date: date || ''
      },
      success(res) {
        wx.setStorageSync('cid', that.data.id)
        console.log(res.data.data.data)
        initDatepicker();
        initCalendar();

        initCalendar({

          afterCalendarRender() {

            // // 异步请求
            setTimeout(() => {
            setMarkLabels({
              days: res.data.data.data
            });
            }, 200);
          },

        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.init();
    this.getrili();
    
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