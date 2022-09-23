const Subscription = require('egg').Subscription;

class DouyintopDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 5/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start baidu spider OK")
        await this.ctx.service.douyintop.start();
    }
}

module.exports = DouyintopDriver;