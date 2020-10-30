// pages/writing/writingClouse/writingClouse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event:[
      {
        field:"事件名称",
        default:"请输入文本",
        type:"input"
      },
      {
        field:"事件发生时间",
        default:"如“2000.01.01",
        type:"input"
      },
      {
        field:"事件结束时间",
        default:"如：2000.01.01",
        type:"input"
      },
      {
        field:"事件描述",
        default:"请输入文本",
        type:"textArea"
      }
    ],
    definition:[
      {
        field:"概念名称",
        default:"如：龙，精灵，星际战舰等",
        type:"input"
      },
      {
        field:"概念描述",
        default:"请输入文本",
        type:"definitionArea"
      }
    ],
    character:[
      {
        field:"人物名称",
        default:"请输入名称",
        type:"input"
      },
      {
        field:"生平",
        default:"请输入文本",
        type:"characterArea"
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

  }
})