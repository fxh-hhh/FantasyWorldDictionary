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
      this.setData({
        history: userdata.history.map(v => {
          return {
            id: v.id,
            time: stamptostring(v.timestamp)
          }
        })
      })
    })
  },
})