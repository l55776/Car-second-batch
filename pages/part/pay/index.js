var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        order_id: 0,
        order_line: [],
        tel: "",
        name: "",
        address: ""
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        var e = this, d = t.id;
        e.setData({
            order_id: d
        }), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "part.order.pay_set",
                uid: a.getuid(),
                id: d
            },
            success: function(a) {
                e.setData({
                    order_line: a.data.data.order
                }), a.data.data.address ? e.setData({
                    tel: a.data.data.address.tel,
                    name: a.data.data.address.name,
                    address: a.data.data.address.address
                }) : e._setAddress();
            }
        });
    },
    _setAddress: function() {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var d = e.telNumber, s = e.userName, r = e.provinceName + " " + e.cityName + " " + e.countyName + " " + e.detailInfo;
                t.setData({
                    tel: d,
                    name: s,
                    address: r
                }), a.util.request({
                    url: "entry/wxapp/Api",
                    data: {
                        m: "monai_market",
                        r: "part.order.address_save",
                        uid: a.getuid(),
                        name: s,
                        tel: d,
                        address: r
                    },
                    success: function(a) {}
                });
            },
            fail: function(a) {
                wx.showModal({
                    content: "收货地址必选",
                    showCancel: !1,
                    success: function(a) {
                        wx.openSetting({
                            success: function() {
                                t._setAddress();
                            }
                        });
                    }
                });
            }
        });
    },
    addressSave: function() {
        this._setAddress();
    },
    pay: function(t) {
        var e = this, d = t.detail.formId;
        if (!e.data.name || !e.data.tel || !e.data.address) return wx.showModal({
            content: "请填写收货地址",
            showCancel: !1,
            success: function(a) {
                this._setAddress();
            }
        }), !1;
        a.util.request({
            url: "entry/wxapp/payPartOrder",
            data: {
                m: "monai_market",
                id: this.data.order_id,
                uid: a.getuid(),
                formid: d
            },
            success: function(t) {
                if ("OK" == t.data.message && wx.redirectTo({
                    url: "/pages/part/order/index?status=3"
                }), t.data.data) {
                    var d = t.data.data.fid;
                    t.data.data.money;
                    wx.requestPayment({
                        timeStamp: t.data.data.timeStamp,
                        nonceStr: t.data.data.nonceStr,
                        package: t.data.data.package,
                        signType: "MD5",
                        paySign: t.data.data.paySign,
                        success: function(t) {
                            console.log(t), a.util.request({
                                url: "entry/wxapp/Api",
                                data: {
                                    m: "monai_market",
                                    r: "part.order.pay_callback",
                                    uid: a.getuid(),
                                    oid: e.data.order_id,
                                    fid: d
                                },
                                success: function(a) {
                                    console.log(a);
                                }
                            }), wx.redirectTo({
                                url: "/pages/part/order/index?status=3"
                            });
                        },
                        fail: function(a) {
                            wx.redirectTo({
                                url: "/pages/part/order/index?status=2"
                            });
                        }
                    });
                }
            },
            fail: function(a) {
                wx.showModal({
                    content: "支付失败",
                    showCancel: !1,
                    success: function(a) {}
                });
            }
        });
    }
});