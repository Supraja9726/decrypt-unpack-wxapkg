var e, s = require("../../../utils/util.js"), t = getApp().globalData.httpUrl;

Page({
    data: {
        displayy_0: "none",
        addresses: [],
        mraddresses1: [],
        ptaddresses1: [],
        mraddresses2: [],
        ptaddresses2: [],
        isFold: !0,
        isFolds: !0,
        sq: 0,
        sqq: 0,
        delete_fuc: ""
    },
    checkboxChange: function(s) {
        var a = s.detail.value.length;
        wx.getStorage({
            key: "userId",
            success: function(d) {
                wx.request({
                    url: t + "skmembermodel/updateAddressIsDefault",
                    data: {
                        wechatUserAddressWechatUserId: d.data,
                        wechatUserAddressIsDefault: a,
                        wechatUserAddressId: s.currentTarget.dataset.addressId,
                        addressType: s.currentTarget.dataset.type
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        e.onLoad();
                    }
                });
            }
        });
    },
    showAll: function(e) {
        this.setData({
            isFold: !this.data.isFold,
            sq: !this.data.sq
        });
    },
    showAlls: function(e) {
        this.setData({
            isFolds: !this.data.isFolds,
            sqq: !this.data.sqq
        });
    },
    onLoad: function(a) {
        e = this, s.getShareInfos(e, t), s.setCompanyId(e, a), s.setStoreId(e), s.setStoreInfo(e), 
        wx.getStorage({
            key: "userId",
            success: function(s) {
                wx.request({
                    url: t + "skmembermodel/getAddress",
                    data: {
                        wechatUserAddressWechatUserId: s.data
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    success: function(s) {
                        var t = s.data[0], a = s.data[1], d = [], o = [], n = [], r = [], c = void 0, l = void 0;
                        for (c in t) if (1 == t[c].wechatUserAddressIsDefault) {
                            var i = [ {
                                name: "mrdz",
                                value: "????????????",
                                checked: !0
                            } ];
                            t[c].checklist = i, d[0] = t[c];
                        } else {
                            var u = [ {
                                name: "mrdz",
                                value: "????????????",
                                checked: !1
                            } ];
                            t[c].checklist = u, n.push(t[c]);
                        }
                        for (l in a) if (1 == a[l].wechatUserAddressIsDefault) {
                            var h = [ {
                                name: "mrdz",
                                value: "????????????",
                                checked: !0
                            } ];
                            a[l].checklist = h, o[0] = a[l];
                        } else {
                            var f = [ {
                                name: "mrdz",
                                value: "????????????",
                                checked: !1
                            } ];
                            a[l].checklist = f, r.push(a[l]);
                        }
                        e.setData({
                            mraddresses1: d,
                            mraddresses2: o,
                            ptaddresses1: n,
                            ptaddresses2: r
                        });
                    }
                });
            }
        });
    },
    onReady: function() {
        console.log("===onReady===");
    },
    closeTk: function() {
        e.setData({
            displa: !1
        });
    },
    onShow: function() {
        e = this, wx.onSocketMessage(function(t) {
            console.log("===========????????????????????????=============="), console.log(t.data), s.getTkInfos(e, t), 
            s.playMusic(e, t);
        }), wx.onSocketClose(function() {
            console.log("=======webSocket?????????========="), wx.getStorage({
                key: "userId",
                success: function(e) {
                    s.conSocket(e.data, t);
                }
            });
        }), console.log("===onShow==="), e.onLoad();
    },
    onHide: function() {
        console.log("===onHide===");
    },
    onUnload: function() {
        console.log("===onUnload==="), s.closeSock();
    },
    onPullDownRefresh: function() {
        console.log("===onPullDownRefresh==="), wx.stopPullDownRefresh(), e = this, setTimeout(function() {
            e.onPullDownRefresh();
        }, 500);
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
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
    addAddress: function(e) {
        wx.getLocation({
            type: "wgs84",
            success: function(s) {
                var t = s;
                wx.setStorage({
                    key: "jwd",
                    data: t
                }), setTimeout(function() {
                    wx.navigateTo({
                        url: "addAddress/addAddress?type=" + e.currentTarget.dataset.type
                    });
                }, 100), console.log(s);
            },
            fail: function(e) {
                console.log("????????????????????????===???", e);
            }
        });
    },
    chkOrder_0: function() {
        console.log("??????????????????");
        var s = this.data.delete_fuc;
        wx.request({
            url: t + "skmembermodel/updateAddress",
            data: {
                wechatUserAddressId: s.currentTarget.dataset.addressId,
                wechatUserAddressDeflg: 1
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(s) {
                e.onLoad();
            }
        });
    },
    chkOrde_0: function() {
        console.log("??????????????????");
    },
    deleteAddress: function(s) {
        e.setData({
            displayy_0: "block",
            carname_0: "?????????????????????????????????",
            titlename_0: "????????????",
            delete_fuc: s
        });
    },
    editAddress: function(e) {
        wx.navigateTo({
            url: "addAddress/addAddress?address=" + e.currentTarget.dataset.addressId + "&type=" + e.currentTarget.dataset.type
        });
    }
});