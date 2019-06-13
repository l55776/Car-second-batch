var a = getApp();

Page({
    data: {
        carid: 0,
        info: [],
        weizhang: []
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        var e = this;
        e.setData({
            carid: t.id
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                carid: e.data.carid,
                r: "home.weizhang.select_car",
                uid: wx.getStorageSync("uid")
            },
            success: function(t) {
                e.setData({
                    info: t.data.data.car
                }), 200 != t.data.data.weizhang.resultcode ? a.util.message({
                    title: t.data.data.weizhang.reason,
                    type: "error"
                }) : e.setData({
                    weizhang: t.data.data.weizhang.result.lists
                }), console.log(e.data.weizhang);
            }
        });
    },
    onReachBottom: function() {}
});