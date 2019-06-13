var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(o) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = o(); else if ("function" == typeof define && define.amd) define([], o); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitSup = o();
    }
}(function() {
    return function e(o, n, r) {
        function t(f, p) {
            if (!n[f]) {
                if (!o[f]) {
                    var i = "function" == typeof require && require;
                    if (!p && i) return i(f, !0);
                    if (u) return u(f, !0);
                    var s = new Error("Cannot find module '" + f + "'");
                    throw s.code = "MODULE_NOT_FOUND", s;
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
                var n, t, u, f = e.posMax, p = e.pos;
                if (94 !== e.src.charCodeAt(p)) return !1;
                if (o) return !1;
                if (p + 2 >= f) return !1;
                for (e.pos = p + 1; e.pos < f; ) {
                    if (94 === e.src.charCodeAt(e.pos)) {
                        n = !0;
                        break;
                    }
                    e.md.inline.skipToken(e);
                }
                return n && p + 1 !== e.pos ? (t = e.src.slice(p + 1, e.pos)).match(/(^|[^\\])(\\\\)*\s/) ? (e.pos = p, 
                !1) : (e.posMax = e.pos, e.pos = p + 1, u = e.push("sup_open", "sup", 1), u.markup = "^", 
                u = e.push("text", "", 0), u.content = t.replace(r, "$1"), u = e.push("sup_close", "sup", -1), 
                u.markup = "^", e.pos = e.posMax + 1, e.posMax = f, !0) : (e.pos = p, !1);
            }
            var r = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;
            o.exports = function(e) {
                e.inline.ruler.after("emphasis", "sup", n);
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});