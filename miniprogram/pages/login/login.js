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
    SID: '',
    PWD: null,
    originData: [], // url返回的数组数据，要做修改改成CourseInfo的形式
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
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
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
            app.globalData.SID = that.data.SID
            app.globalData.PWD = that.data.PWD
            that.setData({
              originData: res.data
            })



            // 这三个Map是用来给三种类型count
            var termMap = new Map()
            var cateMap = new Map()
            var gradMap = new Map()

            var originData = that.data.originData

            // 先处理完Category的分类再去重
            for (var index = 0; index < originData.length; index++) {
              if (cateMap.has(originData[index].category)) {
                cateMap.set(originData[index].category, cateMap.get(originData[index].category) + 1)
              } else {
                cateMap.set(originData[index].category, 1)
              }
            }

            // 去重
            var courseSet = new Set()
            for (var index = 0; index < originData.length; index++) {
              if (courseSet.has(originData[index].code)) {
                originData.splice(index, 1)
              } else {
                courseSet.add(originData[index].code)
              }
            }


            // 处理完category之后处理term和grade
            for (var index = 0; index < originData.length; index++) {
              if (termMap.has(originData[index].term)) {
                termMap.set(originData[index].term, termMap.get(originData[index].term) + 1)
              } else {
                termMap.set(originData[index].term, 1)
              }

              if (gradMap.has(originData[index].grade)) {
                gradMap.set(originData[index].grade, gradMap.get(originData[index].grade) + 1)
              } else {
                gradMap.set(originData[index].grade, 1)
              }
            }

            // 更新CourseInfo
            var mapIndex = 1
            for (var [key, value] of termMap) {
              that.data.CourseInfo.Term.subItems.push({
                "count": value,
                "id": mapIndex++,
                "name": key
              })
            }
            mapIndex = 1
            for (var [key, value] of cateMap) {
              that.data.CourseInfo.Category.subItems.push({
                "count": value,
                "id": mapIndex++,
                "name": key
              })
            }
            mapIndex = 1
            for (var [key, value] of gradMap) {
              that.data.CourseInfo.Level.subItems.push({
                "count": value,
                "id": mapIndex++,
                "name": key
              })
            }

            that.data.CourseInfo.Term.subItems[0].count = originData.length
            that.data.CourseInfo.Category.subItems[0].count = originData.length
            that.data.CourseInfo.Level.subItems[0].count = originData.length

            app.globalData.CourseInfo = that.data.CourseInfo
            app.globalData.CourseArray = originData

            // console.log(termMap)
            // console.log(cateMap)
            // console.log(gradMap)

            console.log(that.data.CourseInfo)



            console.log("SID: " + that.data.SID);
            console.log("PWD: " + that.data.PWD);

            // wx.setStorage({
            //   key: 'SID',
            //   data: that.data.SID,
            // })
            // wx.setStorage({
            //   key: 'PWD',
            //   data: that.data.PWD,
            // })
            // wx.switchTab({
            //   url: '../index/index',
            // })
            wx.redirectTo({
              url: '../GPACalculator/GPACalculator',
            })
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
  }
})