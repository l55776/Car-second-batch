var e = getApp();

e.util.url("entry/wxapp/Api", {
    m: "monai_sharing",
    uid: wx.getStorageSync("uid"),
    r: "Upimg"
});

Page({
    data: {
        headerdata:{top:e.globalData.statusBarHeight},
        upcarindex: 0,
        userphone: "",
        isShow: !1,
        status: ""
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(t) {
        var a = this;
        e.util.getUserInfo(function(e) {
            wx.setStorageSync("uid", e.memberInfo.uid), a.hideDialog();
        }, t.detail);
    },
    onShow: function() {},
    firstin: function(t) {
        wx.getSystemInfoSync();
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: e.getuid(),
                r: "sale.index.saleindex"
            },
            cachetime: "0",
            success: function(e) {
                var a = {
                    userphone: ""
                };
                e.data.data.user && (a.userphone = e.data.data.user.phone), t.setData(a);
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        e.util.getUserInfo(function(e) {
            e.memberInfo || a.setData({
                isShow: !0
            });
        }), a.firstin(a);
    },
    getPhoneNumber: function(t) {
        console.log(t);
        var a = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                r: "sale.index.userphone",
                m: "monai_market",
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData
            },
            cachetime: "0",
            success: function(e) {
                a.setData({
                    userphone: e.data.data
                });
            }
        });
    },
    release: function(t) {
        var a = this, n = wx.getStorageSync("uid");
        if (n) {
            if (!a.data.buttscan) {
                a.setData({
                    buttscan: !0
                });
                var i = t.detail.value.phone;
                if ("" == i || "undefined" == i) return e.util.message({
                    title: "请点击电话授权",
                    type: "error"
                }), void a.setData({
                    buttscan: !1
                });
                var o = {
                    r: "sale.index.inloan",
                    m: "monai_market",
                    fomid: t.detail.formId,
                    uid: n,
                    phone: i
                };
                e.util.request({
                    url: "entry/wxapp/Api",
                    data: o,
                    cachetime: "0",
                    success: function(e) {
                        console.log(e), e && e.data && wx.showModal({
                            title: "成功提示",
                            content: "提交成功",
                            showCancel: !1,
                            success: function(e) {}
                        });
                    },
                    fail: function(e) {
                        console.log(e), wx.showModal({
                            title: "错误提示",
                            content: e.data.message,
                            showCancel: !1,
                            success: function(e) {}
                        });
                    }
                });
            }
        } else a.setData({
            isShow: !0
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});