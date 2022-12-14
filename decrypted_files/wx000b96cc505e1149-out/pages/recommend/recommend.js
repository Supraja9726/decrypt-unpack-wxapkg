// pages/recommend/recommend.js
var app = getApp();

var config = require("../../conf.js");

Page({
    /**
   * 页面的初始数据
   */
    data: {
        contentAll: []
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var that = this;
        wx.request({
            url: config.baseDomain + "/img/findSystemMsg",
            data: {
                appName: config.appName
            },
            success: function success(res) {
                console.info(res.data);
                var list = that.data.contentAll;
                for (var i = 0; i < res.data.length; i++) {
                    list.push(res.data[i]);
                }
                that.setData({
                    contentAll: list
                });
            }
        });
    },
    /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function onReady() {},
    /**
   * 生命周期函数--监听页面显示
   */
    onShow: function onShow() {},
    /**
   * 生命周期函数--监听页面隐藏
   */
    onHide: function onHide() {},
    /**
   * 生命周期函数--监听页面卸载
   */
    onUnload: function onUnload() {},
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function onPullDownRefresh() {},
    /**
   * 页面上拉触底事件的处理函数
   */
    onReachBottom: function onReachBottom() {},
    /**
   * 用户点击右上角分享
   */
    onShareAppMessage: function onShareAppMessage() {}
});