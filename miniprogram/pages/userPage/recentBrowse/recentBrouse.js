const { checklogin } = require("../../../utils/checklogin");
const { getclausebyid } = require("../../../utils/getclausebyid");
const { getuserindb } = require("../../../utils/getuserindb");
const { stamptostring } = require("../../../utils/stamptostring");

// pages/userPage/recentBrowse/recentBrouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (await checklogin()) return;
    getuserindb().then(async userdata => {
      let arr = [];
      let collect = wx.cloud.database().collection("records");
      this.setData({
        history: userdata.history.map(v => {
          return {}
        })
      })
      for (let key in userdata.history) {
        let id = userdata.history[key].id;
        let stamp = userdata.history[key].timestamp;
        let one = await getclausebyid(id, collect);
        arr.push({
          clausedata: one,
          time: stamptostring(stamp)
        });
      }
      this.setData({
        history: arr
      })
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

  }
})