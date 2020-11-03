// pages/search/search.js
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

  },
  
  search: function (key) {
    let db = wx.cloud.database();
    let anychar = ".*"
    let str = anychar + key.split("").join(anychar) + anychar;
    let reg = db.RegExp({
      regexp: str,
      options: 'i'
    })
    let collect = db.collection("records");
    collect.where({
      call: reg
    }).field({
      call: true
    }).get().then(res => {
      this.setData({
        searchres: res.data.map(v => {
          return {
            call: v.call,
            id: v._id
          }
        })
      })
    })
  },

  gotoclause: function (event) {
    wx.navigateTo({
      url: '../mainPage/wordClause/wordClause?id=' + event.detail.id,
    })
  }
})