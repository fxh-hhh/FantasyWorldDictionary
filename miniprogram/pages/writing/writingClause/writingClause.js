// pages/writing/writingClouse/writingClouse.js

let {
  writechoice
} = require("../../../json/writechoice")

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
  onLoad: function (options) {
    let id = parseInt(options.id);
    this.setData({
      id,
      fields: writechoice[id].fields,
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
    let {
      field,
      innerfield
    } = event.currentTarget.dataset.fieldinfo;
    let value = event.detail.value;
    let obj = this.data.allfields;
    obj[innerfield] = {
      value,
      show: field
    }
    this.setData({
      allfields: obj
    })
  },

  uploadclause: function (event) {
    let data = this.data.allfields;
    console.log(data);
    let collect = wx.cloud.database().collection("records");
    collect.add({
      data: {
        innertype: this.data.innertype,
        call: data.call.value,
        fields: data
      }
    }).then(res => {
      wx.showToast({
        title: '上传成功',
      })
    }).catch(res => {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: "错误",
        content: JSON.stringify(res)
      })
    })
  }
})