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
        propaganda1: "我正在使用“小程序”",
        propaganda11: "平台交易车",
        propaganda2: "快来看看我要买卖的车辆吧!",
        qrstr: "扫描上方二维码,进入我的店铺!",
        makeinnum: 1,
        enddelimg: [],
        loaddata: "",
        isShow: !1
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
        var e = this;
        a.util.getUserInfo(function(a) {
            wx.setStorageSync("uid", a.memberInfo.uid), e.hideDialog(), e.reload();
        }, t.detail);
    },
    onLoad: function(t) {
        var e = this;
        a.util.getUserInfo(function(a) {
            a.memberInfo ? e.reload() : e.setData({
                isShow: !0
            });
        });
    },
    onShow: function() {},
    reload: function() {
        var t = this, e = t.data.loaddata;
        a.util.request({
            url: "entry/wxapp/Api", 
            data: {
                m: "monai_market",
                carid: e.id,
                uid: wx.getStorageSync("uid"),
                // r: "sale.index.getcarimgindex"
                r: "sale.index.getcarimg",
            },
            cachetime: "0",
            success: function(a) {
                "" != a.data.data.carimg ? wx.downloadFile({
                    url: t.backimg(a.data.data.carimg),
                    success: function(a) {
                        console.log(a), t.data.carstemp = a.tempFilePath;
                    },
                    fail: function() {
                        t.data.carstemp = "/pages/image/store_bg.png";
                    }
                }) : t.data.carstemp = "/pages/image/store_bg.png", wx.downloadFile({
                    url: t.backimg(a.data.data.qrcode),
                    success: function(a) {
                        console.log(a), t.data.qrcodetemp = a.tempFilePath;
                    },
                    fail: function() {
                        t.data.qrcodetemp = a.data.data.qrcode;
                    }
                }), t.setData({
                    propaganda1: "我正在使用“" + a.data.data.info.name,
                    propaganda11: "小程序”平台交易车",
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
        var t = this, e = wx.createCanvasContext("show", t);
        wx.canvasPutImageData({
            canvasId: "show",
            x: 0,
            y: 0,
            width: 375,
            height: 530,
            success: function(a) {}
        }), e.setFillStyle("#DDDDDD"), e.fillRect(0, 0, 370, 530), e.rect(15, 25, 340, 490), 
        e.setFillStyle("#FFFFFF"), e.fill();
        var i = t.data.carstemp;
        e.drawImage(i, 15, 25, 340, 200);
        var n = t.data.qrcodetemp;
        e.drawImage(n, 110, 270, 150, 150), e.font = "normal normal 13px SimHei", e.setFillStyle("#666666"), 
        e.setTextAlign("center"), e.fillText(t.data.qrstr, 185, 450), e.save(), e.beginPath(), 
        e.arc(15, 224, 12, 0, 2 * Math.PI), e.setFillStyle("#DDDDDD"), e.fill(), e.clip(), 
        e.restore(), e.save(), e.beginPath(), e.arc(355, 224, 12, 0, 2 * Math.PI), e.setFillStyle("#DDDDDD"), 
        e.fill(), e.clip(), e.restore(), t.setData({
            cvtype: !0
        }), wx.drawCanvas({
            canvasId: "show",
            actions: e.getActions()
        });
    },
    makeimg1(event) {
        var t = this, e = wx.createCanvasContext("show", t);
        wx.canvasPutImageData({
            canvasId: "show",
            x: 0,
            y: 0,
            width: 375,
            height: 530,
            success: function (a) { }
        }), e.setFillStyle("#DDDDDD"), e.fillRect(0, 0, 370, 530), e.rect(15, 25, 340, 490),
            e.setFillStyle("#FFFFFF"), e.fill();
        var i = t.data.carstemp;
        e.drawImage(i, 15, 25, 340, 490);
        var n = t.data.qrcodetemp;
        e.drawImage(n, 110, 160, 150, 150), e.save(), e.beginPath(),
            e.arc(15, 224, 12, 0, 2 * Math.PI), e.setFillStyle("#DDDDDD"), e.fill(), e.clip(),
            e.restore(), e.save(), e.beginPath(), e.arc(355, 224, 12, 0, 2 * Math.PI), e.setFillStyle("#DDDDDD"),
            e.fill(), e.clip(), e.restore(), t.setData({
                cvtype: !0
            }), wx.drawCanvas({
                canvasId: "show",
                actions: e.getActions()
            });
    },
    onReady: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});