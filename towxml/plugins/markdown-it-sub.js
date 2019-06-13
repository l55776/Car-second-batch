var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = o(); else if ("function" == typeof define && define.amd) define([], o); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitSub = o();
    }
}(function() {
    return function e(o, n, r) {
        function t(f, i) {
            if (!n[f]) {
                if (!o[f]) {
                    var s = "function" == typeof require && require;
                    if (!i && s) return s(f, !0);
                    if (u) return u(f, !0);
                    var p = new Error("Cannot find module '" + f + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                var c = n[f] = {
                    exports: {}
                };
                o[f][0].call(c.exports, function(e) {
                    var n = o[f][1][e];
                    return t(n || e);
                }, c, c.exports, e, o, n, r);
            }
            return n[f].exports;
        }
        for (var u = "function" == typeof require && require, f = 0; f < r.length; f++) t(r[f]);
        return t;
    }({
        1: [ function(e, o) {
            function n(e, o) {
                var n, t, u, f = e.posMax, i = e.pos;
                if (126 !== e.src.charCodeAt(i)) return !1;
                if (o) return !1;
                if (i + 2 >= f) return !1;
                for (e.pos = i + 1; e.pos < f; ) {
                    if (126 === e.src.charCodeAt(e.pos)) {
                        n = !0;
                        break;
                    }
                    e.md.inline.skipToken(e);
                }
                return n && i + 1 !== e.pos ? (t = e.src.slice(i + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = i, 
                !1) : (e.posMax = e.pos, e.pos = i + 1, u = e.push("sub_open", "sub", 1), u.markup = "~", 
                u = e.push("text", "", 0), u.content = t.replace(r, "$1"), u = e.push("sub_close", "sub", -1), 
                u.markup = "~", e.pos = e.posMax + 1, e.posMax = f, !0) : (e.pos = i, !1);
            }
            var r = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
            o.exports = function(e) {
                e.inline.ruler.after("emphasis", "sub", n);
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});