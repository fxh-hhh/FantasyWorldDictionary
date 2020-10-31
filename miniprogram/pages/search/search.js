// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    searchres: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  showInput: function () {
    this.setData({
      inputShowed: true
    })
  },

  hideInput: function () {
    this.setData({
      inputShowed: false,
      inputVal: ""
    })
  },

  inputTyping: function (event) {
    let key = event.detail.value.replace(" ", "");
    this.setData({
      inputVal: key
    }, res => {
      if (key.length > 0) {
        this.search(key)
      }
    })
  },

  search: function (key) {
    let db = wx.cloud.database();
    let anychar = ".*"
    let str = anychar + key.split("").join(anychar) + anychar;
    let reg = db.RegExp({
      regexp: str,
      options: 'i'
    })
    let collect = db.collection("records");
    collect.where({
      call: reg
    }).get().then(res => {
      this.setData({
        searchres: res.data.map(v => {
          return {
            call: v.call,
            id: v._id
          }
        })
      })
    })
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    })
  },

  gotoclause: function (event) {
    wx.navigateTo({
      url: '../mainPage/wordClause/wordClause?id=' + event.currentTarget.dataset.id,
    })
  }
})