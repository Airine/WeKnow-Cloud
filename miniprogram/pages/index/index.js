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
		tabs: [],
		// subs: [],

		activeIndex: 0,
		sliderOffset: 0,
		sliderLeft: 0,
		// 选项相关
		// titles: fileData.titleData(),

		posts: [],

		scrollable: false,
		content: false,

		isLoadContent: false,
		isLoadErr: false,
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

		wx.request({
			url: "http://119.29.214.174/categories/",
			// url: "http://citric-acid.com.cn/categories/",
			method: "GET",
			success: function (res) {
				console.log(res.data)
				that.setData({
					tabs: res.data
				})
				wx.getSystemInfo({
					success: function (res) {
						that.setData({
							sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
							sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
						});
					}
				});
			},
			fail: function (err) {
				console.log(err)
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
		var that = this;
		var _data = e.currentTarget.dataset;
		console.log('Now tap title:');
		console.log(_data);
		this.setData({
			content: true
		});
		wx.request({
			url: "http://citric-acid.com.cn/posts",
			method: "GET",
			data: {"subcategory": _data.title},
			success: function (res) {
				// console.log(res.data)
				that.setData({
					posts: res.data,
					isLoadErr: false
				})
			},
			fail: function (err) {
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
	tapPost: function (e) {
		var _data = e.currentTarget.dataset;
		console.log(_data);
		wx.request({
			url: "http://citric-acid.com.cn/posts/"+_data.id,
			method: "GET",
			success: function (res) {
				// console.log(res.data);
				// console.log(res.data.content);
				app.globalData.markdown = res.data.content;
				console.log(app.globalData.markdown)
				// app.globalData.markdown = res.data.content;
				wx.navigateTo({
					url: '../content/content',
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			fail: function (err) {
				console.log(err)
			}

		});
	},
	tapBack: function (e) {
		this.setData({
			content: false,
			isLoadContent: false,
			posts: [],
		});
	}
});