'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'Service "eggjs_social" is OK!';
  }

  async testv() {
    const { ctx } = this;
    await this.ctx.service.weibovip.start();
  }
}

module.exports = HomeController;
