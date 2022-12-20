const { assert, expect } = require('chai')
const supertest = require('supertest')
const authenticatedUser = supertest.agent('http://localhost:8080')

let serverGeneratedId
const productToAdd = {
  code: '0000',
  name: 'Product test',
  description: 'Descripcion',
  photo_url: 'http://',
  price: 1,
  stock: 1
}
const productKeys = [
  'id',
  'code',
  'name',
  'description',
  'timestamp',
  'photo_url',
  'price',
  'stock'
]

describe('TEST /api/products', () => {
  //Authenticate agent
  before(async () => {
    const response = await authenticatedUser
      .post('/auth/login')
      .send({ username: 'admin', password: 'admin' })
    expect.strictEqual(response.header.location, '/auth/login/success')
  })

  it('GET / deberia retornar un array de productos', async () => {
    const response = await authenticatedUser.get('/api/products')

    const productsArray = response.body.data

    assert.strictEqual(response.status, 200)
    assert.isArray(productsArray)
    assert.hasAllKeys(productsArray[0], productKeys)
  })

  it('POST / deberia retornar el objeto agregado', async () => {
    const response = await authenticatedUser
      .post('/api/products')
      .send(productToAdd)

    serverGeneratedId = response.body.data.id
    assert.strictEqual(response.status, 200)
  })

  it('PUT /:id deberia retornar el objeto cambiado', async () => {
    const productToUpdate = {
      ...productToAdd,
      description: 'Nueva descripcion'
    }
    const response = await authenticatedUser
      .put(`/api/products/${serverGeneratedId}`)
      .send(productToUpdate)
    const updatedProduct = response.body.data

    assert.strictEqual(response.status, 200)
    assert.strictEqual(updatedProduct.id, serverGeneratedId)
    assert.strictEqual(updatedProduct.description, productToUpdate.description)
    assert.hasAllKeys(updatedProduct, productKeys)
  })

  it('DELETE /:id deberia retornar el objeto eliminado', async () => {
    const response = await authenticatedUser.delete(
      `/api/products/${serverGeneratedId}`
    )
    const removedProduct = response.body.data

    assert.strictEqual(response.status, 200)
    assert.strictEqual(removedProduct.id, serverGeneratedId)
    assert.hasAllKeys(removedProduct, productKeys)
  })
})
