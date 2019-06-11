const Purchase = require('../models/Purchase')

class ApproveController {
  async update (req, res) {
    console.log(req.params)
    const { id } = req.params

    const ad = await Purchase.findById(id).populate({
      path: 'ad',
      populate: {
        path: 'author'
      }
    })
    console.log(ad)

    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: 'You are not the ad author' })
    }

    if (ad.purchasedBy) {
      return res.status(400).json({ error: 'This ad had already been purchased' })
    }

    ad.purchasedBy = id

    await ad.save()
    return res.json(ad)
  }
}

module.exports = new ApproveController()
