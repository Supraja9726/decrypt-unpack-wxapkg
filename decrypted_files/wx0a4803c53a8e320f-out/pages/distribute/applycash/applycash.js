var t = getApp();

Page({
    data: {
        hideAccountList: !0,
        accountList: [],
        defaultAccount: "",
        mayMoney: "",
        limit: "",
        withdrawMoney: ""
    },
    onLoad: function(t) {},
    onShow: function() {
        this.setData({
            hideAccountList: !0
        }), this.getAccountList();
    },
    getAccountList: function() {
        var a = this;
        wx.request({
            url: t.globalData.comUrl + "dis_getApplyCashPageData",
            data: {
                memberId: t.getMemberId()
            },
            success: function(t) {
                console.log(t.data);
                var i = t.data.content.applyCashAccountList, n = [];
                a.setData({
                    defaultAccount: ""
                });
                for (var e = 0; e < i.length; e++) {
                    var c = i[e];
                    c.omitAccount = c.account.substr(0, 4) + "*****" + c.account.substr(c.account.length - 3, 4), 
                    c.isDefault && a.setData({
                        defaultAccount: c
                    }), n.push(c);
                }
                !a.data.defaultAccount && i.length > 0 && a.setData({
                    defaultAccount: i[0]
                }), a.setData({
                    accountList: n,
                    mayMoney: t.data.content.mayMoney,
                    limit: t.data.content.limit
                });
            }
        });
    },
    showAccount: function() {
        this.setData({
            hideAccountList: !1
        });
    },
    cancel: function() {
        this.setData({
            hideAccountList: !0
        });
    },
    addAccount: function() {
        wx.navigateTo({
            url: "../account-setting/account-setting"
        });
    },
    selectAccount: function(t) {
        var a = t.currentTarget.dataset.idx;
        this.setData({
            defaultAccount: this.data.accountList[a],
            hideAccountList: !0
        });
    },
    bindMoneyInput: function(t) {
        this.setData({
            withdrawMoney: t.detail.value
        });
    },
    applyCash: function() {
        if ("" != this.data.withdrawMoney) {
            if (this.data.withdrawMoney > this.data.limit.moneyMaximum) return t.hint("????????????" + this.data.limit.moneyMaximum + "???"), 
            void this.setData({
                withdrawMoney: this.data.limit.moneyMaximum
            });
            if (this.data.withdrawMoney < this.data.limit.moneyMinimum && this.data.withdrawMoney) return t.hint("????????????" + this.data.limit.moneyMinimum + "???"), 
            void this.setData({
                withdrawMoney: this.data.limit.moneyMinimum
            });
            if (this.data.withdrawMoney > this.data.mayMoney) t.hint("???????????????????????????????????????"); else if (this.data.defaultAccount) {
                var a = this;
                wx.request({
                    url: t.globalData.comUrl + "dis_applyCash",
                    data: {
                        money: a.data.withdrawMoney,
                        accountId: a.data.defaultAccount.id,
                        memberId: t.getMemberId(),
                        projectId: t.globalData.projectInfo.appId
                    },
                    success: function(t) {
                        console.log(t.data), "1" == t.data.code ? wx.showModal({
                            title: "??????",
                            content: "???????????????????????????????????????????????????",
                            showCancel: !1,
                            success: function(t) {
                                wx.navigateBack({
                                    beta: 1
                                });
                            }
                        }) : wx.showModal({
                            title: t.data.msg,
                            showCancel: !1
                        });
                    }
                });
            } else this.setData({
                hideAccountList: !1
            });
        } else t.hint("?????????????????????");
    },
    editAccount: function(t) {},
    deleteAccount: function(a) {
        var i = this, n = a.currentTarget.dataset.id;
        wx.showModal({
            title: "??????",
            content: "??????????????????",
            success: function(a) {
                a.confirm && wx.request({
                    url: t.globalData.comUrl + "dis_delApplyCashAccount",
                    data: {
                        accountId: n
                    },
                    success: function(t) {
                        i.getAccountList();
                    }
                });
            }
        });
    }
});