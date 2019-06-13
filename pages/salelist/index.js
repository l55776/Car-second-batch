var a = getApp();

Page({
  data: {
    headerdata: {
      top: a.globalData.statusBarHeight
    },
    userinfo: [],
    settopfee: 0,
    settoptime: 0,
    carslist: [],
    table: ["全部", "未上架", "已上架"],
    activeIndex: 0,
    nav_width: "",
    onshelffee: "",
    dropdown: 1,
    page: 1
  },
  search: function() {
    wx.navigateTo({
      url: "/pages/home/searchShop/searchShop"
    });
  },
  onLoad: function() {
    var t = this;
    t.setData({
      nav_width: 100 / t.data.table.length
    }), t.getcarslist(t, 0), a.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "sale.salelist.getfee"
      },
      success: function(a) {
        t.data.onshelffee = a.data.data.onshelffee, t.data.settopfee = a.data.data.settopfee,
          t.data.settoptime = a.data.data.settoptime;
      }
    });
  },
  onShow: function() {
    var a = this;
    a.getcarslist(a, a.data.activeIndex);
  },
  ActiveClick: function(a) {
    var t = this;
    t.setData({
      activeIndex: a.currentTarget.dataset.index,
      page: 1
    }), t.getcarslist(t, a.currentTarget.dataset.index);
  },
  getcarslist: function(t, e) {
    a.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        uid: a.getuid(),
        leftid: "",
        types: e,
        r: "sale.salelist.getlist"
      },
      success: function(a) {
        console.log(a);
        t.setData({
          carslist: a.data.data.cars,
          userinfo: a.data.data.user
        });
      }
    });
  },
  upthiscar: function(a) {
    var t = this,
      e = a.currentTarget.dataset.index,
      s = a.currentTarget.dataset.id;
    3 == t.data.carslist[e].status ? t.data.settopfee > 0 ? wx.showModal({
      content: "需要支付" + t.data.settopfee + "元后会置顶" + t.data.settoptime + "天",
      success: function(a) {
        a.confirm ? t.dosettoppay(s) : a.cancel && console.log("用户点击取消");
      }
    }) : t.dosettoppay(s) : wx.showModal({
      content: "此商品未上架，请在上架后再进行置顶操作",
      showCancel: !1
    });
  },
  dosettoppay: function(t) {
    a.util.request({
      url: "entry/wxapp/paysettop",
      data: {
        m: "monai_market",
        uid: a.getuid(),
        car: t
      },
      success: function(e) {
        e.data && e.data.data && 1e3 == e.data.message ? a.util.request({
          url: "entry/wxapp/Api",
          data: {
            m: "monai_market",
            uid: a.getuid(),
            car: t,
            r: "sale.salelist.maketop"
          },
          success: function(a) {
            wx.showModal({
              content: a.data.message,
              success: function(a) {
                wx.reLaunch({
                  url: "/pages/index/index"
                });
              }
            });
          }
        }) : e.data && e.data.data && !e.data.errno && wx.requestPayment({
          timeStamp: e.data.data.timeStamp,
          nonceStr: e.data.data.nonceStr,
          package: e.data.data.package,
          signType: "MD5",
          paySign: e.data.data.paySign,
          success: function(s) {
            a.util.request({
              url: "entry/wxapp/Api",
              data: {
                m: "monai_market",
                uid: a.getuid(),
                car: t,
                orderid: e.data.data.orderid,
                r: "sale.salelist.maketop"
              },
              success: function(a) {
                wx.showModal({
                  content: a.data.message,
                  success: function(a) {
                    wx.reLaunch({
                      url: "/pages/index/index"
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  },
  onReachBottom: function() {
    var t = this,
      e = t.data.carslist;
    2 != t.data.dropdown && (t.data.dropdown = 2, a.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        uid: a.getuid(),
        leftid: t.data.page + 1,
        types: t.data.activeIndex,
        r: "sale.salelist.getlist"
      },
      success: function(a) {
        var s = a.data.data.cars.length;
        if (s > 0)
          for (var n = 0; n < s; n++) e.push(a.data.data.cars[n]);
        t.setData({
          carslist: e,
          page: t.data.page + 1
        });
      },
      complete: function() {
        t.data.dropdown = 1;
      }
    }));
  },
  makeshelf: function(t) {
    var e = this,
      s = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.id,
      i = e.data.carslist[s];
    console.log(i), 3 != i.status ? i.status < 2 && 1 != e.data.userinfo.is_vip ? e.data.onshelffee > 0 ? wx.showModal({
      content: "需要支付" + e.data.onshelffee + "元后才能上架哦",
      confirmColor: "#0AC2AE",
      confirmText: "去支付",
      success: function(a) {
        a.confirm && e.dopay(e, n);
      }
    }) : e.dopay(e, n) : 2 != i.status && 1 != e.data.userinfo.is_vip || wx.showModal({
      content: "是否更改当前状态",
      confirmColor: "#0AC2AE",
      confirmText: "上架",
      success: function(t) {
        t.confirm && a.util.request({
          url: "entry/wxapp/Api",
          data: {
            m: "monai_market",
            uid: a.getuid(),
            car: n,
            r: "sale.salelist.onshelf"
          },
          success: function(a) {
            wx.showModal({
              content: a.data.message,
              success: function() {
                wx.reLaunch({
                  url: "/pages/index/index"
                });
              }
            });
          }
        });
      }
    }) : wx.showModal({
      content: "是否更改当前状态",
      confirmColor: "#0AC2AE",
      confirmText: "下架",
      success: function(t) {
        t.confirm && a.util.request({
          url: "entry/wxapp/Api",
          data: {
            m: "monai_market",
            uid: a.getuid(),
            car: n,
            r: "sale.salelist.downshelf"
          },
          success: function(a) {
            wx.showModal({
              content: a.data.message
            }), e.getcarslist(e, e.data.activeIndex);
          }
        });
      }
    });
  },
  dopay: function(t, e) {
    a.util.request({
      url: "entry/wxapp/paysale",
      data: {
        m: "monai_market",
        uid: a.getuid(),
        car: e
      },
      success: function(s) {
        s.data && s.data.data && 1e3 == s.data.message ? a.util.request({
          url: "entry/wxapp/Api",
          data: {
            m: "monai_market",
            uid: a.getuid(),
            car: e,
            r: "sale.salelist.onshelf"
          },
          success: function(a) {
            wx.showModal({
              content: a.data.message
            }), t.getcarslist(t, t.data.activeIndex);
          }
        }) : s.data && s.data.data && !s.data.errno && wx.requestPayment({
          timeStamp: s.data.data.timeStamp,
          nonceStr: s.data.data.nonceStr,
          package: s.data.data.package,
          signType: "MD5",
          paySign: s.data.data.paySign,
          success: function(s) {
            a.util.request({
              url: "entry/wxapp/Api",
              data: {
                m: "monai_market",
                uid: a.getuid(),
                car: e,
                r: "sale.salelist.onshelf"
              },
              success: function(a) {
                wx.showModal({
                  content: a.data.message
                }), t.getcarslist(t, t.data.activeIndex);
              }
            });
          }
        });
      }
    });
  },
  delcar: function(t) {
    var e = this,
      s = t.currentTarget.dataset.index,
      n = t.currentTarget.dataset.id,
      i = e.data.carslist[s];
    console.log(i), wx.showModal({
      content: "确定删除当前汽车么？",
      confirmColor: "#F75F5F",
      confirmText: "删除",
      success: function(t) {
        t.confirm && a.util.request({
          url: "entry/wxapp/Api",
          data: {
            m: "monai_market",
            uid: a.getuid(),
            car: n,
            r: "sale.salelist.delsale"
          },
          success: function(a) {
            wx.showModal({
              content: a.data.message
            }), e.getcarslist(e, e.data.activeIndex);
          }
        });
      }
    });
  },
  upcar: function(a) {
    var t = a.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/saledetail/index?car=" + t
    });
  },
  detile: function(t) {
    var e = a.getAttr(t, "id");
    wx.navigateTo({
      url: "/pages/home/carMessage/carMessage?id=" + e
    });
  },
  onReady: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onShareAppMessage: function() {}
});