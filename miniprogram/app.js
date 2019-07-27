//app.js
App({
  onLaunch: function() {
    let custom = wx.getMenuButtonBoundingClientRect();
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
      SID: '',
      PWD: null,
      CourseInfo: {
        "Term": {
          "name": "学期",
          "subItems": [{
            "count": 0,
            "id": -1,
            "name": "全部"
          }]
        },
        "Category": {
          "name": "GPA类型",
          "subItems": [{
            "count": 0,
            "id": -1,
            "name": "全部"
          }]
        },
        "Level": {
          "name": "等级",
          "subItems": [{
            "count": 0,
            "id": -1,
            "name": "全部"
          }]
        }
      }
    }

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        // let custom = wx.getMenuButtonBoundingClientRect();
        // console.log(custom);
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // this.globalData.CustomBar = custom.bottom + custom.top;
        this.globalData.WindowH = e.windowHeight;
        this.globalData.WindowW = e.windowWidth;
        // this.globalData.ScreenH = e.screenHeight;
        // console.log(e);
      }
    });
  }
})