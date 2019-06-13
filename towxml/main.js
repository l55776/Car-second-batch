function e(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, r = function() {
    function e(e, n) {
        for (var r = 0; r < n.length; r++) {
            var t = n[r];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(n, r, t) {
        return r && e(n.prototype, r), t && e(n, t), n;
    };
}(), t = function() {
    function t(n) {
        e(this, t);
        var r = this;
        n = n || {};
        for (var i in n) r.config[i] = n[i];
        r.m = {};
        var o = {
            html: !0,
            xhtmlOut: !0,
            typographer: !0,
            highlight: function(e, n, t) {
                return r.m.highlight.highlightAuto(e).value;
            }
        };
        global ? (r.m.html2json = require("./lib/html2json"), r.m.highlight = require("./plugins/hljs/index"), 
        r.m.md = require("./lib/markdown-it")(o), r.m.md_sub = require("./plugins/markdown-it-sub"), 
        r.m.md_sup = require("./plugins/markdown-it-sup"), r.m.md_ins = require("./plugins/markdown-it-ins"), 
        r.m.md_mark = require("./plugins/markdown-it-mark")) : window && (r.m.html2json = window.html2json, 
        r.m.highlight = window.hljs, r.m.md = new window.markdownit(o), r.m.md_sub = window.markdownitSub, 
        r.m.md_sup = window.markdownitSup, r.m.md_ins = window.markdownitIns, r.m.md_mark = window.markdownitMark), 
        r.m.md.use(r.m.md_sub), r.m.md.use(r.m.md_sup), r.m.md.use(r.m.md_ins), r.m.md.use(r.m.md_mark), 
        r.wxmlTag = [ "view", "video", "swiper", "block", "swiper-item", "button", "slider", "scroll-view", "movable-area", "movable-view", "text", "progress", "checkbox-group", "label", "checkbox", "form", "switch", "input", "radio-group", "radio", "picker", "picker-view", "switch", "textarea", "navigator", "audio", "image", "map", "canvas", "contact-button" ];
    }
    return r(t, [ {
        key: "md2html",
        value: function(e) {
            return this.m.md.render(e);
        }
    }, {
        key: "html2wxml",
        value: function(e) {
            var n = this, r = /<[^<]*>/gi;
            return e.replace(r, function(e) {
                if ("</" === e.substr(0, 2)) {
                    var r = e.substr(2, e.length - 3).toLowerCase();
                    if (n.isConversion(r)) return "</" + n.newLabel(r) + ">";
                } else {
                    var t = e.substr(1, e.length - 2).split(" "), i = t[0].toLowerCase(), o = "h2w__" + i;
                    if (n.isConversion(i)) {
                        t.splice(0, 1);
                        var a = t.length;
                        (function() {
                            if (a) for (var e = 0; e < a; e++) {
                                var n = t[e], r = /class="/gi;
                                if (r.test(n)) return t[e] = n.replace(r, function(e) {
                                    return e + o + " ";
                                }), !0;
                            }
                            return !1;
                        })() || t.unshift('class="' + o + '"');
                        var s = function() {
                            var e = "";
                            return t.forEach(function(n, r) {
                                e += n + " ";
                            }), e = e.substr(0, e.length - 1);
                        }();
                        return "img" === i ? "<image " + s + "></image>" : "<" + n.newLabel(i) + " " + s + ">" + n.needClose(i);
                    }
                }
                return e;
            });
        }
    }, {
        key: "md2wxml",
        value: function(e) {
            var n = this, r = n.md2html(e);
            return function(e) {
                var n = "";
                return 0 === e.length ? n : (n = e.replace(/&amp;/gi, "&"), n = n.replace(/&lt;/gi, "＜"), 
                n = n.replace(/&gt;/gi, "＞"), n = n.replace(/&nbsp;/g, " "), n = n.replace(/&#39;/g, "'"), 
                n = n.replace(/&quot;/g, '"'));
            }(n.html2wxml(r));
        }
    }, {
        key: "isConversion",
        value: function(e) {
            return !this.wxmlTag.some(function(n, r) {
                return e === n;
            });
        }
    }, {
        key: "needClose",
        value: function(e) {
            var n = "";
            return [ "hr", "br" ].some(function(n, r) {
                return e === n;
            }) && (n = "</view>"), n;
        }
    }, {
        key: "newLabel",
        value: function(e) {
            var n = "view";
            switch (e) {
              case "a":
                n = "navigator";
                break;

              case "span":
              case "b":
              case "strong":
              case "i":
              case "em":
              case "code":
              case "sub":
              case "sup":
              case "g-emoji":
              case "mark":
              case "ins":
                n = "text";
            }
            return n;
        }
    }, {
        key: "toJson",
        value: function(e, r) {
            var t = this, i = "", o = void 0;
            return "markdown" === (r = r || "html") ? i = t.m.html2json(t.md2wxml(e)) : "html" === r && (i = t.m.html2json(t.html2wxml(e))), 
            (o = function(e) {
                for (var r in e) "child" === r && "object" === n(e[r]) && e[r].length && e[r].forEach(function(e, n) {
                    o(e);
                }), "attr" === r && ("string" == typeof e[r].class ? e[r].className = e[r].class : "object" === n(e[r].class) && e[r].class.length && (e[r].className = e[r].class.toString().replace(/,/g, " ")));
            })(i), i.theme = "light", i;
        }
    } ]), t;
}();

module.exports = t;