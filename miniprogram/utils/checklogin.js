export async function checklogin(msg = "请先登陆") {
    let onlogin = getApp().globalData.onlogin;
    if (!onlogin) {
        await wx.showModal({
            cancelColor: 'cancelColor',
            content: msg
        })
        wx.switchTab({
            url: '/pages/userPage/userPage',
        })
        return true;
    } else {
        return false;
    }
}