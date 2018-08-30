// daka/pages/userDaka/index.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
import initCalendar, { getSelectedDay, jumpToToday, setTodoLabels, switchView, setMarkLabels } from '../../template/calendar/index';
import initDatepicker from '../../template/datepicker/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daka: false
  },
  tapDayItemss(e){
    let that = this
    let day = e.currentTarget.dataset.day
    let today = day.year + "" + (day.month > 9 ? day.month : "0" + day.month) + "" + ( day.day > 9 ? day.day : "0" + day.day)
    console.log(today)
    if (!e.currentTarget.dataset.day.status) {
      wx.showModal({
        title: '补签',
        content: '确定补签吗？',
        success(res){
          if (res.confirm) {
            app.util.request({
              url: 'entry/wxapp/signin.signin',
              data: {
                m: 'hw_signin',
                cid: that.data.id,
                date: today
              },
              success(res) {
                console.log(res.data.data)
                let calendar = that.data.calendar
                let dayObj = {
                  id: res.data.data.id,
                  cid: res.data.data.cid,
                  day: day.day,
                  month: day.month,
                  year: day.year,
                  status: 1
                }
                
                calendar.markLabels.push(dayObj)
                that.onShow()
                that.setData({
                  daka: true,
                  dakainfo: res.data.data,
                  calendar: calendar
                })
              },
              fail(res) {
                console.log(res.data.message)
                setTimeout(function () {
                  wx.showToast({
                    icon: 'none',
                    title: res.data.message,
                  })
                }, 1000)
              }
            })
          }
        }
      })
    }
  },

  tofabiao(){
    wx.navigateTo({
      url: '../fabiao/index?id=' + this.data.id + '&type=' + 1,
    })
  },

  close() {
    this.setData({
      daka: false
    })
  },

  daka(){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.signin',
      data: {
        m: 'hw_signin',
        cid: that.data.id
      },
      success(res){
        console.log(res.data.data)
        that.setData({
          daka: true,
          dakainfo: res.data.data
        })
      },
      fail(res){
        console.log(res.data.message)
        setTimeout(function(){
          wx.showToast({
            icon: 'none',
            title: res.data.message,
          })
        },1000)
      }
    })
  },

  draw(day, total){
    let ratio = (day/total) ? (day/total) : 0
    // console.log(ratio, day,total)
    var cxt_arc = wx.createCanvasContext('canvasArc', this)
    cxt_arc.setLineWidth(6)
    cxt_arc.setStrokeStyle('#f9f9f9');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(91, 91, 85, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#ffda00');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();//开始一个新的路径
    cxt_arc.arc(91, 91, 85, -Math.PI * 1 / 2, Math.PI * ( ratio - 1/2 ), false);
    cxt_arc.stroke();//对当前路径进行描边

    cxt_arc.draw();

  },

  toedit(){
    wx.navigateTo({
      url: '../addDaka/index?id=' + this.data.id + '&type=' + this.data.top.type,
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
        that.draw(data.signin.totalcheckin,data.signdetails.config.target_day)


      }
    })
  },
  getrili(date) {
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
    
    if (options.sign == 0){
      this.daka()
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
    this.init();
    this.getrili();
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
    this.onShow()
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