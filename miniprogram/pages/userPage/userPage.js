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
        title: "联系开发者",
        listUrl: "./contactDeveloper/contactDeveloper",
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //自动登录
    wx.getSetting().then((setting) => {
      if (setting.authSetting["scope.userInfo"]) {
        wx.getUserInfo({
          success: (res => {
            this.login({
              detail: res
            })
          })
        })
      }
    })
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

    delete res["_openid"]

    //更新数据库的缓存
    res.ref.update({
      data: res
    })

    return res;
  }
});