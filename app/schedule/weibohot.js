const Subscription = require('egg').Subscription;

class WeibohotDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 20/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start weibohot spider OK")
        await this.ctx.service.weibohot.start();
    }
}

module.exports = WeibohotDriver;