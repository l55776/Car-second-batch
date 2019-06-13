var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        list: [],
        weizhang_num: 0
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.weizhang.index",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                a.data.data && t.setData({
                    list: a.data.data.list,
                    weizhang_num: a.data.data.weizhang_num
                });
            }
        });
    },
    onReachBottom: function() {},
    addcar: function() {
        wx.navigateTo({
            url: "/pages/weizhang/add/index"
        });
    },
    editcar: function(a) {
        wx.navigateTo({
            url: "/pages/weizhang/add/index?id=" + a.currentTarget.dataset.id
        });
    },
    selectcar: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.weizhang.weizhang_num",
                uid: wx.getStorageSync("uid")
            },
            success: function(n) {
                e.setData({
                    weizhang_num: n.data.data.weizhang_num
                }), 0 == n.data.data.weizhang_num || n.data.data.weizhang_num < 1 ? a.util.message({
                    title: "查询次数不足！",
                    type: "error"
                }) : wx.navigateTo({
                    url: "/pages/weizhang/selectcar/index?id=" + t.currentTarget.dataset.id
                });
            }
        });
    },
    paynum: function() {
        var t = this;
        console.log(wx.getStorageSync("uid")), a.util.request({
            url: "entry/wxapp/paynum",
            data: {
                m: "monai_market",
                uid: wx.getStorageSync("uid")
            },
            success: function(e) {
                e.data && e.data.data && 1e3 == e.data.message ? a.util.request({
                    url: "entry/wxapp/Api",
                    data: {
                        m: "monai_market",
                        uid: wx.getStorageSync("uid"),
                        r: "home.weizhang.paynum",
                        orderid: e.data.data.orderid
                    },
                    success: function(a) {
                        wx.showModal({
                            content: a.data.message
                        }), t.setData({
                            weizhang_num: 1 * t.data.weizhang_num + 10
                        });
                    }
                }) : e.data && e.data.data && !e.data.errno && wx.requestPayment({
                    timeStamp: e.data.data.timeStamp,
                    nonceStr: e.data.data.nonceStr,
                    package: e.data.data.package,
                    signType: "MD5",
                    paySign: e.data.data.paySign,
                    success: function(n) {
                        a.util.request({
                            url: "entry/wxapp/Api",
                            data: {
                                m: "monai_market",
                                uid: wx.getStorageSync("uid"),
                                r: "home.weizhang.paynum",
                                orderid: e.data.data.orderid
                            },
                            success: function(a) {
                                t.setData({
                                    weizhang_num: 1 * t.data.weizhang_num + 10
                                }), wx.showModal({
                                    content: a.data.message
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});