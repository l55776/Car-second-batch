var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = n(); else if ("function" == typeof define && define.amd) define([], n); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).markdownitIns = n();
    }
}(function() {
    return function e(n, t, o) {
        function r(s, f) {
            if (!t[s]) {
                if (!n[s]) {
                    var u = "function" == typeof require && require;
                    if (!f && u) return u(s, !0);
                    if (i) return i(s, !0);
                    var p = new Error("Cannot find module '" + s + "'");
                    throw p.code = "MODULE_NOT_FOUND", p;
                }
                var l = t[s] = {
                    exports: {}
                };
                n[s][0].call(l.exports, function(e) {
                    var t = n[s][1][e];
                    return r(t || e);
                }, l, l.exports, e, n, t, o);
            }
            return t[s].exports;
        }
        for (var i = "function" == typeof require && require, s = 0; s < o.length; s++) r(o[s]);
        return r;
    }({
        1: [ function(e, n, t) {
            n.exports = function(e) {
                e.inline.ruler.before("emphasis", "ins", function(e, n) {
                    var t, o, r, i, s, f = e.pos, u = e.src.charCodeAt(f);
                    if (n) return !1;
                    if (43 !== u) return !1;
                    if (o = e.scanDelims(e.pos, !0), i = o.length, s = String.fromCharCode(u), 2 > i) return !1;
                    for (i % 2 && (r = e.push("text", "", 0), r.content = s, i--), t = 0; i > t; t += 2) (r = e.push("text", "", 0)).content = s + s, 
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
                }), e.inline.ruler2.before("emphasis", "ins", function(e) {
                    var n, t, o, r, i, s = [], f = e.delimiters, u = e.delimiters.length;
                    for (n = 0; u > n; n++) 43 === (o = f[n]).marker && -1 !== o.end && (r = f[o.end], 
                    i = e.tokens[o.token], i.type = "ins_open", i.tag = "ins", i.nesting = 1, i.markup = "++", 
                    i.content = "", i = e.tokens[r.token], i.type = "ins_close", i.tag = "ins", i.nesting = -1, 
                    i.markup = "++", i.content = "", "text" === e.tokens[r.token - 1].type && "+" === e.tokens[r.token - 1].content && s.push(r.token - 1));
                    for (;s.length; ) {
                        for (t = (n = s.pop()) + 1; t < e.tokens.length && "ins_close" === e.tokens[t].type; ) t++;
                        n !== --t && (i = e.tokens[t], e.tokens[t] = e.tokens[n], e.tokens[n] = i);
                    }
                });
            };
        }, {} ]
    }, {}, [ 1 ])(1);
});