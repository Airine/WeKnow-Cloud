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
    CourseInfo: {
      "Term": {
        "name": "学期",
        "subItems": [{
          "count": 0,
          "id": -1,
          "name": "全部"
        }, {
          "count": 100,
          "id": 0,
          "name": "2018-2019-2"
        }]
      },
      "Category": {
        "name": "GPA类型",
        "subItems": [{
          "count": 1111,
          "id": -1,
          "name": "全部"
        }, {
          "count": 10,
          "id": 0,
          "name": "专业选修"
        }, {
          "count": 90,
          "id": 1,
          "name": "通识教育"
        }]
      },
      "Level": {
        "name": "等级",
        "subItems": [{
          "count": 100,
          "id": -1,
          "name": "全部"
        }, {
          "count": 10,
          "id": 10,
          "name": "A"
        }, {
          "count": 91,
          "id": 1,
          "name": "D"
        }]
      }
    },

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
      Term: app.globalData.Term
    })

    console.log(app.globalData.SID)
    console.log(app.globalData.PWD)

    console.log(this.data.CourseInfo.Category.subItems)
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