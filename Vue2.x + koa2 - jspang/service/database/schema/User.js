const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 主键(对外)
let ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


// 创建UserSchema
const UserSchema = new Schema({
    UserId: { type: ObjectId },
    userName: {
        unique: true, // 不重复
        type: String // 字符串类型
    },
    password: String,
    createAt: {
        type: Date,
        default: Date.now()
    },
    lastLoginAt: {
        type: Date,
        default: Date.now()
    }
})
// 加盐加密! qaq
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        })
    })
})

// User的方法
UserSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

// 发布模型
// 此时User要和数据库表中的名字一样.
mongoose.model('User', UserSchema)
