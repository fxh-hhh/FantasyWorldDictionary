const {
  checklogin
} = require("../../../utils/checklogin");
const {
  getuserindb, getuserref
} = require("../../../utils/getuserindb");

// pages/userPage/userCreations/userCreations.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    worksinfo: [],
    nativeinfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (await checklogin()) return;
    let userdata = await getuserindb()
    this.setData({
      worksinfo: userdata.works
    })
  },

  deleteword: function (event) {
    wx.showModal({
      content:"是否要删除该词条?",
      cancelColor: 'cancelColor',
      success: async res => {
        if (res.confirm) {
          let id = event.detail.id;
          let db = wx.cloud.database();
          let collect = db.collection("records");
          //从词条库中删除
          await collect.doc(id).remove();
          //从worksinfo中删除
          let newinfo = this.data.worksinfo;
          newinfo.splice(newinfo.indexOf(id), 1);
          //从作者的创作中删除
          let userref = await getuserref();
          await userref.update({
            data: {
              works: wx.cloud.database().command.set(newinfo)
            }
          })
          //更新视图层
          this.setData({
            worksinfo: newinfo
          }, () => {
            wx.showToast({
              title: '删除成功',
            })
          })
        }
      }
    })
  }
})