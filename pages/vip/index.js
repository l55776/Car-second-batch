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
      buju_index:0,
      index_adv:{
          adv_miaosha:'../image/jiage_icn.png',
          adv_box_left:'../image/adv_box_left.png',
          adv_box_right:'../image/adv_box_right.png'
      },//首页广告
      isShow: !1,
      parent_uid: 0,
      is_ok: !1,
      banner: [],
      indicatorDots: !0,
      autoplay: !0,
      interval: 5e3,
      duration: 1e3,
      textJson: [],
      textIndex: 0,
      nav_choose: [ "分类", "品牌", "年限", "公里数", "排序" ],
      active_index: 0,
      sortArr: [ "最新发布", "价格最低", "价格最高", "里程最少", "年龄最短", "距离最近" ],
      km_arr: [ "0~3万", "3~5万", "5~10万", "10~15万", "15~20万", "20~30万", "30~50万", "50万以上" ],
      year_arr: [ "全新车", "1~3年", "3~5年", "5~9年", "10年以上" ],
      index: 0,
      fenlei_id: 0,
      pinpai_id: 0,
      nianxian_id: 0,
      km_id: 0,
      sort_id: 0,
      car_year: "",
      car_brand: "",
      car_km: "",
      car_class: "",
      search_arr: [],
      market: [],
      brand: [],
      check_name: "",
      carList: [],
      sort_show: !1,
      leftid: 1,
      show_new: !0,
      brand_show: !1,
      recom: 0,
      home_arr: [],
      brandname: "",
      selectbrand: "",
      brand_status: 0,
      plate_type: 1,
      scanReachBottom: !1,
      unitid: 123,
      latitude: 0,
      longitude: 0,
      region: [ "", "", "" ],
      isvip:0,
      loadtype:'vip',
  },
  onLoad: function(t) {
      t && t.loadtype=='fine' && (this.setData({
          loadtype:'fine'
      }))
      console.log("初始化加载",t.scene);
      //t.scene = 1;
      var e = this;
      t && t.scene && (e.setData({
          parent_uid: t.scene
      }), a.util.getUserInfo(function(t) {
          t.memberInfo ? e.firstin(t.memberInfo) : e.setData({
              isShow: !0
          });
      })), wx.getLocation({
          type: "gcj02",
          success: function(t) {
              e.setData({
                  latitude: t.latitude,
                  longitude: t.longitude
              });
          },
          fail: function(t) {
              wx.openSetting({
                  success: function(t) {
                      t.authSetting["scope.userLocation"] ? wx.getLocation({
                          type: "gcj02",
                          success: function(t) {
                              e.setData({
                                  latitude: t.latitude,
                                  longitude: t.longitude
                              });
                          }
                      }) : (wx.showModal({
                          content: "您未授权获取当前位置无法进行地区筛选！",
                          showCancel: !1
                      }), this._list(0));
                  }
              });
          }
      }), this._list(1), this._notice(), this._info_set(0);
  },
  bindRegionChange: function(t) {
      this.setData({
          region: t.detail.value
      }), this._list(2);
  },
  hideDialog: function() {
      this.setData({
          isShow: !this.data.isShow
      });
  },
  updateUserInfo: function(t) {
      var e = this;
      a.util.getUserInfo(function(t) {
          e.hideDialog(), e.firstin(t.memberInfo);
      }, t.detail);
  },
  firstin: function(t) {
      var e = this;
      a.util.request({
          url: "entry/wxapp/Api",
          data: {
              m: "monai_market",
              r: "me.binding",
              uid: t.uid,
              head_image: t.avatar,
              nickname: t.nickname,
              parent_uid: e.data.parent_uid
          },
          success: function(t) {}
      });
  },
  _info_set: function() {
      var t = this;
      a.util.request({
          url: "entry/wxapp/Api",
          data: {
              m: "monai_market",
              r: "home.index.info_set"
          },
          cachetime: "0",
          success: function(a) {
              console.log(a), 2 == a.data.data.head_flow && "" != a.data.data.head_flow_id && t.setData({
                  unitid: a.data.data.head_flow_id
              });
          }
      });
  },
  _notice: function() {
      var t = this;
      a.util.request({
          url: "entry/wxapp/Api",
          data: {
              m: "monai_market",
              r: "home.index.home1"
          },
          cachetime: "0",
          success: function(a) {
              console.log(a), a.data.data.info_name.name && wx.setNavigationBarTitle({
                  title: a.data.data.info_name.name + ""
              }), 1 == a.data.data.info_name.recom && t.is_home(), 2 == a.data.data.info_name.plate_type && t.setData({
                  plate_type: 2
              }), t.setData({
                  banner: a.data.data.banner,
                  market: a.data.data.market,
                  brand: a.data.data.brand,
                  textJson: a.data.data.notice,
                  info_name: a.data.data.info_name.name,
                  recom: a.data.data.info_name.recom
              });
          }
      });
  },
  ok: function() {
      this.setData({
          is_ok: !1
      });
  },
  banner: function(t) {
      var e = a.getAttr(t, "id"), i = a.getAttr(t, "type");
      console.log(i), 4 == i ? wx.navigateTo({
          url: "/pages/mine/sale/index"
      }) : 5 == i ? wx.navigateTo({
          url: "/pages/enter/enter"
      }) : 6 == i || 0 != e && wx.navigateTo({
          url: "/pages/home/carMessage/carMessage?id=" + e
      });
  },
  market_class: function(t) {
      var e = a.getAttr(t, "active_index"), i = !1;
      this.data.active_index == e && (e = 0, i = !0), this.setData({
          car_type: this.data.market,
          brand_show: !1,
          sort_show: !1,
          active_index: e,
          show_new: i
      });
  },
  market_brand: function(t) {
      wx.navigateTo({
          url: "../selectscards/index"
      });
  },
  car_detail: function(t) {
      var e = !1, i = a.getAttr(t, "active_index");
      this.data.active_index == i && (i = 0, e = !0), this.setData({
          is_ok: !0,
          car_type: this.data.km_arr,
          sort_show: !1,
          show_new: e,
          brand_show: !1,
          active_index: i
      });
  },
  car_yer: function(t) {
      var e = a.getAttr(t, "active_index");
      this.data.active_index == e && (e = 0), this.setData({
          sort_show: !1,
          car_type: this.data.year_arr,
          active_index: e,
          show_new: !1,
          brand_show: !1
      });
  },
  carList: function(t) {
      var e = a.getAttr(t, "name"), i = a.getAttr(t, "id");
      if (1 == this.data.active_index) {
          n = {
              fenlei_id: i,
              car_class: e,
              active_index: 1,
              mark: d = "active_index1",
              check_name: e
          };
          (o = this.data.search_arr.filter(function(t) {
              return t.mark != d;
          })).push(n), this.setData({
              car_class: e,
              fenlei_id: i,
              check_name: e,
              search_arr: o,
              leftid: 1,
              show_new: !0
          });
      } else if (2 == this.data.active_index) {
          var e = a.getAttr(t, "name"), n = {
              pinpai_id: i = a.getAttr(t, "id"),
              car_brand: e,
              active_index: 2,
              mark: d = "active_index2",
              check_name: e
          };
          (o = this.data.search_arr.filter(function(t) {
              return t.mark != d;
          })).push(n), this.setData({
              is_ok: !1,
              car_brand: e,
              pinpai_id: i,
              search_arr: o,
              leftid: 1,
              show_new: !0,
              brand_show: !1
          });
      } else if (3 == this.data.active_index) {
          var s = a.getAttr(t, "year"), n = {
              nianxian_id: i = a.getAttr(t, "index"),
              car_year: s,
              active_index: 3,
              mark: d = "active_index3",
              check_name: s
          };
          (o = this.data.search_arr.filter(function(t) {
              return t.mark != d;
          })).push(n), this.setData({
              is_ok: !1,
              car_year: s,
              nianxian_id: 1 + parseInt(i),
              search_arr: o,
              leftid: 1,
              show_new: !0
          });
      } else if (4 == this.data.active_index) {
          var r = a.getAttr(t, "km"), d = "active_index4", n = {
              km_id: i = a.getAttr(t, "index"),
              car_km: r,
              active_index: 4,
              mark: d,
              check_name: r
          }, o = this.data.search_arr.filter(function(t) {
              return t.mark != d;
          });
          o.push(n), this.setData({
              is_ok: !1,
              car_km: r,
              km_id: 1 + parseInt(i),
              search_arr: o,
              leftid: 1,
              show_new: !0
          });
      }
      this._list(1);
  },
  _list: function(e) {
      var i = this;
      1 == e ? this.setData({
          carList: []
      }) : 2 == e && this.setData({
          carList: [],
          leftid: 1,
          show_new: !0
      }), this.setData({
          active_index: 0
      }), a.util.request({
          url: "entry/wxapp/Api",
          data: {
              m: "monai_market",
              r: "home.index.carListVip",
              fenlei_id: this.data.fenlei_id,
              pinpai_id: this.data.pinpai_id,
              nianxian_id: this.data.nianxian_id,
              km_id: parseInt(this.data.km_id),
              sort_id: this.data.sort_id,
              leftid: this.data.leftid++,
              latitude: this.data.latitude,
              longitude: this.data.longitude,
              province: this.data.region[0],
              city: this.data.region[1],
              district: this.data.region[2],
              uid: wx.getStorageSync("uid"),
              loadtype: this.data.loadtype,
          },
          cachetime: "0",
          success: function(a) { 
              if(Number(wx.getStorageSync('is_vip'))!==2){
                i.notviptip();
                return;
              }
              if (a.data.data.cardlist.length > 0) {
                  var e;
                  (e = i.data.carList).push.apply(e, t(a.data.data.cardlist)), i.setData({
                      scanReachBottom: !1
                  }), i.setData({
                      is_ok: !1,
                      carList: i.data.carList,
                      isvip: 1
                  });
              } else i.setData({
                  scanReachBottom: !0
              }), i.data.show_new = !1;
          }
      });
  },
  clone: function(t) {
      var e = a.getAttr(t, "index"), i = this.data.search_arr;
      1 == i[e].active_index ? this.setData({
          fenlei_id: 0,
          check_name: ""
      }) : 2 == i[e].active_index ? this.setData({
          pinpai_id: 0,
          car_brand: ""
      }) : 3 == i[e].active_index ? (this.setData({
          nianxian_id: 0,
          car_year: ""
      }), this.data.nianxian_id = 0) : 4 == i[e].active_index && (this.setData({
          km_id: 0,
          car_km: ""
      }), this.data.km_id = 0), i.splice(e, 1), this.setData({
          search_arr: i,
          active_index: 0,
          leftid: 1
      }), this._list(2);
  },
  active_nav: function(t) {
      var e = a.getAttr(t, "active_index");
      this.data.active_index != e ? this.setData({
          sort_show: !0,
          show_new: !1,
          active_index: e,
          brand_show: !1
      }) : this.setData({
          sort_show: !1,
          active_index: 0,
          show_new: !1
      });
  },
  sort_car: function(t) {
      var e = a.getAttr(t, "index");
      if (this.setData({
          sort_show: !1,
          is_ok: !1
      }), 5 == e) return this._distanceSort(e), !1;
      this.setData({
          sort_id: e
      }), this._list(2);
  },
  _distanceSort: function(t) {
      var a = this;
      if (a.setData({
          active_index: 0
      }), 0 !== a.data.latitude && 0 !== a.data.longitude) return a.setData({
          sort_id: t
      }), a._list(2), !1;
      wx.getLocation({
          type: "gcj02",
          success: function(e) {
              a.setData({
                  latitude: e.latitude,
                  longitude: e.longitude,
                  sort_id: t
              }), a._list(2);
          },
          fail: function(e) {
              wx.openSetting({
                  success: function(e) {
                      e.authSetting["scope.userLocation"] ? wx.getLocation({
                          type: "gcj02",
                          success: function(e) {
                              a.setData({
                                  latitude: e.latitude,
                                  longitude: e.longitude,
                                  sort_id: t
                              }), a._list(2);
                          }
                      }) : wx.showModal({
                          content: "您未授权获取当前位置无法使用距离排序！",
                          showCancel: !1
                      });
                  }
              });
          }
      });
  },
  search: function() {
      wx.navigateTo({
          url: "../home/searchShop/searchShop"
      });
  },
  previewImage: function(t) {
      var e = a.getAttr(t, "src"), i = a.getAttr(t, "index"), n = this, s = [], r = !0, d = !1, o = void 0;
      try {
          for (var c, _ = n.data.carList[i].image[Symbol.iterator](); !(r = (c = _.next()).done); r = !0) {
              var h = c.value;
              s.push(h.img_patch);
          }
      } catch (t) {
          d = !0, o = t;
      } finally {
          try {
              !r && _.return && _.return();
          } finally {
              if (d) throw o;
          }
      }
      wx.previewImage({
          current: e,
          urls: s
      });
  },
  detile: function(t) {
      var e = a.getAttr(t, "id");
      wx.navigateTo({
          url: "/pages/home/carMessage/carMessage?id=" + e
      });
  },
  onReachBottom: function() {
      this.data.show_new && this._list(0);
  },
  onPullDownRefresh: function() {
      var t = this;
      setTimeout(function() {
          wx.stopPullDownRefresh(), t.setData({
              is_ok: !1,
              banner: [],
              indicatorDots: !0,
              autoplay: !0,
              interval: 5e3,
              duration: 1e3,
              textJson: [],
              textIndex: 0,
              active_index: 0,
              index: 0,
              fenlei_id: 0,
              pinpai_id: 0,
              nianxian_id: 0,
              km_id: 0,
              sort_id: 0,
              market: [],
              brand: [],
              car_year: "",
              car_brand: "",
              car_km: "",
              car_class: "",
              search_arr: [],
              check_name: "",
              carList: [],
              sort_show: !1,
              leftid: 1,
              show_new: !0,
              brand_show: !1
          }), t.onLoad();
      }, 1500);
  },
  can_1: function() {
      this.setData({
          is_ok: !1,
          sort_show: !1,
          active_index: 0,
          show_new: !0,
          brand_show: !1
      });
  },
  info_notice: function() {
      wx.navigateTo({
          url: "../dting/index"
      });
  },
  onShareAppMessage: function(t) {
      return {
          title: this.data.info_name + "",
          path: "/pages/index/index",
          success: function(t) {},
          fail: function(t) {}
      };
  },
  is_home: function() {
      var t = this;
      a.util.request({
          url: "entry/wxapp/Api",
          data: {
              m: "monai_market",
              r: "home.index.is_home"
          },
          cachetime: "0",
          success: function(a) {
              a.data.data.length > 0 && t.setData({
                  home_arr: a.data.data
              });
          }
      });
  },
  notviptip: function(){
    wx.showModal({
        content: "当前尚未开通VIP,无法进入该页面",
        showCancel: !1,
        success: function(){
            console.log("-----------");
            wx.switchTab({
                url: "/pages/mine/index"
            });
        }
    });
  },
  onShow: function() {
      var t = this;
      console.log("VIP == "+t.data.isvip);
    //   if(t.data.isvip==0){
    //     t.notviptip();
    //     return;
    //   }
      if ("" != t.data.brandid && "" != t.data.brandname && 1 == t.data.brand_status) {
          var a = t.data.brandname, e = t.data.brandid, i = "active_index2", n = {
              pinpai_id: e,
              car_brand: a,
              active_index: 2,
              mark: i,
              check_name: a
          }, s = this.data.search_arr.filter(function(t) {
              return t.mark != i;
          });
          s.push(n), this.setData({
              is_ok: !1,
              car_brand: a,
              pinpai_id: e,
              search_arr: s,
              leftid: 1,
              show_new: !0,
              brand_show: !1,
              brandid: 0,
              brandname: ""
          }), this._list(1);
      }
  },
  buji_click:function(){
    if (this.data.buju_index==0){
      this.setData({
        buju_index: 1
      })
    }else{
      this.setData({
        buju_index: 0
      })
    }
  },
  onLoad1: function (a) {
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
    var e = 0, n = decodeURIComponent(a.scene);
    console.log(n), n > 0 ? e = n : a.id > 0 && (e = a.id), this.data.id = e, this._car_info(),
      this._info_set(0);
  },
});