//app.js
App({
  onLaunch: function () {
    // wx.clearStorageSync(); 
    const that = this
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
      },
      CourseArray: [],
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

    // 获取用户信息
    // wx.getUserInfo({
    //   success: res => {
    //     this.globalData.userInfo = res.userInfo;
    //     // this.setData({
    //     //   userInfo: res.userInfo
    //     // });
    //     console.log(res);
    //   }
    // });


    // 在本地获取login info，如果本地存在的话就免去登录的步骤
    let loginInfo = wx.getStorageSync("loginInfo")
    console.log(loginInfo)
    if (loginInfo != "") {
      this.globalData.SID = loginInfo.SID
      this.globalData.PWD = loginInfo.PWD
      // wx.switchTab({
      //   url: 'pages/index/index',
      // })
      if (this.globalData.SID && this.globalData.PWD) {
        wx.request({
          url: 'https://gpa.citric-acid.com.cn/courses/',
          method: 'POST',
          data: {
            'username': this.globalData.SID,
            'password': this.globalData.PWD
          },
          success: function(res) {
            if (res.statusCode != 200) {
              wx.redirectTo({
                url: 'pages/login/login',
              })
            } else {
              console.log(that.globalData.SID)
              console.log(that.globalData.PWD)
              // 处理数据
              that.getCourseArray_Info(res.data)
            }
          }
        })
      }
    }

  },

  // 处理res.data以得到CourseInfo和CourseArray的函数
  getCourseArray_Info(res) {
    console.log(res)
    const that = this
    let originData = res
    // 下面开始对originData处理数据，以获得CourseInfo和CourseArray
    // 这三个Map是用来给三种类型count
    var termMap = new Map()
    var cateMap = new Map()
    var gradMap = new Map()

    // 先处理完Category的分类和count之后再去重
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
      that.globalData.CourseInfo.Term.subItems.push({
        "count": value,
        "id": mapIndex++,
        "name": key
      })
    }
    mapIndex = 1
    for (var [key, value] of cateMap) {
      that.globalData.CourseInfo.Category.subItems.push({
        "count": value,
        "id": mapIndex++,
        "name": key
      })
    }

    // 更新等级部分的数量，顺便排个序
    var gradeArray = []
    for (var [key, value] of gradMap) {
      gradeArray.push({
        "count": value,
        "id": 0,
        "name": key
      })
    }
    gradeArray.sort(
      function (obj1, obj2) {
        if (obj1.name > obj2.name)
          return 1
        else if (obj1.name == obj2.name)
          return 0
        else
          return -1
      })
    for (var index = 0; index < gradeArray.length; index++) {
      gradeArray[index].id = index + 1
      that.globalData.CourseInfo.Level.subItems.push(gradeArray[index])
    }

    that.globalData.CourseInfo.Term.subItems[0].count = originData.length
    that.globalData.CourseInfo.Category.subItems[0].count = originData.length
    that.globalData.CourseInfo.Level.subItems[0].count = originData.length

    // app.globalData.CourseInfo = that.data.CourseInfo
    that.globalData.CourseArray = originData
    // console.log(app.globalData.userInfo)
    console.log(this.globalData.CourseInfo)
    wx.switchTab({
      url: '../index/index',
    })

  },
})