//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
	
	this.globalData = {
		// 用户信息
    userInfo: null,
		markdown: "# Test",
    openid: null,
    avatarUrl: '/src/icon/loginDefault.png',
    logged: false,
	}

	wx.getSystemInfo({
		success: e => {
			this.globalData.StatusBar = e.statusBarHeight;
			let custom = wx.getMenuButtonBoundingClientRect();
			console.log(custom);
			this.globalData.Custom = custom;
			// this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			this.globalData.CustomBar = custom.bottom + custom.top;
			this.globalData.WindowH = e.windowHeight;
			this.globalData.ScreenH = e.screenHeight;
			console.log(e);
		}
	})
 
  }
})
