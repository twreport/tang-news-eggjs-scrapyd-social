const Subscription = require('egg').Subscription;

class ToutiaotopDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 15/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start toutiao spider OK")
        await this.ctx.service.toutiaotop.start();
    }
}

module.exports = ToutiaotopDriver;