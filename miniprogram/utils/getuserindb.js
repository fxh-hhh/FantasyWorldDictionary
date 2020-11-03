const {
    getwxid
} = require("./login");

/**
 * @description 获取数据库中的用户信息及其引用 , 如果数据库中不存在 , 则自动新建一个空数据
 * @param {String} wxid 需要获取用户信息的用户wxid , 默认为当前访问的用户
 */
export async function getuserindb(wxid) {
    //未传递wxid则默认使用当前用户的wxid
    if (!wxid) wxid = await getwxid();
    let global = getApp().globalData
    /**
     * @type {DB.IDocumentData}
     */
    let userdata = {}
    let collect = wx.cloud.database().collection("userinfo");
    //wxid为当前登陆的用户且已经获取了数据库引用
    if (wxid == global.wxid && global.userref) {
        //直接从全局引用中获取数据
        userdata = (await global.userref.get()).data
    } else {
        //从数据库中查询用户的wxid
        let {
            data
        } = await collect.where({
            wxid
        }).get();
        if (data.length > 0) {
            //查询成功
            //直接取第一个即可
            userdata = data[0];
        } else {
            //查询失败
            //新增一个记录
            let newdata = {
                wxid: id
            }
            let res = await collect.add({
                data: newdata,
            });
            //使用新增记录的_id
            data = {
                ...newdata,
                _id: res._id
            }
        }
    }
    //此时确保userdata有_id 和 wxid属性
    delete userdata["_openid"]; //防止更新_openid
    /**
     * @type {DB.DocumentReference}
     */
    let ref = {};
    if (wxid == global.wxid) {
        ref = (global.userref || collect.doc(userdata._id));
        global.userref = ref;
        //更新全局数据的用户引用
    } else {
        ref = collect.doc(userdata._id);
        //获取数据库引用
    }
    //获取了正确的数据库引用
    let toreturn = {
        ...userdata,
        ref,
        wxid,
    }
    return toreturn
}

/**
 * 
 * @param {String} wxid
 */
export async function getuserref(wxid) {
    if (!wxid) wxid = await getwxid();
    /**
     * @type {DB.DocumentReference}
     */
    let ref = {};
    if (wxid == global.wxid && global.userref) {
        ref = global.userref
    } else {
        let collect = wx.cloud.database().collection("userinfo");
        let {
            data
        } = await collect.where({
            wxid
        }).get();
        ref = collect.doc(data[0]._id);
    }
    return ref;
}

export async function getuserfields(fields, wxid) {
    let ref =await getuserref(wxid);
    return (await ref.field(fields).get()).data;
}