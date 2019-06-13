var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function(n) {
    var t = "object" == ("undefined" == typeof window ? "undefined" : e(window)) && window || "object" == ("undefined" == typeof self ? "undefined" : e(self)) && self;
    "undefined" != typeof exports ? n(exports) : t && (t.hljs = n({}), "function" == typeof define && define.amd && define([], function() {
        return t.hljs;
    }));
}(function(e) {
    function n(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function t(e) {
        return e.nodeName.toLowerCase();
    }
    function r(e, n) {
        var t = e && e.exec(n);
        return t && 0 === t.index;
    }
    function a(e) {
        return N.test(e);
    }
    function i(e) {
        var n, t, r, i, s = e.className + " ";
        if (s += e.parentNode ? e.parentNode.className : "", t = w.exec(s)) return m(t[1]) ? t[1] : "no-highlight";
        for (n = 0, r = (s = s.split(/\s+/)).length; n < r; n++) if (i = s[n], a(i) || m(i)) return i;
    }
    function s(e) {
        var n, t = {}, r = Array.prototype.slice.call(arguments, 1);
        for (n in e) t[n] = e[n];
        return r.forEach(function(e) {
            for (n in e) t[n] = e[n];
        }), t;
    }
    function o(e) {
        var n = [];
        return function e(r, a) {
            for (var i = r.firstChild; i; i = i.nextSibling) 3 === i.nodeType ? a += i.nodeValue.length : 1 === i.nodeType && (n.push({
                event: "start",
                offset: a,
                node: i
            }), a = e(i, a), t(i).match(/br|hr|img|input/) || n.push({
                event: "stop",
                offset: a,
                node: i
            }));
            return a;
        }(e, 0), n;
    }
    function l(e, r, a) {
        function i() {
            return e.length && r.length ? e[0].offset !== r[0].offset ? e[0].offset < r[0].offset ? e : r : "start" === r[0].event ? e : r : e.length ? e : r;
        }
        function s(e) {
            c += "<" + t(e) + b.map.call(e.attributes, function(e) {
                return " " + e.nodeName + '="' + n(e.value).replace('"', "&quot;") + '"';
            }).join("") + ">";
        }
        function o(e) {
            c += "</" + t(e) + ">";
        }
        function l(e) {
            ("start" === e.event ? s : o)(e.node);
        }
        for (var u = 0, c = "", g = []; e.length || r.length; ) {
            var f = i();
            if (c += n(a.substring(u, f[0].offset)), u = f[0].offset, f === e) {
                g.reverse().forEach(o);
                do {
                    l(f.splice(0, 1)[0]), f = i();
                } while (f === e && f.length && f[0].offset === u);
                g.reverse().forEach(s);
            } else "start" === f[0].event ? g.push(f[0].node) : g.pop(), l(f.splice(0, 1)[0]);
        }
        return c + n(a.substr(u));
    }
    function u(e) {
        return e.variants && !e.cached_variants && (e.cached_variants = e.variants.map(function(n) {
            return s(e, {
                variants: null
            }, n);
        })), e.cached_variants || e.endsWithParent && [ s(e) ] || [ e ];
    }
    function c(e) {
        function n(e) {
            return e && e.source || e;
        }
        function t(t, r) {
            return new RegExp(n(t), "m" + (e.case_insensitive ? "i" : "") + (r ? "g" : ""));
        }
        function r(a, i) {
            if (!a.compiled) {
                if (a.compiled = !0, a.keywords = a.keywords || a.beginKeywords, a.keywords) {
                    var s = {}, o = function(n, t) {
                        e.case_insensitive && (t = t.toLowerCase()), t.split(" ").forEach(function(e) {
                            var t = e.split("|");
                            s[t[0]] = [ n, t[1] ? Number(t[1]) : 1 ];
                        });
                    };
                    "string" == typeof a.keywords ? o("keyword", a.keywords) : h(a.keywords).forEach(function(e) {
                        o(e, a.keywords[e]);
                    }), a.keywords = s;
                }
                a.lexemesRe = t(a.lexemes || /\w+/, !0), i && (a.beginKeywords && (a.begin = "\\b(" + a.beginKeywords.split(" ").join("|") + ")\\b"), 
                a.begin || (a.begin = /\B|\b/), a.beginRe = t(a.begin), a.end || a.endsWithParent || (a.end = /\B|\b/), 
                a.end && (a.endRe = t(a.end)), a.terminator_end = n(a.end) || "", a.endsWithParent && i.terminator_end && (a.terminator_end += (a.end ? "|" : "") + i.terminator_end)), 
                a.illegal && (a.illegalRe = t(a.illegal)), null == a.relevance && (a.relevance = 1), 
                a.contains || (a.contains = []), a.contains = Array.prototype.concat.apply([], a.contains.map(function(e) {
                    return u("self" === e ? a : e);
                })), a.contains.forEach(function(e) {
                    r(e, a);
                }), a.starts && r(a.starts, i);
                var l = a.contains.map(function(e) {
                    return e.beginKeywords ? "\\.?(" + e.begin + ")\\.?" : e.begin;
                }).concat([ a.terminator_end, a.illegal ]).map(n).filter(Boolean);
                a.terminators = l.length ? t(l.join("|"), !0) : {
                    exec: function() {
                        return null;
                    }
                };
            }
        }
        r(e);
    }
    function g(e, t, a, i) {
        function s(e, n) {
            var t, a;
            for (t = 0, a = n.contains.length; t < a; t++) if (r(n.contains[t].beginRe, e)) return n.contains[t];
        }
        function o(e, n) {
            if (r(e.endRe, n)) {
                for (;e.endsParent && e.parent; ) e = e.parent;
                return e;
            }
            if (e.endsWithParent) return o(e.parent, n);
        }
        function l(e, n) {
            return !a && r(n.illegalRe, e);
        }
        function u(e, n) {
            var t = R.case_insensitive ? n[0].toLowerCase() : n[0];
            return e.keywords.hasOwnProperty(t) && e.keywords[t];
        }
        function d(e, n, t, r) {
            var a = '<span class="' + (r ? "" : x.classPrefix);
            return (a += e + '">') + n + (t ? "" : M);
        }
        function E() {
            var e, t, r, a;
            if (!w.keywords) return n(S);
            for (a = "", t = 0, w.lexemesRe.lastIndex = 0, r = w.lexemesRe.exec(S); r; ) a += n(S.substring(t, r.index)), 
            (e = u(w, r)) ? (C += e[1], a += d(e[0], n(r[0]))) : a += n(r[0]), t = w.lexemesRe.lastIndex, 
            r = w.lexemesRe.exec(S);
            return a + n(S.substr(t));
        }
        function p() {
            var e = "string" == typeof w.subLanguage;
            if (e && !_[w.subLanguage]) return n(S);
            var t = e ? g(w.subLanguage, S, !0, y[w.subLanguage]) : f(S, w.subLanguage.length ? w.subLanguage : void 0);
            return w.relevance > 0 && (C += t.relevance), e && (y[w.subLanguage] = t.top), d(t.language, t.value, !1, !0);
        }
        function v() {
            O += null != w.subLanguage ? p() : E(), S = "";
        }
        function b(e) {
            O += e.className ? d(e.className, "", !0) : "", w = Object.create(e, {
                parent: {
                    value: w
                }
            });
        }
        function h(e, n) {
            if (S += e, null == n) return v(), 0;
            var t = s(n, w);
            if (t) return t.skip ? S += n : (t.excludeBegin && (S += n), v(), t.returnBegin || t.excludeBegin || (S = n)), 
            b(t, n), t.returnBegin ? 0 : n.length;
            var r = o(w, n);
            if (r) {
                var a = w;
                a.skip ? S += n : (a.returnEnd || a.excludeEnd || (S += n), v(), a.excludeEnd && (S = n));
                do {
                    w.className && (O += M), w.skip || (C += w.relevance), w = w.parent;
                } while (w !== r.parent);
                return r.starts && b(r.starts, ""), a.returnEnd ? 0 : n.length;
            }
            if (l(n, w)) throw new Error('Illegal lexeme "' + n + '" for mode "' + (w.className || "<unnamed>") + '"');
            return S += n, n.length || 1;
        }
        var R = m(e);
        if (!R) throw new Error('Unknown language: "' + e + '"');
        c(R);
        var N, w = i || R, y = {}, O = "";
        for (N = w; N !== R; N = N.parent) N.className && (O = d(N.className, "", !0) + O);
        var S = "", C = 0;
        try {
            for (var L, A, B = 0; w.terminators.lastIndex = B, L = w.terminators.exec(t); ) A = h(t.substring(B, L.index), L[0]), 
            B = L.index + A;
            for (h(t.substr(B)), N = w; N.parent; N = N.parent) N.className && (O += M);
            return {
                relevance: C,
                value: O,
                language: e,
                top: w
            };
        } catch (e) {
            if (e.message && -1 !== e.message.indexOf("Illegal")) return {
                relevance: 0,
                value: n(t)
            };
            throw e;
        }
    }
    function f(e, t) {
        t = t || x.languages || h(_);
        var r = {
            relevance: 0,
            value: n(e)
        }, a = r;
        return t.filter(m).forEach(function(n) {
            var t = g(n, e, !1);
            t.language = n, t.relevance > a.relevance && (a = t), t.relevance > r.relevance && (a = r, 
            r = t);
        }), a.language && (r.second_best = a), r;
    }
    function d(e) {
        return x.tabReplace || x.useBR ? e.replace(y, function(e, n) {
            return x.useBR && "\n" === e ? "<br>" : x.tabReplace ? n.replace(/\t/g, x.tabReplace) : "";
        }) : e;
    }
    function E(e, n, t) {
        var r = n ? R[n] : t, a = [ e.trim() ];
        return e.match(/\bhljs\b/) || a.push("hljs"), -1 === e.indexOf(r) && a.push(r), 
        a.join(" ").trim();
    }
    function p(e) {
        var n, t, r, s, u, c = i(e);
        a(c) || (x.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 
        n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e, 
        u = n.textContent, r = c ? g(c, u, !0) : f(u), (t = o(n)).length && (s = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 
        s.innerHTML = r.value, r.value = l(t, o(s), u)), r.value = d(r.value), e.innerHTML = r.value, 
        e.className = E(e.className, c, r.language), e.result = {
            language: r.language,
            re: r.relevance
        }, r.second_best && (e.second_best = {
            language: r.second_best.language,
            re: r.second_best.relevance
        }));
    }
    function v() {
        if (!v.called) {
            v.called = !0;
            var e = document.querySelectorAll("pre code");
            b.forEach.call(e, p);
        }
    }
    function m(e) {
        return e = (e || "").toLowerCase(), _[e] || _[R[e]];
    }
    var b = [], h = Object.keys, _ = {}, R = {}, N = /^(no-?highlight|plain|text)$/i, w = /\blang(?:uage)?-([\w-]+)\b/i, y = /((^(<[^>]+>|\t|)+|(?:\n)))/gm, M = "</span>", x = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    };
    return e.highlight = g, e.highlightAuto = f, e.fixMarkup = d, e.highlightBlock = p, 
    e.configure = function(e) {
        x = s(x, e);
    }, e.initHighlighting = v, e.initHighlightingOnLoad = function() {
        addEventListener("DOMContentLoaded", v, !1), addEventListener("load", v, !1);
    }, e.registerLanguage = function(n, t) {
        var r = _[n] = t(e);
        r.aliases && r.aliases.forEach(function(e) {
            R[e] = n;
        });
    }, e.listLanguages = function() {
        return h(_);
    }, e.getLanguage = m, e.inherit = s, e.IDENT_RE = "[a-zA-Z]\\w*", e.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*", 
    e.NUMBER_RE = "\\b\\d+(\\.\\d+)?", e.C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", 
    e.BINARY_NUMBER_RE = "\\b(0b[01]+)", e.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", 
    e.BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }, e.APOS_STRING_MODE = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    }, e.QUOTE_STRING_MODE = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    }, e.PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }, e.COMMENT = function(n, t, r) {
        var a = e.inherit({
            className: "comment",
            begin: n,
            end: t,
            contains: []
        }, r || {});
        return a.contains.push(e.PHRASAL_WORDS_MODE), a.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            relevance: 0
        }), a;
    }, e.C_LINE_COMMENT_MODE = e.COMMENT("//", "$"), e.C_BLOCK_COMMENT_MODE = e.COMMENT("/\\*", "\\*/"), 
    e.HASH_COMMENT_MODE = e.COMMENT("#", "$"), e.NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE,
        relevance: 0
    }, e.C_NUMBER_MODE = {
        className: "number",
        begin: e.C_NUMBER_RE,
        relevance: 0
    }, e.BINARY_NUMBER_MODE = {
        className: "number",
        begin: e.BINARY_NUMBER_RE,
        relevance: 0
    }, e.CSS_NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0
    }, e.REGEXP_MODE = {
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [ e.BACKSLASH_ESCAPE, {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [ e.BACKSLASH_ESCAPE ]
        } ]
    }, e.TITLE_MODE = {
        className: "title",
        begin: e.IDENT_RE,
        relevance: 0
    }, e.UNDERSCORE_TITLE_MODE = {
        className: "title",
        begin: e.UNDERSCORE_IDENT_RE,
        relevance: 0
    }, e.METHOD_GUARD = {
        begin: "\\.\\s*" + e.UNDERSCORE_IDENT_RE,
        relevance: 0
    }, e;
});