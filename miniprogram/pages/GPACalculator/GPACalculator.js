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
    CourseInfo: {},
    CourseArray: [],
    GPA: 0,

    isShow: false,

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function() {
    this.setData({
      SID: app.globalData.SID,
      PWD: app.globalData.PWD,
      CourseInfo: app.globalData.CourseInfo,
      CourseArray: app.globalData.CourseArray,
    })

    console.log(app.globalData.SID)
    console.log(app.globalData.PWD)
    console.log(app.globalData.CourseInfo)
    console.log(app.globalData.CourseArray)

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
   * 用于计算GPA的方法
   */
  GPA: function() {
    var that = this
    var totalPoint = 0 // 分母
    var dividend = 0 // 分子
    var CouseArray = that.data.CourseArray
    var map = new Map()
    map.set("A+", 4.00)
    map.set("A", 3.94)
    map.set("A-", 3.85)
    map.set("B+", 3.73)
    map.set("B", 3.55)
    map.set("B-", 3.32)
    mao.set("C+", 3.09)
    map.set("C", 2.78)
    map.set("C-", 2.42)
    map.set("D+", 2.08)
    map.set("D", 1.63)
    map.set("D-", 1.15)
    map.set("F", 0.00)
    for (var index = 0; index < CourseArray.length; index++) {
      if (CourseArray[index].grade === "P")
        continue
      else {
        totalPoint += CourseArray[index].point
        dividend += CouseArray[index].point * map.get(CouseArray[index].grade)
      }
    }
    that.setData({
      GPA: dividend / totalPoint
    })

    console.log(this.data.GPA)
  }




})