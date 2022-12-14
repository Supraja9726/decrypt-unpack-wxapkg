var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
} : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

!function(n, t) {
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Ald = t();
}(undefined, function() {
    function n(n) {
        this.app = n;
    }
    function t(t) {
        O = t, this.aldstat = new n(this), y("app", "launch");
    }
    function o(n) {
        if (O = n, C = n.query.ald_share_src, F = n.query.aldsrc || "", j = n.query.ald_share_src, 
        U = Date.now(), A = Date.now(), !tn) {
            I = "" + Date.now() + Math.floor(1e7 * Math.random()), E = !1;
            try {
                wx.setStorageSync("ald_ifo", !1);
            } catch (n) {}
        }
        tn = !1, 0 !== b && Date.now() - b > 3e5 && (T = "" + Date.now() + Math.floor(1e7 * Math.random()), 
        A = Date.now()), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({
            shareTicket: n.shareTicket,
            success: function success(n) {
                G = n, _("event", "ald_share_click", JSON.stringify(n));
            }
        }) : n.query.ald_share_src && _("event", "ald_share_click", 1), "" === K && wx.getSetting({
            withCredentials: !0,
            success: function success(n) {
                if (n.authSetting["scope.userInfo"]) {
                    wx.getUserInfo({
                        withCredentials: !0,
                        success: function success(n) {
                            var t = p();
                            K = n, t.ufo = w(n), q = g(n.userInfo.avatarUrl.split("/")), d(t);
                        }
                    });
                }
            }
        }), y("app", "show");
    }
    function e() {
        b = Date.now(), "" === K && wx.getSetting({
            success: function success(n) {
                n.authSetting["scope.userInfo"] && wx.getUserInfo({
                    withCredentials: !0,
                    success: function success(n) {
                        K = n, q = g(n.userInfo.avatarUrl.split("/"));
                        var t = p();
                        t.ufo = w(n), d(t);
                    }
                });
            }
        }), y("app", "hide");
    }
    function a(n) {
        J++, _("event", "ald_error_message", n);
    }
    function r(n) {
        X = n;
    }
    function i() {
        z = this.route, Y = Date.now(), $ = 0, Z = 0;
    }
    function s() {
        S("page", "hide"), Q = this.route;
    }
    function c() {
        S("page", "unload"), Q = this.route;
    }
    function u() {
        $++;
    }
    function l() {
        Z++;
    }
    function f(n) {
        var t = v(n.path), o = {};
        for (var e in O.query) {
            o[e] = O.query[e];
        }
        var a = "";
        if (a = n.path.indexOf("?") == -1 ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", 
        "" !== t) for (var e in t) {
            o[e] = t[e];
        }
        o.ald_share_src ? o.ald_share_src.indexOf(N) == -1 && o.ald_share_src.length < 200 && (o.ald_share_src = o.ald_share_src + "," + N) : o.ald_share_src = N;
        for (var r in o) {
            r.indexOf("ald") == -1 && (a += r + "=" + o[r] + "&");
        }
        return n.path = a + "ald_share_src=" + o.ald_share_src, _("event", "ald_share_status", n), 
        n;
    }
    function h() {
        function n() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
        }
        return n() + n() + n() + n() + n() + n() + n() + n();
    }
    function d(n) {
        var t = n, o = 0, e = 0, a = function a(r) {
            e++, r ? (n = {}, n.et = Date.now(), n.at = I, n.uu = N, n.v = P, n.ak = t.ak, n.life = t.life, 
            n.ev = t.ev, n.err = "err", n.status = o) : (H++, n.at = I, n.et = Date.now(), n.uu = N, 
            n.v = P, n.ak = M.app_key_ald, n.wsr = O, n.oifo = E, n.rq_c = H), wx.request({
                url: "https://" + R + ".aldwx.com/d.html",
                data: n,
                header: {
                    AldStat: "MiniApp-Stat",
                    waid: M.appid || "",
                    wst: M.appsecret || "",
                    se: L || "",
                    op: k || "",
                    img: q
                },
                method: "GET",
                success: function success(n) {
                    o = n.statusCode, 200 != n.statusCode && e <= 3 && a("errorsend");
                },
                fail: function fail() {
                    e <= 3 && a("errorsend");
                }
            });
        };
        a();
    }
    function p() {
        var n = {};
        for (var t in V) {
            n[t] = V[t];
        }
        return n;
    }
    function g(n) {
        for (var t = "", o = 0; o < n.length; o++) {
            n[o].length > t.length && (t = n[o]);
        }
        return t;
    }
    function w(n) {
        var t = {};
        for (var o in n) {
            "rawData" != o && "errMsg" != o && (t[o] = n[o]);
        }
        return t;
    }
    function v(n) {
        if (n.indexOf("?") == -1) return "";
        var t = {};
        return n.split("?")[1].split("&").forEach(function(n) {
            var o = n.split("=")[1];
            t[n.split("=")[0]] = o;
        }), t;
    }
    function y(n, t) {
        var o = p();
        o.ev = n, o.life = t, o.ec = J, o.st = B, F && (o.qr = F, o.sr = F), C && (o.usr = C), 
        "launch" !== t && (o.ahs = T), "hide" === t && (o.hdr = Date.now() - A, o.dr = Date.now() - U, 
        o.ifo = !!E), d(o);
    }
    function S(n, t) {
        var o = p();
        o.ev = n, o.st = Date.now(), o.life = t, o.pp = z, o.pc = Q, o.dr = Date.now() - B, 
        o.ndr = Date.now() - Y, o.rc = $, o.bc = Z, o.ahs = T, X && "{}" != JSON.stringify(X) && (o.ag = X), 
        F && (o.qr = F, o.sr = F), C && (o.usr = C), W || (nn = z, W = !0, o.ifp = W, o.fp = z), 
        d(o);
    }
    function _(n, t, o) {
        var e = p();
        e.ev = n, e.tp = t, e.st = B, o && (e.ct = o), d(e);
    }
    function m(n, t, o) {
        if (n[t]) {
            var e = n[t];
            n[t] = function(n) {
                o.call(this, n, t), e.call(this, n);
            };
        } else n[t] = function(n) {
            o.call(this, n, t);
        };
    }
    function D(n) {
        var r = {};
        for (var i in n) {
            "onLaunch" !== i && "onShow" !== i && "onHide" !== i && "onError" !== i && "onPageNotFound" !== i && "onUnlaunch" !== i && (r[i] = n[i]);
        }
        r.onLaunch = function(o) {
            t.call(this, o), "function" == typeof n.onLaunch && n.onLaunch.call(this, o);
        }, r.onShow = function(t) {
            o.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);
        }, r.onHide = function() {
            e.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);
        }, r.onError = function(t) {
            a.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t);
        }, r.onUnlaunch = function() {
            n.onUnlaunch && "function" == typeof n.onUnlaunch && n.onUnlaunch.call(this);
        }, r.onPageNotFound = function(t) {
            n.onPageNotFound && "function" == typeof n.onPageNotFound && n.onPageNotFound.call(this, t);
        }, App(r);
    }
    function x(n) {
        var t = {};
        for (var o in n) {
            "onLoad" !== o && "onReady" !== o && "onShow" !== o && "onHide" !== o && "onUnload" !== o && "onPullDownRefresh" !== o && "onReachBottom" !== o && "onShareAppMessage" !== o && "onPageScroll" !== o && "onTabItemTap" !== o && (t[o] = n[o]);
        }
        t.onLoad = function(t) {
            r.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t);
        }, t.onShow = function(t) {
            i.call(this), "function" == typeof n.onShow && n.onShow.call(this, t);
        }, t.onHide = function(t) {
            s.call(this), "function" == typeof n.onHide && n.onHide.call(this, t);
        }, t.onUnload = function(t) {
            c.call(this), "function" == typeof n.onUnload && n.onUnload.call(this, t);
        }, t.onReady = function(t) {
            n.onReady && "function" == typeof n.onReady && n.onReady.call(this, t);
        }, t.onReachBottom = function(t) {
            l(), n.onReachBottom && "function" == typeof n.onReachBottom && n.onReachBottom.call(this, t);
        }, t.onPullDownRefresh = function(t) {
            u(), n.onPullDownRefresh && "function" == typeof n.onPullDownRefresh && n.onPullDownRefresh.call(this, t);
        }, t.onPageScroll = function(t) {
            n.onPageScroll && "function" == typeof n.onPageScroll && n.onPageScroll.call(this, t);
        }, t.onTabItemTap = function(t) {
            n.onTabItemTap && "function" == typeof n.onTabItemTap && n.onTabItemTap.call(this, t);
        }, n.onShareAppMessage && "function" == typeof n.onShareAppMessage && (t.onShareAppMessage = function(t) {
            var o = n.onShareAppMessage.call(this, t);
            return void 0 === o ? (o = {}, o.path = this.route) : void 0 === o.path && (o.path = this.route), 
            f.call(this, o);
        }), Page(t);
    }
    var M = require("../conf"), P = "7.0.0", R = "log", I = "" + Date.now() + Math.floor(1e7 * Math.random()), T = "" + Date.now() + Math.floor(1e7 * Math.random()), A = "", U = 0, b = 0, L = "", k = "", q = "", H = 0, O = "", E = "", N = function() {
        var n = "";
        try {
            n = wx.getStorageSync("aldstat_uuid");
        } catch (t) {
            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
            n = "uuid_getstoragesync";
        }
        if (n) E = !1; else {
            n = h(), E = !0;
            try {
                wx.setStorageSync("aldstat_uuid", n), wx.setStorageSync("ald_ifo", !0);
            } catch (n) {
                n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");
            }
        }
        return n;
    }(), B = Date.now(), C = "", F = "", j = "", J = 0, G = "", K = "", V = {}, W = !1, z = "", Q = "", X = "", Y = "", Z = 0, $ = 0, nn = "", tn = !0;
    !function() {
        wx.request({
            url: "https://" + R + ".aldwx.com/config/app.json",
            header: {
                AldStat: "MiniApp-Stat"
            },
            method: "GET",
            success: function success(n) {
                200 === n.statusCode && (n.data.version != P && console.warn("??????SDK???????????????????????????????????????"), 
                n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error));
            }
        });
    }();
    try {
        var on = wx.getSystemInfoSync();
        V.br = on.brand, V.pm = on.model, V.pr = on.pixelRatio, V.ww = on.windowWidth, V.wh = on.windowHeight, 
        V.lang = on.language, V.wv = on.version, V.wvv = on.platform, V.wsdk = on.SDKVersion, 
        V.sv = on.system;
    } catch (n) {}
    wx.getNetworkType({
        success: function success(n) {
            V.nt = n.networkType;
        }
    }), wx.getSetting({
        success: function success(n) {
            n.authSetting["scope.userLocation"] ? wx.getLocation({
                type: "wgs84",
                success: function success(n) {
                    V.lat = n.latitude, V.lng = n.longitude, V.spd = n.speed;
                }
            }) : M.getLocation && wx.getLocation({
                type: "wgs84",
                success: function success(n) {
                    V.lat = n.latitude, V.lng = n.longitude, V.spd = n.speed;
                }
            });
        }
    }), n.prototype.debug = function(n) {
        _("debug", "0", n);
    }, n.prototype.warn = function(n) {
        _("warn", "1", n);
    }, n.prototype.sendEvent = function(n, t) {
        if ("" !== n && "string" == typeof n && n.length <= 255) {
            if ("string" == typeof t && t.length <= 255) _("event", n, t); else if ("object" == (typeof t === "undefined" ? "undefined" : _typeof(t))) {
                if (JSON.stringify(t).length >= 255) return void console.error("?????????????????????????????????255?????????");
                _("event", n, JSON.stringify(t));
            } else void 0 === t ? _("event", n, !1) : console.error("?????????????????????String,Object??????,???????????????????????????255?????????");
        } else console.error("?????????????????????String?????????????????????255?????????");
    }, n.prototype.sendSession = function(n) {
        if ("" === n || !n) return void console.error("???????????????????????????session_key");
        if ("" === M.appid || "" === M.appsecret) return void console.error("???????????????????????????????????????appid???appsecret???");
        L = n;
        var t = p();
        t.st = Date.now(), t.tp = "session", t.ct = "session", t.ev = "event", "" === K ? wx.getSetting({
            success: function success(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function success(n) {
                        t.ufo = w(n), q = g(n.userInfo.avatarUrl.split("/")), "" !== G && (t.gid = G), d(t);
                    }
                }) : "" !== G ? (t.gid = G, d(t)) : console.warn("???????????????");
            }
        }) : (t.ufo = K, "" !== G && (t.gid = G), d(t));
    }, n.prototype.sendOpenid = function(n) {
        if ("" === n || !n) return void console.error("openID????????????");
        k = n;
        var t = p();
        t.st = Date.now(), t.tp = "openid", t.ev = "event", t.ct = "openid", d(t);
    };
    return M.plugin ? {
        App: D,
        Page: x
    } : function(n) {
        !function() {
            var n = App, h = Page;
            App = function App(r) {
                m(r, "onLaunch", t), m(r, "onShow", o), m(r, "onHide", e), m(r, "onError", a), n(r);
            }, Page = function Page(n) {
                var t = n.onShareAppMessage;
                m(n, "onLoad", r), m(n, "onUnload", c), m(n, "onShow", i), m(n, "onHide", s), m(n, "onReachBottom", l), 
                m(n, "onPullDownRefresh", u), void 0 !== t && (n.onShareAppMessage = function(n) {
                    if (void 0 !== t) {
                        var o = t.call(this, n);
                        return void 0 === o ? (o = {}, o.path = this.route) : void 0 === o.path && (o.path = this.route), 
                        f(o);
                    }
                }), h(n);
            };
        }();
    }();
});