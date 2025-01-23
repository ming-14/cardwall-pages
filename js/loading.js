"use strict";
// loading.js
// 加载动画与提示信息

// -+--+--+--+--+--+-
// 展示加载动画，与 removeloading 配套使用
// -+--+--+--+--+--+-
function makeloading() {
    let floatLayer = document.createElement("div");
    floatLayer.className = "floatLayer";
    floatLayer.id = "_floatLayer_id";
    let boxLoading = document.createElement("div");
    boxLoading.className = "boxLoading";
    boxLoading.style = "z-index: 9997;"; // 动画图层，保证其在最上层
    boxLoading.id = "_boxLoading_id";
    document.getElementsByTagName('body')[0].appendChild(floatLayer);
    document.getElementsByTagName('body')[0].appendChild(boxLoading);
}

// -+--+--+--+--+--+-
// 移除加载动画，与 makeloading 配套使用
// -+--+--+--+--+--+-
function removeloading() {
    document.getElementsByTagName('body')[0].removeChild(document.getElementById("_floatLayer_id"));
    document.getElementsByTagName('body')[0].removeChild(document.getElementById("_boxLoading_id"));
}

function removeExcessiveTips(tips) {
    if (tips.length > 3) {
        document.getElementById("alert").removeChild(tips[0]);
    }
}

// -+--+--+--+--+--+-
// 展示提示信息：成功、警告、错误
// -+--+--+--+--+--+-
const MAKETIP_SUCCESS = 1; // 成功
const MAKETIP_WARNING = 2; // 警告
const MAKETIP_DANGER = 3;  // 错误
function maketip(tipType, tipText) {
    removeExcessiveTips(document.querySelectorAll("#alert .alert"));

    let _alert = document.createElement("div");
    _alert.className = tipType == 1 ? "alert alert-success alert-dismissible bg-success text-white border-0 fade show"
        : tipType == 2 ? "alert alert-warning alert-dismissible bg-warning text-white border-0 fade show"
            : "alert alert-danger alert-dismissible bg-danger text-white border-0 fade show";
    _alert.role = "alert";
    _alert.id = "tip";
    _alert.innerHTML = tipText;
    let _button = document.createElement("button");
    _button.className = "close";
    _button.data_dismiss = "alert";
    _button.aria_label = "Close";
    let _close = document.createElement("span");
    _close.aria_hidden = "true";
    _close.innerHTML = "×";
    _close.onclick = function () {
        document.getElementById("alert").removeChild(document.getElementById("tip"));
    }
    _button.appendChild(_close);
    _alert.appendChild(_button);
    document.getElementById("alert").appendChild(_alert);
}

// -+--+--+--+--+--+-
// 显示提示
// -+--+--+--+--+--+-
(function () {
    // -+--+--+--+--+--+-
    // 获取url参数
    // variable：要获取的参数名
    // -+--+--+--+--+--+-
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return (false);
    }
    // 提示信息
    let tipType = getQueryVariable("notifications");
    let tipText = decodeURIComponent(getQueryVariable("notifications_content"));
    if (tipType && tipText) maketip(tipType, tipText);
})();


console.log("loading.js loaded");