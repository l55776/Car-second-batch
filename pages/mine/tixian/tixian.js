var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        detail: ""
    },
    onLoad: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getBalance",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                a.data.data && e.setData({
                    detail: a.data.data
                });
            }
        });
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    gosubmit: function(t) {
        var e = this;
        t.detail.value.withdraw || a.util.message({
            title: "金额不能为空"
        }), t.detail.value.withdraw > e.data.detail.balance && a.util.message({
            title: "不能大于余额"
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.addWithdraw",
                uid: wx.getStorageSync("uid"),
                balance: t.detail.value.withdraw
            },
            success: function(i) {
                1 == i.data.data && (a.util.message({
                    title: "申请成功"
                }), e.setData({
                    detail: {
                        balance: e.data.detail.balance - t.detail.value.withdraw
                    }
                }));
            }
        });
    }
});