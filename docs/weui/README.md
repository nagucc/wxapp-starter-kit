# 在小程序中使用weui

## 引入样式及示例
`git merge feature/weui`

## 使用组件

### 使用uploader组件
`uploader`组件用于显示、管理上传图片。使用该组件需要同时修改wxml及js代码。

#### 基本框架

```html
<view class="weui-uploader">
    <view class="weui-uploader__hd">
        <view class="weui-uploader__title">图片上传</view>
        <view class="weui-uploader__info">2/10</view>
    </view>
    <view class="weui-uploader__bd">
        <view class="weui-uploader__files" id="uploaderFiles">
          ...
        </view>
    </view>
</view>
```

#### 选择（或上传）文件

需要从相册或摄像头获取文件时，需要在`weui-uploader__bd`下加入选择按钮：

```html
<view class="weui-uploader__bd">
  <view class="weui-uploader__input-box">
      <view class="weui-uploader__input" bindtap="chooseImage"></view>
      <view class="weui-badge" style="position: absolute;top: 0em;right: 0em;" id="{{index}}" bindtap="removeImage" >x</view>
      
  </view>
</view>
```

在js的Page中加上`chooseImage`和`removeImage`处理代码：

- 选择照片：
```js
// 此代码仅能从相册或相机选择图片，不包含上传功能。
chooseImage: function(e) {
  wx.chooseImage({
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: (res) => {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      this.setData({
        files: this.data.files.concat(res.tempFilePaths)
      });
    }
  })
},

removeImage: function(e) {
    const index = parseInt(e.target.id, 10);
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            files: this.data.files.filter((img, idx) => (idx !== index)),
          });
        }
      }
    });
  }
```

- 上传照片：
```js
// 此代码仅能从相册或相机选择图片，不包含上传功能。
chooseImage: (e) => {
  wx.chooseImage({
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      wx.uploadFile({
        url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData:{
          'user': 'test'
        },
        success: function(res){
          var data = res.data
          //do something
        }
      });
    }
  })
},
```
