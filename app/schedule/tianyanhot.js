const Subscription = require('egg').Subscription;

class TianyanhotDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 10/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start Tianyan spider OK")
        await this.ctx.service.tianyanhot.start();
    }
}

module.exports = TianyanhotDriver;