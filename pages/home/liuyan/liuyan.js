function t(t) {
    if (Array.isArray(t)) {
        for (var a = 0, i = Array(t.length); a < t.length; a++) i[a] = t[a];
        return i;
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
        title: "暂无留言内容"
    },
    search: function() {
        wx.navigateTo({
            url: "/pages/home/searchShop/searchShop"
        });
    },
    onLoad: function(t) {
        this._list();
    },
    _list: function() {
        var i = this;
        console.log(wx.getStorageSync("uid")), a.util.request({
            url: "entry/wxapp/Api",
            data: {
                m: "monai_market",
                r: "home.index.wordList",
                car_uid: wx.getStorageSync("uid"),
                leftid: this.data.leftid++
            },
            cachetime: "0",
            success: function(a) {
                if (console.log(a.data), a.data.data.length > 0) {
                    var r;
                    (r = i.data.carList).push.apply(r, t(a.data.data));
                    var e = !0, n = !1, s = void 0;
                    try {
                        for (var o, c = i.data.carList[Symbol.iterator](); !(e = (o = c.next()).done); e = !0) {
                            var d = o.value, l = 28 * d.content.length / 588;
                            l < 3 ? d.length = 2 : l > 3 && (d.length = 3);
                        }
                    } catch (t) {
                        n = !0, s = t;
                    } finally {
                        try {
                            !e && c.return && c.return();
                        } finally {
                            if (n) throw s;
                        }
                    }
                    i.setData({
                        carList: i.data.carList
                    });
                } else i.data.show = !1;
            }
        });
    },
    onReachBottom: function() {
        this.data.show && this._list();
    },
    clone: function(t) {
        var i = a.getAttr(t, "index");
        this.data.carList[i].length = 3, this.setData({
            carList: this.data.carList
        });
    },
    open: function(t) {
        var i = a.getAttr(t, "index");
        this.data.carList[i].length = 4, this.setData({
            carList: this.data.carList
        });
    }
});