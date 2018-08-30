//app.js

App({
	onLaunch: function () {
		//调用API从本地缓存中获取数据
	},
	onShow: function () {
	},
	onHide: function () {
	},
	onError: function (msg) {
		console.log(msg)
	},
	util: require('we7/resource/js/util.js'),
	
	globalData:{
		userInfo : null,
	},
  userInfo: {
    sessionid: null,
  },
  siteInfo: require('siteinfo.js'),
  
});