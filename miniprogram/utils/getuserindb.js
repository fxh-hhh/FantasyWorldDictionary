export async function getuserindb(wxid = getApp().globalData.wxid) {
    let db = wx.cloud.database();
    let collect = db.collection("userinfo");
    let res = await collect.where({
        wxid: wxid,
    }).get();
    if (res.data.length > 0) {
        let info = res.data[0];
        return {
            ...info,
            ref: collect.doc(info._id)
        }
    } else {
        throw "用户信息获取出错"
    }
}