var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(t) {
    if ("object" == ("undefined" == typeof exports ? "undefined" : e(exports)) && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).html2json = t();
    }
}(function() {
    function e(e) {
        for (var t = {}, n = e.split(","), r = 0; r < n.length; r++) t[n[r]] = !0;
        return t;
    }
    function t(e) {
        return e.replace(/<\?xml.*\?>\n/, "").replace(/<!doctype.*\>\n/, "").replace(/<!DOCTYPE.*\>\n/, "");
    }
    var n = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, r = /^<\/([-A-Za-z0-9_]+)[^>]*>/, o = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, i = e("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), a = e("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), s = e("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), l = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), d = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), c = e("script,style"), f = function(e, t) {
        function f(e, n) {
            if (n) for (r = m.length - 1; r >= 0 && m[r] != n; r--) ; else var r = 0;
            if (r >= 0) {
                for (var o = m.length - 1; o >= r; o--) t.end && t.end(m[o]);
                m.length = r;
            }
        }
        var u, h, p, m = [], b = e;
        for (m.last = function() {
            return this[this.length - 1];
        }; e; ) {
            if (h = !0, m.last() && c[m.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + m.last() + "[^>]*>"), function(e, n) {
                return n = n.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(n), 
                "";
            }), f(0, m.last()); else if (0 == e.indexOf("\x3c!--") ? (u = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, u)), 
            e = e.substring(u + 3), h = !1) : 0 == e.indexOf("</") ? (p = e.match(r)) && (e = e.substring(p[0].length), 
            p[0].replace(r, f), h = !1) : 0 == e.indexOf("<") && (p = e.match(n)) && (e = e.substring(p[0].length), 
            p[0].replace(n, function(e, n, r, c) {
                if (n = n.toLowerCase(), a[n]) for (;m.last() && s[m.last()]; ) f(0, m.last());
                if (l[n] && m.last() == n && f(0, n), (c = i[n] || !!c) || m.push(n), t.start) {
                    var u = [];
                    r.replace(o, function(e, t) {
                        var n = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : d[t] ? t : "";
                        u.push({
                            name: t,
                            value: n,
                            escaped: n.replace(/(^|[^\\])"/g, '$1\\"')
                        });
                    }), t.start && t.start(n, u, c);
                }
            }), h = !1), h) {
                var g = (u = e.indexOf("<")) < 0 ? e : e.substring(0, u);
                e = u < 0 ? "" : e.substring(u), t.chars && t.chars(g);
            }
            if (e == b) throw "Parse Error: " + e;
            b = e;
        }
        f();
    };
    return function(e) {
        e = t(e);
        var n = [], r = {
            node: "root",
            child: []
        };
        return f(e, {
            start: function(e, t, o) {
                var i = {
                    node: "element",
                    tag: e
                };
                if (0 !== t.length && (i.attr = t.reduce(function(e, t) {
                    var n = t.name, r = t.value;
                    return e[n] ? Array.isArray(e[n]) ? e[n].push(r) : e[n] = [ e[n], r ] : e[n] = r, 
                    e;
                }, {})), o) {
                    var a = n[0] || r;
                    void 0 === a.child && (a.child = []), a.child.push(i);
                } else n.unshift(i);
            },
            end: function(e) {
                var t = n.shift();
                if (t.tag !== e && console.error("invalid state: mismatch end tag"), 0 === n.length) r.child.push(t); else {
                    var o = n[0];
                    void 0 === o.child && (o.child = []), o.child.push(t);
                }
            },
            chars: function(e) {
                var t = {
                    node: "text",
                    text: e
                };
                if (0 === n.length) r.child.push(t); else {
                    var o = n[0];
                    void 0 === o.child && (o.child = []), o.child.push(t);
                }
            },
            comment: function(e) {
                var t = {
                    node: "comment",
                    text: e
                }, r = n[0];
                void 0 === r.child && (r.child = []), r.child.push(t);
            }
        }), r;
    };
});