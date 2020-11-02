/**
 * 
 * @param {String | Number} wxid 
 */
export async function getuserindb(wxid = getApp().globalData.wxid) {
    let global = getApp().globalData
    if (wxid == global.wxid && global.userref) {
        return {
            ...(await global.userref.get()).data,
            ref: global.userref
        }
    }
    let db = wx.cloud.database();
    let collect = db.collection("userinfo");
    let res = await collect.where({
        wxid: wxid,
    }).get();
    if (res.data.length > 0) {
        let info = res.data[0];
        if (wxid == global.wxid) {
            global.userref = collect.doc(info._id);
        }
        return {
            ...info,
            ref: collect.doc(info._id)
        }
    } else {
        let ndata = {
            wxid: id
        }
        let res = await collect.add({
            data: ndata,
        });
        return {
            ...ndata,
            ref: collect.doc(res._id)
        }
    }
}

/**
 * @returns {Promise<DB.DocumentReference>}
 */
export async function getuserref(wxid) {
    let {
        ref
    } = await (wxid ? getuserindb(wxid) : getuserindb());
    return ref;
}