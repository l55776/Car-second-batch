var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitMark = n();
    }
}(function() {
    return function e(n, t, o) {
        function r(f, s) {
            if (!t[f]) {
                if (!n[f]) {
                    var u = "function" == typeof require && require;
                    if (!s && u) return u(f, !0);
                    if (i) return i(f, !0);
                    var p = new Error("Cannot find module '" + f + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                var l = t[f] = {
                    exports: {}
                };
                n[f][0].call(l.exports, function(e) {
                    var t = n[f][1][e];
                    return r(t || e);
                }, l, l.exports, e, n, t, o);
            }
            return t[f].exports;
        }
        for (var i = "function" == typeof require && require, f = 0; f < o.length; f++) r(o[f]);
        return r;
    }({
        1: [ function(e, n, t) {
            n.exports = function(e) {
                e.inline.ruler.before("emphasis", "mark", function(e, n) {
                    var t, o, r, i, f, s = e.pos, u = e.src.charCodeAt(s);
                    if (n) return !1;
                    if (61 !== u) return !1;
                    if (o = e.scanDelims(e.pos, !0), i = o.length, f = String.fromCharCode(u), 2 > i) return !1;
                    for (i % 2 && (r = e.push("text", "", 0), r.content = f, i--), t = 0; i > t; t += 2) (r = e.push("text", "", 0)).content = f + f, 
                    e.delimiters.push({
                        marker: u,
                        jump: t,
                        token: e.tokens.length - 1,
                        level: e.level,
                        end: -1,
                        open: o.can_open,
                        close: o.can_close
                    });
                    return e.pos += o.length, !0;
                }), e.inline.ruler2.before("emphasis", "mark", function(e) {
                    var n, t, o, r, i, f = [], s = e.delimiters, u = e.delimiters.length;
                    for (n = 0; u > n; n++) 61 === (o = s[n]).marker && -1 !== o.end && (r = s[o.end], 
                    i = e.tokens[o.token], i.type = "mark_open", i.tag = "mark", i.nesting = 1, i.markup = "==", 
                    i.content = "", i = e.tokens[r.token], i.type = "mark_close", i.tag = "mark", i.nesting = -1, 
                    i.markup = "==", i.content = "", "text" === e.tokens[r.token - 1].type && "=" === e.tokens[r.token - 1].content && f.push(r.token - 1));
                    for (;f.length; ) {
                        for (t = (n = f.pop()) + 1; t < e.tokens.length && "mark_close" === e.tokens[t].type; ) t++;
                        n !== --t && (i = e.tokens[t], e.tokens[t] = e.tokens[n], e.tokens[n] = i);
                    }
                });
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});