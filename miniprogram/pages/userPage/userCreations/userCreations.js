const {
  checklogin
} = require("../../../utils/checklogin");
const {
  getuserindb
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
    let collect = wx.cloud.database().collection("records")
    let arr = [];
    for (let key in userdata.works) {
      let id = userdata.works[key];
      let one = await collect.doc(id).get();
      arr.push(one.data);
    }
    this.setData({
      worksinfo: arr,
      nativeinfo: userdata.works
    })
  },

  deleteword: function (event) {
    wx.showModal({
      content:"是否要删除该词条?",
      cancelColor: 'cancelColor',
      success: async res => {
        if (res.confirm) {
          let id = event.currentTarget.dataset.id;
          let db = wx.cloud.database();
          let collect = db.collection("records");
          //从词条库中删除
          await collect.doc(id).remove();
          //从作者的创作中删除
          let newinfo = this.data.nativeinfo;
          newinfo.splice(newinfo.indexOf(id), 1);
          let userinfo = await getuserindb();
          /**
           * @type {DB.DocumentReference}
           */
          let userref = userinfo.ref;
          await userref.update({
            data: {
              works: wx.cloud.database().command.set(newinfo)
            }
          })
          //从worksinfo中删除
          let todel = -1;
          this.data.worksinfo.forEach((v, i) => {
            if (v._id == id) {
              todel = i
            }
          })
          this.data.worksinfo.splice(todel,1);
          this.setData({
            worksinfo: this.data.worksinfo
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