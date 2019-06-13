var t = getApp();

Page({
    data: {
        headerdata:{top:t.globalData.statusBarHeight},
        isShow: !1,
        buttscan: !1,
        date: "请选择时间",
        address: "",
        cartype: "",
        licheng: "",
        userphone: "",
        carsimgs: [],
        brandid: "",
        brandname: "",
        selectbrand: "请选择品牌",
      carcolorboxs: [{
        name: "白色",
        id: "1"
      }, {
        name: "黑色",
        id: "2"
      }, {
        name: "红色",
        id: "3"
      }, {
        name: "蓝色",
        id: "4"
      }, {
        name: "香槟色",
        id: "5"
      }, {
        name: "银色",
        id: "6"
      }, {
        name: "红色",
        id: "7"
      }, {
        name: "棕色",
        id: "8"
      }, {
        name: "其他",
        id: "9"
      }],
      carcolorname: '请选择车身颜色',
      carcolorindex: 0,
      ispagereturn:false,
      value_default:'',
      region_value: '请选择地区',
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    bindRegionChange: function (e) {
      this.setData({
        region_value: e.detail.value[1]
      })
    },
    cleardetail: function () {
      this.setData({
        selectbrand: "请选择品牌",
        brandid: "",
        brandname: "",
        carcolorname:'请选择车身颜色',
        value_default:'',
        region_value:'',
      });
    },
    selectbrand: function (e) {
      this.data.ispagereturn = true;
      wx.navigateTo({
        url: "/pages/selectscards/index"
      });
    },
    carcolorbox: function (e) {
      var t = this, a = t.data.carcolorboxs[e.detail.value];
      a && t.setData({
        carcolorname: a.name,
        carcolorindex: e.detail.value
      });
    },
    release: function(e) {
        var a = this, i = wx.getStorageSync("uid");
        if (i) {
            if (!a.data.buttscan) {
                a.setData({
                    buttscan: !0
                });
              var pricemin = e.detail.value.pricemin;
              if ("" == pricemin || "undefined" == pricemin) return t.util.message({
                  title: "请输入最低价格",
                  type: "error"
                }), void a.setData({
                  buttscan: !1
                });
              var pricemax = e.detail.value.pricemax;
              if ("" == pricemax || "undefined" == pricemax) return t.util.message({
                title: "请输入最高价格",
                type: "error"
              }), void a.setData({
                buttscan: !1
              });
              if (pricemin > pricemax) return t.util.message({
                title: "最低的价格不能最高价格高",
                type: "error"
              }), void a.setData({
                buttscan: !1
              });
                var s = e.detail.value.address;
                if ("" == s || "undefined" == s || "请输入地点" == s) return t.util.message({
                    title: "请输入地点",
                    type: "error"
                }), void a.setData({
                    buttscan: !1
                });
              var n = a.data.brandid;
              if ("" == n || "undefined" == n || "请选择车辆品牌" == n) return e.util.message({
                title: "请选择车辆品牌",
                type: "error"
              }), void a.setData({
                buttscan: !1
              });
              var r = e.detail.value.date;
                if ("undefined" == r || "" == r) return t.util.message({
                    title: "请输入年份",
                    type: "error"
                }), void a.setData({
                    buttscan: !1
                });
                var o = e.detail.value.licheng;
                if ("" == o || "undefined" == o || "请输入行驶里程" == o) return t.util.message({
                    title: "请输入行驶里程",
                    type: "error"
                }), void a.setData({
                    buttscan: !1
                });
    
              var carcolor = a.data.carcolorname;
              if ("" == carcolor || "undefined" == carcolor) return e.util.message({
                title: "请选择车身颜色",
                type: "error"
              }), void a.setData({
                buttscan: !1
              });
                var u = e.detail.value.phone;
                if ("" == u || "undefined" == u) return t.util.message({
                    title: "请填写联系电话，或点击电话授权",
                    type: "error"
                }), void a.setData({
                    buttscan: !1
                });

                var otherdes = e.detail.value.otherdes;
               
                
                var g = {
                  r: "sale.index.ingujiayc",
                    m: "monai_market",
                    fomid: e.detail.formId,
                    uid: i,
                  pricemin: pricemin,
                  pricemax: pricemax,
                    address: s,
                  brand: n,
                  brand2: a.data.brand2id,
                  brand3: a.data.brand3id,
                  cartype: a.data.brandname,
                    topdate: r,
                    phone: u,
                  carcolor: carcolor,
                    licheng: o,
                    otherdes,
                };
                t.util.request({
                    url: "entry/wxapp/Api",
                    data: g,
                    cachetime: "0",
                    success: function(t) {
                      200 == t.data.message ? (a.setData({
                            buttscan: !1
                      }), wx.showModal({
                        content: "提交成功",
                        cancelText: "去首页",
                        confirmText: "继续添加",
                        success: function (e) {
                          e.confirm ? (a.cleardetail()) : e.cancel && (a.setData({
                            buttscan: !1
                          }), wx.switchTab({
                            url: "/pages/index/index"
                          }));
                        }
                      })) : (console.log(t.data), wx.showToast({
                            title: "提交失败请稍后再试",
                            icon: "none",
                            duration: 2e3
                        }), a.setData({
                            buttscan: !1
                        }));
                    },
                    fail: function(t) {
                      console.log("提交错误",t);
                        wx.showToast({
                          title: t.data.message,
                          icon: "none",
                          duration: 2e3
                        }),a.setData({
                              buttscan: !1
                          });
                    }
                });
            }
        } else a.setData({
            isShow: !0
        });
    },
    getPhoneNumber: function(e) {
        console.log(e);
        var a = this;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                r: "sale.index.userphone",
                m: "monai_market",
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData
            },
            cachetime: "0",
            success: function(t) {
                a.setData({
                    userphone: t.data.data
                });
            }
        });
    },
    upcarsimgs: function(e) {
        var a = this;
        a.data.carsimgs.length >= 3 ? t.util.message({
            title: "您添加的图片已经很多了",
            type: "error"
        }) : t.upimgs({
            scannums: 3,
            filename: "cars",
            success: function(t) {
                for (var e in t) a.addinimgs(t[e]);
            }
        });
    },
    addinimgs: function(t) {
        var e = this, a = e.data.carsimgs, i = {
            img: t.all,
            imgshort: t.short
        };
        a.push(i), e.setData({
            carsimgs: a
        });
    },
    showimgs: function(t) {
        var e = this, a = t.currentTarget.dataset.index, i = e.data.carsimgs;
        wx.previewImage({
            current: i[a].img,
            urls: [ i[a].img ]
        });
    },
    upthiscarsimgs: function(e) {
        var a = this, i = e.currentTarget.dataset.index, s = a.data.carsimgs;
        t.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_sharing",
                uid: t.getuid(),
                imgurl: s[i].img,
                r: "Upimg.delImg"
            }
        }), s.splice(i, 1), a.setData({
            carsimgs: s
        });
    },
    onLoad: function(t) {
      var siteinfo = wx.getStorageSync('siteinfo');
      if (siteinfo){
        this.setData({
          ad_buycar: siteinfo['ad_buycar']
        });
      }
    },
    bindDateChange: function(t) {
        console.log("picker发送选择改变，携带值为", t.detail.value), this.setData({
            date: t.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {
      var e = this;
      console.log('----数据----', e.data.brandname, e.data.brand2id);
      "" != e.data.brandid && "" != e.data.brandname && e.setData({
        selectbrand: e.data.brandname
      });
      if(!e.data.ispagereturn){
        e.cleardetail();
      }
      e.data.ispagereturn = false;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});