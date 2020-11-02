const {
    getclausebyid
} = require("../../../../utils/getclausebyid");

// pages/userPage/userCreations/onecreation/onecreation.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        wordid: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        clausedata: {},
        onload: true
    },

    lifetimes: {
        ready: function () {
            getclausebyid(this.properties.wordid).then(res => {
                this.setData({
                    clausedata: res,
                    onload: false
                })
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        deleteword: function (event) {
            let id = event.currentTarget.dataset.id;
            this.triggerEvent("delete", {
                id
            })
        }
    }
})
