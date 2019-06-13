var e = getApp();

e.util.url("entry/wxapp/Api", {
    m: "monai_sharing",
    uid: wx.getStorageSync("uid"),
    r: "Upimg"
});

Page({
    data: {
        headerdata:{top:e.globalData.statusBarHeight},
        upcarindex: 0,
        date: 0,
        carsimgs: [ {
            img: "",
            intro: "",
            imgshort: ""
        } ],
        brandid: "",
        brandname: "",
        classid: "",
        classes: [],
        brands: [],
        selectclass: "请选择分类",
        selectbrand: "请选择品牌",
        selecttime: " 请选择上牌日期",
        selecttime1: "",
        vehicletime: "请选择上牌日期",
        vehicletime1: "",
        insurance: "请选择保险到期时间",
        insurance1: "",
        gearboxes: [ {
            name: "手自一体",
            id: "0"
        }, {
            name: "手动档",
            id: "1"
        }, {
            name: "自动挡",
            id: "2"
        } ],
        gearboxname: "请选择变速箱类型",
        gearboxindex: 0,
        userphone: "",
        mapname: "",
        mapx: "",
        mapy: "",
        carimgs: [],
        buttscan: !1,
        notice: [],
        noticeindex: 0,
        textareatype: !1,
        textareaname: "请输入车辆信息介绍",
        textareainput: "",
        isShow: !1,
        showtextarea: !1,
        status: "",
        choose_index: 1,
        choose_active: 0,
        top: "0"
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    intextarea: function() {
        this.setData({
            textareatype: !0,
            textareaname: this.data.textareainput
        });
    },
    viewTouchMove: function(e) {
        e.touches[0].clientY < 0 || e.touches[0].clientY > 450 || this.setData({
            top: e.touches[0].clientY - 30
        });
    },
    bindblur: function(e) {
        console.log(e.detail.value);
        var t = e.detail.value, a = t;
        t || (t = "请输入车辆信息介绍", a = ""), this.setData({
            textareatype: !1,
            textareaname: t,
            textareainput: a
        });
    },
    bindconfirm: function() {
        var e = new Date();
        console.log(e.getMilliseconds());
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(t) {
        var a = this;
        e.util.getUserInfo(function(e) {
            wx.setStorageSync("uid", e.memberInfo.uid), a.hideDialog();
        }, t.detail);
    },
    showtextarea: function() {
        var e = this;
        console.log(!e.data.showtextarea), e.setData({
            showtextarea: !e.data.showtextarea
        });
    },
    textareashow: function(e) {
        this.setData({
            mapname: e.detail.value
        });
    },
    onShow: function() {
        var e = this;
        console.log(wx.getStorageSync("userInfo")), "" != e.data.brandid && "" != e.data.brandname && e.setData({
            selectbrand: e.data.brandname
        });
    },
    firstin: function(t) {
        var a = wx.getSystemInfoSync();
        t.setData({
            maxwidth: a.windowWidth,
            maxheight: a.windowHeight
        }), e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: e.getuid(),
                r: "sale.index.saleindex"
            },
            cachetime: "0",
            success: function(e) {
                var a = {
                    classes: e.data.data.class,
                    userphone: "",
                    mapname: ""
                };
                e.data.data.user && (a.userphone = e.data.data.user.phone, a.mapname = e.data.data.user.address), 
                t.setData(a);
            }
        });
    },
    onLoad: function(t) {
        var a = this;
        e.util.getUserInfo(function(t) {
            t.memberInfo || a.setData({
                isShow: !0
            }), e.util.request({
                url: "entry/wxapp/Api",
                data: {
                    m: "monai_market",
                    r: "me.info",
                    uid: wx.getStorageSync("uid")
                },
                success: function(e) {
                    console.log(e), 1 == e.data.data.status && wx.showModal({
                        title: "提示",
                        content: "您的用户已经禁止发布车辆信息，请联系管理员处理",
                        showCancel: !1,
                        success: function(e) {}
                    }), a.setData({
                        status: e.data.data.status
                    });
                }
            });
        }), a.firstin(a);
    },
    selectclass: function(e) {
        var t = this, a = t.data.classes[e.detail.value];
        a && t.setData({
            selectclass: a.name,
            classid: a.id
        });
    },
    gearbox: function(e) {
        var t = this, a = t.data.gearboxes[e.detail.value];
        a && t.setData({
            gearboxname: a.name,
            gearboxindex: e.detail.value
        });
    },
    selectbrand: function(e) {
        wx.navigateTo({
            url: "/pages/selectscards/index"
        });
    },
    bindDateChange: function(e) {
        console.log(e.detail.value);
        var t = e.detail.value.split("-");
        this.setData({
            selecttime: t[0] + "年" + t[1] + "月",
            selecttime1: e.detail.value
        });
    },
    salefast: function(e) {
        wx.navigateTo({
            url: "/pages/sale_fast/index"
        });
    },
    getPhoneNumber: function(t) {
        console.log(t);
        var a = this;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                r: "sale.index.userphone",
                m: "monai_market",
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData
            },
            cachetime: "0",
            success: function(e) {
                a.setData({
                    userphone: e.data.data
                });
            }
        });
    },
    tomap: function() {
        var e = this;
        wx.chooseLocation({
            success: function(t) {
                e.setData({
                    mapx: t.latitude,
                    mapy: t.longitude,
                    mapname: t.address + t.name
                });
            },
            fail: function() {
                wx.getSetting({
                    success: function(e) {
                        e.authSetting["scope.userLocation"] || wx.showModal({
                            content: "请允许获取地理位置后再次尝试",
                            success: function(e) {
                                e.confirm ? wx.openSetting({
                                    success: function(e) {
                                        e.authSetting = {
                                            "scope.userInfo": !0,
                                            "scope.userLocation": !0
                                        };
                                    },
                                    fail: function(e) {
                                        console.log(e);
                                    }
                                }) : e.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                });
            }
        });
    },
    release: function(t) {
        var a = this, i = wx.getStorageSync("uid");
        if (i) {
            a.setData({
                buttscan: !0
            });
            var s = a.data.classid;
            if ("" == s || "undefined" == s || "请选择车辆类型" == s) return e.util.message({
                title: "请选择车辆类型",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var n = a.data.brandid;
            if ("" == n || "undefined" == n || "请选择车辆品牌" == n) return e.util.message({
                title: "请选择车辆品牌",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var r = a.data.selecttime;
            if ("请选择出厂年份" == r || "undefined" == r || "" == a.data.selecttime1) return e.util.message({
                title: "请选择出厂年份",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var u = t.detail.value.carname;
            if ("" == u || "undefined" == u) return e.util.message({
                title: "请填写汽车名称",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var d = t.detail.value.kilometre;
            if ("" == d || "undefined" == d) return e.util.message({
                title: "请填写公里数",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var c = t.detail.value.price;
            if ("" == c || "undefined" == c) return e.util.message({
                title: "请填写价格",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var o = t.detail.value.exhaust;
            if ("" == o || "undefined" == o) return e.util.message({
                title: "请填写排气量",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var l = a.data.gearboxindex;
            if ("" == l || "undefined" == l) return e.util.message({
                title: "请选择变速箱类型",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var m = t.detail.value.phone;
            if ("" == m || "undefined" == m) return e.util.message({
                title: "请填写联系电话，或点击电话授权",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var g = t.detail.value.address;
            if ("" == g || "undefined" == g) return e.util.message({
                title: "请填写车辆地址",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var p = a.data.carsimgs;
            if (p.length < 3) return e.util.message({
                title: "请至少添加3个车辆图文",
                type: "error"
            }), void a.setData({
                buttscan: !1
            });
            var h = {
                r: "sale.index.insale",
                m: "monai_market",
                fomid: t.detail.formId,
                uid: i,
                classid: s,
                brand: n,
                exhaust: o,
                times: r,
                times1: a.data.selecttime1,
                kilometre: d,
                price: c,
                gearboxindex: l,
                phone: m,
                carname: u,
                address: g,
                carimgs: p,
                mapx: a.data.mapx,
                mapy: a.data.mapy
            };
            e.util.request({
                url: "entry/wxapp/Api",
                data: h,
                cachetime: "0",
                success: function(e) {
                    e && e.data && 405 == e.data.message ? a.setData({
                        isShow: !0,
                        buttscan: !1
                    }) : e && e.data && e.data.data && wx.showModal({
                        content: "提交成功，快去上架吧",
                        cancelText: "继续添加",
                        confirmText: "去上架",
                        success: function(e) {
                            e.confirm ? (a.cleardetail(), wx.navigateTo({
                                url: "/pages/salelist/index"
                            })) : e.cancel && (a.setData({
                                buttscan: !1
                            }), wx.reLaunch({
                                url: "/pages/sale/index"
                            }));
                        }
                    });
                },
                fail: function(e) {
                    a.setData({
                        buttscan: !1
                    });
                }
            });
        } else a.setData({
            isShow: !0
        });
    },
    cleardetail: function() {
        this.setData({
            selectclass: "请选择分类",
            selectbrand: "请选择品牌",
            selecttime: " 请选择出厂年份",
            selecttime1: "",
            vehicletime: "请选择上牌日期",
            vehicletime1: "",
            insurance: "请选择保险到期时间",
            insurance1: "",
            gearboxname: "请选择变速箱类型",
            gearboxindex: 0,
            mapx: "",
            mapy: "",
            carimgs: [],
            textareaname: "请输入车辆信息介绍",
            textareainput: "",
            carsimgs: [ {
                img: "",
                intro: "",
                imgshort: ""
            } ],
            brandid: "",
            brandname: "",
            classid: "",
            defult_value: ""
        });
    },
    upnotice: function(e) {
        this.data.noticeindex = e.detail.current;
    },
    retonotice: function() {
        var e = this.data.notice[this.data.noticeindex];
        e && e.id && wx.navigateTo({
            url: "/pages/index/index?id=" + e.id
        });
    },
    delcarsimgs: function(t) {
        var a = this, i = t.currentTarget.dataset.index, s = a.data.carsimgs;
        if (0 == i && s.length > 1 && ("" != s[i].img || "" != s[i].intro)) return "" != s[i].img && e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: e.getuid(),
                imgurl: s[i].img,
                r: "Upimg.delImg"
            }
        }), s.splice(i, 1), void a.setData({
            carsimgs: s
        });
        0 != i && ("" != s[i].img && e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: e.getuid(),
                imgurl: s[i].img,
                r: "Upimg.delImg"
            }
        }), s.splice(i, 1), a.setData({
            carsimgs: s
        }));
    },
    upcarsimgs: function(t) {
        var a = this, i = t.currentTarget.dataset.index, s = a.data.carsimgs;
        "" != s[i].img && e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: e.getuid(),
                imgurl: s[i].img,
                r: "Upimg.delImg"
            }
        }), s.length >= 9 ? e.util.message({
            title: "您添加的图文已经很多了",
            type: "error"
        }) : (a.data.upcarindex = i, e.upimgs({
            scannums: 1,
            filename: "cars",
            success: function(e) {
                a.addinimgs(e[0]);
            }
        }));
    },
    addinimgs: function(e) {
        var t = this, a = t.data.carsimgs, i = t.data.upcarindex;
        a[i].img = e.all, a[i].imgshort = e.short, t.setData({
            carsimgs: a
        });
    },
    showimgs: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = t.data.carsimgs;
        wx.previewImage({
            current: i[a].img,
            urls: [ i[a].img ]
        });
    },
    upthiscarsimgs: function(t) {
        var a = this, i = t.currentTarget.dataset.index, s = a.data.carsimgs;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: e.getuid(),
                imgurl: s[i].img,
                r: "Upimg.delImg"
            }
        }), s[i].img = "", a.setData({
            carsimgs: s
        });
    },
    setthisintro: function(e) {
        var t = this, a = e.currentTarget.dataset.index;
        t.data.carsimgs[a].intro = e.detail.value;
    },
    addcarsimgs: function() {
        var e = {
            img: "",
            intro: "",
            imgshort: ""
        }, t = this.data.carsimgs;
        t.push(e), this.setData({
            carsimgs: t
        });
    },
    upimg: function() {
        var t = this, a = t.data.carimgs;
        if (a.length >= 9) e.util.message({
            title: "您上传的图片已经很多了",
            type: "error"
        }); else {
            a.length;
            e.upimgs({
                scannums: 1,
                filename: "cars",
                success: function(e) {
                    var i = a.concat(e);
                    t.setData({
                        carimgs: i
                    });
                }
            });
        }
    },
    delimg: function(t) {
        console.log(t.currentTarget.dataset.index);
        var a = this, i = t.currentTarget.dataset.index, s = a.data.carimgs, n = s[i].all;
        e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: e.getuid(),
                imgurl: n,
                r: "Upimg.delImg"
            }
        }), s.splice(i, 1), a.setData({
            carimgs: s
        });
    }
});