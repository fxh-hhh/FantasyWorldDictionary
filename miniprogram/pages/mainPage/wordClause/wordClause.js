const { getuserindb } = require("../../../utils/getuserindb");

// pages/mainPage/wordClause/wordClause.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        clausedata: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if ("id" in options) {
            //拉取数据
            let {
                id
            } = options;
            let db = wx.cloud.database();
            let collect = db.collection("records");
            collect.doc(id).get().then(res => {
                this.setData({
                    clausedata: res.data
                })

                //处理用户最近浏览
                let {
                    globalData
                } = getApp();
                if (globalData.onlogin) {
                    getuserindb(globalData.wxid).then(res => {
                        res.ref.update({
                            data: {
                                history: wx.cloud.database().command.unshift({
                                    id,
                                    timestamp: (new Date).getTime()
                                })
                            }
                        })
                    })
                }
            }).catch(() => {
                this.setData({
                    iderr: true
                })
            });
        } else {
            this.setData({
                iderr: true
            })
        }
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