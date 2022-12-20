import { randomUUID } from 'crypto'
import ProductsRepository from '../repositories/ProductsRepository'
import Product from '../models/Product'
import { Product as ProductType } from '../types'

export default class ProductsService {
  private repository: ProductsRepository

  constructor(repository: ProductsRepository) {
    this.repository = repository
  }

  async getAllProducts() {
    const products = await this.repository.getAll()
    return products.map((prod) => prod.asDto())
  }

  async getProductById(id: ProductType['id']) {
    const product = await this.repository.getById(id)
    return product.asDto()
  }

  async addProduct(productData: Omit<ProductType, 'id' | 'timestamp'>) {
    const product = new Product({
      id: randomUUID(),
      timestamp: new Date().valueOf(),
      ...productData
    })
    await this.repository.save(product)
    return product.asDto()
  }

  async updateProduct(id: ProductType['id'], productData: any) {
    const oldProduct = await this.repository.getById(id)
    const newProduct = new Product(productData)
    oldProduct.update(newProduct.asDto())
    const updatedProduct = await this.repository.updateById(id, oldProduct)
    return updatedProduct.asDto()
  }

  async removeProduct(id: ProductType['id']) {
    const removedProduct = await this.repository.removeById(id)
    return removedProduct.asDto()
  }
}
