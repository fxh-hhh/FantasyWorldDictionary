// pages/writing/writingClouse/writingClouse.js

let {
  writechoice,
  getchoice
} = require("../../../json/writechoice");
const {
  checklogin
} = require("../../../utils/checklogin");
const {
  getuserindb
} = require("../../../utils/getuserindb");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    innertype: "",
    clausetype: "",
    allfields: [
      //输入的所有字段
    ],
    //关联词条
    relatives: [],
    isedit: false,
    isopen: false,
    /**
     * @type {DB.DocumentReference}
     */
    wordref: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    if (await checklogin()) return;
    //id为词条类型的下标
    let id = -1;
    if ("id" in options)
      id = parseInt(options.id);
    else if ("innertype" in options)
      id = getchoice(options.innertype).index;
    else
      throw "没有该词条类型";

    let wordinfo = {}
    if ("wordid" in options) {
      //编辑页面
      let wordref = wx.cloud.database().collection("records").doc(options["wordid"]);
      this.setData({
        isedit: true,
        wordref
      })
      wordinfo = (await wordref.get()).data;
    }
    this.setData({
      id,
      fields: writechoice[id].fields,
      allfields: writechoice[id].fields.map((v, i) => {
        let {
          innerfield,
          field
        } = v;
        return {
          innerfield,
          field,
          value: wordinfo.fields ? wordinfo.fields[i].value : ""
        }
      }),
      clausetype: writechoice[id].clausetype,
      innertype: writechoice[id].innertype,
      relatives: wordinfo.relatives || []
    })
  },

  delrelative: function (event) {
    let todel = event.currentTarget.dataset.todel;
    let relatives = this.data.relatives;
    relatives.splice(todel, 1);
    this.setData({
      relatives
    })
  },

  opensearchbar: function () {
    this.setData({
      isopen: true
    })
  },

  addrelative: function (event) {
    let toadd = event.detail.id;
    let relatives = this.data.relatives;
    relatives.push(toadd)
    this.setData({
      relatives,
      isopen: false
    })
  },

  input: function (event) {
    let index = event.currentTarget.dataset.index;
    let value = event.detail.value;
    let obj = this.data.allfields;
    obj[index].value = value
    this.setData({
      allfields: obj
    })
  },

  finishedit: function () {
    let data = this.data.allfields;
    console.log("edit clause: ", data);
    this.data.wordref.update({
      data: {
        call: data[0].value,
        fields: wx.cloud.database().command.set(data),
        relatives: wx.cloud.database().command.set(this.data.relatives)
      }
    }).then(res => {
      wx.showToast({
        title: '更新成功',
      })
    }).catch(res => {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: "错误",
        content: JSON.stringify(res)
      })
    })
  },

  uploadclause: function () {
    let fields = this.data.allfields;
    let collect = wx.cloud.database().collection("records");
    let wxid = getApp().globalData.wxid;
    let data = {
      authorid: wxid,
      innertype: this.data.innertype,
      call: fields[0].value,
      fields,
      relatives: this.data.relatives
    }
    console.log("add clause: ", data);
    collect.add({
      data
    }).then(res => {
      let db = wx.cloud.database();
      let cmd = db.command;
      try {
        getuserindb().then((result) => {
          result.ref.update({
            data: {
              works: cmd.push(res._id)
            }
          })
          wx.showToast({
            title: '上传成功',
          })
        })
      } catch (error) {
        console.error(error)
        collect.doc(res._id).remove();
      }
    }).catch(res => {
      wx.showModal({
        cancelColor: 'cancelColor',
        title: "错误",
        content: JSON.stringify(res)
      })
    })
  }
})