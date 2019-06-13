var a = getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight},
        phone: "",
        address: "",
        temp: "",
        store_img: "",
        head_image: "",
        qr_code:"",
        qr_img:""
    },
    onLoad: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.info",
                uid: wx.getStorageSync("uid")
            },
            success: function(a) {
                t.setData({
                    detail: a.data.data,
                    phone: a.data.data.phone,
                    address: a.data.data.address,
                    temp: a.data.data.store_img,
                    head_image: a.data.data.head_image,
                    store_img: a.data.data.store_img
                });
            }
        });
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    getPhoneNumber: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                r: "sale.index.userphone",
                m: "monai_market",
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData
            },
            cachetime: "0",
            success: function(a) {
                t.setData({
                    phone: a.data.data
                });
            }
        });
    },
    checkPhone: function(a) {
        var e = a.detail.value;
        if (!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(e)) return wx.showToast({
            title: "手机号有误！",
            icon: "none",
            duration: 1500
        }), !1;
    },
    tomap: function() {
        var a = this;
        wx.chooseLocation({
            success: function(e) {
                a.setData({
                    address: e.address
                });
            }
        });
    },
    addimg: function(e) {
        var t = this;
        a.upimgs({
            scannums: 1,
            filename: "cars",
            success: function(a) {
                t.setData({
                    temp: a[0].all,
                    store_img: a[0].short
                });
            }
        });
    },
    addlogo: function(e) {
        var t = this;
        a.upimgs({
            scannums: 1,
            filename: "logo",
            success: function(a) {
                t.setData({
                    head_image: a[0].all
                });
            }
        });
    },
  addqrcode: function (e) {
    var t = this;
    a.upimgs({
      scannums: 1,
      filename: "logo",
      success: function (a) {
        t.setData({
          qr_img: a[0].all
        });
      }
    });
  },
    fromsubmit: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.updateinfo",
                uid: wx.getStorageSync("uid"),
                nickname: e.detail.value.nickname,
                phone: e.detail.value.phone,
                address: e.detail.value.address,
                store_img: t.data.store_img,
                head_image: t.data.head_image
            },
            success: function(a) {
                wx.showToast({
                    title: "修改成功",
                    icon: "success",
                    duration: 2e3,
                    complete: function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        });
    }
});