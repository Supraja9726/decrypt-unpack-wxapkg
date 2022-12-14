var t = getApp(), a = (require("../../components/utils/imgutil.js"), require("../../components/utils/util.js")), e = require("../shop/ShopUtil.js"), s = require("../../common.js");

Page({
    url: !1,
    onShareAppMessage: function() {
        return t.shareAppMessage({
            url: this.url,
            title: this.data.pinTuanProDetail.name
        });
    },
    data: {
        currentTab: 0,
        baseUrl: t.globalData.siteBaseUrl,
        bannerHeight: 300,
        buttonClicked: !1,
        interval: null,
        intervalTime: {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        },
        showSku: !1,
        attrkeys: [],
        skuMsg: [],
        skuid: 0,
        productImgs: [],
        skuInventory: 0,
        pinTuanInventory: 0,
        buyCountLimit: 0,
        price: 0,
        pintuan_price: 0,
        selectedSkuArr: [],
        selectValArr: [],
        selectSkuDes: [],
        buyCount: 1,
        newSelectedSkuArr: [],
        isSelectAllAttr: !1,
        AttrValSmallImg: "",
        canClickAdd: !0,
        canClickDes: !1,
        showMask: !1,
        hasSkuInventoryArr: [],
        noSkuInventoryArr: [],
        hasInventoryPathArr: [],
        cannotSelect: [],
        getPageFlag: !0
    },
    onLoad: function(a) {
        var e = this;
        e.url = t.getPageUrl(e, a), s.initCommonModules(), this.setData({
            queryparams: a
        }), console.log(a), this.setData({
            buyCountLimit: this.data.queryparams.buycount,
            AttrValSmallImg: this.data.queryparams.img,
            price: this.data.queryparams.price,
            pinTuanInventory: this.data.queryparams.storenum
        }), this.loadProDetailMsg();
    },
    onShow: function() {
        this.selectHalf(this.data.selectValArr.splice(0, this.data.selectValArr.length - 1)), 
        this.loadProductInfo();
    },
    onPageScroll: function() {},
    loadProductInfo: function() {
        var a = this, e = 0;
        a.data.queryparams.proid && (e = a.data.queryparams.proid), t.sendRequest({
            url: "/index.php?c=Front/WxApp/JsonApi&a=getProductInfo&id=" + e + "&updateHits=1",
            method: "GET",
            success: function(t) {
                t.success ? a.setData({
                    collection: 1 == t.info.collection
                }) : console.log("getProductInfo fail???" + t.msg);
            },
            fail: function(t) {
                console.log("getProductInfo fail");
            }
        });
    },
    isLogin: function() {
        setTimeout(function() {
            t.globalData.WebUserID || e.showRegUI();
        }, 2e3);
    },
    loadProDetailMsg: function() {
        var e = this;
        t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductInfo&pintuan_id=" + e.data.queryparams.pintuan_id + "&pintuan_product_id=" + e.data.queryparams.id,
            method: "GET",
            success: function(s) {
                if (s.success) {
                    for (var r = s.data.img_src, n = 0; n < r.length; n++) r[n] = t.globalData.siteBaseUrl + r[n];
                    e.setData({
                        pinTuanProDetail: s.data,
                        productImgs: r
                    }), s.info.Content = a.replaceRichHtml(s.info.Content) || "";
                    var i = e.data.pinTuanProDetail.pintuan_config.remaining_time;
                    e.data.interval = setInterval(function() {
                        --i <= 0 && (i = 0, clearInterval(e.data.interval)), e.forMatterTime(i);
                    }, 1e3);
                } else console.log("getpinTuanProDetail fail???" + s.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProDetail fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getProductSku&pintuan_id=" + e.data.queryparams.pintuan_id + "&product_id=" + e.data.queryparams.proid,
            method: "GET",
            success: function(t) {
                if (t.success) if (0 == t.data.attrkeys.length) e.setData({
                    showSku: !1
                }); else {
                    e.setData({
                        showSku: !0
                    });
                    for (r = 0; r < t.data.attrkeys.length; r++) {
                        t.data.attrkeys[r].selectArr = [];
                        for (l = 0; l < t.data.attrkeys[r].attrVals.length; l++) t.data.attrkeys[r].attrVals[l].isSelect = !1, 
                        t.data.attrkeys[r].attrVals[l].canSelect = !0;
                    }
                    for (var a = [], s = [], r = 0; r < t.data.skus.length; r++) {
                        var n = t.data.skus[r];
                        0 != n.ProductQuantity ? a.push(n) : s.push(n);
                    }
                    for (l = 0; l < a.length; l++) for (var i = 0; i < a[l].Path.length; i++) -1 == e.data.hasInventoryPathArr.indexOf(a[l].Path[i]) && e.data.hasInventoryPathArr.push(a[l].Path[i]);
                    for (r = 0; r < t.data.attrkeys.length; r++) for (var l = 0; l < t.data.attrkeys[r].attrVals.length; l++) -1 == e.data.hasInventoryPathArr.indexOf(t.data.attrkeys[r].attrVals[l].AttrValID) && (t.data.attrkeys[r].attrVals[l].canSelect = !1, 
                    e.setData({
                        noKuCunId: t.data.attrkeys[r].attrVals[l].AttrValID
                    }));
                    e.setData({
                        attrkeys: t.data.attrkeys,
                        skuMsg: t.data.skus,
                        AttrValSmallImg: e.data.AttrValSmallImg,
                        hasSkuInventoryArr: a,
                        noSkuInventoryArr: s,
                        hasInventoryPathArr: e.data.hasInventoryPathArr
                    });
                } else console.log("getpinTuanProSku fail???" + t.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProSku fail");
            }
        }), t.sendRequest({
            url: "/index.php?c=front/WxApp/pintuan&a=getPintuanRecommend&pintuan_id=" + e.data.queryparams.pintuan_id + "&pintuan_product_id=" + e.data.queryparams.id,
            method: "GET",
            success: function(t) {
                if (t.success) {
                    var a = t.data;
                    console.log(t.data), a.length > 0 && (e.data.pintuan_end_time = setInterval(function() {
                        for (var t = 0; t < a.length; t++) {
                            var s = --a[t].pintuan_remain_time;
                            s <= 0 && (s = 0);
                            var r = Math.floor(s / 60 / 60), n = Math.floor((s - 60 * r * 60) / 60), i = s % 60;
                            r < 10 && (r = "0" + r), n < 10 && (n = "0" + n), i < 10 && (i = "0" + i), a[t].leftTimeStr = r + ":" + n + ":" + i;
                        }
                        s <= 0 && clearInterval(e.data.pintuan_end_time), e.setData({
                            groupList: a
                        });
                    }, 1e3));
                } else console.log("getpinTuanProSku fail???" + t.msg);
            },
            fail: function(t) {
                console.log("getpinTuanProSku fail");
            }
        });
    },
    navbarTap: function(t) {
        this.setData({
            currentTab: t.currentTarget.dataset.idx
        });
    },
    setTimeData: function(t) {},
    hasAttrkeyId: function(t) {
        if (0 == this.data.selectedSkuArr.length) return !1;
        for (var a = 0; a < this.data.selectedSkuArr.length; a++) if (this.data.selectedSkuArr[a].attrkeyid == t) return !0;
        return !1;
    },
    isContainAttr: function(t) {
        if (0 == this.data.selectValArr.length) return !1;
        for (var a = 0; a < this.data.selectValArr.length; a++) if (this.data.selectValArr[a] == t) return !0;
        return !1;
    },
    selectSku: function(t) {
        var a = t.currentTarget.dataset.attrvalid, e = t.currentTarget.dataset.attrkeyid, s = t.currentTarget.dataset.attrvalname, r = t.currentTarget.dataset.hasimage, n = t.currentTarget.dataset.canselect, i = this.minThreeNum();
        if (console.log(i), console.log(this.data.buyCount), 0 != n) {
            if (this.data.buyCount > i && this.setData({
                buyCount: this.data.buyCount
            }), 1 == r) for (h = 0; h < this.data.attrkeys.length; h++) if (1 == this.data.attrkeys[h].hasImg && this.data.attrkeys[h].AttrKeyID == e) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.data.attrkeys[h].attrVals[o].AttrValID == a && this.setData({
                AttrValSmallImg: this.data.attrkeys[h].attrVals[o].AttrValSmallImg
            });
            if (this.hasAttrkeyId(e)) for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrkeyid == e && (this.data.selectedSkuArr[h].attrvalid = a, 
            this.data.selectedSkuArr[h].attrvalname = s, this.data.selectedSkuArr[h].hasImage = r); else this.data.selectedSkuArr.push({
                attrkeyid: e,
                attrvalid: a,
                attrvalname: s,
                hasImage: r
            });
            for (var l = [], o = 0; o < this.data.selectedSkuArr.length; o++) l.push(this.data.selectedSkuArr[o].attrvalid);
            this.data.selectValArr = l.sort(function(t, a) {
                return t - a;
            });
            for (h = 0; h < this.data.attrkeys.length; h++) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.data.attrkeys[h].attrVals[o].AttrValID !== this.data.noKuCunId && (this.data.attrkeys[h].attrVals[o].canSelect = !0);
            if (this.data.selectValArr.length == this.data.attrkeys.length - 1 && this.selectHalf(l), 
            console.log(this.data.buyCount), this.data.attrkeys.length == this.data.selectValArr.length) for (h = 0; h < this.data.skuMsg.length; h++) if (this.data.skuMsg[h].Path.toString() == this.data.selectValArr.toString()) if (0 == this.data.skuMsg[h].ProductQuantity) {
                for (h = 0; h < this.data.selectValArr.length; h++) if (h == this.data.selectValArr.length - 1) {
                    var u = this.data.selectValArr[h];
                    this.data.selectValArr.splice(h, 1);
                    for (h = 0; h < this.data.selectedSkuArr.length; h++) this.data.selectedSkuArr[h].attrvalid == u && this.data.selectedSkuArr.splice(h, 1);
                }
                this.selectHalf(this.data.selectValArr), this.setData({
                    isSelectAllAttr: !0
                });
            } else this.setData({
                isSelectAllAttr: !0,
                skuid: this.data.skuMsg[h].SkuID,
                price: this.data.skuMsg[h].Price,
                skuInventory: this.data.skuMsg[h].ProductQuantity
            });
            for (h = 0; h < this.data.attrkeys.length; h++) for (o = 0; o < this.data.attrkeys[h].attrVals.length; o++) this.isContainAttr(this.data.attrkeys[h].attrVals[o].AttrValID) ? this.data.attrkeys[h].attrVals[o].isSelect = !0 : this.data.attrkeys[h].attrVals[o].isSelect = !1;
            this.data.newSelectedSkuArr = [];
            for (h = 0; h < this.data.selectValArr.length; h++) for (o = 0; o < this.data.selectedSkuArr.length; o++) this.data.selectedSkuArr[o].attrvalid == this.data.selectValArr[h] && this.data.newSelectedSkuArr.push(this.data.selectedSkuArr[o]);
            for (var d = "", h = 0; h < this.data.newSelectedSkuArr.length; h++) h != this.data.newSelectedSkuArr.length - 1 ? d = d + this.data.newSelectedSkuArr[h].attrvalname + "," : d += this.data.newSelectedSkuArr[h].attrvalname;
            this.data.selectSkuDes = d, this.setData({
                selectValArr: this.data.selectValArr,
                selectSkuDes: this.data.selectSkuDes,
                attrkeys: this.data.attrkeys
            });
        }
    },
    arrCheck: function(t) {
        for (var a = {}, e = 0; e < t.length; e++) {
            for (var s = t[e], r = 0, n = 0; n < t.length; n++) t[n] == s && (r++, t[n] = -1);
            -1 != s && (a[s] = r);
        }
        return a;
    },
    isContained: function(t, a) {
        if (!(t instanceof Array && a instanceof Array)) return !1;
        if (t.length < a.length) return !1;
        for (var e = t.toString(), s = 0, r = a.length; s < r; s++) if (-1 == e.indexOf(a[s])) return !1;
        return !0;
    },
    minThreeNum: function() {
        var t;
        return t = this.data.buyCountLimit > this.data.pinTuanInventory ? this.data.pinTuanInventory : this.data.buyCountLimit, 
        this.data.skuInventory > t && (t = t), t;
    },
    decrease: function() {
        var t = this.data.buyCount;
        0 == this.data.showSku ? (t > 1 && 1 == --t && this.setData({
            canClickDes: !1
        }), this.setData({
            buyCount: t,
            canClickAdd: !0
        })) : this.data.isSelectAllAttr ? (t > 1 && 1 == --t && this.setData({
            canClickDes: !1
        }), this.setData({
            buyCount: t,
            canClickAdd: !0
        })) : wx.showModal({
            title: "??????",
            content: "???????????????",
            showCancel: !1
        });
    },
    selectHalf: function(t) {
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (n = 0; n < a.length; n++) for (r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && e.push(a[n][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
        for (var a = [], e = [], s = 0; s < this.data.noSkuInventoryArr.length; s++) 1 == this.isContained(this.data.noSkuInventoryArr[s].Path, t) && a.push(this.data.noSkuInventoryArr[s].Path);
        for (n = 0; n < a.length; n++) for (var r = 0; r < a[n].length; r++) -1 == this.data.selectValArr.indexOf(a[n][r]) && e.push(a[n][r]);
        for (s = 0; s < this.data.attrkeys.length; s++) for (var n = 0; n < this.data.attrkeys[s].attrVals.length; n++) -1 !== e.indexOf(this.data.attrkeys[s].attrVals[n].AttrValID) && (this.data.attrkeys[s].attrVals[n].canSelect = !1);
    },
    increase: function() {
        var t = this.data.buyCount;
        if (t++, 0 == this.data.showSku) {
            if (t > this.data.buyCountLimit && this.data.buyCountLimit > 0) return wx.showModal({
                title: "??????",
                content: "??????????????????",
                showCancel: !1
            }), void this.setData({
                canClickAdd: !1
            });
            if (t > this.data.pinTuanInventory) return wx.showModal({
                title: "??????",
                content: "??????????????????",
                showCancel: !1
            }), void this.setData({
                canClickAdd: !1
            });
            this.setData({
                buyCount: t
            }), this.data.buyCount > 1 && this.setData({
                canClickDes: !0
            });
        } else if (this.data.isSelectAllAttr) {
            if (t > this.data.buyCountLimit || t > this.data.skuInventory || t > this.data.pinTuanInventory) {
                if (t > this.data.buyCountLimit && this.data.buyCountLimit > 0) return wx.showModal({
                    title: "??????",
                    content: "??????????????????",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
                if (t > this.data.skuInventory) return wx.showModal({
                    title: "??????",
                    content: "?????????????????????",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
                if (t > this.data.pinTuanInventory) return wx.showModal({
                    title: "??????",
                    content: "??????????????????",
                    showCancel: !1
                }), void this.setData({
                    canClickAdd: !1
                });
            }
            this.setData({
                buyCount: t
            }), this.data.buyCount > 1 && this.setData({
                canClickDes: !0
            });
        } else wx.showModal({
            title: "??????",
            content: "???????????????",
            showCancel: !1
        });
    },
    bindManual: function(t) {
        var a = t.detail.value;
        this.setData({
            buyCount: a
        });
    },
    buyKaiTuan: function() {
        this.setData({
            showMask: !this.data.showMask
        });
    },
    close: function() {
        this.setData({
            showMask: !1
        });
    },
    sureBuy: function() {
        this.isLogin(), 0 === this.data.attrkeys.length || 0 != this.data.isSelectAllAttr ? 0 !== this.data.attrkeys.length && this.data.buyCount > this.data.pinTuanInventory ? wx.showModal({
            title: "??????",
            content: "??????????????????",
            showCancel: !1
        }) : 0 != this.data.buyCount ? (this.setData({
            showMask: !1
        }), wx.navigateTo({
            url: "../order/square?pintuan_id=" + this.data.pinTuanProDetail.pintuan_config.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.id + "&pintuan_product_num=" + this.data.buyCount + "&sku_id=" + this.data.skuid + "&attrImg=" + this.data.AttrValSmallImg
        })) : wx.showModal({
            title: "??????",
            content: "?????????????????????",
            showCancel: !1
        }) : wx.showModal({
            title: "??????",
            content: "???????????????",
            showCancel: !1
        });
    },
    buyNow: function() {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.redirectTo({
            url: "../shop/productdetail?id=" + t.data.pinTuanProDetail.product_id
        });
    },
    goregulations: function() {
        var t = this;
        t.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            t.setData({
                buttonClicked: !1
            });
        }, 500), wx.navigateTo({
            url: "regulations"
        });
    },
    forMatterTime: function(t) {
        var a = parseInt(t / 60 / 60 / 24, 10), e = parseInt(t / 60 / 60 % 24, 10), s = parseInt(t / 60 % 60, 10), r = parseInt(t % 60, 10);
        a = this.checkTime(a), e = this.checkTime(e), s = this.checkTime(s), r = this.checkTime(r), 
        this.setData({
            intervalTime: {
                days: a,
                hours: e,
                minutes: s,
                seconds: r
            }
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    AddCollection: function(t) {
        var a = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var s = t.currentTarget.dataset.proid;
            e.AddCollection(s, function(t) {
                a.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    CanleCollection: function(t) {
        var a = this;
        if (this.data.getPageFlag) {
            this.setData({
                getPageFlag: !1
            });
            var s = t.currentTarget.dataset.proid;
            e.CancelCollection(s, function(t) {
                a.setData({
                    getPageFlag: !0
                });
            });
        }
    },
    goPinTuanDetail: function(t) {
        var a = t.currentTarget.dataset.group, e = this;
        e.setData({
            buttonClicked: !0
        }), setTimeout(function() {
            e.setData({
                buttonClicked: !1
            });
        }, 500), wx.redirectTo({
            url: "./fightgroups?pintuan_group_id=" + a + "&pintuan_id=" + this.data.queryparams.pintuan_id + "&pintuan_product_id=" + this.data.pinTuanProDetail.product_id + "&storenum=" + this.data.queryparams.storenum + "&buylimit=" + this.data.buyCountLimit + "&pintuan_product_id2=" + this.data.pinTuanProDetail.id
        });
    },
    backToHome: function() {
        wx.reLaunch({
            url: "../shop/index"
        });
    }
});