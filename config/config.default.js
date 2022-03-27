/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security:{
      csrf:{
        enable: false,
      },
    },
    cors:{
      origin: '*',
      allowMethods: 'GET, PUT,  POST, DELETE, PATCH',
    },
    mongoose : {
      client: {
        url: 'mongodb://127.0.0.1:27017/DuckDB', // 你的数据库地址，egg_article是你数据库得名字
        options: {
          useNewUrlParser: true,
        },
      },
    },
    redis:{
      client:{
        port:6379,
        host:'127.0.0.1',
        password:'',
        db:0,
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1648279183761_5287';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
