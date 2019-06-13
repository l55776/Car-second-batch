var t = getApp();

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        isShow: !1,
        total: {
            brokerage: 0,
            withdraw: 0,
            number: 0
        }
    },
    onLoad: function(t) {},
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onShow: function() {
        var a = this;
        t.util.getUserInfo(function(t) {
            t.memberInfo && (a.setData({
                memberInfo: t.memberInfo
            }), wx.setStorageSync("uid", t.memberInfo.uid), a.firstin(t.memberInfo));
        });
    },
    firstin: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.detail",
                uid: a.uid,
                head_image: a.avatar,
                nickname: a.nickname
            },
            success: function(t) {
                e.setData({
                    detail: t.data.data,
                    is_member: t.data.data.user.is_member,
                    store_img: t.data.data.user.store_img
                });
            }
        }), t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "store.getSaleinfo",
                uid: a.uid
            },
            success: function(t) {
                e.setData({
                    total: t.data.data
                });
            }
        });
    },
    retopublicity: function() {
        wx.navigateTo({
            url: "/pages/mine/publicity/index"
        });
    },
    binding: function() {
        wx.navigateTo({
            url: "/pages/mine/tixian/tixian"
        });
    },
    retocollection: function() {
        wx.navigateTo({
            url: "/pages/space/index"
        });
    },
    mine_copy:function(){
        let that=this
        wx.setClipboardData({
            data: that.data.detail.pop_con,
            success(){

            }
        })
        wx.getClipboardData({
            success(res){

            }
        })
    },
    onReachBottom: function() {}
});