const { checklogin } = require("../../../utils/checklogin");
const { getuserindb } = require("../../../utils/getuserindb");

// pages/userPage/userCollections/userCollections.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    savesinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if (await checklogin()) return;
    let userdata = await getuserindb()
    this.setData({
      savesinfo: userdata.saves
    })
  },
})