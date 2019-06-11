const User = require('../models/User')
const Ad = require('../models/Ad')
const Purchase = require('../models/Purchase')
const Queue = require('../services/Queue')
const PurchaseMail = require('../jobs/PurchaseMail')

class PurchaseController {
  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      ad: purchaseAd,
      user: user._id,
      content
    })

    Queue.create(PurchaseMail.key, {
      ad,
      user,
      content
    }).save()

    return res.json({ purchase })
  }
}

module.exports = new PurchaseController()
