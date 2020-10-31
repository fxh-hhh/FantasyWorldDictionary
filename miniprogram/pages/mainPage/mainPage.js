// pages/mainPage/mainPage.js

let {writechoice, getchoice} = require("../../json/writechoice");
const { getuserindb } = require("../../utils/getuserindb");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let alltype = writechoice.map(v => {
      return {
        innertype: v.innertype,
        clausetype: v.clausetype
      }
    });
    this.setData({
      alltype
    });
  },

  changetype:function(){
    let db = wx.cloud.database();
    db.collection('records')
      .get()
      .then(res => {
        res.data.forEach(v => {
          let old = v.fields;
          if(Array.isArray(old))return;
          let range = getchoice(v.innertype).fields;
          let fields = []
          range.forEach(f=>{
            fields.push({
              innerfield:f.innerfield,
              field:f.field,
              value:old[f.innerfield].value
            })
          })
          return
          db.collection('records').doc(v._id).set({
            data:{
              fields
            }
          })
        })
      })
  },
  trim: function () {
    let db = wx.cloud.database()
    let collect = db.collection("records");
    collect.get().then(async res => {
      console.log(res);
      for (let i in res.data) {
        let id = res.data[i]._id;
        let newdata = res.data[i];
        newdata.authorid = newdata._openid;
        delete newdata._id;
        await collect.doc(id).set({
          data: newdata
        })
      }
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