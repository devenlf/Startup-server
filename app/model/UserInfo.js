module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    console.log('数据层')
    const UserSchema = new Schema({
      userName: { type: String  },
      pass: { type: String  },
      email:{ type: String  },
      account: { type: String },
      uid: { type: String } 
    });
  
    return mongoose.model('UserInfo', UserSchema);
}