module.exports = {
    wxpay: function(a, t, e, o) {
        wx.request({
            url: "https://api.it120.cc/" + a.globalData.subDomain + "/pay/wxapp/get-pay-data",
            data: {
                token: a.globalData.token,
                money: t,
                remark: "支付订单 ：" + e,
                payName: "在线支付",
                nextAction: {
                    type: 0,
                    id: e
                }
            },
            success: function(a) {
                console.log("api result:"), console.log(a.data), 0 == a.data.code ? wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: "prepay_id=" + a.data.data.prepayId,
                    signType: "MD5",
                    paySign: a.data.data.sign,
                    fail: function(a) {
                        wx.showToast({
                            title: "支付失败:" + a
                        });
                    },
                    success: function() {
                        wx.showToast({
                            title: "支付成功"
                        }), wx.reLaunch({
                            url: o
                        });
                    }
                }) : wx.showToast({
                    title: "服务器忙" + a.data.code
                });
            }
        });
    }
};