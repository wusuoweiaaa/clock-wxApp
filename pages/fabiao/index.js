// daka/pages/cjdaka/index.js
const app = getApp()
import initCalendar, { getSelectedDay, jumpToToday, setTodoLabels, switchView, setMarkLabels } from '../../template/calendar/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgArr: []
  },

  input(e) {
    console.log(e.detail.value)
    this.setData({
      text: e.detail.value
    })
  },
  toseepic(e) {
    let that = this
    console.log(e.currentTarget.dataset.url)
    wx.previewImage({
      current: e.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: that.data.imgArr // 需要预览的图片http链接列表
    })
  },
  fabiao() {
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.diary.add',
      data: {
        m: 'hw_signin',
        cid: that.data.cid || 1,
        text: that.data.text,
        date: '',
        images: that.data.uploadImgArr,
        type: that.data.type
      },
      success(res) {
        console.log(res)
        wx.showToast({
          title: '发表成功',
        })
        setTimeout(function () {

          wx.navigateBack({
            url: '../index/index?id=' + that.data.cid
          })
        },1000)
      }
    })
  },
  toindex() {
    wx.navigateBack({

    })
  },
  deleteimg(e) {
    let that = this
    let imgArr = that.data.imgArr
    console.log(e.currentTarget.id)
    let arr = imgArr.splice(e.currentTarget.id, 1)
    console.log(imgArr)
    that.setData({
      imgArr: imgArr
    })
    that.uploadImg(that.data.imgArr)
  },
  uploadImg(arr) {
    let that = this

    let code = wx.getStorageSync('code')
    console.log(arr, code)
    let url = app.util.url('utility/file/upload')
    let images = []
    if (arr.length > 0) {
      arr.forEach(function (item) {
        wx.uploadFile({
          url: url,
          filePath: item,
          name: 'file',
          formData: {
            'type': 'image',
            'thumb': 0,
            // 'code': code
          },
          success(res) {
            let imgdata = JSON.parse(res.data)
            console.log(res)

            images.push(imgdata.filename)
            that.setData({
              uploadImgArr: images
            })
            console.log(that.data.uploadImgArr)
          }
        })
      })


    }

  },

  upload() {
    let that = this

    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        let tempFilePaths = []
        let arrlen = that.data.imgArr.length
        if (arrlen > 0) {
          tempFilePaths = that.data.imgArr.concat(res.tempFilePaths)
        } else {
          tempFilePaths = res.tempFilePaths
        }
        that.setData({
          imgArr: tempFilePaths
        })
        that.uploadImg(that.data.imgArr)

      }
    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cid: options.id,
      type: options.type
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