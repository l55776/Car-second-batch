module.exports = function(e) {
    var n = {
        literal: "true false null"
    }, i = [ e.QUOTE_STRING_MODE, e.C_NUMBER_MODE ], l = {
        end: ",",
        endsWithParent: !0,
        excludeEnd: !0,
        contains: i,
        keywords: n
    }, t = {
        begin: "{",
        end: "}",
        contains: [ {
            className: "attr",
            begin: /"/,
            end: /"/,
            contains: [ e.BACKSLASH_ESCAPE ],
            illegal: "\\n"
        }, e.inherit(l, {
            begin: /:/
        }) ],
        illegal: "\\S"
    }, a = {
        begin: "\\[",
        end: "\\]",
        contains: [ e.inherit(l) ],
        illegal: "\\S"
    };
    return i.splice(i.length, 0, t, a), {
        contains: i,
        keywords: n,
        illegal: "\\S"
    };
};