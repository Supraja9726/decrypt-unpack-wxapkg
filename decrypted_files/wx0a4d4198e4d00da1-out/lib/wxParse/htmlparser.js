function HTMLParser(e, t) {
    function a(e, a, s, n) {
        if (a = a.toLowerCase(), block[a]) for (;l.last() && inline[l.last()]; ) r("", l.last());
        if (closeSelf[a] && l.last() == a && r("", a), n = empty[a] || !!n, n || l.push(a), 
        t.start) {
            var i = [];
            s.replace(attr, function(e, t) {
                var a = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[t] ? t : "";
                i.push({
                    name: t,
                    value: a,
                    escaped: a.replace(/(^|[^\\])"/g, '$1\\"')
                });
            }), t.start && t.start(a, i, n);
        }
    }
    function r(e, a) {
        if (a) {
            a = a.toLowerCase();
            for (var r = l.length - 1; r >= 0 && l[r] != a; r--) ;
        } else var r = 0;
        if (r >= 0) {
            for (var s = l.length - 1; s >= r; s--) t.end && t.end(l[s]);
            l.length = r;
        }
    }
    var s, n, i, l = [], o = e;
    for (l.last = function() {
        return this[this.length - 1];
    }; e; ) {
        if (n = !0, l.last() && special[l.last()]) e = e.replace(new RegExp("([\\s\\S]*?)</" + l.last() + "[^>]*>"), function(e, a) {
            return a = a.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2"), t.chars && t.chars(a), 
            "";
        }), r("", l.last()); else if (0 == e.indexOf("\x3c!--") ? (s = e.indexOf("--\x3e")) >= 0 && (t.comment && t.comment(e.substring(4, s)), 
        e = e.substring(s + 3), n = !1) : 0 == e.indexOf("</") ? (i = e.match(endTag)) && (e = e.substring(i[0].length), 
        i[0].replace(endTag, r), n = !1) : 0 == e.indexOf("<") && (i = e.match(startTag)) && (e = e.substring(i[0].length), 
        i[0].replace(startTag, a), n = !1), n) {
            s = e.indexOf("<");
            for (var c = ""; 0 === s; ) c += "<", e = e.substring(1), s = e.indexOf("<");
            c += s < 0 ? e : e.substring(0, s), e = s < 0 ? "" : e.substring(s), t.chars && t.chars(c);
        }
        if (e == o) throw "Parse Error: " + e;
        o = e;
    }
    r();
}

function makeMap(e) {
    for (var t = {}, a = e.split(","), r = 0; r < a.length; r++) t[a[r]] = !0;
    return t;
}

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/, endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/, attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g, empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"), block = makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"), inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"), closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"), fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"), special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");

module.exports = HTMLParser;