// components/searchbar/searchbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: "",
        searchres: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        returnid: function (event) {
            let id = event.currentTarget.dataset.id;
            this.triggerEvent("select", {
                id
            })
        },

        showInput: function () {
            this.setData({
                inputShowed: true
            })
        },

        hideInput: function () {
            this.setData({
                inputShowed: false,
                inputVal: ""
            })
        },

        inputTyping: function (event) {
            let key = event.detail.value
            this.setData({
                inputVal: key
            })
            key = key.replace(/\s+/g, "");
            if (key.length > 0) {
                this.search(key)
            }
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

        clearInput: function () {
            this.setData({
                inputVal: ""
            })
        },
    },
})
