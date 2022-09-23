const Subscription = require('egg').Subscription;

class NeteasetopDriver extends Subscription {
    static get schedule() {
        return {
            cron: '0 10/30 6-23 * * ?',
            type: 'worker'
        };
    }
    async subscribe() {
        console.log("Start netease spider OK")
        await this.ctx.service.neteasetop.start();
    }
}

module.exports = NeteasetopDriver;