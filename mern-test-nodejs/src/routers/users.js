const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')


router.post('/users', async(req, res) => {
    let user = new User(req.body)
    
    const { password } = req.body;
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    

    user.save().then( async () => {
        const token = await user.generateAuthToken()
        res.send({ user,token })
    }).catch((error) =>{
        res.send(error);
    })
    
})
router.post('/users/login' ,async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }catch (e){
        res.send({success:false})
    }
})
router.post('/users/logout',auth ,async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !=req.token
        })
        await req.user.save()
        res.send({success: true})
    }catch (e){
        res.send('failed logout')
    }
})
router.get('/users/private',auth, async(req, res) =>{
    res.send({ message:'hello world' })
})
const hashPassword = async (password) =>{
    return await bcrypt.hash(password, 8);
}
module.exports = router