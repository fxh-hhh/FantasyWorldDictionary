// components/loadingbar/loadingbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        taillen: {
            type: Number,
            value: 10
        },
        interval: {
            type: Number,
            value: 50
        },
        off: {
            type: Boolean,
            value: false
        },
        show: {
            type: String,
            value: "加载中"
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
        attached: function () {
            this.setData({
                off: false
            })
        },
        ready: function () {
            if (this.properties.off) {
                return;
            }
            let num = 0;
            let loading = setInterval(() => {
                ++num;
                let str = "";
                for (let i = 0; i < num; ++i) str += '.';
                if (num % this.properties.taillen == 0) num = 0;
                this.setData({
                    tail: str
                })
                if (this.properties.off) {
                    clearInterval(loading);
                }
            }, this.properties.interval);
        },
        detached() {
            this.setData({
                off: true
            })
        }
    }
})
