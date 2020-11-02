export async function getclausebyid(id, collect = wx.cloud.database().collection("records")) {
    try {
        let {
            data
        } = await collect.doc(id).get();
        return data;
    } catch (error) {
        return {
            nofind: true
        }
    }
}