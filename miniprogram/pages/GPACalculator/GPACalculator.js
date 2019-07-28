// miniprogram/pages/GPACalculator/GPACalculator.js

const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    fixedH: 114,
    fixedPercent: 85,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    WindowH: app.globalData.WindowH,
    WindowW: app.globalData.WindowW,
    SID: '',
    PWD: null,
    CourseInfo:{},

    cityCinemaInfo: {}, //城市影院信息
    isShow: false,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function() {
    this.setData({
      SID: app.globalData.SID,
      PWD: app.globalData.PWD,
      CourseInfo : app.globalData.CourseInfo
    })

    console.log(app.globalData.SID)
    console.log(app.globalData.PWD)
    console.log(app.globalData.CourseInfo)

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

  changeCondition(e) {
    const obj = e.detail
    wx.showLoading({
      title: '正在加载...'
    })
    this.setData({
      params: {
        ...this.data.params,
        ...obj
      },
      cinemas: [],
      nothing: false
    }, () => {
      this.getCinemas(this.data.params).then((list) => {
        if (!list.length) {
          this.setData({
            nothing: true
          })
        }
        wx.hideLoading()
      })
    })
  },
  toggleShow(e) {
    const item = e.detail.item
    this.setData({
      isShow: item !== -1
    })
  },

  /**
   * 用于切换选取的Term
   */





})