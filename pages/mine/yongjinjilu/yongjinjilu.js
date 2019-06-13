var t = getApp();

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        page: 1,
        is_last: !1,
        list: [],
        detail: {}
    },
    onLoad: function(a) {
        var e = this;
        wx.setNavigationBarTitle({
            title: "佣金记录"
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getAccount",
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                t.data.data && e.setData({
                    list: t.data.data
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getAccountTotal",
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                t.data.data && e.setData({
                    detail: t.data.data
                });
            }
        });
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onReachBottom: function() {
        var a = this;
        a.data.is_last || t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getAccount",
                uid: wx.getStorageSync("uid"),
                page: a.data.page + 1
            },
            success: function(t) {
                t.data.data || (a.setData({
                    is_last: !0
                }), wx.showToast({
                    title: "没有更多数据了",
                    icon: "success",
                    duration: 2e3
                }));
                for (var e = a.data.list, s = 0; s < t.data.data.length; s++) e.push(t.data.data[s]);
                a.setData({
                    list: e,
                    page: a.data.page + 1
                });
            }
        });
    }
});