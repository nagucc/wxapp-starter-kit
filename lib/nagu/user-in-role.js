const { set, get } = require('../storage');

class UirApi {
  constructor(options = {}) {
    this.appId = options.appId;
    this.host = options.host || 'https://api.nagu.cc';
    this.token = options.token;
    this.version = options.version;
  }
  rolesByUserId(userId) {
    const key = `uir:rolesByUserId:${userId}`;
    const roles = get(key);
    if (roles) return Promise.resolve(roles);
    else {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${this.host}/roles/app/${this.appId}/user/${userId}?token=${this.token}`,
          header: {
            'x-app-version': this.version,
          },
          success: (res) => {
            if(res.data.ret === 0) {
              set(key, res.data.data, 86400);
              resolve(res.data.data);
            } else {
              reject(res.data.msg);
            }
          },
          fail: (res) => {
            reject(res);
          },
        });
      });
    }
  }
}

module.exports = UirApi;