// pages/info/info.js
Page({

	/**
	 * 页面的初始数据
	 */
  data: {
    // 用户信息
    userInfo: null,
    avatarUrl: '/src/icon/loginDefault.png',
    logged: false,
    // 显示信息
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，加载global全局变量
          var app = getApp()
          this.setData({
            logged: true,
            avatarUrl: app.globalData.avatarUrl,
            userInfo: app.globalData.userInfo,
          });

          // getUsrInfo 接口废弃
          // wx.getUserInfo({
          //   success: res => {
          //     // 获取信息并存储
          //     this.setData({
          //       logged: true,
          //       avatarUrl: res.userInfo.avatarUrl,
          //       userInfo: res.userInfo,
          //     });
          //     // 可以将 res 发送给后台解码出 unionId
          //     // 赋值给全局变量
          //     app.globalData.logged = true,
          //     app.globalData.avatarUrl =  
          //       e.detail.userInfo.avatarUrl,
          //     app.globalData.userInfo = e.detail.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
  onReady: function () {

  },

	/**
	 * 生命周期函数--监听页面显示
	 */
  onShow: function () {

  },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
  onHide: function () {

  },

	/**
	 * 生命周期函数--监听页面卸载
	 */
  onUnload: function () {

  },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
  onPullDownRefresh: function () {

  },

	/**
	 * 页面上拉触底事件的处理函数
	 */
  onReachBottom: function () {

  },

	/**
	 * 用户点击右上角分享
	 */
  onShareAppMessage: function () {

  },

  globalData: {
    userInfo: null
  },

/**
 * 登录模块
 */
// 获取用户信息
  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      });
      // 全局变量赋值
      this.globalData.logged = true,
        this.globalData.avatarUrl = e.detail.userInfo.avatarUrl,
        this.globalData.userInfo = e.detail.userInfo
      console.log('user info', e.detail.userInfo);
      // 调用云函数,存储openid
      this.onGetOpenid();
    }
  },

  // 调用云函数
  onGetOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid);
        // 测试
        app.globalData.openid = res.result.openid;
        console.log('global data', app.globalData.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  /**
   * 弹窗模块
   */
})