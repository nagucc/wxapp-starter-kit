class AcceptorApi {

  constructor(options) {
    this.host = options.host;
    this.token = options.token;
    this.version = options.version;
  }

  // 获取Acceptor列表
  list(options) {
    options = Object.assign({}, {
      pageIndex: 0,
      pageSize: 1000,
      project: '',
      year: '',
      text: '',
    }, options);
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/list/${options.pageIndex}?pageSize=${options.pageSize}&project=${options.project}&year=${options.year}&text=${options.text}&token=${this.token}`,
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    })
  }

  // 获取Acceptor
  getById(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/${id}?token=${this.token}`,
        header: {
          'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

  /*
    添加受助者。
    示例数据：
    {
      name: 'xxx',
      phone: 'phone',
    }
  */
  add(acceptor) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}?token=${this.token}`,
        method: 'PUT',
        data: acceptor,
        header: {
          'content-type': 'application/json',
          'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

  /*
    更新受助者
  */
  updateById(id, acceptor) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/${id}?token=${this.token}`,
        method: 'POST',
        data: acceptor,
        header: {
          'content-type': 'application/json',
          // 'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

  remove(id) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/${id}?token=${this.token}`,
        method: 'DELETE',
        header: {
          'content-type': 'application/json',
          'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

  addRecord(id, record) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/record/${id}?token=${this.token}`,
        method: 'PUT',
        data: record,
        header: {
          'content-type': 'application/json',
          'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

  removeRecord(id, recordId) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.host}/record/${id}/${recordId}?token=${this.token}`,
        method: 'DELETE',
        header: {
          'content-type': 'application/json',
          'x-app-version': this.version,
        },
        success: res => {
          if (res.data.ret === 0) {
            resolve(res.data.data);
          } else reject(res.data);
        },
        fail: function (res) {
          reject({ ret: 0, msg: res });
        }
      });
    });
  }

}

module.exports = AcceptorApi;