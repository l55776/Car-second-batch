var t = getApp();

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        page: 1,
        is_last: !1,
        list: []
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(a) {
        var e = this;
        wx.setNavigationBarTitle({
            title: 1 == a.type ? "我的粉丝" : "我的关注"
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.fans",
                uid: wx.getStorageSync("uid"),
                type: a.type
            },
            success: function(t) {
                t.data.data && e.setData({
                    list: t.data.data,
                    type: a.type
                });
            }
        });
    },
    follow: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.follow",
                uid: wx.getStorageSync("uid"),
                type: 1,
                ucar_id: a.currentTarget.dataset.id
            },
            success: function(t) {
                var s = e.data.list;
                s[a.currentTarget.dataset.index].is_follow = t.data.data, e.setData({
                    list: s
                });
            }
        });
    },
    onReachBottom: function() {
        var a = this;
        a.data.is_last || (console.log(a.data.is_last), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.fans",
                uid: wx.getStorageSync("uid"),
                page: a.data.page + 1,
                type: a.data.type
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
        }));
    }
});