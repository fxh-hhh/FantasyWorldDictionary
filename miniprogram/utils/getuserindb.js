export async function getuserindb(wxid) {
    let db = wx.cloud.database();
    let collect = db.collection("userinfo");
    let res = await collect.where({
        wxid: wxid,
    }).get();
    if (res.data.length > 0) {
        return res.data[0];
    } else {
        return {}
    }
}