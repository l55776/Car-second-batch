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
        leftid: 1,
        check_name: "",
        carList: [],
        show: !0,
        name: "",
        title: "没有匹配结果，换个关键词吧！",
        plate_type: 1
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        this.data.name = t.name, this._list(), this._info_set();
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
                2 == a.data.data.plate_type && t.setData({
                    plate_type: 2
                });
            }
        });
    },
    _list: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.index.search_index",
                name: this.data.name,
                leftid: this.data.leftid++
            },
            cachetime: "0",
            success: function(a) {
                if (console.log(a), a.data.data.length > 0) {
                    var i;
                    (i = e.data.carList).push.apply(i, t(a.data.data)), e.setData({
                        carList: e.data.carList
                    });
                  console.log(e.data.carList)
                } else e.data.show = !1;
            }
        });
    },
    onReachBottom: function() {
        this.data.show && this._list();
    },
    detile: function(t) {
        var e = a.getAttr(t, "id");
        wx.navigateTo({
            url: "/pages/home/carMessage/carMessage?id=" + e
        });
    },
    previewImage: function(t) {
        var e = a.getAttr(t, "src"), i = a.getAttr(t, "index");
        console.log(i);
        var r = this, n = [], s = !0, o = !1, c = void 0;
        try {
            for (var d, l = r.data.carList[i].image[Symbol.iterator](); !(s = (d = l.next()).done); s = !0) {
                var u = d.value;
                n.push(u.img_patch);
            }
        } catch (t) {
            o = !0, c = t;
        } finally {
            try {
                !s && l.return && l.return();
            } finally {
                if (o) throw c;
            }
        }
        wx.previewImage({
            current: e,
            urls: n
        });
      
    },
    store: function(t) {
        var e = a.getAttr(t, "uid");
        wx.navigateTo({
            url: "/pages/store/index?uid=" + e
        });
    }
});