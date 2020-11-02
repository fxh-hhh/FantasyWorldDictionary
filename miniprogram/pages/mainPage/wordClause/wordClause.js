const {
    checklogin
} = require("../../../utils/checklogin");
const {
    getuserindb
} = require("../../../utils/getuserindb");

// pages/mainPage/wordClause/wordClause.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        /**
         * @type {DB.IDocumentData}
         */
        clausedata: {},
        /**
         * @type {DB.DocumentReference}
         */
        userref: {},
        hassave: false,
        ondeal: false,
        iderr: false
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
                        this.setData({
                            hassave: res.saves.includes(id),
                            userref: res.ref
                        })
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

    save: async function () {
        if (await checklogin()) return;
        if (this.data.ondeal) return;
        this.data.ondeal = true;
        //收藏/取消收藏
        try {
            let id = this.data.clausedata._id;
            let db = wx.cloud.database();
            let res = await this.data.userref.get();
            let saves = res.data.saves;
            if (this.data.hassave) {
                saves.splice(saves.indexOf(id), 1);
            } else {
                saves.push(id);
            }
            this.setData({
                hassave: !this.data.hassave
            })
            await this.data.userref.update({
                data: {
                    saves: db.command.set(saves)
                }
            })
        } catch (error) {
            console.error(error);
        }
        this.data.ondeal = false;
    },
})