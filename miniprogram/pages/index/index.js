//index.js
//获取应用实例
const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// var lifeData = require('./data/life/main.js');
var fileData = require('../../utils/data.js')

Page({
	data: {
		topNum: 0,
		tabTop: 0,
		inputShowed: false,
		inputVal: "",
		swiperOn: false,
		movies:[
			{ url: '../../src/img/1.jpeg' },
			{ url: '../../src/img/2.jpeg' },
			{ url: '../../src/img/3.jpeg' },
			{ url: '../../src/img/4.jpeg' }
		],
		// tab 相关
		tabs: ["南科生活", "南科办事", "南科娱乐"],
		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		// 选项相关
		titles: fileData.titleData(),

		scrollable: false,
		content: false,
	},
	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	inputTyping: function (e) {
		this.setData({
			inputVal: e.detail.value
		});
	},
	onLoad: function () {
		var that = this;
		wx.getSystemInfo({
			success: function (res) {
				that.setData({
					sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
					sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
				});
			}
		});
	},

	tabClick: function (e) {
		var that = this;
		var tempt = this.data.content;
		this.setData({
			sliderOffset: e.currentTarget.offsetLeft,
			activeIndex: e.currentTarget.id,
		});
		if (tempt){
			that.setData({
				topNum: this.data.topNum = 0,
				swiperOn: false,
				content:false
			})
		}
	},
	upper: function(e){
		this.setData({
			scrollable: false
		})
	},
	lower: function(e) {
		this.setData({
			scrollable: true
		})
	},
	tapSearch: function(e) {
		var that = this;
		this.setData({
			topNum: this.data.topNum = 0,
			tabTop: this.data.tabTop = 0,
			// inputShowed: true,
			scrollable: false
		});
		setTimeout(function () {
			that.setData({
				inputShowed: true
			});
		}, 300)
	},
	// 待删除
	tapHome: function(e) {
		this.setData({
			topNum: this.data.topNum = 0,
			tabTop: this.data.tabTop = 0,
			swiperOn: false,
			scrollable: false,
			content: false
		});
	},

	onTapTitle: function(e) {
		var _data = e.currentTarget.dataset;
		console.log('Now tap title:');
		console.log(_data);
		// wx.navigateTo() -> according to the data.content
	}
});