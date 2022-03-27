const Service = require('egg').Service;
const tools = require('../../utils/index')
class UserService extends Service {
// 查找游湖
  async findUser(param) {
    let {account} = param;
    console.log('account',account)
    let userInfo = await this.ctx.model.UserInfo.find({account})
    this.logger.info('userInfo',userInfo)
    return userInfo
  }

// 新增用户
async addUser(param) {
    let newData = {
        ...param,
        uid: tools.makeUuid(),
    }
    console.log('newData',newData)
    let data = await this.ctx.model.UserInfo.insertMany(newData)
    return data
  }

//  修改用户信息
async fixUser(param) {
    // let userInfo = this.ctx.model.UserInfo.find({})
    console.log('服务层')
    return param
  }

}

module.exports = UserService;