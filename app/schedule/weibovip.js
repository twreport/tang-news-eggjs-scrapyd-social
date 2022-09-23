const Subscription = require('egg').Subscription;

class WeibovipDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 8/10 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start weibo vip OK")
        await this.ctx.service.weibovip.start();
    }
}

module.exports = WeibovipDriver;