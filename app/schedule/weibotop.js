const Subscription = require('egg').Subscription;

class WeibotopDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 25/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start weibotop spider OK")
        await this.ctx.service.weibotop.start();
    }
}

module.exports = WeibotopDriver;