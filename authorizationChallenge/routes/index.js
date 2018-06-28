// dependencies
const express = require('express')
const { User, Product } = require('../models')
const passport = require('passport')


// custom middleware
const { requireJwt, register, signJwtForUser, login, isAdmin } = require('../middleware/auth')

const router = express.Router()

// register & login
router.post('/register', register, signJwtForUser)
router.post('/login', login, signJwtForUser)

// example open URL
router.get('/', (req, res) => {
  res.send('Anyone can view this page')
});

// example protected URL
router.get('/protected', requireJwt, (req, res) => {
  res.send('You made it! You must have a valid JWT.')
});


// Product routes
router.get('/products', async (req, res) => {
  res.send(await displayProducts(req.user))
})

router.post('/products', requireJwt, isAdmin, async (req, res) => {
  const product = await Product.create(req.body)
  res.json(product)

  // const product = new Product({
  //   title: req.body.title,
  //   description: req.body.description,
  //   price: req.body.price,
  //   costPrice: req.body.costPrice
  // })
  // product.save().then(() => {
  //   res.send('Product created')
  // }).catch(err => {
  //   res.send(err)
  // })
})



let displayProducts = async (user) => {
  let allProducts = await Product.find()
  


  let productTable = allProducts.map(product => {
    return (
      `<tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        ${user && user.role === 'admin' ? '<td>' + product.costPrice + '</td>' : ' '} 
      </tr>`
    )
  })


  return(
    `<table>
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        ${user && user.role === 'admin' ? '<th>Cost Price</th>' : ' '} 
      </tr>
      ${productTable}
    </table>`
  )
}

module.exports = router
