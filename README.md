# wxapp-starter-kit
微信小程序开发脚手架

## 分支

### feature/weui
提供weui样式及功能

### feture/font-awesome
提供font-awesome图标

### lib/accounting
提供 accounting 库

### lib/moment
提供moment功能库

### lib/storage
提供带超时时间的本地存储管理库。

前提：
- 需要`moment.js`库支持，应当首先`git merge lib/moment`

### lib/nagu
提供来自`api.nagu.cc`的各类API

前提：
- 需要`lib/storage` 支持，应当首先`git merge lib/storage`

包括：
- `Acceptor API` 用于管理基金会受赠者的API；
- `Weixin API` 微信提供的REST API；