const Subscription = require('egg').Subscription;

class SinatopDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 0/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start baidu spider OK")
        await this.ctx.service.sinatop.start();
    }
}

module.exports = SinatopDriver;