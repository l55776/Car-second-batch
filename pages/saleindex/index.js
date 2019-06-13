var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        block: 0,
        saleinfo: [],
        unitid: 123
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(n) {
        var t = this;
        console.log(123), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "sale.index.salenew"
            },
            cachetime: "0",
            success: function(a) {
                console.log(a), t.setData({
                    saleinfo: a.data.data
                }), 2 == a.data.data.sell_flow && "" != a.data.data.flow_id && t.setData({
                    unitid: a.data.data.flow_id
                }), wx.setNavigationBarTitle({
                    title: a.data.data.name
                });
            }
        });
    },
    saletap: function() {
        wx.navigateTo({
            url: "../sale/index"
        });
    },
    gujia: function() {
        wx.navigateTo({
            url: "../gujia/index"
        });
    },
    none_click: function() {
        this.setData({
            block: 0
        });
    },
    block_click: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.saleinfo.phone
        });
    },
    search: function() {
        wx.navigateTo({
            url: "../home/searchShop/searchShop"
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});