var t = getApp(), a = 2;

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        carslist: []
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: t.getuid(),
                leftid: "",
                r: "sale.salelist.getcollection"
            },
            success: function(t) {
                e.setData({
                    carslist: t.data.data
                });
            }
        });
    },
    delcollection: function(a) {
        var e = this;
        console.log(a.currentTarget.dataset.id), t.util.getUserInfo(function(t) {
            t.memberInfo || that.setData({
                isShow: !0
            });
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.follow",
                uid: t.getuid(),
                type: 2,
                ucar_id: a.currentTarget.dataset.id
            },
            cachetime: "0",
            success: function(t) {
                var s = e.data.carslist;
                s.splice(a.currentTarget.dataset.index, 1), e.setData({
                    carslist: s
                });
            }
        });
    },
    retocards: function(t) {
        console.log(t.currentTarget.dataset.id), wx.navigateTo({
            url: "/pages/home/carMessage/carMessage?id=" + t.currentTarget.dataset.id
        });
    },
    onReachBottom: function() {
        var e = this, s = e.data.carslist;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: t.getuid(),
                leftid: a,
                r: "sale.salelist.getcollection"
            },
            success: function(t) {
                var i = t.data.data.length;
                if (a++, i > 0) for (var r = 0; r < i; r++) s.push(t.data.data[r]);
                e.setData({
                    carslist: s
                });
            }
        });
    }
});