var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        focus: !1,
        inputValue: "",
        heatShop: [],
        shop: [],
        res: [],
        heatShops: [],
        keywordArr: [],
        inputVal: ""
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function() {
        var e = this;
        a.siteInfo.uniacid;
        this.setData({
            keywordArr: wx.getStorageSync("keywordArr")
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.index.search_detail"
            },
            cachetime: "0",
            success: function(a) {
                console.log(a), e.setData({
                    shop: a.data.data
                });
            }
        });
    },
    bindKeyInput: function(e) {
        a.siteInfo.uniacid;
        for (var t = [], n = e.detail.value, r = this.data.shop, i = this, o = 0; o < r.length; o++) r[o].unickname.match(n) && t.push(r[o]);
        i.setData({
            res: t,
            inputVal: n
        });
    },
    range: function() {
        var a, e, t = this.data.heatShops, n = t.length;
        if (n) for (;--n; ) a = t[e = Math.floor(Math.random() * (n + 1))], t[e] = t[n], 
        t[n] = a;
        this.setData({
            heatShop: t.slice(0, 7)
        });
    },
    searchPage: function(e) {
        var t = a.getAttr(e, "name");
        wx.navigateTo({
            url: "/pages/home/index/index?name=" + t
        });
    },
    del: function() {
        wx.setStorageSync("keywordArr", []), this.setData({
            keywordArr: []
        });
    },
    formSubmit: function(a) {
        var e = wx.getStorageSync("keywordArr") || [], t = a.detail.value.name;
        if (e.length > 0) for (var n = 0; n < e.length; n++) if (e[n] == t.trim()) {
            e.splice(n, 1);
            break;
        }
        e.unshift(t), e.length >= 10 && e.pop(), wx.setStorageSync("keywordArr", e), this.setData({
            keywordArr: e
        }), wx.navigateTo({
            url: "/pages/home/index/index?name=" + t
        });
    },
    shop_id: function(a) {
        var e = a.detail.value.shopid;
        wx.navigateTo({
            url: "/pages/home/carMessage/carMessage?id=" + e
        });
    },
    cant: function() {
        // this.setData({
        //     res: [],
        //     inputVal: ""
        // });
    },
    click_val: function(a) {
        wx.navigateBack({});
    }
});