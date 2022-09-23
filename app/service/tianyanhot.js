'use strict';
const Service = require('egg').Service;

class TianyanhotService extends Service {
    async start() {
        const { ctx } = this;
        await this.tianyanhotDriver();
    }

    // 定时执行scrapy任务
    async tianyanhotDriver() {
        const scrapyd_server_url = this.app.config.WeiboSpiderServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";

            const data = {
                'project': 'tianyanhot',
                'spider': 'tianyan',
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
module.exports = TianyanhotService;
