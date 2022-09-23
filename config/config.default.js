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
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '10.168.1.100',
        // 端口号
        port: '3306',
        // 用户名
        user: 'nodejs',
        // 密码
        password: 'tw7311',
        // 数据库名
        database: 'news',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  }
  config.cluster = {
    listen: {
      port: 7002,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1658466502238_5291';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    'WeiboSpiderServerUrl': 'http://10.168.1.100:6804/'
  };

  return {
    ...config,
    ...userConfig,
  };
};
