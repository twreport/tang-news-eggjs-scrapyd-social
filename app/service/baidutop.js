'use strict';
const Service = require('egg').Service;

class BaidutopService extends Service {
    async start() {
        const { ctx } = this;
        await this.baidutopDriver();
    }

    // 定时执行scrapy任务
    async baidutopDriver() {
        const scrapyd_server_url = this.app.config.WeiboSpiderServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";

            const data = {
                'project': 'baidutop',
                'spider': 'baidu',
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
module.exports = BaidutopService;