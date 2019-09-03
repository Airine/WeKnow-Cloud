//index.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// var lifeData = require('./data/life/main.js');
var fileData = require('../../utils/data.js')
Page({
  data: {
    PageCur: 'index',
    // 用户信息
    userInfo: null,
    avatarUrl: '/src/icon/loginDefault.png',
    logged: false,
    takeSession: false,
    requestResult: '',
    SID: '',
    PWD: null,

    // 显示相关
    fixedH: 114,
    fixedPercent: 85,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    WindowH: app.globalData.WindowH,
    WindowW: app.globalData.WindowW,
    // ScreenH: app.globalData.ScreenH,
    // tabHeight: app.globalData.WindowH - app.globalData.CustomBar,
    // pageHeight: app.globalData.WindowH + app.globalData.CustomBar,
    topNum: 0,
    tabTop: false,
    inputShowed: false,
    inputVal: "",
    swiperOn: false,
    movies: [{
        // url: '../../src/img/1.jpeg'
        url: 'https://newshub.sustech.edu.cn/zh/wp-content/uploads/2019/08/2019082715024237.jpg'
      },
      {
        url: 'https://newshub.sustech.edu.cn/zh/wp-content/uploads/2019/08/2019082710174748.png'
      },
      {
        url: 'https://newshub.sustech.edu.cn/zh/wp-content/uploads/2019/08/2019082611484718.jpg'
      },
      {
        url: 'https://www.sustech.edu.cn/wp-content/uploads/20190621z-1080y-1.jpg'
      }
    ],
    // tab 相关
    tabs: [],
    // subs: [],

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 选项相关
    // titles: fileData.titleData(),

    posts: [],

    // scrollable: false,
    content: false,

    isLoadContent: false,
    isLoadErr: false,
    appear: false,
  },
  onLoad: function() {
    // 用全局变量给SID和PWD赋值
    this.setData({
      SID: app.globalData.SID,
      PWD: app.globalData.PWD
    })

    var that = this;
    var fixedHH = app.globalData.WindowW * 50 / 375 + app.globalData.CustomBar;
    var percent = parseInt(100 - 100 * fixedHH / app.globalData.WindowH, 10);
    // console.log(fixedHH);
    // console.log(percent);
    that.setData({
      fixedH: fixedHH,
      fixedPercent: percent
    });
    wx.request({
      // url: "http://119.29.214.174/categories/",
      url: "https://dev.citric-acid.com.cn/categories/",
      method: "GET",
      success: function(res) {
        // console.log(res.data)
        that.setData({
          tabs: res.data
        })
        wx.getSystemInfo({
          success: function(res) {
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
      },
      fail: function(err) {
        console.log(err)
      }
    });

    // wx.getStorage({
    //   key: 'SID',
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       SID: res.data
    //     })
    //   },
    // });
    // wx.getStorage({
    //   key: 'PWD',
    //   success: function(res) {
    //     console.log(res.data)
    //     that.setData({
    //       PWD: res.data
    //     })
    //   },
    // });
    // 接口更新，禁止载入时要求授权
    // 查看是否授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，加载global全局变量
          this.setData({
            logged: true,
            avatarUrl: app.globalData.avatarUrl,
            userInfo: app.globalData.userInfo,
          });
          // console.log('userInfo', res.userInfo)有bug
        }

        // getUserInfo已废弃
        wx.getUserInfo({
          success: res => {
            this.setData({
              avatarUrl: res.userInfo.avatarUrl,
              userInfo: res.userInfo,
            });
            // console.log(res)
            // console.log('userInfo', res.userInfo)
            app.globalData.avatarUrl = res.userInfo.avatarUrl;
            app.globalData.userInfo = res.userInfo;

          }
        });


      }
    });
    // console.log("load one time")
    // console.log(this.data.SID + "  " + this.data.PWD)
    this._observer = wx.createIntersectionObserver(this)
    this._observer
      .relativeTo('.scroll-main')
      .observe('.swiper', (res) => {
        // console.log(res);
        this.setData({
          tabTop: res.intersectionRatio > 0
        })
      })
  },
  tabClick: function(e) {
    var that = this;
    var tempt = this.data.content;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
    if (tempt) {
      that.setData({
        topNum: this.data.topNum = 0,
        swiperOn: false,
        content: false
      })
    }
  },
  onTapTitle: function(e) {
    var that = this;
    var _data = e.currentTarget.dataset;
    // console.log('Now tap title:');
    // console.log(_data);
    this.setData({
      content: true
    });
    wx.request({
      url: "https://dev.citric-acid.com.cn/posts",
      method: "GET",
      data: {
        "subcategory": _data.title
      },
      success: function(res) {
        // console.log(res.data)
        that.setData({
          posts: res.data,
          isLoadErr: false
        })
      },
      fail: function(err) {
        // console.log(err)
        that.setData({
          isLoadErr: true
        });
      },
      complete: function(res) {
        // console.log(res)
        that.setData({
          isLoadContent: true
        });
      }
    });
    // wx.navigateTo() -> according to the data.content
  },
  tapPost: function(e) {
    var _data = e.currentTarget.dataset;
    // console.log(_data);
    wx.request({
      url: "https://dev.citric-acid.com.cn/posts/" + _data.id,
      method: "GET",
      success: function(res) {
        // console.log(res.data);
        // console.log(res.data.content);
        app.globalData.markdown = res.data.content;
        // console.log(app.globalData.markdown)
        // app.globalData.markdown = res.data.content;
        wx.navigateTo({
          url: '../content/content',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
      fail: function(err) {
        console.log(err)
      }

    });
  },
  tapBack: function(e) {
    this.setData({
      content: false,
      isLoadContent: false,
      posts: [],
    });
  },

  // 登录相关函数
  // 获取用户信息
  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      });
      // 全局变量赋值
      app.globalData.logged = true,
        app.globalData.avatarUrl = e.detail.userInfo.avatarUrl,
        app.globalData.userInfo = e.detail.userInfo
      // console.log('user info', e.detail.userInfo);
      // 调用云函数,存储openid
      this.onGetOpenid();
    }
  },

  // 调用云函数
  onGetOpenid: function() {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user openid: ', res.result.openid);
        // 测试
        app.globalData.openid = res.result.openid;
        // console.log('global data', app.globalData.openid)
        // wx.navigateTo({
        //   url: '../userConsole/displaySuccess/displaySuccess',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },
  onUnload() {
    if (this._observer) this._observer.disconnect()
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
});