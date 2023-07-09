const urlParser = {

  _parseUrlWithJoinString() {
    return this._joinStringUrl(this._getUrlLocation());
  },

  _parseUrlWithoutJoinString() {
    return this._splitedUrl(this._getUrlLocation());
  },

  _splitedUrl(url) {
    const arraySpltedUrl = url.split('/');
    return {
      resource: arraySpltedUrl[1] || null,
      id: arraySpltedUrl[2] || null,
      verb: arraySpltedUrl[3] || null,
    };
  },

  _joinStringUrl(url) {
    const { resource, id, verb } = this._splitedUrl(url);
    return (resource ? `/${resource}` : '/') + (id ? '/:id' : '') + (verb ? `/${verb}` : '');
  },

  _getUrlLocation() {
    return window.location.hash.slice('1').toLowerCase();
  },
};

export default urlParser;
