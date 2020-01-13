const express = require('express')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')
const router = new express.Router()
const Product = require('../models/products')
const eventemiter = require('../events')

const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 10000000
    },
})
router.post('/products', adminAuth, upload.single('upload'), async (req, res) => {
    let product = new Product(req.body)
    product.price = product.startingPrice;
    if (req.file)
        product.thumbnail = req.file.buffer
    product.save().then(async () => {
        res.send({ product })
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })

})

router.get('/products/active', async (req, res) => {
    let result = await Product.find({ active: true })
    let results = []
    result.forEach((el, index, arr) => {
        let sub = el.finishTime - new Date()
        el.timeLeft = sub / 60000
        results.push({ data: el, timeleft: el.timeLeft })
    })
    
    
      eventemiter.emit('event')
    // console.log(results);
    res.send({ results });

})
router.get('/products/admin', adminAuth, async (req, res) => {
    let result = await Product.find()
    let results = []
    result.forEach((el, index, arr) => {
        let sub = el.finishTime - new Date()
        el.timeLeft = sub / 60000
        results.push({ data: el, timeleft: el.timeLeft })
    })
    res.send({ results });

})
router.put('/products/:id',adminAuth, async (req, res) => {
    let dt = new Date()
    dt.setMinutes(dt.getMinutes() + parseInt(req.body.finishTime));
    Product.updateOne({ _id: req.params.id }, { $set: { active: req.body.active, bidingPrice: req.body.bidingPrice, finishTime: dt } }).then(result => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
    eventemiter.emit('newBid')
})
router.put('/products/bid/:id',userAuth, async (req, res) => {
    let result = await Product.find( {_id: req.params.id } )
    console.log(result[0].bidingPrice);
    let nextBid = result[0].price  + result[0].bidingPrice
    Product.updateOne({ _id: req.params.id }, { $set: { lastBid: req.body.email,price: nextBid } }).then(result => {
        res.send(result)
    }).catch((err) => {
        res.send(err);
    })
    eventemiter.emit('newBid')
    
})

router.get('/fundrisers/image/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        res.set('Content-Type', 'image/png')
        res.send(product.thumbnail)
    } catch{
        res.send('error')
    }
})
module.exports = router