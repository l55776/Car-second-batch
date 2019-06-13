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
        car_uid: 0,
        value: "",
        feedback_type: 1,
        isShow: !1,
        more_status: !0,
        items: [ {
            name: "虚假信息",
            checked: "true"
        }, {
            name: "广告"
        }, {
            name: "其他"
        } ],
        leftid: 1,
        content: []
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        console.log(t), t.form_type && "undefined" != t.form_type && this.setData({
            feedback_type: t.form_type,
            car_id: t.car_id,
            car_uid: t.car_uid
        }), wx.getUserInfo({
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        }), wx.setNavigationBarTitle({
            title: 1 == this.data.feedback_type ? "留言商家" : "举报商家"
        }), this._stay();
    },
    _stay: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.index.stay",
                car_id: this.data.car_id,
                leftid: this.data.leftid++
            },
            cachetime: "0",
            success: function(a) {
                if (console.log(a), a.data.data.length > 0) {
                    var i;
                    console.log(a), (i = e.data.content).push.apply(i, t(a.data.data)), e.setData({
                        content: e.data.content
                    });
                } else e.setData({
                    more_status: !1
                });
            }
        });
    },
    more: function() {
        this._stay();
    },
    formSubmit: function(t) {
        console.log(wx.getStorageSync("uid"));
        var e = t.detail.value, i = "";
        1 != this.data.feedback_type && (i = "[车辆信息]:" + this.data.value), e.content ? a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.index.word",
                content: e.content,
                car_uid: this.data.car_uid,
                car_info: i,
                feedback_type: this.data.feedback_type,
                uid: wx.getStorageSync("uid"),
                car_id: this.data.car_id
            },
            cachetime: "0",
            success: function(t) {
                console.log(t), wx.showModal({
                    title: "提示",
                    content: "提交信息成功",
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateBack({});
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            content: "内容不能为空！",
            showCancel: !1,
            success: function(t) {}
        });
    },
    radioChange: function(t) {
        0 == t.detail.value ? this.data.value = "虚假信息" : 1 == t.detail.value ? this.data.value = "广告" : 2 == t.detail.value && (this.data.value = "其他");
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    onShow: function() {
        var t = this;
        a.util.getUserInfo(function(a) {
            wx.getStorageSync("uid") && a.memberInfo || t.setData({
                isShow: !0
            });
        });
    },
    updateUserInfo: function(t) {
        var e = this;
        a.util.getUserInfo(function(t) {
            wx.setStorageSync("uid", t.memberInfo.uid), e.hideDialog();
        }, t.detail);
    }
});