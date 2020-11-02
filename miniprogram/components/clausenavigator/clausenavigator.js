const {
    getclausebyid
} = require("../../utils/getclausebyid")

// components/clausenavigator/clausenavigator.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        wordid: {
            type: String
        },
        clausedata: {
            type: Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    },

    lifetimes: {
        ready: function () {
            if (this.properties.wordid) {
                getclausebyid(this.properties.wordid).then(res => {
                    this.setData({
                        fact: res
                    })
                })
            } else if (this.properties.clausedata) {
                this.setData({
                    fact: this.properties.clausedata
                })
            }
        }
    }
})
