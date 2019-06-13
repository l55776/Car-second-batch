require("/towxml/main");

var e = require("we7/resource/js/util.js");

App({
    siteInfo: require("siteinfo.js"),
    data: {
        appscene: 123
    },
    util: require("we7/resource/js/util.js"),
    onLaunch: function(e) {
        this.data.appscene = e.scene;
    },
    getuid: function(i) {
        var t = wx.getStorageSync("uid");
        if (t) return t;
        e.getUserInfo(function(e) {
            if (e.memberInfo) {
                var i = e.memberInfo.uid;
                return wx.setStorageSync("uid", i), i;
            }
            return "";
        });
    },
    getAttr: function(e, i) {
        return e.currentTarget.dataset[i];
    },
    back: !1,
    toDate: function(e) {
        var i = 1e3 * e, t = new Date(i);
        return t.getFullYear() + "." + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + ".") + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate());
    },
    upimgs: function(e) {
        var i = this, t = e || {};
        if (wx.showLoading({
            title: "正在上传..."
        }), t == {} || !t) {
            if (!e.fail || "function" != typeof e.fail) return !1;
            e.fail({
                errno: 500,
                message: "缺少必要参数"
            });
        }
        var a = t.scannums ? t.scannums : 1, n = t.filename ? t.filename : "images", r = i.util.url("entry/wxapp/Api", {
            m: "monai_market",
            uid: i.getuid(),
            r: "upimg"
        });
        wx.chooseImage({
            count: a,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(t) {
                wx.showLoading({
                    title: "正在上传..."
                });
                var a = t.tempFilePaths, u = (t.tempFiles, new Array(a.length)), s = 0;
                for (var o in a) {
                    !function(t) {
                        wx.uploadFile({
                            url: r,
                            filePath: a[t],
                            name: "file",
                            formData: {
                                names: n
                            },
                            success: function(n) {
                                var r = JSON.parse(n.data);
                                return 0 != r.errno ? (i.util.message({
                                    title: r.message,
                                    type: "error"
                                }), void wx.hideLoading()) : (s++, u[t] = r.data, s == a.length && e.success && "function" == typeof e.success ? (e.success(u), 
                                void wx.hideLoading()) : void 0);
                            },
                            fail: function(i) {
                                wx.hideLoading();
                                var t = JSON.parse(i.data);
                                e.fail && "function" == typeof e.fail && e.fail(t);
                            }
                        });
                    }(o);
                }
                setTimeout(function() {
                    wx.hideLoading();
                }, 5e3);
            },
            fail: function() {
                wx.hideLoading(), e.fail && "function" == typeof e.fail && e.fail();
            }
        });
    },
    upimg: function(e) {
        var i = this, t = i.util.url("entry/wxapp/Api", {
            m: "monai_market",
            uid: i.getuid(),
            r: "upimg"
        }), a = e.filename ? e.filename : "images";
        wx.uploadFile({
            url: t,
            filePath: e.img,
            name: "file",
            formData: {
                names: a
            },
            success: function(t) {
                console.log(t);
                var a = JSON.parse(t.data);
                return 0 != a.errno ? (i.util.message({
                    title: a.message,
                    type: "error"
                }), void wx.hideLoading()) : a.data && e.success && "function" == typeof e.success ? (e.success(a.data), 
                void wx.hideLoading()) : void 0;
            },
            fail: function(i) {
                console.log(i), wx.hideLoading();
                var t = JSON.parse(i.data);
                e.fail && "function" == typeof e.fail && e.fail(t);
            }
        });
    },
    delimg: function(e) {
        var i = this, t = e.uid ? e.uid : "";
        if ("" == t) return e.fail && "function" == typeof e.fail && e.fail({
            errno: 500,
            message: "请允许获取用户信息"
        }), !1;
        var a = e.url ? e.url : "";
        if ("" == a) return e.fail && "function" == typeof e.fail && e.fail({
            errno: 500,
            message: "图片路径错误"
        }), !1;
        i.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: t,
                imgurl: a,
                r: "upimg.delImg"
            },
            cachetime: "0",
            success: function(i) {
                e.success && "function" == typeof e.success && e.success();
            },
            fail: function() {
                e.fail && "function" == typeof e.fail && e.fail();
            }
        });
    },
    delseverimg: function(e) {
        this.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                imgurl: e,
                r: "Upimg.delserverImg"
            }
        });
    },
  globalData: {
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight']
  }

});