// daka/pages/addDaka/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDay: '请选择时间',
    endTime: '请选择时间',
    endDay: '请选择时间',
    tipTime: '请选择时间',
    startTime: '请选择时间',
    targetDay: "请选择时间",
    image: '../../image/cover2.png'
  },

  choose(e){
    let that = this
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths[0]
        console.log(res)
        let url = app.util.url('utility/file/upload');
        console.log(url)
        wx.uploadFile({
          url: url,
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'type': 'image',
            'thumb': 0,
            // 'code': code
          },
          success(res) {
            console.log(res)
            let imgdata = JSON.parse(res.data)

            // images.push(imgdata.url)
            that.setData({
              image: imgdata.url
            })
            // console.log(imgdata.url, that.data.uploadImgArr)
          }
        })
      },
      fail(res){
        console.log(res)
      }
    })
  },

  inputitle(e){
    this.setData({
      inputtitle: e.detail.value
    })
  },

  inputdes(e){
    this.setData({
      inputdes: e.detail.value
    })
  },

  inputdetails(e){
    this.setData({
      inputdetails: e.detail.value
    })
  },

  baocun(){
    let that = this
    console.log(that.data.type)
    app.util.request({
      url: 'entry/wxapp/signin.add.add',
      data: {
        m: 'hw_signin',
        id: that.data.id || '',
        'type': that.data.type,
        start_date: that.data.startDay,
        end_date: that.data.endDay,
        time: that.data.startTime+"-"+ that.data.endTime,
        target_day: that.data.targetDay,
        title: that.data.inputtitle || that.data.title,
        description: that.data.inputdes || that.data.description,
        images: that.data.image,
        details: that.data.inputdetails
      },
      success(res){
        console.log(res)
        wx.showToast({
          icon: 'none',
          title: '保存成功！',
        })
        setTimeout(function(){
          wx.navigateBack({
            id: that.data.id
          })
        },1000)
      }
    })
  },
  
  startDay(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDay: e.detail.value 
    })
  },
  endTime(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
    })
  },
  endDay(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDay: e.detail.value
    })
  },
  tipTime(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tipTime: e.detail.value
    })
  },
  startTime(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },
  targetDay(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      targetDay: e.detail.value
    })
  },
  init(id){
    let that = this
    app.util.request({
      url: 'entry/wxapp/signin.add',
      data: {
        m: 'hw_signin',
        id: id || ''
      },
      success(res){
        console.log(res.data.data)
        let data = res.data.data
        that.setData({
          startDay: data.config.sign_time.start_date,
          endDay: data.config.sign_time.end_date,
          targetDay: data.config.target_day,
          tipTime: data.config.sign_time.remind_time,
          startTime: data.config.sign_time.start_time,
          endTime: data.config.sign_time.end_time,
          title: data.title,
          description: data.description
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      'type': options.type
    })
    if(options.title && options.disabled){
      this.setData({
        mtitle: options.title,
        disabled: options.disabled,
      })
    }
    if (options.id) {
      this.setData({
        id: options.id,
      })
      this.init(options.id)
      return;
    }
    this.init()
    
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