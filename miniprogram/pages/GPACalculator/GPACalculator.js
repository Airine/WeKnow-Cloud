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
    // 用于筛选的参数
    params: {
      termId: -1,
      cateId: -1,
      gradeId: -1
    },
    nothing: false,

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
    })
    this.getCourses(this.data.params)
    this.GPA()

    // console.log(app.globalData.SID)
    // console.log(app.globalData.PWD)
    console.log(app.globalData.CourseInfo)
    // console.log(app.globalData.CourseArray)
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

  /**
   * 这个函数用来筛选符合条件的课程
   */
  getCourses(params) {
    const that = this


    var allCourse = []
    for (var index = 0; index < app.globalData.CourseArray.length; index++) {
      allCourse.push({
        "course": app.globalData.CourseArray[index],
        "show": true
      })
    }

    // console.log(allCourse)
    const termId = params.termId
    const cateId = params.cateId
    const gradeId = params.gradeId
    var courseArray = []

    // console.log(allCourse)

    // 根据学期先筛选，如果是-1的话直接赋值，否则筛选
    if (termId === -1)
      courseArray = allCourse
    else {
      var term = that.data.CourseInfo.Term.subItems[termId].name
      for (var index = 0; index < allCourse.length; index++) {
        if (allCourse[index].course.term === term) {
          courseArray.push(allCourse[index])
        }
      }
    }


    // 根据学期筛选之后要继续根据课程分类来筛选，这个时候在刚刚准备的courseArray里面处理即可
    if (cateId !== -1) {
      var cate = that.data.CourseInfo.Category.subItems[cateId].name
      // console.log(cate)
      for (var index = 0; index < courseArray.length; index++) {
        if (courseArray[index].course.category != cate) {
          courseArray.splice(index--, 1)
        }
      }
    }
    // console.log(courseArray)

    // 分数筛选跟刚刚的课程分类筛选思路一致
    if (gradeId !== -1) {
      var grade = that.data.CourseInfo.Level.subItems[gradeId].name
      // console.log(grade)
      for (var index = 0; index < courseArray.length; index++) {
        if (courseArray[index].course.grade !== grade) {
          // // console.log(courseArray[index])
          courseArray.splice(index--, 1)
        }
      }
    }
    // console.log(courseArray)
    that.setData({
      CourseArray: courseArray
    })
    this.GPA()


    // console.log(this.data.CourseArray)
  },

  changeCondition(e) {
    const obj = e.detail
    const that = this
    // console.log(obj)
    wx.showLoading({
      title: '正在加载...'
    })
    this.setData({
        params: {
          ...this.data.params,
          ...obj
        },
        nothing: false
      }, () => {
        this.getCourses(this.data.params)
        if (that.data.CourseArray.length === 0) {
          that.setData({
            nothing: true
          })
        } else {
          console.log(that.data.CourseArray)
        }
        // if (!list.length) {
        //   this.setData({
        //     nothing: true
        //   })
        // }
      }),
      // console.log(this.data.CourseArray)
      wx.hideLoading()

  },

  /**
   * 用于计算GPA的方法
   */
  GPA: function() {
    var that = this
    var totalPoint = 0 // 分母
    var dividend = 0 // 分子
    var CourseArray = that.data.CourseArray
    var map = new Map()
    map.set("A+", 4.00)
    map.set("A", 3.94)
    map.set("A-", 3.85)
    map.set("B+", 3.73)
    map.set("B", 3.55)
    map.set("B-", 3.32)
    map.set("C+", 3.09)
    map.set("C", 2.78)
    map.set("C-", 2.42)
    map.set("D+", 2.08)
    map.set("D", 1.63)
    map.set("D-", 1.15)
    map.set("F", 0.00)

    // // console.log("CourseArray")
    // // console.log(this.data.CourseArray)
    for (var index = 0; index < CourseArray.length; index++) {
      // // console.log(CourseArray[index].show)
      // // console.log(!CourseArray[index].show)
      if (CourseArray[index].course.grade === "P" || !CourseArray[index].show)
        continue
      else {
        // // console.log(CourseArray[index].course.point + " " + map.get(CourseArray[index].course.grade))
        totalPoint += parseFloat(CourseArray[index].course.point)
        // // console.log("totalpoint: " + totalPoint)
        dividend += CourseArray[index].course.point * map.get(CourseArray[index].course.grade)
        // // console.log("dividend: " + dividend)
      }
    }
    that.setData({
      GPA: (dividend / totalPoint).toFixed(2)
    })

    // // console.log(this.data.GPA)
  },

  /**
   * 点击按钮来决定是否选中该课程以计算GPA
   */
  selected: function(e) {
    const that = this
    const code = e.currentTarget.dataset.coursedetail.course.code
    var CourseArray = that.data.CourseArray
    for (var index = 0; index < CourseArray.length; index++) {
      if (CourseArray[index].course.code === code) {
        // // console.log(CourseArray[index].course.name)
        // // console.log(CourseArray[index].show)
        CourseArray[index].show = !CourseArray[index].show
        // // console.log(CourseArray[index].show)
      }
    }
    that.setData({
      CourseArray: CourseArray
    })
    this.GPA()
  }





})