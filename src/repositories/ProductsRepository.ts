import Product from '../models/Product'
import { DAOType, Product as ProductType } from '../types'

export default class ProductsRepository {
  private dao
  constructor(dao: DAOType<ProductType>) {
    this.dao = dao
  }

  async save(product: Product) {
    await this.dao.addOne(product.asDto())
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map((msgDto) => new Product(msgDto))
  }

  async getById(id: ProductType['id']) {
    const dto = await this.dao.findById(id)
    if (dto === undefined) throw new Error('No message found')
    return new Product(dto)
  }

  async updateById(id: ProductType['id'], productData: Product) {
    const updatedProduct = await this.dao.updateById(id, productData.asDto())
    return new Product(updatedProduct)
  }

  async removeById(id: ProductType['id']) {
    const removedProduct = await this.dao.deleteOne(id)
    return new Product(removedProduct)
  }
}
