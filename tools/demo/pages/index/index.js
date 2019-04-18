/* eslint-disable */
function PagerChange(context) {
  this.context = context

  /**
     * 当前显示的下标
     * @param index 当前界面显示的下标
     */
  this.onPageSelected = function (index) {
    context.setData({
      tabCurrentIndex: index
    })
  },

  /**
         * 滑动进度
         * @param preIndex 当前显示的下标
         * @param ratio 滑动进度，左滑负数，右滑正数，[-1,1]
         * @param px 滑动的像素
         */
  this.onPageScrolled = function (preIndex, ratio, px) {

  },


  /**
         * 状态回调
         * @param state [PageStat]
         */
  this.onPageScrollStateChanged = function (state) {

  }
}


Page({

  /**
     * 页面的初始数据
     */
  data: {
    tab: [{
      name: '推荐',
    }, {
      name: '活动'
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动"
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动"
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动"
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动"
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动"
      // }, {
      //   name: "推荐",
      // }, {
      //   name: "活动q"
    }],
    tabCurrentIndex: 0,
    currentIndex: 0,
    onPagerChange: null,
    statusBarHeight: 25
  },
  /**
     * 生命周期函数--监听页面加载
     */

  onLoad(options) {
    this.setData({
      onPagerChange: new PagerChange(this)
    })
  },

  /**
     * 生命周期函数--监听页面初次渲染完成
     */
  onReady() {
    this.initStyle()
    // wx.cloud
  },

  /**
     * 生命周期函数--监听页面显示
     */
  onShow() {

  },

  /**
     * 生命周期函数--监听页面隐藏
     */
  onHide() {

  },

  /**
     * 生命周期函数--监听页面卸载
     */
  onUnload() {

  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh() {
    wx.showLoading()
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom() {

  },

  /**
     * 用户点击右上角分享
     */
  onShareAppMessage() {

  },


  // ////////////////////////////// 样式调整 ///////////////////////////////////////////
  initStyle() {
    // wx.setNavigationBarTitle({
    //   title: i18n.title,
    // })
    const info = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: (info.statusBarHeight * 2)
    })
  },

  onTabSelect(event) {
    this.setData({
      currentIndex: event.detail.currentIndex
    })
  }


})
