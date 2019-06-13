var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        cvtype: !1,
        headimg: "",
        headtemp: "",
        carsimg: "",
        carstemp: "",
        qrcodeimg: "",
        qrcodetemp: "",
        nickname: "",
        propaganda1: "",
        propaganda11: "平台交易车",
        propaganda2: "",
        qrstr: "识别上方二维码，进入小程序查看车辆详情",
        makeinnum: 1,
        enddelimg: [],
        loaddata: "",
        isShow: !1,
        carid: "",
        tupianjiazai: 0
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(t) {
        var i = this;
        a.util.getUserInfo(function(a) {
            wx.setStorageSync("uid", a.memberInfo.uid), i.hideDialog(), i.reload();
        }, t.detail);
    },
    onLoad: function(t) {
        var i = this;
        i.setData({
            carid: t.carid
        }), a.util.getUserInfo(function(a) {
            a.memberInfo ? i.reload() : i.setData({
                isShow: !0
            });
        });
    },
    onShow: function() {},
    reload: function() {
        var t = this, i = t.data.carid;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                carid: i,
                uid: wx.getStorageSync("uid"),
                r: "sale.index.getcarimg111"
            },
            cachetime: "0",
            success: function(a) {
                "" != a.data.data.carimg ? wx.downloadFile({
                    url: t.backimg(a.data.data.carimg),
                    success: function(a) {
                        console.log(a), t.data.carstemp = a.tempFilePath, t.setData({
                            tupianjiazai: t.data.tupianjiazai + 1
                        }), console.log(t.data.tupianjiazai);
                    },
                    fail: function() {
                        t.data.carstemp = "/pages/image/store_bg.png", t.setData({
                            tupianjiazai: t.data.tupianjiazai + 1
                        }), console.log(t.data.tupianjiazai);
                    }
                }) : t.data.carstemp = "/pages/image/store_bg.png", wx.downloadFile({
                    url: t.backimg(a.data.data.qrcode),
                    success: function(a) {
                        console.log(a), t.setData({
                            tupianjiazai: t.data.tupianjiazai + 1
                        }), console.log(t.data.tupianjiazai), t.data.qrcodetemp = a.tempFilePath;
                    },
                    fail: function() {
                        t.setData({
                            tupianjiazai: t.data.tupianjiazai + 1
                        }), console.log(t.data.tupianjiazai), t.data.qrcodetemp = a.data.data.qrcode;
                    }
                }), console.log(a.data.data.info), t.setData({
                    propaganda1: a.data.data.info.one,
                    propaganda2: a.data.data.info.two,
                    headimg: a.data.data.headimg,
                    carsimg: a.data.data.carimg ? a.data.data.carimg : "/pages/image/store_bg.png",
                    qrcodeimg: a.data.data.qrcode
                });
            },
            fail: function(a) {
                wx.showModal({
                    content: a.data.message,
                    success: function() {
                        5e3 == a.data.error && t.setData({
                            isShow: !0
                        }), wx.navigateBack({});
                    }
                });
            }
        });
    },
    backimg: function(t) {
        return a.util.url("entry/wxapp/Api", {
            m: "monai_market",
            img: t,
            r: "sale.index.getthecarimg"
        });
    },
    makeinimg: function() {
        wx.showLoading({
            title: "正在保存图片..."
        });
        var a = this;
        a.data.makeinnum > 1 || (a.data.makeinnum = 2, wx.canvasToTempFilePath({
            canvasId: "show",
            success: function(t) {
                wx.saveImageToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function() {
                        a.data.makeinnum = 1, console.log("成功");
                    },
                    fail: function() {
                        a.data.makeinnum = 1, console.log("shibai ");
                    }
                });
            }
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3));
    },
    makeimg: function(a) {
        var t = this, i = wx.createCanvasContext("show", t);
        wx.canvasPutImageData({
            canvasId: "show",
            x: 0,
            y: 0,
            width: 375,
            height: 560,
            success: function(a) {}
        }), i.setFillStyle("#DDDDDD"), i.fillRect(0, 0, 375, 560), i.rect(15, 15, 340, 530), 
        i.setFillStyle("#FFFFFF"), i.fill();
        var e = t.data.carstemp;
        i.drawImage(e, 15, 15, 340, 240);
        var n = t.data.qrcodetemp;
        i.drawImage(n, 110, 310, 150, 150), i.font = "normal bold 14px Microsoft YaHei", 
        i.setFillStyle("#000000"), i.setTextAlign("center"), i.fillText(t.data.propaganda1, 185, 280), 
        i.font = "normal normal 14px Microsoft YaHei", i.fillText(t.data.propaganda2, 185, 310), 
        i.font = "normal normal 13px Microsoft YaHei", i.setFillStyle("#666666"), i.fillText(t.data.qrstr, 185, 510), 
        i.save(), i.beginPath(), i.arc(15, 254, 12, 0, 2 * Math.PI), i.setFillStyle("#DDDDDD"), 
        i.fill(), i.clip(), i.restore(), i.save(), i.beginPath(), i.arc(355, 254, 12, 0, 2 * Math.PI), 
        i.setFillStyle("#DDDDDD"), i.fill(), i.clip(), i.restore(), t.setData({
            cvtype: !0
        }), wx.drawCanvas({
            canvasId: "show",
            actions: i.getActions()
        });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});