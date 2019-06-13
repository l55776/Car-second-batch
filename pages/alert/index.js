getApp();

Page({
    data: {
        isShow: !1
    },
    onLoad: function(o) {
        this.show(), wx.login({
            success: function(o) {}
        });
    },
    show: function() {
        this.setData({
            isShow: !0
        });
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(o) {
        getApp().util.getUserInfo(function(o) {
            console.log(wx.getStorageSync("userInfo")), console.log(o.memberInfo.uid);
        }, o.detail);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});