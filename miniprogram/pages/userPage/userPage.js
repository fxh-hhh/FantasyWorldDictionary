const {
  getuserindb
} = require("../../utils/getuserindb");

// pages/userPage/userPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listnames: [{
        title: "我的收藏",
        listUrl: "./userCollections/userCollections",
      },
      {
        title: "我的创作",
        listUrl: "./userCreations/userCreations",
      },
      {
        title: "近期浏览",
        listUrl: "./recentBrowse/recentBrouse",
      },
      {
        title: "联系我们",
        listUrl: "./contactDeveloper/contactDeveloper",
      }
    ]
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

  login: async function (event) {
    // 获取用户信息
    let res = event.detail;
    let id = (await wx.cloud.callFunction({
      name: "getuserid"
    })).result.openid;
    let udata = {
      wxid: id,
      ...await this.getdatainapp(id, res.userInfo)
    }
    getApp().globalData.wxid = id;
    getApp().globalData.onlogin = true;
    this.setData({
      userdata: udata,
      onlogin: true
    })
  },

  getdatainapp: async function (id, fromwx) {
    let db = wx.cloud.database();
    let res = await getuserindb(id);

    //默认值
    let def = [
      ["nickname", fromwx["nickName"]],
      ["headimage", fromwx["avatarUrl"]],
      ["saves", []],
      ["works", []],
      ["history", []],
    ]
    for (let index in def) {
      if (!(def[index][0] in res)) {
        res[def[index][0]] = def[index][1];
      }
    }

    //更新数据库的缓存
    res.ref.update({
      data: res
    })

    return res;
  }
});