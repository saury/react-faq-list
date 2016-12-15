'use strict';

class HttpRequest {
  constructor() {
    this.get = this.get.bind(this);
  }
  /**
   * http get fn
   * @param  {[string]} url
   * @return promise
   */
  get(url) {
      let promise = new Promise(function(resolve, reject) {
        let client = new XMLHttpRequest();
        client.open('GET', url);
        client.onreadystatechange = handler;
        client.responseType = 'json';
        client.setRequestHeader('Accept', 'application/json');
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    return promise;
  }
}

export default new HttpRequest;
