const {
  checklogin
} = require("../../../utils/checklogin");
const {
  getuserindb,
  getuserref,
  getuserfields
} = require("../../../utils/getuserindb");
const {
  stamptostring
} = require("../../../utils/stamptostring");

// pages/userPage/recentBrowse/recentBrouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (await checklogin()) return;
    getuserfields({
      history: true
    }).then(res => {
      this.setData({
        history: res.history.map(v => Object({
          id: v.id,
          time: stamptostring(v.timestamp)
        }))
      })
    })
  },

  cleanall: function () {
    this.setData({
      history: []
    })
    getuserref().then(ref => {
      ref.update({
        data: {
          history: wx.cloud.database().command.set([])
        }
      })
    })
  }
})