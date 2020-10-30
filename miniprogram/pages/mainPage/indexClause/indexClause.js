let {
    getchoice
} = require("../../../json/writechoice")
// miniprogram/pages/mainPage/indexClause/indexClause.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: "",
        allclause: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let type = options.type;
        let db = wx.cloud.database();
        let collect = db.collection("records");
        collect.limit(20).where({
            innertype: type
        }).get().then(res => {
            this.setData({
                type: getchoice(type).clausetype,
                allclause: res.data.map(v => {
                    return {
                        ...v,
                        jsondata: encodeURI(JSON.stringify(v))
                    }
                })
            })
            console.log(res.data);
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