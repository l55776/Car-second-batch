var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        page: 1,
        is_last: !1,
        list: []
    },
    onLoad: function(t) {
        var s = this;
        wx.setNavigationBarTitle({
            title: "推广记录"
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.fans",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                a.data.data && s.setData({
                    list: a.data.data
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
        var t = this;
        t.data.is_last || a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.fans",
                uid: wx.getStorageSync("uid"),
                page: t.data.page + 1
            },
            success: function(a) {
                a.data.data || (t.setData({
                    is_last: !0
                }), wx.showToast({
                    title: "没有更多数据了",
                    icon: "success",
                    duration: 2e3
                }));
                for (var s = t.data.list, e = 0; e < a.data.data.length; e++) s.push(a.data.data[e]);
                t.setData({
                    list: s,
                    page: t.data.page + 1
                });
            }
        });
    }
});