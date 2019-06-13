var a = getApp();

Page({
    data: {
        info: [],
        sheng: [],
        jianum: 0,
        fanum: 0,
        mendian: "请选择",
        carid: 0,
        buttscan: !1
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    updateUserInfo: function(t) {
        var e = this;
        a.util.getUserInfo(function(a) {
            wx.setStorageSync("uid", a.memberInfo.uid), e.firstin(e);
        }, t.detail);
    },
    bindPickerChange: function(a) {
        this.setData({
            mendian: this.data.sheng[a.detail.value]
        });
    },
    onShow: function() {},
    firstin: function(t) {
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: wx.getStorageSync("uid"),
                carid: t.data.carid,
                r: "home.weizhang.addcar"
            },
            cachetime: "0",
            success: function(a) {
                t.setData({
                    info: a.data.data.car_info,
                    sheng: a.data.data.sheng
                }), t.data.carid > 0 && t.setData({
                    mendian: a.data.data.car_info.sheng
                });
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            carid: t.id
        }), a.util.getUserInfo(function(t) {
            t.memberInfo || e.setData({
                isShow: !0
            }), a.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "monai_market",
                    r: "me.info",
                    uid: wx.getStorageSync("uid")
                },
                success: function(a) {
                    console.log(a);
                }
            });
        }), e.firstin(e);
    },
    release: function(t) {
        var e = this, n = wx.getStorageSync("uid");
        if (!e.data.buttscan) {
            e.setData({
                buttscan: !0
            });
            var i = e.data.mendian;
            if ("" == i || "undefined" == i || "请选择" == i) return a.util.message({
                title: "请选择车牌号所属省会",
                type: "error"
            }), void e.setData({
                buttscan: !1
            });
            var o = t.detail.value.jia;
            if ("" == o || "undefined" == o) return a.util.message({
                title: "请输入识别代号后6位",
                type: "error"
            }), void e.setData({
                buttscan: !1
            });
            var r = t.detail.value.car_num;
            if ("" == r || "undefined" == r) return a.util.message({
                title: "请输入车牌号码",
                type: "error"
            }), void e.setData({
                buttscan: !1
            });
            var s = t.detail.value.fa;
            if ("" == s || "undefined" == s) return a.util.message({
                title: "请输入发动机号后6位",
                type: "error"
            }), void e.setData({
                buttscan: !1
            });
            var u = {
                r: "home.weizhang.addcar_in",
                m: "monai_market",
                fomid: t.detail.formId,
                uid: n,
                mendian: i,
                jia: o,
                car_num: r,
                fa: s,
                carid: e.data.carid
            };
            a.util.request({
                url: "entry/wxapp/Api",
                data: u,
                cachetime: "0",
                success: function(a) {
                    a.data.data ? wx.showToast({
                        title: "提交成功",
                        icon: "success",
                        duration: 2e3
                    }) : (console.log(a), wx.showToast({
                        title: "提交失败",
                        icon: "success",
                        duration: 2e3
                    })), wx.navigateTo({
                        url: "/pages/weizhang/weizhang"
                    });
                },
                fail: function(t) {
                    console.log(t), a.util.message({
                        title: t.data.message,
                        type: "error"
                    }), e.setData({
                        buttscan: !1
                    });
                }
            });
        }
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});