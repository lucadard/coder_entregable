import Cart from '../models/Cart'
import { DAOType, Cart as CartType, User as UserType } from '../types'

export default class CartsRepository {
  private dao
  constructor(dao: DAOType<CartType>) {
    this.dao = dao
  }

  async save(cart: Cart) {
    const savedDto = await this.dao.addOne(cart.asDto())
    return new Cart(savedDto)
  }

  async getAll() {
    const dtos = await this.dao.getAll()
    return dtos.map((msgDto) => new Cart(msgDto))
  }

  async getByUserId(id: CartType['id']) {
    const dto = await this.dao.findByQuery!({ user_id: id })
    if (dto === undefined) throw new Error('No cart found')
    return new Cart(dto)
  }

  async updateByUserId(user_id: UserType['id'], cartData: Cart) {
    const updatedCart = await this.dao.updateByQuery!(
      { user_id },
      cartData.asDto()
    )
    return updatedCart
  }

  async removeByUserId(user_id: UserType['id']) {
    const removedCart = await this.dao.deleteOne(user_id)
    return removedCart.asDto()
  }

  async exists(user_id: UserType['id']) {
    const dto = await this.dao.findByQuery!({ user_id })
    return Boolean(dto)
  }
}
