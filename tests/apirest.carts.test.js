const { assert, expect } = require('chai')
const supertest = require('supertest')
const authenticatedUser = supertest.agent('http://localhost:8080')
const productInCartKeys = ['product_id', 'amount']

const productToAdd = {
  code: '0000',
  name: 'Cart test',
  description: 'Descripcion',
  photo_url: 'http://',
  price: 1,
  stock: 1
}

describe('TEST /api/carts', () => {
  let product
  let anotherProduct
  before(async () => {
    //authenticate agent & POST a product to use later
    await authenticatedUser
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
    const response = await authenticatedUser
      .post('/api/products')
      .send(productToAdd)
    product = response.body.data
  })
  after(async () => {
    //remove previously created products
    await authenticatedUser.delete(`/api/products/${product.id}`)
    await authenticatedUser.delete(`/api/products/${anotherProduct.id}`)
  })
  beforeEach(async () => {
    //add product to cart
    await authenticatedUser.post(
      `/api/carts/add?id_prod=${product.id}&amount=3`
    )
  })
  afterEach(async () => {
    await authenticatedUser.delete(`/api/carts`)
  })

  it('GET / deberia devolver los productos en el carrito del usuario', async () => {
    const response = await authenticatedUser.get('/api/carts')
    const productsInCart = response.body.data
    assert.strictEqual(response.status, 200)
    assert.isArray(productsInCart)
    assert.hasAnyKeys(productsInCart[0], productInCartKeys)
  })

  it('POST / deberia retornar el carrito con el producto agregado', async () => {
    const response = await authenticatedUser.post(
      `/api/carts/add?id_prod=${product.id}&amount=2`
    )
    const cartProducts = response.body.data.products
    assert.strictEqual(response.status, 200)
    const index = cartProducts.findIndex((p) => p.product_id === product.id)
    assert.isTrue(index !== -1)
    assert.isTrue(cartProducts[index].amount === 5)
  })

  it('DELETE / deberia el carrito vacio', async () => {
    const response = await authenticatedUser.delete('/api/carts')

    const cartProducts = response.body.data.products
    assert.strictEqual(response.status, 200)
    assert.isTrue(cartProducts.length === 0)
  })

  it('DELETE /product/:id_prod deberia retornar el carrito con un producto menos', async () => {
    const response = await authenticatedUser.delete(
      `/api/carts/product/${product.id}`
    )
    const cartProducts = response.body.data.products
    assert.strictEqual(response.status, 200)
    const index = cartProducts.findIndex((p) => p.product_id === product.id)
    assert.isTrue(index !== -1)
    assert.isTrue(cartProducts[index].amount === 2)
  })

  it('DELETE /:id deberia retornar el carrito sin el producto', async () => {
    //remove product from cart
    await authenticatedUser.delete(
      `/api/carts/product/${product.id}?deleteAll=true`
    )
    //post another product
    anotherProduct = (
      await authenticatedUser.post('/api/products').send(productToAdd)
    ).body.data
    //add it to the cart
    const response = await authenticatedUser.post(
      `/api/carts/add?id_prod=${anotherProduct.id}`
    )
    /********************/
    const cartProducts = response.body.data.products

    assert.strictEqual(response.status, 200)
    const index = cartProducts.findIndex((p) => p.product_id === product.id)
    assert.isTrue(index === -1)
    assert.isTrue(product.id !== anotherProduct.id)
    assert.isTrue(cartProducts[0].product_id === anotherProduct.id)
  })
})
