var t = getApp();

Page({
  data: {
    headerdata: {
      top: t.globalData.statusBarHeight,
      saleinfo: [],
    },
    isShow: !1,
    total: {
      brokerage: 0,
      withdraw: 0,
      number: 0
    }
  },
  onLoad: function (n) {
    var b = this;
    console.log(123,t)
    t.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "sale.index.salenew"
      },
      cachetime: "0",
      success: function (a) {
        console.log(a)
         b.setData({
          saleinfo: a.data.data
        })
      }
    });
  },
  search: function() {
    wx.navigateTo({
      url: "/pages/home/searchShop/searchShop"
    });
  },
  onShow: function() {
    var a = this;
    console.log(a)
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
  xufei: function () {
    wx.navigateTo({
      url: "/pages/enter/enter"
    });
  },
  goset: function() {
    wx.navigateTo({
      url: "/pages/mine/info/index"
    });
  },
  retocollection: function() {
    wx.navigateTo({
      url: "/pages/space/index"
    });
  },
  onReachBottom: function() {}
});




// Page({
//   data: {
//     saleinfo: [],
//   },
//   onLoad: function (n) {
//     var t = this;
//     console.log(123), a.util.request({
//       url: "entry/wxapp/Api",
//       data: {
//         m: "monai_market",
//         r: "sale.index.salenew"
//       },
//       cachetime: "0",
//       success: function (a) {
//         console.log(a), t.setData({
//           saleinfo: a.data.data
//         })
//       }
//     });
//   },
// });