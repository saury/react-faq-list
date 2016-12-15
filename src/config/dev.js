'use strict';

import baseConfig from './base';

const preset = {
  hostName: 'http://cnshhq-e1' + 'dev' /* dev or qa */ + '100:8000',
  prodCode: 'TBV3', // TBV3 or EFP
  cultureCode: 'en-US' // en-US, zh-CN, id-ID, ru-RU
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
