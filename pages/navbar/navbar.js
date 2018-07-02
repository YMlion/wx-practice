var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: [],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        wx.request({
          url: 'https://gank.io/api/xiandu/categories',
          success: function(res) {
            var error = res.data.error
            var results = res.data.results
            if (error) {
              return
            }
            var nameArray = []
            for (var result of results) {
              nameArray.push(result.name)
            }
            that.setData({
              tabs: nameArray
            })
            console.log(res.data)
            wx.request({
              url: 'https://gank.io/api/xiandu/category/'+ results[0].en_name,
              success: function(items) {
                console.log(items.data)
              }
            })
          }
        })
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    }
});