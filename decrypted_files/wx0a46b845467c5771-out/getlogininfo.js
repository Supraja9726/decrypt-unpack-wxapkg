function e(e) {
    console.log("获取IM登录信息成功");
    var n = {};
    switch (n.userSig = l.globalData.userSig, n.userID = l.globalData.identifier, n.loginid = l.globalData.loginid, 
    n.userSplitID = l.globalData.single.id, n.sdkAppID = t.sdkAppID, n.accType = t.accType, 
    n.serverDomain = t.roomServiceUrl + "/weapp/" + e.type + "/", n.userName = e.name, 
    n.userAvatar = e.head, n.gender = e.sex, n.selToID = e.opt.id + "_" + t.houseId, 
    n.opt = e.opt, e.type) {
      case "multi_room":
      case "double_room":
        a.login({
            data: n,
            success: e.success,
            fail: e.fail
        });
        break;

      case "live_room":
        o.login({
            data: ret.data,
            success: e.success,
            fail: e.fail
        });
    }
}

var a = require("./utils/rtcroom.js"), o = require("./utils/liveroom.js"), t = require("./config.js"), n = require("./utils/util.js"), l = getApp();

module.exports = {
    getLoginInfo: function(a) {
        l.globalData.userInfo || (l.globalData.userInfo = wx.getStorageSync("userInfo")), 
        a.userName = l.globalData.userInfo.nickName, a.gender = l.globalData.userInfo.gender, 
        a.userAvatar = l.globalData.userInfo.avatarUrl, a.code = l.globalData.code, a.openId = l.globalData.openid, 
        e(a);
    },
    getUserInfo: function(e) {
        var a = this;
        wx.setStorageSync("ISauthorizeInfo", !0), console.log(e.detail, "***getUserInfo***"), 
        this.setData({
            showInfoModel: !1
        }), e.detail.errMsg.includes("fail") ? (l.globalData.globalUserInfoFlag = !0, "function" == typeof a.data.infoFailFun && a.data.infoFailFun()) : (wx.request({
            url: n.newUrl() + "elab-marketing-authentication/customer/modify",
            method: "POST",
            header: {
                token: l.globalData.tonken
            },
            data: {
                houseId: t.houseId,
                id: l.globalData.single.id,
                headPortrait: e.detail.userInfo.avatarUrl,
                nickname: e.detail.userInfo.nickName
            },
            success: function(e) {
                console.log(e, "提交用户信息成功");
            }
        }), l.globalData.userInfo = e.detail.userInfo, l.globalData.globalUserInfoFlag = !0, 
        wx.setStorageSync("userInfo", e.detail.userInfo), "function" == typeof a.data.infoFun && a.data.infoFun());
    },
    authorizeInfo: function(e, a) {
        var o = this;
        l.globalData.userInfo = wx.getStorageSync("userInfo"), wx.getSetting({
            success: function(t) {
                console.log("getSetting", t), console.log(t.authSetting["scope.userInfo"], 0x126221562774bd00), 
                console.log(l.globalData.userInfo, 0x126221562774bd00), t.authSetting["scope.userInfo"] || l.globalData.isUserInfo ? (o.setData({
                    showInfoModel: !1
                }), "function" == typeof e && e()) : (l.globalData.isUserInfo = !0, o.setData({
                    showInfoModel: !0,
                    infoFun: e,
                    infoFailFun: a || null
                }));
            },
            fail: function() {
                wx.showToast({
                    title: "系统提示:网络错误",
                    icon: "warn",
                    duration: 1500
                });
            }
        });
    }
};