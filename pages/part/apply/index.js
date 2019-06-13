var t = getApp();

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        buttscan: !1,
        isShow: !1,
        carTypeId: 0,
        carTypeName: "请选择车型",
        carTypeList: [],
        partTypeId: 0,
        partTypeName: "请选择配件类型",
        partTypeList: [ {
            id: 1,
            name: "原厂全新"
        }, {
            id: 2,
            name: "副厂全新"
        }, {
            id: 3,
            name: "原车拆件"
        } ],
        tel: "",
        partImg: "",
        imgPath: ""
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(a) {
        var e = this;
        console.log(e.data.partTypeList), t.util.getUserInfo(function(t) {
            t.memberInfo || e.setData({
                isShow: !0
            });
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "part.index.get_car_type"
            },
            success: function(t) {
                e.setData({
                    carTypeList: t.data.data
                });
            }
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(a) {
        var e = this;
        t.util.getUserInfo(function(t) {
            wx.setStorageSync("uid", t.memberInfo.uid), e.hideDialog();
        }, a.detail);
    },
    selectCarType: function(t) {
        console.log(t), console.log(t.detail.value);
        var a = this.data.carTypeList[t.detail.value];
        a && this.setData({
            carTypeId: a.id,
            carTypeName: a.name
        });
    },
    selectPartType: function(t) {
        var a = this.data.partTypeList[t.detail.value];
        a && this.setData({
            partTypeId: a.id,
            partTypeName: a.name
        });
    },
    getPhoneNumber: function(a) {
        console.log(a);
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                r: "part.index.get_tel",
                m: "monai_market",
                iv: a.detail.iv,
                encryptedData: a.detail.encryptedData
            },
            success: function(t) {
                e.setData({
                    tel: t.data.data
                });
            }
        });
    },
    release: function(a) {
        var e = this;
        if (e.data.buttscan) return !1;
        e.setData({
            buttscan: !0
        });
        var r = e.data.imgPath;
        if (!r) return t.util.message({
            title: "请上传配件图片",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var i = a.detail.value.part_name;
        if (!i) return t.util.message({
            title: "请输入配件名称",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var s = e.data.carTypeId;
        if (s <= 0) return t.util.message({
            title: "请选择车型",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var n = a.detail.value.car_year;
        if (!n) return t.util.message({
            title: "请输入年份",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var u = e.data.partTypeId;
        if (u <= 0) return t.util.message({
            title: "请选择配件类型",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var p = a.detail.value.user_tel;
        if (!n) return t.util.message({
            title: "请输入手机号码",
            type: "error"
        }), e.setData({
            buttscan: !1
        }), !1;
        var c = {
            r: "part.index.order_add",
            m: "monai_market",
            uid: t.getuid(),
            part_img: r,
            part_name: i,
            car_type: s,
            car_year: n,
            part_type: u,
            user_tel: p
        };
        t.util.request({
            url: "entry/wxapp/Api",
            data: c,
            success: function(t) {
                wx.showModal({
                    content: "提交成功",
                    showCancel: !1,
                    success: function(t) {
                        e.setData({
                            buttscan: !1
                        }), wx.navigateBack();
                    }
                });
            },
            fail: function(t) {
                e.setData({
                    buttscan: !1
                });
            }
        });
    },
    upcarsimgs: function() {
        var a = this;
        t.upimgs({
            scannums: 1,
            filename: "parts",
            success: function(t) {
                console.log(t), a.setData({
                    partImg: t[0].all,
                    imgPath: t[0].short
                });
            }
        });
    },
    showimg: function(t) {
        wx.previewImage({
            current: this.data.partImg,
            urls: [ this.data.partImg ]
        });
    },
    delImg: function(a) {
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                uid: t.getuid(),
                imgurl: this.data.partImg,
                r: "Upimg.delImg"
            }
        }), this.setData({
            partImg: "",
            imgPath: ""
        });
    }
});