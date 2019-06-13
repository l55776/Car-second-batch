var t = getApp(), a = 2;

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        notices: [],
        clicknotice: "",
        dropdown: 1
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
                leftid: "",
                r: "sale.index.getnotice"
            },
            cachetime: "0",
            success: function(t) {
                e.setData({
                    notices: t.data.data
                });
            }
        });
    },
    showindexdesc: function(t) {
        console.log(t.currentTarget.dataset.id), this.setData({
            clicknotice: t.currentTarget.dataset.id
        });
    },
    onReachBottom: function() {
        var e = this, n = e.data.notices;
        2 != e.data.dropdown && (e.data.dropdown = 2, t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                leftid: a,
                r: "sale.salelist.getnotice"
            },
            success: function(t) {
                var i = t.data.data.length;
                if (a++, i > 0) for (var o = 0; o < i; o++) n.push(t.data.data[o]);
                e.setData({
                    notices: n
                });
            },
            complete: function() {
                e.data.dropdown = 1;
            }
        }));
    }
});