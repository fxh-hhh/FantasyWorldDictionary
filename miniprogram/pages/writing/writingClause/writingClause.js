// pages/writing/writingClouse/writingClouse.js

let {
  writechoice
} = require("../../../json/writechoice");
const { checklogin } = require("../../../utils/checklogin");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    innertype: "",
    clausetype: "",
    allfields: {
      //输入的所有字段
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    if (await checklogin()) return;
    //id为词条类型的下标
    let id = parseInt(options.id);
    this.setData({
      id,
      fields: writechoice[id].fields,
      allfields: writechoice[id].fields.map(v => {
        let {
          innerfield,
          field
        } = v;
        return {
          innerfield,
          field
        }
      }),
      clausetype: writechoice[id].clausetype,
      innertype: writechoice[id].innertype
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

  },

  input: function (event) {
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let obj = this.data.allfields;
    obj[index].value = value
    this.setData({
      allfields: obj
    })
  },

  uploadclause: function (event) {
    let data = this.data.allfields;
    console.log("add clause: ",data);
    let collect = wx.cloud.database().collection("records");
    let wxid = getApp().globalData.wxid;
    collect.add({
      data: {
        authorid: wxid,
        innertype: this.data.innertype,
        call: data[0].value,
        fields: data
      }
    }).then(res => {
      let db = wx.cloud.database();
      let cmd = db.command;
      let collect = db.collection("userinfo");
      try {
        collect.where({
          _openid: wxid
        }).get().then((result) => {
          let data = result.data;
          if (data.length > 0) {
            collect.doc(data[0]._id).update({
              data: {
                works: cmd.push(res._id)
              }
            })
            wx.showToast({
              title: '上传成功',
            })
          }
        })
      } catch (error) {
        console.log(error)
        collect.doc(res._id).remove();
      }
    }).catch(res => {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: "错误",
        content: JSON.stringify(res)
      })
    })
  }
})