'use strict';

import baseConfig from './base';

// get the culture code
let getLang = () => {
  let result = location.search.match(/lang=(\w*\-\w*)\b&?/);
  return result ? result[1] : 'en-US';
}

const preset = {
  hostName: 'http://cnshhq-e1' + 'dev' /* dev or qa */ + '100:8000',
  prodCode: 'TBV3', // TBV3 or EFP
  cultureCode: getLang() // en-US, zh-CN, id-ID, ru-RU
}

let config = {
  apiList: () => preset.hostName +
           '/Zendesk/' +
           preset.prodCode +
           '/GetArticles?cultureCode=' +
           preset.cultureCode,

  apiSearch: (keyword) => preset.hostName +
             '/Zendesk/' +
             preset.prodCode +
             '/QueryArticle?keyword=' +
             keyword,

  apiAuthor: (userid) => preset.hostName +
             '/Zendesk/' +
             preset.prodCode +
             '/user?userid=' + userid
};

export default Object.freeze(Object.assign({}, baseConfig, config));
