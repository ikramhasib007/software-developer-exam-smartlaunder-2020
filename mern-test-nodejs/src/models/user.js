const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    },
    tokens:[{
        token: {
            type: String
        }
    }],
    admin:{
        type: Boolean,
        default: false
    }
})
userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch)
        throw new Error('Unable to login')
    return user
}
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'hello')
    user.tokens = user.tokens.concat({ token })
   
    await user.save()

    return token;
}
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens

    return userObject
}
userSchema.pre('save', async function(next){
    const user = this;
    next()
})

const User = mongoose.model('', userSchema)

module.exports = User;