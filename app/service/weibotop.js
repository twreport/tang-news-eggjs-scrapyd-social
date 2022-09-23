'use strict';
const Service = require('egg').Service;

class WeibotopService extends Service {
    async start() {
        const { ctx } = this;
        await this.weibotopDriver();
    }

    // 定时执行scrapy任务
    async weibotopDriver() {
        const scrapyd_server_url = this.app.config.WeiboSpiderServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";

            const data = {
                'project': 'weibotop',
                'spider': 'weibo',
            }
            const result = await this.ctx.curl(
                url, {
                    method: 'POST',
                    data: data,
                    dataType: 'json'
                }
            );
            console.log(result)
        }
}
module.exports = WeibotopService;