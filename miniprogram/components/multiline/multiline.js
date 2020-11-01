// components/multiline/multiline.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        maxlength: {
            type: Number,
            value: 1000
        },
        height: {
            type: Number,
            value: 20
        },
        placeholder: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: ""
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        str: ""
    },

    /**
     * 组件的方法列表
     */
    methods: {
        input: function (event) {
            let str = event.detail.value;
            this.setData({
                str
            }, () => {
                this.triggerEvent("input", {
                    value: str
                });
            })
        }
    },

    lifetimes: {
        attached: function () {
            this.setData({
                str: this.properties.value
            })
        }
    }
})
