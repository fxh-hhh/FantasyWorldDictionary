const { checklogin } = require("../../../utils/checklogin");
const { getuserindb } = require("../../../utils/getuserindb");

// pages/userPage/userCreations/userCreations.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (await checklogin()) return;
    let userdata = await getuserindb(getApp().globalData.wxid)
    let arr = [];
    for (let key in userdata.works) {
      let id = userdata.works[key];
      let one =await wx.cloud.database().collection("records").doc(id).get();
      arr.push(one.data);
    }
    this.setData({
      worksinfo: arr
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