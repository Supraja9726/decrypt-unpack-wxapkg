function t(t, a, o) {
    return a in t ? Object.defineProperty(t, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = o, t;
}

var a = require("../../utils/av-weapp.js"), o = getApp(), e = null, i = -1;

Page({
    data: {
        login: !1,
        time: "获取验证码"
    },
    onLoad: function(t) {
        var a = o.globalData.login, e = this;
        this.setData({
            login: a
        }), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    height: t.windowHeight
                });
            }
        });
    },
    navigateToAddress: function() {
        wx.navigateTo({
            url: "../../address/list/list"
        });
    },
    logout: function() {
        a.User.current() ? (a.User.logOut(), wx.showToast({
            title: "退出成功"
        })) : wx.showToast({
            title: "请先登录"
        });
    },
    onShow: function() {
        var t = this;
        a.User.current();
        wx.getUserInfo({
            success: function(a) {
                var o = a.userInfo;
                t.setData({
                    userInfo: o
                });
            }
        });
    },
    chooseImage: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var i = e.tempFilePaths[0];
                new a.File("file-name", {
                    blob: {
                        uri: i
                    }
                }).save().then(function(a) {
                    var e = o.data.userInfo;
                    e.avatarUrl = a.url(), o.setData(t({
                        userInfo: e
                    }, "userInfo", e));
                }).catch(console.error);
            }
        });
    },
    navigateToAddressAboutus: function() {
        wx.navigateTo({
            url: "/pages/member/aboutus/aboutus"
        });
    },
    turnTologin: function(t) {
        this.setData({
            ifLogup: !1
        }), this.data.email = "", this.data.name = "", this.data.password = "", this.data.passwordSure = "";
    },
    turnTologup: function(t) {
        this.setData({
            ifphone: !1,
            ifLogup: !0,
            num: ""
        }), this.data.name = "", this.data.email = "", this.data.phoneNum = "", this.data.password = "";
    },
    turnto_phone: function(t) {
        this.setData({
            ifphone: !0
        });
    },
    tap_logups: function(t) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    tap_logup: function(t) {
        if ("" == this.data.email) wx.showToast({
            title: "请输入您的邮箱",
            duration: 1200,
            icon: "loading"
        }); else if (".com" != this.data.email.slice(-4) || this.data.email.indexOf("@") < 0) wx.showToast({
            title: "您输入的邮箱不合法",
            duration: 1200,
            icon: "loading"
        }), this.setData({
            warn: {
                warn_email: "color:rgb(241,1,25);"
            }
        }); else if ("" == this.data.password) wx.showToast({
            title: "请设置登陆密码",
            duration: 1200,
            icon: "loading"
        }); else if (this.data.password == this.data.passwordSure) {
            var e = new a.User(), i = this;
            e.setUsername(this.data.name), e.setEmail(this.data.email), e.setPassword(this.data.password), 
            e.signUp().then(function(t) {
                o.iflogup = !0, wx.showToast({
                    title: "",
                    icon: "loading"
                }), wx.redirectTo({
                    url: "../main/main?usrid=" + t.id
                });
            }, function(t) {
                switch (t.code) {
                  case 203:
                    wx.showToast({
                        title: "您已注册过，请登录",
                        icon: "loading"
                    }), i.turnTologin();
                    break;

                  case 202:
                    wx.showToast({
                        title: "此用户名已被注册",
                        icon: "loading"
                    }), i.setData({
                        warn: {
                            warn_name: "color:rgb(241,1,25);"
                        }
                    });
                    break;

                  case 214:
                    wx.showToast({
                        title: "您的手机已注册过请登录",
                        icon: "loading"
                    });
                }
            });
        } else wx.showToast({
            title: "两次输入的密码不一致",
            duration: 1200,
            icon: "loading"
        }), this.setData({
            warn: {
                warn_passwordSure: "color:rgb(241,1,25);"
            }
        });
    },
    tap_login: function() {
        var t = new a.User(), o = this;
        "" == this.data.name ? wx.showToast({
            title: "请输入注册邮箱",
            duration: 1500,
            icon: "loading"
        }) : "" == this.data.password ? wx.showToast({
            title: "请输入密码",
            duration: 1500,
            icon: "loading"
        }) : (t.setUsername(this.data.name), t.setPassword(this.data.password), t.logIn().then(function(t) {
            wx.showToast({
                title: "",
                icon: "loading"
            });
            var a = t.id;
            wx.redirectTo({
                url: "../main/main?usrid=" + a
            });
        }, function(t) {
            console.log("error.code"), console.log(t.code), "210" == t.code ? (wx.showToast({
                title: "密码错误",
                duration: 1500,
                icon: "loading"
            }), o.setData({
                warn: {
                    warn_passwordSure: "color:rgb(241,1,25);"
                }
            })) : "211" == t.code ? (wx.showToast({
                title: "该邮箱还未注册，请先注册",
                duration: 2200,
                icon: "loading"
            }), o.setData({
                warn: {
                    warn_name: "color:rgb(241,1,25);"
                },
                ifLogup: !0
            })) : "216" == t.code ? (wx.showToast({
                icon: "loading",
                title: "请先验证邮箱",
                duration: 2e3
            }), a.User.requestEmailVerify(o.data.email).then(function(t) {}, function(t) {
                "1" == t.code && wx.showToast({
                    title: "今日往此邮箱发送的邮件数已超上限",
                    duration: 2e3,
                    icon: "loading"
                });
            })) : "219" == t.code && (o.setData({
                warn: {
                    warn_passwordSure: "color:rgb(241,1,25);"
                }
            }), wx.showToast({
                title: "登录失败次数超过限制，请稍候再试，或通过忘记密码重设密码",
                duration: 4e3,
                icon: "loading"
            }));
        }));
    },
    getnum: function(t) {
        var a = this;
        11 != parseInt(a.data.phoneNum).toString().length ? wx.showToast({
            title: "请输入正确的手机号",
            icon: "loading"
        }) : a.reSendPhoneNum();
    },
    inputNum: function(t) {
        this.data.num = t.detail.value;
    },
    quick_register_phone: function(t) {
        var a = this;
        4 == parseInt(this.data.num).toString().length ? (console.log("https://wudhl.com/index.php/Api/User/register?phone=" + this.data.phoneNum + "&num=" + this.data.num + "&openid=" + o.globalData.openid + "&pass=" + this.data.pass + "&remindpass=" + this.data.remindpass + "&nickName=" + o.globalData.nickName), 
        wx.request({
            url: "https://wudhl.com/index.php/Api/User/register?phone=" + this.data.phoneNum + "&num=" + this.data.num + "&openid=" + o.globalData.openid + "&pass=" + this.data.pass + "&remindpass=" + this.data.remindpass + "&nickName=" + o.globalData.nickName,
            method: "GET",
            success: function(t) {
                200 == t.data.code ? (o.globalData.login = !0, o.globalData.userInfo = t.data.res, 
                a.setData({
                    login: !0
                }), wx.showToast({
                    title: t.data.msg,
                    icon: "success"
                }), timeout = setTimeout(function() {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                }, 2e3)) : wx.showToast({
                    title: t.data.msg,
                    icon: "error"
                });
            },
            fail: function() {},
            complete: function() {}
        })) : wx.showToast({
            title: "无效的验证码",
            duration: 1500,
            icon: "loading"
        });
    },
    quick_login_phone: function(t) {
        var a = this;
        4 == parseInt(this.data.num).toString().length ? (console.log("https://wudhl.com/index.php/Api/User/validate?phone=" + this.data.phoneNum + "&num=" + this.data.num + "&openid=" + o.globalData.openid), 
        wx.request({
            url: "https://wudhl.com/index.php/Api/User/validate?phone=" + this.data.phoneNum + "&num=" + this.data.num + "&openid=" + o.globalData.openid,
            data: {
                phone: this.data.phoneNum,
                num: this.data.num
            },
            method: "GET",
            success: function(t) {
                200 == t.data.code ? (o.globalData.login = !0, a.setData({
                    login: !0
                }), wx.switchTab({
                    url: "/pages/index/index"
                }), wx.showToast({
                    title: t.data.msg,
                    icon: "success"
                })) : wx.showToast({
                    title: t.data.msg,
                    icon: "error"
                });
            },
            fail: function() {},
            complete: function() {}
        })) : wx.showToast({
            title: "无效的验证码",
            duration: 1500,
            icon: "loading"
        });
    },
    getPassword: function(t) {
        this.setData({
            password: t.detail.value,
            warn: {
                warn_passwordSure: ""
            }
        }), this.data.password = t.detail.value;
    },
    getEmail: function(t) {
        this.data.email = t.detail.value, this.data.name = t.detail.value, this.setData({
            warn: {
                warn_email: ""
            }
        });
    },
    passwordSure: function(t) {
        t.detail.value === this.data.password && (this.data.passwordSure = t.detail.value), 
        this.setData({
            warn: {
                warn_passwordSure: ""
            }
        });
    },
    getPhoneNum: function(t) {
        this.setData({
            phoneNum: t.detail.value
        });
    },
    inputRemindPass: function(t) {
        this.setData({
            remindpass: t.detail.value
        });
    },
    inputPass: function(t) {
        this.setData({
            pass: t.detail.value
        });
    },
    input_num: function(t) {
        this.data.num = t.detail.value;
    },
    forgetPassword: function(t) {
        a.User.requestPasswordReset(this.data.email).then(function(t) {
            wx.showToast({
                title: "密码重置邮件已发送，请在邮件中重置密码",
                icon: "success",
                duration: 5e3
            });
        }, function(t) {
            console.log(t), console.log(t.code), "1" == t.code ? wx.showToast({
                title: "今日往此邮箱发送的邮件数已超上限",
                duration: 2e3,
                icon: "loading"
            }) : "204" == t.code ? wx.showToast({
                title: "请先输入注册邮箱",
                duration: 1200,
                icon: "loading"
            }) : "205" == t.code && wx.showToast({
                title: "您还没注册哦",
                duration: 1200,
                icon: "loading"
            });
        });
    },
    reSendPhoneNum: function() {
        if (i < 0) {
            var t = this;
            i = 60, e = setInterval(function() {
                i--, t.setData({
                    time: i + "s"
                }), i <= 0 && (i = -1, clearInterval(e), t.setData({
                    time: "获取验证码"
                }));
            }, 1e3);
        } else wx.showToast({
            title: "短信已发到您的手机，请稍后重试!",
            icon: "loading",
            duration: 700
        });
    }
});