var a=getApp();

Page({
    data: {
        headerdata:{top:a.globalData.statusBarHeight}
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        wx.setNavigationBarTitle({
            title: "临时演示"
        });
    }
});