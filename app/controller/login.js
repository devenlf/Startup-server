'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    const { account, pass} = ctx.request.body;
    const findData = await ctx.service.user.findUser({account});
    switch(findData.length){
      case 0:
        ctx.body={
          state: -1,
          message: '未找到该账号'
        }
      case 1:
        if(findData[0].pass == pass){
          //登陆成功
        }else{
          ctx.body={
            state: -1,
            message: '密码错误，请检查后输入'
          }
        }
      case 2:
        ctx.body={
          state: -1,
          message: '账号异常'
        }
    }
  }
}

module.exports = LoginController;
