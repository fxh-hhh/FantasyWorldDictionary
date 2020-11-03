const { getuserindb } = require("./getuserindb");

export async function getwxid() {
    /**
     * @type {String}
     */
    let id = getApp().globalData.wxid;
    id = id || (await wx.cloud.callFunction({
        name: "getuserid"
    })).result.openid;
    return getApp().globalData.wxid = id
}

//userinfo确保为有效的用户信息
export async function login(userinfo) {
    // 获取wxid
    let id = await getwxid();
    // 更新数据库中的用户信息
    let udata = await updateuser(id, userinfo)
    // 设置登陆态
    getApp().globalData.onlogin = true;
    // 返回用户数据
    return udata;
}

// 更新数据库中的用户信息
async function updateuser(id, fromwx) {
    // 获取旧的用户信息及其引用 , 如果数据库中不存在 , 则自动新建
    let res = await getuserindb(id);
    delete res["_openid"]
    delete res["_id"]

    //覆盖旧数据
    let cover = {
        nickname: fromwx["nickName"],
        headimage: fromwx["avatarUrl"],
    }
    for (let key in cover) {
        res[key] = cover[key];
    }
    //填充默认值
    let def = {
        saves: [],
        works: [],
        history: [],
        wxid: id
    }
    for (let key in def) {
        if (!(key in res)) {
            res[key] = def[key];
        }
    }
    //更新数据库中的数据,异步
    res.ref.update({
        data: res
    })
    return res;
}