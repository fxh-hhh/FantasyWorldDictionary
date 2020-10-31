export function stamptostring(stamp) {
    var date = new Date(stamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const fill = v => (v < 10 ? '0' : '') + v;
    var Y = date.getFullYear();
    var M = fill(date.getMonth() + 1);
    var D = fill(date.getDate());
    var h = fill(date.getHours());
    var m = fill(date.getMinutes());
    var s = fill(date.getSeconds());
    return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
}