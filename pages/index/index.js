//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  //事件处理函数
  imageTap: function() {
    wx.navigateTo({
      url: '../navbar/navbar'
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/30/1',
      success: function(res) {
        var results = res.data.results;
        var imgsLeft = []
        var imgsRigth = []
        for (var i = 0; i < results.length; i++) {
          if (i % 2 == 0) {
            imgsLeft.push(results[i].url)
          } else {
            imgsRigth.push(results[i].url)
          }
        }
        that.setData({
          imagesLeft: imgsLeft,
          imagesRight: imgsRigth
        })
      }
    })
  },
})
