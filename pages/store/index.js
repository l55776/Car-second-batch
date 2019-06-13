var a = getApp(), t = 2, e = 2;

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        fans: 0,
        release: 0,
        browse: 0,
        cars: [],
        cars2: [],
        details: [],
        is_cars: !0,
        is_cars2: !0,
        scanReachBottom: !1,
        scanReachBottom2: !1,
        follow_status: !0,
        ensure: [],
        appscene: 0
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        1007 != a.data.appscene && 1008 != a.data.appscene && 1011 != a.data.appscene && 1012 != a.data.appscene && 1013 != a.data.appscene && 1014 != a.data.appscene || this.setData({
            appscene: 1
        });
        s = this;
        if (t.scene) e = t.scene; else var e = t.uid;
        e || (e = a.getuid()), s.setData({
            store_uid: e
        });
        var s = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: a.getuid(),
                thatuid: e,
                r: "sale.index.getstoredetail"
            },
            success: function(a) {
                console.log(a), wx.setNavigationBarTitle({
                    title: a.data.data.detail.nickname
                }), console.log(a.data.data.ensure), s.setData({
                    fans: a.data.data.fans,
                    release: a.data.data.release,
                    browse: a.data.data.browse,
                    details: a.data.data.detail,
                    cars: a.data.data.cars,
                    cars2: a.data.data.cars2,
                    follow_status: a.data.data.iffollow,
                    ensure: a.data.data.ensure
                });
                var t = a.data.data.cars.length;
                console.log(t), t < 1 ? s.setData({
                    is_cars: !1
                }) : t < 4 && s.setData({
                    scanReachBottom: !0
                });
                var e = a.data.data.cars2.length;
                e < 1 ? s.setData({
                    is_cars2: !1
                }) : e < 5 && s.setData({
                    scanReachBottom2: !0
                });
            }
        });
    },
    detile: function(a) {
        console.log(a), wx.navigateTo({
            url: "/pages/home/carMessage/carMessage?id=" + a.currentTarget.dataset.id
        });
    },
    message: function() {
        wx.navigateTo({
            url: "/pages/home/jubao/jubao?car_uid=" + this.data.store_uid + "&form_type=1"
        });
    },
    report: function() {
        wx.navigateTo({
            url: "/pages/home/jubao/jubao?car_uid=" + this.data.store_uid + "&form_type=2"
        });
    },
    makephone: function() {
        this.data.details && this.data.details.phone ? wx.makePhoneCall({
            phoneNumber: this.data.details.phone
        }) : wx.showModal({
            content: "该商家暂未没有留下联系方式",
            showCancel: !1
        });
    },
    follow: function() {
        var t = this;
        a.util.getUserInfo(function(a) {
            a.memberInfo || that.setData({
                isShow: !0
            });
        }), console.log(this.data.store_uid), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.follow",
                uid: a.getuid(),
                type: 1,
                ucar_id: this.data.store_uid
            },
            cachetime: "0",
            success: function(a) {
                t.setData({
                    follow_status: !t.data.follow_status,
                    follow: a.data.data
                });
            }
        });
    },
    storetopcars: function() {
        var e = this, s = e.data.cars;
        e.data.scanReachBottom || a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                leftid: t,
                is_vip: 1,
                r: "sale.index.getstoredetail",
                thatuid: e.data.store_uid
            },
            success: function(a) {
                if ("null" != a.data.data) {
                    var o = a.data.data.length;
                    if (t++, o > 0) {
                        for (var d = 0; d < o; d++) s.push(a.data.data[d]);
                        o < 4 && e.setData({
                            scanReachBottom: !0
                        }), e.setData({
                            cars: s
                        });
                    } else e.setData({
                        scanReachBottom: !0
                    });
                } else e.setData({
                    scanReachBottom: !0
                });
            }
        });
    },
    storecars2: function() {
        var t = this, s = t.data.cars2;
        t.data.scanReachBottom2 || a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                leftid: e,
                is_vip: 2,
                r: "sale.index.getstoredetail",
                thatuid: t.data.store_uid
            },
            success: function(a) {
                if ("null" != a.data.data) {
                    var o = a.data.data.length;
                    if (e++, o > 0) {
                        for (var d = 0; d < o; d++) s.push(a.data.data[d]);
                        o < 5 && t.setData({
                            scanReachBottom2: !0
                        }), t.setData({
                            cars2: s
                        });
                    } else t.setData({
                        scanReachBottom2: !0
                    });
                } else t.setData({
                    scanReachBottom2: !0
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this, s = e.data.cars;
        if (!e.data.scanReachBottom) {
            if (e.data.details.is_member) return !1;
            console.log(e.data.store_uid), a.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "monai_market",
                    leftid: t,
                    r: "sale.index.getstoredetail",
                    thatuid: e.data.store_uid
                },
                success: function(a) {
                    if ("null" != a.data.data) {
                        var o = a.data.data.length;
                        if (t++, o > 0) {
                            for (var d = 0; d < o; d++) s.push(a.data.data[d]);
                            e.setData({
                                cars: s
                            });
                        } else e.setData({
                            scanReachBottom: !0
                        });
                    }
                }
            });
        }
    },
    onShareAppMessage: function() {
        return {
            title: this.data.details.nickname,
            path: "/pages/store/index?uid=" + this.data.store_uid
        };
    },
    shouyewdj_btn: function() {
        console.log(123), wx.switchTab({
            url: "/pages/index/index"
        }), a.data.appscene = 0;
    }
});