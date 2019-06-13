function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, e = Array(t.length); a < t.length; a++) e[a] = t[a];
        return e;
    }
    return Array.from(t);
}

var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        table: {
            1: "待报价",
            2: "待付款",
            3: "待发货",
            4: "待收货",
            5: "已完成"
        },
        activeIndex: 1,
        orderList: [],
        nav_width: "",
        page: 1,
        isLast: !1,
        isLoad: !1
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        var a = t.status, e = Object.keys(this.data.table).length;
        this.setData({
            nav_width: 100 / e,
            activeIndex: a > 0 ? a : 1
        });
    },
    getList: function() {
        var e = this;
        if (e.data.isLast) return !1;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "part.order.order_list",
                uid: a.getuid(),
                page: e.data.page,
                status: e.data.activeIndex
            },
            success: function(a) {
                if (e.data.page > 1) if (a.data.data.length > 0) {
                    var i = e.data.orderList;
                    i.push.apply(i, t(a.data.data)), e.setData({
                        orderList: i
                    });
                } else e.setData({
                    isLast: !0
                }); else e.setData({
                    orderList: a.data.data
                }), a.data.data.length < 1 && e.setData({
                    isLast: !0
                });
                e.setData({
                    page: e.data.page + 1
                });
            }
        });
    },
    ActiveClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.dataset.index,
            page: 1,
            isLast: !1
        }), this.getList();
    },
    onReachBottom: function() {
        this.getList();
    },
    goPay: function(t) {
        var e = a.getAttr(t, "id");
        wx.navigateTo({
            url: "/pages/part/pay/index?id=" + e
        });
    },
    onShow: function() {
        this.setData({
            page: 1,
            isLast: !1
        }), this.getList();
    },
    confirmOrder: function(t) {
        var e = this, i = a.getAttr(t, "id");
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "part.order.confirm_order",
                uid: a.getuid(),
                id: i
            },
            success: function(t) {
                e.setData({
                    activeIndex: 5,
                    page: 1,
                    isLast: !1
                }), e.getList();
            }
        });
    }
});