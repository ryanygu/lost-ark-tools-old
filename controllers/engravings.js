const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Engraving = require('../models/engraving')
const User = require('../models/user')

router.get('/all', async (request, response) => {
  // check if admin/system before allowing all data to be returned
  const engravings = await Engraving
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(engravings)
})

router.get('/', async (request, response) => {
  // only let a user get its own engraving data
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const allEngravings = await Engraving
    .find({}).populate('user', { username: 1, name: 1 })
  
  const userEngravings = allEngravings.filter(e => e.user.id === decodedToken.id)

  response.json(userEngravings)
})

router.post('/', async (request, response) => {
  const engraving = new Engraving(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!engraving.score) {
    return response.status(400).send({ error: 'score missing' })
  }

  engraving.user = user
  const savedEngraving = await engraving.save()

  user.engravings = user.engravings.concat(savedEngraving._id)
  await user.save()

  response.status(201).json(savedEngraving)
})

// router.delete('/:id', async (request, response) => {
//   const decodedToken = jwt.verify(request.token, process.env.SECRET)

//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }

//   const user = await User.findById(decodedToken.id)
//   const engraving = await Engraving.findById(request.params.id)
//   if (engraving.user.toString() !== user.id.toString()) {
//     return response.status(401).json({ error: 'only the creator can delete blogs' })
//   }

//   await engraving.remove()
//   // TODO: bug with removing user.engraving ids
//  // maybe fix: .populate the user first
//   user.engravings = user.engravings.filter(e => e.id.toString() !== request.params.id.toString())
//   await user.save()
//   response.status(204).end()
// })

// untested
// router.put('/:id', async (request, response) => {
//   const engraving = request.body

//   const updatedEngraving = await Engraving.findByIdAndUpdate(request.params.id, engraving, { new: true })
//   response.json(updatedEngraving.toJSON())
// })

module.exports = router
