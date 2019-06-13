var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight}
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getVip"
            },
            success: function(a) {
                e.setData({
                    detail: a.data.data
                });
            }
        });
    },
    gopay: function(t) {
        a.util.request({
            url: "entry/wxapp/Payvip",
            data: {
                m: "monai_market",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                1 != a.data.data ? a.data && a.data.data && !a.data.errno && wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(a) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1,
                            success: function(a) {
                                // a.confirm && wx.reLaunch({
                                //     url: "/pages/mine/index"
                                // });
                                a.confirm && wx.navigateTo({
                                    url: '/pages/vipresult/index',
                                })
                            }
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "支付失败",
                            icon: "none",
                            duration: 2e3
                        });
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "支付成功",
                    showCancel: !1,
                    success: function(a) {
                        a.confirm && wx.reLaunch({
                            url: "/pages/mine/index"
                        });
                    }
                });
            }
        });
    }
});