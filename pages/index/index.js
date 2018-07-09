//index.js
//获取应用实例
const app = getApp()
var images = []
var pageNum = 1

Page({
  data: {
    indicatorDots: false,
    galleryIndex: 0
  },
  //事件处理函数
  imageTap: function (event) {
    // just need date in fact.
    var date = event.currentTarget.dataset.item.publishedAt.substring(0, 10).replace(/-/g, '/')
    console.log(date)
    wx.navigateTo({
      url: '../day/day?date=' + date
    })
  },

  onLoad: function (options) {
    if (options && options.url) {
      this.setData({
        largeImageUrl: options.url,
        showLarge: true
      })
    }
    this.refresh(this, false)

  },
  onPullDownRefresh: function () {
    if (this.data.showLarge) {
      wx.stopPullDownRefresh()
    } else {
      this.refresh(this, true)
    }
  },
  onReachBottom: function () {
    this.refresh(this, false, true)
  },

  refresh: function (that, pullDown, loadMore = false) {
    if (pullDown) {
      pageNum = 1
    } else if (loadMore) {
      pageNum++
    }
    wx.request({
      url: 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + pageNum,
      success: function (res) {
        console.log('load success.')
        if (pullDown) {
          wx.stopPullDownRefresh()
        }
        if (!loadMore) {
          images.length = 0
        }
        images.push(...res.data.results)
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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      var imgUrl = images[this.data.galleryIndex].url
      return {
        title: 'beautiful girl',
        path: '/pages/index/index?url=' + imgUrl,
        imageUrl: imgUrl
      }
    } else {
      return {
        title: 'beautiful girl',
        path: '/pages/index/index',
      }
    }
  },
  showLargePicture: function (event) {
    var url = event.currentTarget.dataset.item.url
    var index = event.currentTarget.dataset.index
    this.setData({
      allImages: images,
      galleryIndex: index,
      showLarge: true
    })
  },
  cancelDialog: function () {
    this.setData({
      allImages: [],
      galleryIndex: 0,
      showLarge: false
    })
  },
  saveImage: function (event) {
    var that = this
    var index = event.currentTarget.dataset.index
    console.log(index)
    wx.downloadFile({
      url: images[index].url.replace('http:', 'https:'),
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function () {
            that.cancelDialog()
          }
        })
      }
    })
  },
  onImageSwiped: function (event) {
    var index = event.detail.current
    this.data.galleryIndex = index
  },
  donothing: function () {

  }
})