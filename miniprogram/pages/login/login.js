// miniprogram/pages/login/login.js


const app = getApp()
var sliderWidth = 96;
var fileData = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    // 内容
    value: '',
    result: {},
    // 显示相关
    fixedH: 114,
    fixedPercent: 85,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    WindowH: app.globalData.WindowH,
    WindowW: app.globalData.WindowW,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})