'use strict';
const Service = require('egg').Service;

class WeibovipService extends Service {
    async start() {
        const { ctx } = this;
        await this.updateVipDriver();
        await this.weibovipDriver();
    }

    // 定时执行scrapy任务, 将admin_weibo_uid中只有微博博主名称的行，爬取出uid，将status变为1-可用
    // 半个小时运行一次足够
    async updateVipDriver() {
        const sql = 'select * from admin_weibo_uid where status = 0;';
        const rows = await this.app.mysql.query(sql);
        if (rows.length > 0) {
            for (const row of rows) {
                const res = await this.getUid(row.vip_name);
                if (res !== false) {
                    const new_row = {
                        id: row.id,
                        vip_uid: res,
                        status: 1
                    }
                    const result = await this.app.mysql.update('admin_weibo_uid', new_row); // 更新 admin_weibo_uid 表中的记录
                    // 判断更新成功
                    const updateSuccess = result.affectedRows === 1;
                    if (updateSuccess != true) {
                        console.log('Error In Update!');
                    } else {
                        console.log(row.vip_name);
                        console.log('Updated!');
                    }
                }
            }
        }
        return null;
    }

    async getUid(vip_name) {
        const url = 'https://m.weibo.cn/api/container/getIndex?containerid=100103type%3D1%26q%3D' + encodeURIComponent(vip_name) + '&page_type=searchall';
        const result = await this.ctx.curl(
            url, {
            method: 'GET',
            dataType: 'json'
        }
        );
        console.log("============ result =============");
        try {
            const uid = result.data.data.cards[0].card_group[0].user.id;
            return uid.toString();
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    async get_1_uid_2_crawl() {
        const sql = 'select * from admin_weibo_uid where status = 1 order by crawl_time limit 0,1;';
        const rows = await this.app.mysql.query(sql);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    }

    async weibovipDriver() {
        const scrapyd_server_url = this.app.config.WeiboSpiderServerUrl;
        // 拼接curl地址
        const url = scrapyd_server_url + "schedule.json";

        // 取出一个爬取时间最晚的uid
        const uid = await this.get_1_uid_2_crawl();
        if (uid !== null) {
            const data = {
                'project': 'weibovip',
                'spider': 'weibo',
                'uid': uid.vip_uid,
                'vip_name': uid.vip_name
            }
            const result = await this.ctx.curl(
                url, {
                method: 'POST',
                data: data,
                dataType: 'json'
            }
            );
            console.log(result)
            // 发送完毕后，更新crawl_time
            const now_time = Math.round(new Date().getTime() / 1000);
            const new_row = {
                id: uid.id,
                crawl_time: now_time
            }
            const res = await this.app.mysql.update('admin_weibo_uid', new_row); // 更新 admin_weibo_uid 表中的记录
            // 判断更新成功
            const updateSuccess = res.affectedRows === 1;
            if (updateSuccess != true) {
                console.log('Error In Update!');
            } else {
                console.log(uid.vip_name);
                console.log('Updated!');
            }
        } else {
            console.log('No uid needs crawl!')
        }
    }
}
module.exports = WeibovipService;