"use strict";
// writeCard.js

function go(callback) {
    // 获取输入框的各项数据
    var sponsor = document.getElementById('sponsor')
        .value;
    var lover = document.getElementById('lover')
        .value;
    var tosay = document.getElementById('tosay')
        .value;
    var type = "520"; //getElementById('type').value;

    //+-+-+-+ 必填项检测 +-+-+-+-

    try {
        if (lover === "") {
            throw ("\"被表白人\"不可为空");
        }
        if (tosay === "") {
            throw ("\"要说的话\"不可为空");
        }
        if (lover.length < 2) {
            throw ("\"被表白人\"不可小于2个字符");
        }
        if (tosay.length < 2) {
            throw ("\"要说的话\"不可小于2个字符");
        }
        let sp1 = 0;
        for (let i = 0; i < lover.length; ++i) if (lover[i] == ' ') ++sp1;
        if (sp1 === lover.length) {
            throw ("\"被表白人\"不可全是空格");
        }
        let sp2 = 0;
        for (let i = 0; i < tosay.length; ++i) if (tosay[i] == ' ') ++sp2;
        if (sp2 === tosay.length) {
            throw ("\"要说的话\"不可全是空格");
        }
    }
    catch (err_msg) {
        maketip(2, err_msg);
        scrollMove();
        callback();
        return false;
    }

    /*
        : ) 前端已经做了限制
        if(lover.length > 15) { alert("\"被表白人\"长度不可大于15"); callback(); return false; }
        if(sponsor.length > 15) { alert("\"表白人\"长度不可大于15"); callback(); return false; }
        if(tosay.length > 100) { alert("\"要说的话\"长度不可大于100"); callback(); return false; }
    */

    //+-+-+-+   END   +-+-+-+-

    //+-+-+-+ 关键字屏蔽 +-+-+-+-

    var s1 = isban(sponsor, function (ban) {
        alert("发现违禁词, 位于\"发起人\"的" + ban.toString() + "个字符中");
    });
    var s2 = isban(lover, function (ban) {
        alert("发现违禁词, 位于\"表白人\"的" + ban.toString() + "个字符中");
    });
    var s3 = isban(tosay, function (ban) {
        alert("发现违禁词, 位于\"要带的话\"的" + ban.toString() + "个字符中");
    });
    if (s1 === 403 || s2 === 403 || s3 === 403) {
        alert("提交失败");
        scrollMove();
        callback();
        return false;
    }

    //+-+-+-+    END   +-+-+-+-



    // 发数据...
    let authentication_answer = getCookie("authentication_answer")?unescape(getCookie("authentication_answer")):"{}";
    console.log(authentication_answer);
    $.ajax(
        {
            url: api_url + "/api/addcard",
            data:
            {
                'authentication': authentication_answer,
                'sponsor': escape(sponsor),
                'lover': escape(lover),
                'tosay': escape(tosay),
                'type': escape(type)
            },
            type: "POST",
            success: function (data, r) {
                if (data.code == 401) {
                    window.location = "authentication.html?notifications=2&notifications_content=身份验证失败，请重新填写凭证";
                }
                else if (data.code == -1) {
                    maketip(MAKETIP_WARNING, "提交失败<br>1.请检查必填项有没有填写<br>2.卡片数据是否过长<br>3.网络是否正常");
                    scrollMove();
                }
                else if (data.code == 200) {
                    window.location = "index.html?notifications=1&notifications_content=提交成功";
                }
                else {
                    window.location = "index.html?notifications=2&notifications_content=网络似乎走神了";
                }
                callback(); // 不会走到
            },
            error: function (err) {
                maketip(MAKETIP_WARNING, "网络似乎走神了");
            },
            dataType: "json"
        });


    return true;
}