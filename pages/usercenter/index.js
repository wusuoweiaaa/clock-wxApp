// daka/pages/usercenter/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetHidden1: true,
    actionSheetItems: [
      { bindtap: 'deleteContent', txt: '删除' },


    ],
    actionSheetItems1: [
      { bindtap: 'Menu2', txt: '投诉' },
    ],
    page: 1,
    diary: []
  },

  toDaka(e) {
    if (e.currentTarget.dataset.type == 1) {
      wx.navigateTo({
        url: '../userDaka/index?id=' + e.currentTarget.id + "&sign=" + e.currentTarget.dataset.sign,
      })
    } else {
      wx.navigateTo({
        url: '../daka/index?id=' + e.currentTarget.id + "&type=" + e.currentTarget.dataset.type,
      })
    }

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

  tocomment(e) {
    console.log(e)
    wx.navigateTo({
      url: '../comment/index?id=' + this.data.id + "&type=" + 1 + "&did=" + e.currentTarget.id,
    })
  },

  preview(e) {
    let that = this
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: e.currentTarget.dataset.images,
      success(res) {
        return;
      },
      fail(res) {
        console.log(res)
        return;
      }
    })
  },

  getDiary(page){
    let that = this
    app.util.request({
      url: 'entry/wxapp/user.signin.diary',
      data: {
        m: 'hw_signin',
        openid: that.data.openid || '',
        limit: page || 1
      },
      success(res){
        console.log(res.data.data.diary)
        let page = that.data.page
        if (that.data.diary.length > 0) {
          that.setData({
            diary: that.data.diary.concat(res.data.data.diary)
          })
        }else {
          that.setData({
            diary: res.data.data.diary
          })
        }

        if(res.data.data.diary.length > 0) {
          that.setData({
            page: page + 1,
          })
        }
        
      }
    })
  },

  toinfo(e) {
    console.log(e)
    if (e.currentTarget.dataset.self) {
      this.setData({ actionSheetHidden: false, did: e.currentTarget.id })
    } else {
      this.setData({ actionSheetHidden1: false })
    }
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
        
        } else {
          list[index].iszan = 0
          // list[index].zan_count -= 1
          that.setData({
            riliList: list
          })
          setTimeout(function () {
            wx.showToast({
              icon: 'none',
              title: '取消点赞成功!',
            })
            
          }, 500)
        }

      }
    })
  },

  init(openid){
    let that = this 
    app.util.request({
      url: 'entry/wxapp/user.signin',
      data: {
        m: 'hw_signin',
        openid: openid || ''
      },
      success(res){
        console.log(res)
        that.setData({
          diary_count: res.data.data.diary_count,
          sign_count: res.data.data.sign_count,
          signin: res.data.data.signin,
          user: res.data.data.user
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.openid) {
      this.setData({
        openid: options.openid
      })
    }
    this.init(options.openid)
    this.getDiary()
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
    this.getDiary(this.data.page + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})