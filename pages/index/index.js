//index.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
import initCalendar, { getSelectedDay, jumpToToday, setTodoLabels, switchView, setMarkLabels } from '../../template/calendar/index';
import initDatepicker from '../../template/datepicker/index';



Page({
  data:{
    login: true,
    daka: false
  },
  
  closelogin() {
    this.setData({
      login: true
    })
  },

  toDaka(e){
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../userDaka/index?id=' + e.currentTarget.id + "&sign=" + e.currentTarget.dataset.sign,
      })
    }else {
      wx.navigateTo({
        url: '../daka/index?id=' + e.currentTarget.id + "&type=" + e.currentTarget.dataset.type,
      })
    }
    
  },
  
  touserDaka(e){
    wx.navigateTo({
      url: '../userDaka/index?id=' + e.currentTarget.id + "&sign=" + e.currentTarget.dataset.sign,
    })
  },

  todaka(e){
    // console.log(e)
    wx.navigateTo({
      url: '../daka/index?id=' + e.currentTarget.id,
    })
  },

  
  
  
  
  onLoad (options) {
    
    let that = this
    console.log(options)
    
    if(options.cid) {
      that.setData({
        cid: options.cid,
        openid: options.openid
      })
    }
   
  },

  onShow: function () {
    let that = this
    wx.checkSession({
      success: function (res) {
        console.log(res)
        app.util.request({
          url: 'entry/wxapp/index.index',
          data: {
            m: 'hw_signin',
          },
          success(res) {
            console.log(res, res.data.data)
            that.setData({
              data: res.data.data,
              
            })

          },
          fail(res) {
            console.log(res)
            wx.redirectTo({
              url: '../login/index',
            })
          }
        })
      },
      fail(res) {
        console.log(res)
        
        wx.redirectTo({
          url: '../login/index',
        })
      }
    })

  },
  
    


  /**
   * 周、月视图切换
   */
  switchView() {
    if (!this.weekView) {
      this.weekView = true;
      switchView('week');
    } else {
      this.weekView = false;
      switchView('month');
    }
  },
  
  /**
   * 跳转至今天
   */
  jump() {
    jumpToToday();
  },
  onShareAppMessage: function (res) {
    console.log(res)
    let openid = wx.getStorageSync("openid")
    return {
      title: this.data.data.checkin.title,
      path: 'daka/pages/index/index?cid=' + this.data.cid + "&openid=" + openid,
      imageUrl: this.data.data.checkin.topimg
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.index',
      data: {
        m: 'hw_checkin',
        cid: that.data.cid || '',
        openid: that.data.openid || ''
      },
      success(res) {
        console.log(res)
        that.setData({
          data: res.data.data.data,
          cid: res.data.data.data.checkin.cid
        })
        wx.setStorageSync("cid", res.data.data.data.checkin.cid)

        that.getrili(res.data.data.data.checkin.cid)

        setTimeout(function () {
          wx.showToast({
            icon: 'none',
            title: '刷新成功~',
          })
        }, 2000)

      },
      fail(res) {
        console.log(res)
        // that.setData({
        //   login: false
        // })
        wx.redirectTo({
          url: '../login/index',
        })
      }
    })
  },

  
})
