//index.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// var lifeData = require('./data/life/main.js');
var fileData = require('../../utils/data.js')
Page({
	data: {
    // 内容
    value:'',
    result:{},
    // 显示相关
		fixedH: 114,
		fixedPercent: 85,
		StatusBar: app.globalData.StatusBar,
		CustomBar: app.globalData.CustomBar,
		WindowH: app.globalData.WindowH,
		WindowW: app.globalData.WindowW,
	},
	onLoad: function () {
		var that = this;
		var fixedHH = app.globalData.WindowW * 50 / 375 + app.globalData.CustomBar;
		var percent = parseInt(100 - 100 * fixedHH / app.globalData.WindowH, 10);
		// console.log(fixedHH);
		// console.log(percent);
		that.setData({
			fixedH: fixedHH,
			fixedPercent: percent
		})
	},
	onUnload() {
		if (this._observer) this._observer.disconnect()
	},
  search(e){
    const value = e.detail.value
    const _this = this
    this.setData({
      value
    })
    wx.request({
      url: `https://dev.citric-acid.com.cn/posts/?tag=${value}`,
      success(res){
        let result = res.data
        _this.setData({
          result:result
        })
      }
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  tapPost: function (e) {
    var _data = e.currentTarget.dataset;
    console.log(_data);
    wx.request({
      url: "https://dev.citric-acid.com.cn/posts/" + _data.id,
      method: "GET",
      success: function (res) {
        // console.log(res.data);
        // console.log(res.data.content);
        app.globalData.markdown = res.data.content;
        // console.log(app.globalData.markdown)
        // app.globalData.markdown = res.data.content;
        wx.navigateTo({
          url: '../content/content',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      },
      fail: function (err) {
        console.log(err)
      }

    });
  }
});