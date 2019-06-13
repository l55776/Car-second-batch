function a(a, e, t) {
  return e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}

var e, t = getApp();

t.util.url("entry/wxapp/Api", {
  m: "monai_sharing",
  uid: wx.getStorageSync("uid"),
  r: "Upimg"
});

Page((e = {
    data: {
      effluentstandboxs: [{
        name: "国一",
        id: "1"
      }, {
        name: "国二",
        id: "2"
      }, {
        name: "国三",
        id: "3"
      }, {
        name: "国四",
        id: "4"
      }, {
        name: "国五",
        id: "5"
      }, {
        name: "国六",
        id: "6"
      }],
      effluentstandname:'排放标准',
      effluentstandindex:'',
      headerdata: {
        top: t.globalData.statusBarHeight
      },
      upcarindex: 0,
      vehicletime: "请选择上牌日期",
      vehicletime1: "",
      insurance: "请选择保险到期时间",
      insurance1: "",
      gearboxes: [{
        name: "手自一体",
        id: "1"
      }, {
        name: "手动档",
        id: "2"
      }, {
        name: "自动挡",
        id: "3"
      }],
      gearboxname: "请选择变速箱类型",
      gearboxindex: 0,
      toupimg: !1,
      carsimgs: [],
      delimgs: [],
      dodelimgs: [],
      cardetail: [],
      brandid: "",
      brandname: "",
      classid: "",
      classes: [],
      brands: [],
      selectclass: "请选择分类",
      selectbrand: "请选择品牌",
      selecttime: " 请选择出厂年份",
      selecttime1: "",
      userphone: "",
      mapname: "",
      mapx: "",
      mapy: "",
      carimgs: [],
      buttscan: !1,
      textareatype: !1,
      textareaname: "请输入车辆信息介绍",
      textareainput: "",
      isShow: !1,
      showtextarea: !1,
      top: 0
    },
    search: function() {
      wx.navigateTo({
        url: "/pages/home/searchShop/searchShop"
      });
    },
    showtextarea: function() {
      this.setData({
        showtextarea: !this.data.showtextarea
      });
    },
    textareashow: function(a) {
      this.setData({
        mapname: a.detail.value
      });
    },
    gearbox: function(a) {
      var e = this,
        t = e.data.gearboxes[a.detail.value];
      t && e.setData({
        gearboxname: t.name,
        gearboxindex: a.detail.value
      });
    },
    bindDateChange: function(a) {
      console.log(a.detail.value);
      var e = a.detail.value.split("-");
      this.setData({
        selecttime: e[0] + "年" + e[1] + "月",
        selecttime1: a.detail.value
      });
    },
    insurance: function(a) {
      console.log(a.detail.value);
      var e = a.detail.value.split("-");
      this.setData({
        insurance: e[0] + "年" + e[1] + "月" + e[2] + "日",
        insurance1: a.detail.value
      });
    },
    vehicletime: function(a) {
      console.log(a.detail.value);
      var e = a.detail.value.split("-");
      this.setData({
        vehicletime: e[0] + "年" + e[1] + "月" + e[2] + "日",
        vehicletime1: a.detail.value
      });
    },
    //选择排放标准
    effluentstandbox(res) {
      this.data.effluentstandboxs.forEach(item=>{
        if((Number(item.id)-1)===Number(res.detail.value)){
          this.setData({
            effluentstandname:item.name,
            effluentstandindex:item.id
          })
        }
      })
     
    },
    firstin: function(a, e) {
      t.util.request({
        url: "entry/wxapp/Api",
        data: {
          m: "monai_market",
          uid: t.getuid(),
          car: e,
          r: "sale.salelist.getcardetail"
        },
        cachetime: "0",
        success: function(e) {
          console.log(e);
          var t = {
            carsimgs: e.data.data.img,
            cardetail: e.data.data.car,
            vehicletime: e.data.data.car.vehicletime,
            insurance: e.data.data.car.insurance,
            gearboxname: a.data.gearboxes[e.data.data.car.gearbox].name,
            gearboxindex: e.data.data.car.gearbox,
            classes: e.data.data.class,
            brandid: e.data.data.car.brand,
            selectbrand: e.data.data.brand.name,
            brandname: e.data.data.brand.name,
            classid: e.data.data.car.class,
            selectclass: e.data.data.classname.name,
            selecttime: e.data.data.car.year,
            selecttime1: e.data.data.car.selecttime1,
            mapx: e.data.data.car.x,
            mapy: e.data.data.car.y,
            textareaname: e.data.data.car.introduce,
            textareainput: e.data.data.car.introduce,
            userphone: e.data.data.car.phone,
            mapname: e.data.data.car.caraddress,
            effluentstandname:e.data.data.car.effluentstand
          };
          a.setData(t);
        }
      });
    },
    intextarea: function() {
      this.setData({
        textareatype: !0,
        textareaname: this.data.textareainput
      });
    },
    bindblur: function(a) {
      var e = a.detail.value,
        t = e;
      e || (e = "请输入车辆信息介绍", t = ""), this.setData({
        textareatype: !1,
        textareaname: e,
        textareainput: t
      });
    },
    hideDialog: function() {
      this.setData({
        isShow: !this.data.isShow
      });
    },
    updateUserInfo: function(a) {
      var e = this;
      t.util.getUserInfo(function(a) {
        wx.setStorageSync("uid", a.memberInfo.uid), e.hideDialog();
      }, a.detail);
    },
    onShow: function() {
      var a = this;
      "" != a.data.brandid && "" != a.data.brandname && a.setData({
        selectbrand: a.data.brandname
      });
    },
    onLoad: function(a) {
      var e = this;
      t.util.getUserInfo(function(a) {
        a.memberInfo || e.setData({
          isShow: !0
        });
      }), e.firstin(e, a.car);
    },
    selectclass: function(a) {
      var e = this,
        t = e.data.classes[a.detail.value];
      e.setData({
        selectclass: t.name,
        classid: t.id
      });
    },
    selectbrand: function(a) {
      wx.navigateTo({
        url: "/pages/selectscards/index"
      });
    }
  }, a(e, "bindDateChange", function(a) {
    var e = a.detail.value.split("-");
    this.setData({
      selecttime: e[0] + "年" + e[1] + "月",
      selecttime1: a.detail.value
    });
  }), a(e, "getPhoneNumber", function(a) {
    var e = this;
    t.util.request({
      url: "entry/wxapp/Api",
      data: {
        r: "sale.index.userphone",
        m: "monai_market",
        iv: a.detail.iv,
        encryptedData: a.detail.encryptedData
      },
      cachetime: "0",
      success: function(a) {
        e.setData({
          userphone: a.data.data
        });
      }
    });
  }), a(e, "tomap", function() {
    var a = this;
    wx.chooseLocation({
      success: function(e) {
        a.setData({
          mapx: e.latitude,
          mapy: e.longitude,
          mapname: e.address + e.name
        });
      }
    });
  }), a(e, "release", function(a) {
    var e = this,
      i = wx.getStorageSync("uid");
    if (i) {
      e.setData({
        buttscan: !0
      });
      var s = e.data.classid;
      if ("" == s || "undefined" == s || "请选择车辆类型" == s) return t.util.message({
        title: "请选择车辆类型",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var n = e.data.brandid;
      if ("" == n || "undefined" == n || "请选择车辆品牌" == n) return t.util.message({
        title: "请选择车辆品牌",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var r = e.data.selecttime;
      if ("请选择出厂年份" == r || "undefined" == r || "" == e.data.selecttime1) return t.util.message({
        title: "请选择出厂年份",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var d = e.data.vehicletime;
      if ("请选择上牌日期" == d || "undefined" == d) return t.util.message({
        title: "请上牌日期",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var l = e.data.insurance;
      if ("请选择保险到期时间" == l || "undefined" == l) return t.util.message({
        title: "请选择保险到期时间",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      if ("请选择出厂年份" == (r = e.data.selecttime) || "undefined" == r) return t.util.message({
        title: "请选择出厂年份",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var c = a.detail.value.carname;
      if ("" == c || "undefined" == c) return t.util.message({
        title: "请填写汽车名称",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var u = a.detail.value.kilometre;
      if ("" == u || "undefined" == s) return t.util.message({
        title: "请填写公里数",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var o = a.detail.value.price;
      if ("" == o || "undefined" == s) return t.util.message({
        title: "请填写价格",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var m = a.detail.value.exhaust;
      if ("" == m || "undefined" == m) return t.util.message({
        title: "请填写排气量",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var g = e.data.gearboxindex;
      if ("" == g || "undefined" == g) return t.util.message({
        title: "请选择变速箱类型",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var v = a.detail.value.username;
      if ("" == v || "undefined" == s) return t.util.message({
        title: "请填写车主姓名",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var f = a.detail.value.watchcar;
      if ("" == f || "undefined" == f) return t.util.message({
        title: "请填写看车地点（如：北京）",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var h = a.detail.value.phone;
      if ("" == h || "undefined" == s) return t.util.message({
        title: "请填写联系电话，或点击电话授权",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var p = a.detail.value.address;
      if ("" == p || "undefined" == s) return t.util.message({
        title: "请填写车辆地址",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var x = e.data.carsimgs;
      if (x.length < 3) return t.util.message({
        title: "请至少添加3个车辆图文",
        type: "error"
      }), void e.setData({
        buttscan: !1
      });
      var b = {
        r: "sale.salelist.upsale",
        m: "monai_market",
        id: e.data.cardetail.id,
        fomid: a.detail.formId,
        uid: i,
        dodelimgs: e.data.dodelimgs,
        classid: s,
        watchcar: f,
        vehicletime: d,
        exhaust: m,
        insurance: l,
        gearboxindex: g,
        brand: n,
        times: r,
        transnum: e.data.value,
        effluentstand:e.data.effluentstandname,
        times1: e.data.selecttime1,
        kilometre: u,
        price: o,
        carimgs: x,
        username: v,
        phone: h,
        carname: c,
        address: p,
        mapx: e.data.mapx,
        mapy: e.data.mapy
      };
      t.util.request({
        url: "entry/wxapp/Api",
        data: b,
        cachetime: "0",
        success: function(a) {
          a && a.data && 405 == a.data.message ? e.setData({
            isShow: !0,
            buttscan: !1
          }) : (e.delallimgs(), wx.showModal({
            content: a.data.message,
            success: function() {
              wx.navigateBack({});
            }
          }));
        },
        fail: function(a) {
          wx.showModal({
            content: a.data.message,
            success: function() {
              wx.navigateBack({});
            }
          }), e.setData({
            buttscan: !1
          });
        }
      });
    } else e.setData({
      isShow: !0
    });
  }), a(e, "upnotice", function(a) {
    this.data.noticeindex = a.detail.current;
  }), a(e, "retonotice", function() {
    var a = this.data.notice[this.data.noticeindex];
    a && a.id && wx.navigateTo({
      url: "/pages/index/index?id=" + a.id
    });
  }), a(e, "delallimgs", function() {
    var a = this,
      e = a.data.delimgs,
      t = a.data.dodelimgs;
    if (console.log(e), console.log(t), e && e.length > 1)
      for (var i in e) e[i] && a.delthisimg(e[i]);
    if (t && t.length > 1)
      for (var s in t) t[s] && t[s].img && a.delthisimg(t[s].img);
  }), a(e, "delcarsimgs", function(a) {
    var e = this,
      t = a.currentTarget.dataset.index,
      i = e.data.carsimgs;
    if (0 == t && i.length > 1 && ("" != i[t].img || "" != i[t].intro)) return "new" == i[t].id && "" != i[t].img ? e.delthisimg(i[t].img) : ((s = e.data.dodelimgs).push(i[t]),
      e.data.dodelimgs = s, console.log(s)), i.splice(t, 1), void e.setData({
      carsimgs: i
    });
    if (0 != t) {
      var s = e.data.dodelimgs;
      s.push(i[t]), e.data.dodelimgs = s, console.log(s), i.splice(t, 1), e.setData({
        carsimgs: i
      });
    }
  }), a(e, "upcarsimgs", function(a) {
    var e = this,
      i = a.currentTarget.dataset.index;
    e.data.carsimgs.length >= 9 ? t.util.message({
      title: "您添加的图文已经很多了",
      type: "error"
    }) : (e.data.upcarindex = i, t.upimgs({
      scannums: 1,
      filename: "cars",
      success: function(a) {
        e.addinimgs(a[0]);
      }
    }));
  }), a(e, "addinimgs", function(a) {
    var e = this,
      t = e.data.carsimgs,
      i = e.data.upcarindex;
    t[i].img = a.all, t[i].imgshort = a.short, e.setData({
      carsimgs: t
    });
  }), a(e, "upthiscarsimgs", function(a) {
    var e = this,
      t = a.currentTarget.dataset.index,
      i = e.data.carsimgs,
      s = e.data.delimgs;
    s.push(i[t].img), e.data.delimgs = s, console.log(s), i[t].img = "", e.setData({
      carsimgs: i
    });
  }), a(e, "setthisintro", function(a) {
    var e = this,
      t = a.currentTarget.dataset.index;
    e.data.carsimgs[t].intro = a.detail.value;
  }), a(e, "addcarsimgs", function() {
    var a = {
        img: "",
        intro: "",
        imgshort: "",
        id: "new"
      },
      e = this.data.carsimgs;
    e.push(a), this.setData({
      carsimgs: e
    });
  }), a(e, "delthisimg", function(a) {
    t.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_sharing",
        uid: t.getuid(),
        imgurl: a,
        r: "Upimg.delImg"
      }
    });
  }), a(e, "onReady", function() {}), a(e, "onHide", function() {}), a(e, "onUnload", function() {}),
  a(e, "onPullDownRefresh", function() {}), a(e, "onReachBottom", function() {}),
  a(e, "onShareAppMessage", function() {}), e));