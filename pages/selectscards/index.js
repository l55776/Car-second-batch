var a = getApp();

Page({
  data: {
    headerdata: {
      top: a.globalData.statusBarHeight
    },
    toabc: "",
    classes: [],
    max_height: 667,
    pop2open: false,
    pop2style: '',
    pop3open: false,
    pop3style: '',
    brandid: 0,
    brandname: '',
    brand2id: 0,
    brand2name: '',
    brand3id: 0,
    brand3name: '',
    // 当前跳转的品牌类型
    type:''
  },
  search: function() {
    wx.navigateTo({
      url: "/pages/home/searchShop/searchShop"
    });
  },
  onLoad: function(options) {
    this.setData({
      type:options.type
    })
    var t = wx.getSystemInfoSync(),
      e = this;
    a.util.request({
      url: "entry/wxapp/Api",
      data: {
        m: "monai_market",
        r: "sale.index.carsbrand",
        pid: 0
      },
      cachetime: "0",
      success: function(a) {
        console.log(a), e.setData({
          classes: a.data.data,
          max_height: t.windowHeight
        });
      }
    });
  },
  retoabc: function(a) {
    this.setData({
      toabc: a.currentTarget.dataset.abc
    });
  },
  backid: function(t) {
    var _this = this;
    var id = t.currentTarget.dataset.ids;
    var name = t.currentTarget.dataset.name;

    a.util.navigateBack({
      data: {
        brandid: _this.data.brandid,
        brand2id: _this.data.brand2id,
        brand3id: id,
        brandname: `${_this.data.brandname}-${_this.data.brand2name}-${name}`,
        brand_status: 1
      }
    });
  },
  onPop2: function(res) {
    var id = res.currentTarget.dataset.ids,
      _this = this;
    var name = res.currentTarget.dataset.name;

    if (this.data.pop2open) {
      this.setData({
        pop2style: 'transform: translateX(0px);',
        pop2open: false
      });
      if (this.data.pop3open) {
        this.setData({
          pop3style: 'transform: translateX(0px);',
          pop3open: false
        });
      }
      //-------------------
    } else {
      a.util.request({
        url: "entry/wxapp/Api",
        data: {
          m: "monai_market",
          r: "sale.index.carsbrand",
          pid: id
        },
        cachetime: "0",
        success: function(res) {
          console.log('---', res.data.data);
          if (res.data.data == false) {
            console.log("选择二级车牌", name, id);
            a.util.navigateBack({
              data: {
                brandid: id,
                brandname: name,
                brand_status: 1
              }
            });
            _this.setData({
              brandid: id,
              brandname: name
            });
          } else {
            _this.setData({
              pop2style: 'transform: translateX(-85%);',
              pop2open: true,
              classes2: res.data.data,
              brandid: id,
              brandname: name
            });
          }
        }
      });
    }
  },
  onPop3: function(res) {
    var id = res.currentTarget.dataset.ids,
      _this = this;
    var name = res.currentTarget.dataset.name;
    console.log(this.data);
    console.log(id,name);
    if(this.data.type==='search'){
      a.util.navigateBack({
        data: {
          brandid: _this.data.brandid,
          brand2id: id,
          brandname: `${_this.data.brandname}-${name}`,
          brand_status: 1
        }
      });
    }
   

    if (this.data.pop3open) {
      console.log(this.data);
      this.setData({
        pop3style: 'transform: translateX(0px);',
        pop3open: false
      });
    } else {
      a.util.request({
        url: "entry/wxapp/Api",
        data: {
          m: "monai_market",
          r: "sale.index.carsbrand",
          pid: id
        },
        cachetime: "0",
        success: function(res) {
          if (res.data.data == false) {
            console.log("选择三级车牌", name, id);
            a.util.navigateBack({
              data: {
                brandid: _this.data.brandid,
                brand2id: id,
                brandname: `${_this.data.brandname}-${name}`,
                brand_status: 1
              }
            });
            _this.setData({
              brand2id: id,
              brand2name: name
            });
          } else {
            let three_classify = res.data.data;

            // let keys = [];
            // let descdata = {};
            // for (let key in res.data.data) {
            //   keys.push(key);
            // }
            // keys.reverse();
            // for (let key in keys) {
            //   descdata[keys[key] + " "] = res.data.data[keys[key]];
            // }

            var newKey = Object.keys(three_classify).sort();
            var newVal = three_classify[newKey];

            var newObj = {};
            var len = newKey.length;

            for (var i = len - 1; i >= 0; i--) {
              var key = newKey[i];
              var val = three_classify[newKey[i]];
              newObj[key + ' '] = val;
            }

            console.log(newObj);

            _this.setData({
              pop3style: 'transform: translateX(-70%);',
              pop3open: true,
              classes3: newObj,
              brand2id: id,
              brand2name: name
            });
          }
        }
      });
    }
  }
});