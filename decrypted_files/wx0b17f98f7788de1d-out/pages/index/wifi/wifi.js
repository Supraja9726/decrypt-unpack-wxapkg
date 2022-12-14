var e, t = require("../../../utils/util.js"), o = getApp(), a = o.globalData.httpUrl;

Page({
    data: {
        wifi_password: "",
        wifi_name: "",
        netWorkType: "",
        display: "none"
    },
    goToUser: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function(o) {
        e = this, "1" == o.secondIn ? e.setData({
            secondIn: !0
        }) : e.setData({
            secondIn: !1
        });
        var s = decodeURIComponent(o.scene);
        if ("undefined" != s && void 0 != s && null != s && "null" != s) {
            var n = s.split(",")[0].replace('"', "");
            s.split(",")[1].replace('"', "");
            e.setData({
                scene: s,
                saoma: !0
            }), wx.request({
                url: a + "skstoremodel/findStoreById",
                data: {
                    pid: n
                },
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded"
                },
                success: function(s) {
                    e.setData({
                        storeInfo: s.data
                    }), wx.setStorage({
                        key: "storeInfo",
                        data: s.data
                    }), wx.setStorage({
                        key: "storeName",
                        data: s.data.storeInfoName
                    }), wx.setNavigationBarTitle({
                        title: s.data.storeInfoName
                    });
                    var n = s.data.storeInfoStoreId;
                    e.setData({
                        storeId: n
                    }), wx.setStorageSync("storeId", n), t.getShareInfos(e, a), e.resendIndex(n), t.getShareInfos(e, a), 
                    t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e), t.getWifiDates(e, a);
                }
            });
        } else t.getShareInfos(e, a), t.setCompanyId(e, o), t.setStoreId(e), t.setStoreInfo(e), 
        t.getWifiDates(e, a);
    },
    resendIndex: function(t) {
        e.setData({
            dcFlg: !0,
            orderType: "D"
        }), wx.request({
            url: a + "skstoremodel/findCompanyByAppid",
            data: {
                xcxAppid: o.globalData.appId
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                wx.setStorage({
                    key: "companyInfo",
                    data: e.data
                }), wx.setStorage({
                    key: "companyId",
                    data: e.data.companyInfoId
                });
            }
        }), e.data.secondIn ? wx.getStorage({
            key: "userId",
            success: function(e) {
                e.data;
            }
        }) : wx.getStorage({
            key: "code",
            success: function(s) {
                if ("" != s.data && null != s.data && void 0 != s.data && "undefined" != s.data && "null" != s.data) {
                    e.setData({
                        code: s.data
                    });
                    var n = s.data;
                    wx.getSetting({
                        success: function(s) {
                            if (s.authSetting["scope.userInfo"]) console.log("============?????????==============="), 
                            wx.getUserInfo({
                                success: function(s) {
                                    e.setData({
                                        userInfo: s.userInfo
                                    }), wx.setStorage({
                                        key: "userName",
                                        data: s.userInfo.nickName
                                    }), wx.request({
                                        url: a + "skmembermodel/getOpenidS",
                                        data: {
                                            code: n,
                                            AppID: o.globalData.appId,
                                            Secret: o.globalData.Secret,
                                            storeUuid: t,
                                            wxUserNickName: s.userInfo.nickName,
                                            headImgUrl: e.data.userInfo.avatarUrl
                                        },
                                        method: "POST",
                                        header: {
                                            "content-type": "application/x-www-form-urlencoded"
                                        },
                                        success: function(e) {
                                            var o = e.data.wechatUser.wechatUserId;
                                            if (null != e.data.openid && "" != e.data.openid) {
                                                var a = e.data.wechatUser.wechatUserStoreIdentity;
                                                wx.setStorage({
                                                    key: "StoreIdentity",
                                                    data: a
                                                }), wx.setStorage({
                                                    key: "session_key",
                                                    data: e.data.session_key
                                                }), wx.setStorage({
                                                    key: "openId",
                                                    data: e.data.openid
                                                }), wx.setStorage({
                                                    key: "userId",
                                                    data: o
                                                }), wx.setStorage({
                                                    key: "storeId",
                                                    data: t
                                                });
                                            } else wx.showToast({
                                                title: "????????????"
                                            });
                                        }
                                    });
                                },
                                fali: function(e) {}
                            }); else {
                                console.log("==============?????????=================");
                                var i = "";
                                i = e.data.storeInfo.storeInfoHeadImgUrl, wx.reLaunch({
                                    url: "../../welcome/accredit/accredit?data=" + n + "&store_uuid=" + t + "&imgurl=" + i + "&goWifi=true&scene=" + e.data.scene,
                                    success: function(e) {},
                                    fail: function(e) {}
                                });
                            }
                        },
                        fail: function(e) {}
                    });
                } else wx.getStorage({
                    key: "userId",
                    success: function(o) {
                        if (o.data) o.data; else e.resendIndex(t);
                    },
                    fail: function() {
                        e.resendIndex(t);
                    }
                });
            },
            fail: function(o) {
                e.resendIndex(t);
            }
        });
    },
    onReady: function() {},
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(o) {
            console.log("===========????????????????????????=============="), console.log(o.data), t.getTkInfos(e, o), 
            t.playMusic(e, o);
        }), e = this, wx.onSocketClose(function() {
            console.log("=======webSocket?????????========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    t.conSocket(e.data, a);
                }
            });
        });
    },
    onHide: function() {},
    onUnload: function() {
        t.closeSock();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return console.log("=========onShareAppMessage==========="), {
            title: e.data.shareTitle,
            desc: "",
            imageUrl: e.data.shareImgUrl,
            path: "/pages/index/index?storeId=" + e.data.storeId + "&companyId=" + e.data.companyId,
            success: function(e) {
                console.log("????????????");
            },
            fail: function(e) {
                console.log("????????????");
            }
        };
    },
    btn_lianjie: function(t) {
        "" == e.data.wifi_name && "" == e.data.wifi_password ? wx.showToast({
            title: "???????????????wifi"
        }) : wx.getSystemInfo({
            success: function(t) {
                console.log(t.platform + "??????"), console.log(t.system + "??????");
                var o = "";
                if ("android" == t.platform && (o = parseInt(t.system.substr(8))), "ios" == t.platform && (o = parseInt(t.system.substr(4))), 
                console.log(o + "?????????????????????"), "android" == t.platform && o < 6) wx.showToast({
                    title: "??????????????????"
                }); else {
                    if ("ios" == t.platform && o < 11) return console.log("================?????????================"), 
                    void wx.showToast({
                        title: "??????????????????"
                    });
                    console.log("=================???????????????==============="), e.startWifi();
                }
            }
        });
    },
    startWifi: function() {
        console.log("=================???????????????===============");
        var e = this;
        wx.startWifi({
            success: function() {
                e.Connected();
            },
            fail: function(e) {
                console.log(e.errMsg + "????????????"), wx.showToast({
                    title: "??????????????????"
                });
            }
        });
    },
    Connected: function() {
        console.log("=================??????????????????==============="), console.log("??????=======???" + e.data.wifi_name), 
        console.log("??????=======???" + e.data.wifi_password), wx.connectWifi({
            SSID: e.data.wifi_name,
            password: e.data.wifi_password,
            success: function(e) {
                console.log("=================????????????==============="), wx.showToast({
                    title: "wifi????????????"
                });
            },
            fail: function(t) {
                console.log("??????", t.errCode), console.log("=================????????????==============="), 
                console.log(t.errMsg + "????????????"), t.errCode && e.setData({
                    display: "block",
                    titlename: "????????????",
                    carname: "?????????WLAN!"
                });
            }
        });
    },
    chkOrder: function(t) {
        wx.setClipboardData({
            data: e.data.wifi_password,
            success: function(e) {}
        });
    }
});