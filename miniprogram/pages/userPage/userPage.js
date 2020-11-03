const {
  getuserindb,
  getuserref,
  getuserfields
} = require("../../utils/getuserindb");
const {
  login
} = require("../../utils/login");

// pages/userPage/userPage.js
let page = Page({

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
    ],
    onlogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow: function () {
    if (!this.data.onlogin) {
      this.autologin();
    }
  },

  autologin: function () {
    //自动登录
    this.setData({
      onlogin: getApp().globalData.onlogin
    })
    if (this.data.onlogin) {
      getuserfields({
        headimage: true,
        nickname: true
      }).then(res => {
        this.setData({
          userdata: res
        })
      })
    }
  },

  bindlogin: async function (event) {
    if (getApp().globalData.onlogin) {
      this.autologin();
      return;
    }
    // 进入登录态
    this.setData({
      userdata: await login(event.detail.userInfo),
      onlogin: true
    })
  }
});