'use strict';

const Controller = require('egg').Controller;
// 引用发送邮件插件
const nodeMailer = require('nodemailer')
// 引入证书文件  (获取我的授权码和qq邮箱民)
const credential = require('../../config/credentials')
// 引入随机码
const tools = require('../../utils/index')

// 发送信息的内容
const EmailOptions = (to,code) => {
  return {
    from: '838547385@qq.com',  // 这里是你开启SMTP服务的QQ邮箱号
    to,  // 这个是前端注册页面输入的邮箱号
    subject: '感谢您在创业吐槽大会注册',
    html: `<span>欢迎您的加入！您当前的验证码为${code};请注意保密并在5分钟内完成注册</span>`
    }
}

// 创建传输方式
const transporter = nodeMailer.createTransport({
  service: 'qq',
  auth: {
    user: credential.qq.user,  
    pass: credential.qq.pass   // 这个需要你的授权码！！！
  }
})

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    this.logger.info(ctx.request.body,'register request')
    const {userName,account,email,pass,pass1,vcode } = ctx.request.body
    let codeValue = await this.app.redis.get(email)
    if(!userName||!account||!email||!pass||!pass1||!vcode){
      ctx.body={
        state: -1,
        message: '请检查输入格式'
      } 
      return
    }
    if(codeValue != vcode){
      ctx.body={
        state: -1,
        message: '验证码输入错误'
      }
      return
    }

    if(pass != pass1){
      ctx.body={
        state: -1,
        message: '两次密码输入不一致'
      }
      return
    }


    

    const findData = await ctx.service.user.findUser({account});
    if(findData.length>0){
      ctx.body={
        state: -1,
        message: '用户名重复'
      }
      return
    }
    const addData = await ctx.service.user.addUser({
      pass,
      account,
      userName,
      email,
    });
    if(addData.length>0){
      ctx.body={
        state: 200,
        message: '注册成功'
      }
    }

  }

  async vericode() {
    const { ctx } = this;
    this.logger.info(ctx.request.body,'request')
    const { email } = ctx.request.body
    console.log(ctx.request.body,'ctx.request.bodyctx.request.body.request.bodymail')
    const reg = /^(?=.*@)(?=.*\.)[^@.].*[^@.]$/;
    let options = '';
    this.logger.info(email,'email',)
    if(reg.test(email)){
      let code = tools.randomCode()
      options = EmailOptions(email,code)
       // 发送邮件
      const transporterPromise = new Promise((resolve,reject)=>{
        transporter.sendMail(options, async (err, msg) => {
          if(err){
            return reject(0)
          }else{
            msg.state = 1
            return resolve(msg)
          }
        })
       })

       const reslut = await transporterPromise
       if(reslut.state == 1){
          await this.app.redis.set(email,code)
          ctx.body={
            state: 200,
            message: '邮件发送成功'
          }
       }else{
          ctx.body={
            state: -1,
            message: '邮件发送失败'
          }
       }
      
    }else{
      ctx.body = {
        state: -1,
        message: '邮箱格式不正确'
      };
    }
    return
  }
}

module.exports = LoginController;
