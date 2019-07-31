// miniprogram/pages/login/login.js


const app = getApp()
var sliderWidth = 96;
var fileData = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    // 显示相关
    fixedH: 114,
    fixedPercent: 85,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    WindowH: app.globalData.WindowH,
    WindowW: app.globalData.WindowW,
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
    },
    store: true
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    // wx.clearStorageSync(); 



    // wx.getStorageInfoSync(user)
    // var that = this;
    // var fixedHH = app.globalData.WindowW * 50 / 375 + app.globalData.CustomBar;
    // var percent = parseInt(100 - 100 * fixedHH / app.globalData.WindowH, 10);
    // // console.log(fixedHH);
    // // console.log(percent);
    // that.setData({
    //   fixedH: fixedHH,
    //   fixedPercent: percent
    // })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  },

  login() {
    var that = this;
    // 判断是否SID和PWD都写了内容
    if (that.data.SID && that.data.PWD) {
      wx.request({
        url: 'https://gpa.citric-acid.com.cn/courses/',
        method: 'POST',
        // header: {
        //   "Content-Type": "application/x-www-form-urlencoded"
        // },  
        data: {
          'username': that.data.SID,
          'password': that.data.PWD
        },

        success: function(res) {
          if (res.statusCode != 200) {
            wx.showModal({
              title: 'Wrong Info',
              content: 'Your SID or PWD may be wrong. Please check your input.',
              success: function(res) {
                if (res.confirm) {
                  console.log("用户确定")
                }
              }
            })
          } else {
            console.log(res.data)
            app.globalData.SID = that.data.SID
            app.globalData.PWD = that.data.PWD

            // 在本地保存login info，免去以后的登录之苦
            if (that.data.store) {
              wx.setStorage({
                key: 'loginInfo',
                data: {
                  "SID": that.data.SID,
                  "PWD": that.data.PWD
                },
              })
            }

            app.getCourseArray_Info(res.data)
          }
        },
      })
    } else {
      wx.showModal({
        title: 'Info needed',
        content: 'Please input your SID and PWD',
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定")
          }
        }
      })

    }
  },

  inputID: function(e) {
    this.setData({
      SID: e.detail.value
    })
  },

  inputPWD: function(e) {
    this.setData({
      PWD: e.detail.value
    })
  },

  compare: function(property) {
    return function(obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value1 - value2; // 升序
    }
  },

  // store的选择
  selected: function (e) {
    this.setData({
      store: !this.data.store
    })
    console.log(this.data.store)
  }
})