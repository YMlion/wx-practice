//index.js
//获取应用实例
const app = getApp()
var images = []

Page({
  data: {
  },
  //事件处理函数
  imageTap: function(event) {
    // just need date in fact.
    var date = event.currentTarget.dataset.item.publishedAt.substring(0, 10).replace(/-/g, '/')
    console.log(date)
    wx.navigateTo({
      url: '../day/day?date=' + date
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/30/1',
      success: function(res) {
        images = res.data.results;
        var imgsLeft = []
        var imgsRigth = []
        for (var i = 0; i < images.length; i++) {
          if (i % 2 == 0) {
            imgsLeft.push(images[i])
          } else {
            imgsRigth.push(images[i])
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
