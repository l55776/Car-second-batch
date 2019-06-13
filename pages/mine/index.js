var e = getApp();

Page({
    data: {
        headerdata:{top:e.globalData.statusBarHeight},
        isShow: !1,
        weixinkefu:'',
        vipData:{
            vipLv:'二手汽车年度会员',
            vipShi:'武汉',
            vipQu:'江汉',
            vipAdv:''
        },
      vip_words:"",
        kefu_qrcode:""
    },
    search: function() {
        wx.navigateTo({
            url: "../home/searchShop/searchShop"
        });
    },
    onLoad: function(e) {
      console.log("用户信息为", this.data.detail);
    },
    onShow: function() {
        var i = this;
        e.util.getUserInfo(function(e) {
            e.memberInfo ? (i.setData({
                memberInfo: e.memberInfo
            }), wx.setStorageSync("uid", e.memberInfo.uid), i.firstin(e.memberInfo)) : i.setData({
                isShow: !0
            });
        });
        
    },
    hideDialog: function() {
        this.setData({
            isShow: !this.data.isShow
        });
    },
    updateUserInfo: function(i) {
        var n = this;
        e.util.getUserInfo(function(e) {
            wx.setStorageSync("uid", e.memberInfo.uid), n.hideDialog(), n.firstin(e.memberInfo);
        }, i.detail);
    },
    firstin: function(i) {
        var n = this;
        // 请求获取用户的信息
        console.log(i), e.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "me.detail",
                uid: i.uid,
                head_image: i.avatar,
                nickname: i.nickname
            },
            success: function(e) {
                wx.setStorageSync("is_vip",e.data.data.user.is_vip);
                console.log(e), n.setData({
                    detail: e.data.data,
                    is_member: e.data.data.user.is_member,
                    store_img: e.data.data.user.store_img,
                    kefu_qrcode: e.data.data.kf_qrcode,
                    weixinkefu: e.data.data.kf_info,
                    vip_words: e.data.data.vip_words,
                    pop_con:e.data.data.pop_con,
                });
            }
        });
    },
    block_click: function() {
        wx.makePhoneCall({
            phoneNumber: this.data.detail.phone
        });
    },
    payorder: function(){
        wx.navigateTo({
            url: "/pages/mine/payorder/index"
        });
    },
    goset: function() {
        wx.navigateTo({
            url: "/pages/mine/info/index"
        });
    },
    retopublicity: function() {
        wx.navigateTo({
            url: "/pages/publicity/index"
        });
    },
    binding: function() {
        wx.navigateTo({
            url: "/pages/enter/enter"
        });
    },
    retocollection: function() {
        wx.navigateTo({
            url: "/pages/collection/index"
        });
    },
    weizhang: function() {
        wx.navigateTo({
            url: "/pages/weizhang/weizhang"
        });
    },
    tuiguang: function() {
        wx.navigateTo({
            url: "/pages/mine/sale/index"
        });
    },
    mefabu: function() {
        wx.navigateTo({
            url: "/pages/salelist/index"
        });
    },
    goPartOrder: function() {
        wx.navigateTo({
            url: "/pages/part/apply/index"
        });
    },
    onReachBottom: function() {},
    mine_kefu_copy:function(){
        let that=this
        wx.setClipboardData({
            data: that.data.weixinkefu,
            success(){

            }
        })
        wx.getClipboardData({
            success(res){

            }
        })
    }
});