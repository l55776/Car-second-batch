var t = getApp();

Page({
  data: {
    headerdata: {
      top: t.globalData.statusBarHeight
    },
    wxqunShow: 0,
    wxqunModle: 0,
    wxqun: [{
        wxqunsrc: '/pages/image/weixin_img.jpg'
      },
      {
        wxqunsrc: '/pages/image/weixin_img.jpg'
      }
    ],
    indicatorDots: !1,
    autoplay: !1,
    interval: 5e3,
    duration: 1e3,
    id: 0,
    carInfo: [],
    isShow: !1,
    follow_status: !1,
    swiperCurrent: 1,
    lunboLength: 0,
    imgUrls: [],
    share_id: 0,
    modleBlock: 0,
    mengcengBlock: 0,
    unitid: 123,
    appscene: 0,
    kfqrcode_show: 0,
    kf_qrcode: '',
    isvip:null
  },
  previewImage_wximg: function(e) {
    var cur = e.target.dataset.src;
    console.log([cur])
    wx.previewImage({
      current: cur,
      urls: [cur]
    })
  },
  wxqunBool: function() {
    let t = this;
    if (!t.data.wxqunModle) {
      t.setData({
        wxqunModle: 1
      })
    } else {
      t.setData({
        wxqunModle: 0
      })
    }
  },
  kfqrcodeBool() {
    const _this = this;
    if (!_this.data.kfqrcode_show) {
      _this.setData({
        kfqrcode_show: 1
      })
    } else {
      _this.setData({
        kfqrcode_show: 0
      })
    }
  },
  search: function() {
    wx.navigateTo({
      url: "/pages/home/searchShop/searchShop"
    });
  },
  changblock: function(t) {
    console.log(t.detail.current), this.setData({
      swiperCurrent: 1 + t.detail.current
    });
  },
  mengceng_Block: function() {
    this.setData({
      mengcengBlock: 1,
      modleBlock: 1
    });
  },
  mengceng_none: function() {
    this.setData({
      modleBlock: 0
    });
    var t = this;
    setTimeout(function() {
      t.setData({
        mengcengBlock: 0
      });
    }, 700);
  },
  onLoad: function(a) {
    this.setData({
      brand:a.brand
    });

    this.setData({
      isvip:wx.getStorageSync('is_vip')
    })

    if (this.data.isvip === 1) {
      wx.showModal({
        content: '加入会员 立即询价',
        showCancel: true, //是否显示取消按钮
        cancelText: "我再想想", //默认是“取消”
        cancelColor: 'black', //取消文字的颜色
        confirmText: "立即加入", //默认是“确定”
        confirmColor: 'skyblue', //确定文字的颜色
        success: function(res) {
          if (res.cancel) {} else {
            //点击确定
            wx.navigateTo({
              url: "/pages/enter/enter",
            })
          }
        },
        fail: function(res) {}, //接口调用失败的回调函数
      })
    }
    var siteinfo = wx.getStorageSync('siteinfo');
    if (siteinfo) {
      this.setData({
        ad_detail: siteinfo['ad_detail']
      });
    }
    console.log(t.data.appscene), 1007 != t.data.appscene && 1008 != t.data.appscene && 1011 != t.data.appscene && 1012 != t.data.appscene && 1013 != t.data.appscene && 1014 != t.data.appscene || this.setData({
      appscene: 1
    }), this.setData({
      lunboLength: this.data.imgUrls.length
    });
    var e = 0,
      n = decodeURIComponent(a.scene);
    console.log(n), n > 0 ? e = n : a.id > 0 && (e = a.id), this.data.id = e, this._car_info(),
      this._info_set(0);
  },
  _info_set: function() {
    var a = this;
    t.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "home.index.info_set"
      },
      cachetime: "0",
      success: function(t) {
        console.log(t), 2 == t.data.data.flow_set && "" != t.data.data.flow_set_id && a.setData({
          unitid: t.data.data.flow_set_id,
        });
        a.setData({
          wxqunShow: t.data.data.is_vipgroup,
          kf_qrcode: t.data.data.kf_qrcode
        })
      }
    });
  },
  _car_info: function() {
    var a = this;
    t.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "home.index.car_info",
        id: this.data.id
      },
      cachetime: "0",
      success: function(t) {
        console.log("当前车的信息为",t)
        var e = !1;
        if (t.data.data.follow && t.data.data.follow.length > 0) {
          var n = !0,
            i = !1,
            o = void 0;
          try {
            for (var s, r = t.data.data.follow[Symbol.iterator](); !(n = (s = r.next()).done); n = !0)
              if (s.value.uid == wx.getStorageSync("uid")) {
                e = !0;
                break;
              }
          } catch (t) {
            i = !0, o = t;
          } finally {
            try {
              !n && r.return && r.return();
            } finally {
              if (i) throw o;
            }
          }
        }
        var c = [],
          u = !0,
          d = !1,
          l = void 0;
        try {
          for (var f, g = t.data.data.image[Symbol.iterator](); !(u = (f = g.next()).done); u = !0) {
            var h = f.value;
            c.push(h.img_patch);
          }
        } catch (t) {
          d = !0, l = t;
        } finally {
          try {
            !u && g.return && g.return();
          } finally {
            if (d) throw l;
          }
        }
        a.setData({
          carInfo: t.data.data,

          follow_status: e,
          imgUrls: c,
          wxqun: t.data.data.group
        });

        console.log(t.data.data);

      },
      fail: function() {
        wx.showModal({
          title: "提示",
          content: "该商品或已下架！",
          showCancel: !1,
          success: function(t) {
            t.confirm && wx.navigateBack({});
          }
        });
      }
    });
  },
  daikuan: function() {
    wx.navigateTo({
      url: "/pages/loan/index?carid=" + this.data.id
    });
  },
  hideDialog: function() {
    this.setData({
      isShow: !this.data.isShow
    });
  },
  home: function() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  updateUserInfo: function(a) {
    var e = this;
    t.util.getUserInfo(function(t) {
      wx.setStorageSync("uid", t.memberInfo.uid), e.hideDialog();
    }, a.detail);
  },
  onShareAppMessage: function(t) {
    return {
      title: this.data.carInfo.name,
      path: "/pages/home/carMessage/carMessage?id=" + this.data.id + "&share_id=1",
      success: function(t) {},
      fail: function(t) {}
    };
  },
  tel: function() {
    // const uid = wx.getStorageSync('uid');
    // (uid>0)?(this.setData({
    //     kfqrcode_show:1
    // })):(wx.makePhoneCall({
    //     phoneNumber: this.data.carInfo.phone,
    //     success: function() {}
    // }));   
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  follow: function() {
    var a = this;
    t.util.getUserInfo(function(t) {
      t.memberInfo || that.setData({
        isShow: !0
      });
    }), t.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "me.follow",
        uid: t.getuid(),
        type: 2,
        ucar_id: this.data.carInfo.id
      },
      cachetime: "0",
      success: function(t) {
        a.setData({
          follow_status: !a.data.follow_status,
          follow: t.data.data
        });
      }
    });
  },
  toIndex: function(a) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  yan: function(a) {
    var e = t.getAttr(a, "form_type");
    wx.navigateTo({
      url: "/pages/home/jubao/jubao?car_uid=" + this.data.carInfo.uid + "&form_type=" + e + "&car_id=" + this.data.id
    });
  },
  store: function(a) {
    var e = t.getAttr(a, "uid");
    wx.navigateTo({
      url: "../../store/index?uid=" + e
    });
  },
  detile: function(a) {
    var e = t.getAttr(a, "id");
    wx.navigateTo({
      url: "/pages/home/carMessage/carMessage?id=" + e
    });
  },
  company: function(a) {
    var e = t.getAttr(a, "x"),
      n = t.getAttr(a, "y"),
      i = t.getAttr(a, "name");
    e && n && wx.getLocation({
      type: "gcj02",
      success: function(t) {
        wx.openLocation({
          latitude: parseFloat(e),
          longitude: parseFloat(n),
          scale: 14,
          name: i
        });
      }
    });
  },
  previewImage: function(a) {
    var e = t.getAttr(a, "src"),
      n = [],
      i = !0,
      o = !1,
      s = void 0;
    try {
      for (var r, c = this.data.carInfo.image[Symbol.iterator](); !(i = (r = c.next()).done); i = !0) {
        var u = r.value;
        n.push(u.img_patch);
      }
    } catch (t) {
      o = !0, s = t;
    } finally {
      try {
        !i && c.return && c.return();
      } finally {
        if (o) throw s;
      }
    }
    wx.previewImage({
      current: e,
      urls: n
    });
  },
  imgs: function(a) {
    var e = t.getAttr(a, "src"),
      n = this.data.imgUrls;
    console.log(n)
    wx.previewImage({
      current: e,
      urls: n
    });
  },
  tomap: function() {
    var t = this;
    wx.getSetting({
      success: function(a) {
        a.authSetting["scope.userLocation"] ? wx.chooseLocation({
          success: function(a) {
            t.setData({
              mapx: a.latitude,
              mapy: a.longitude,
              mapname: a.address + a.name
            });
          }
        }) : wx.showModal({
          content: "请允许获取地理位置后再次尝试",
          success: function(t) {
            t.confirm ? wx.openSetting({}) : t.cancel && console.log("用户点击取消");
          }
        });
      }
    });
  },
  poster: function(t) {
    wx.navigateTo({
      url: "../poster/index?carid=" + this.data.carInfo.id
    });
  },
  shouyewdj_btn: function() {
    console.log(123), wx.switchTab({
      url: "/pages/index/index"
    }), t.data.appscene = 0;
  }
});