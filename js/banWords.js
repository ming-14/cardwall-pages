"use strict";
// banWords.js
// 违禁词检测
// 仅在前端做验证，要绕过不难
// 违禁词绝对拦不完，表白墙必须有人管理

// Get违禁词库，内容有Base64编码
var banData = null;
$.get("data/banWords/banlist", function (data, status) {
    if (status === "success") {
        banData = data;
    }
});

// -+--+--+--+--+--+-
// 检测是否有违禁词
// 参数：
//   str: 要检测的字符串
//   callback: 回调函数，参数为违禁词在字符串中的位置
// 返回值：
//   200: 没有违禁词
//   403: 有违禁词
//   501: 违禁词库未加载完成
// -+--+--+--+--+--+-
function isban(str, callback) {
    if (banData === null) return 501;

    var banWords = banData.split("\n");
    var isban = false;
    for (var i = 0; i < banWords.length; ++i) {
        var temp = Base64.decode(banWords[i]);
        // 词库每个词后面有个回车，这里删掉
        var banStatus = str.indexOf(temp.slice(0, temp.length - 1));
        if (banStatus >= 0) {
            isban = true;
            callback(banStatus);
        }
    }
    return isban ? 403 : 200;
}
