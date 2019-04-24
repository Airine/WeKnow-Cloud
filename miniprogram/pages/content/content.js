// miniprogram/pages/content/content.js
const app = getApp();

Page({

	/**
	 * Page initial data
	 */
	data: {
		markdown: null
	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad: function (options) {
		this.setData({
			markdown: app.globalData.markdown
		});
	},

	/**
	 * Lifecycle function--Called when page is initially rendered
	 */
	onReady: function () {

	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow: function () {

	},

	/**
	 * Lifecycle function--Called when page hide
	 */
	onHide: function () {

	},

	/**
	 * Lifecycle function--Called when page unload
	 */
	onUnload: function () {

	},

	/**
	 * Page event handler function--Called when user drop down
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * Called when page reach bottom
	 */
	onReachBottom: function () {

	},

	/**
	 * Called when user click on the top right corner to share
	 */
	onShareAppMessage: function () {

	}
})