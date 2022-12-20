import { randomUUID } from 'crypto'
import CartsRepository from '../repositories/CartsRepository'
import Cart from '../models/Cart'
import { Product as ProductType, User as UserType } from '../types'
import { productsService } from '.'

export default class CartsService {
  private repository: CartsRepository

  constructor(repository: CartsRepository) {
    this.repository = repository
  }

  async createCart(id: UserType['id']) {
    if (await this.repository.exists(id))
      throw new Error('This user already has a cart.')

    const newCart = await this.repository.save(
      new Cart({
        id: randomUUID(),
        products: [],
        timestamp: new Date().valueOf(),
        user_id: id
      })
    )
    return newCart.asDto()
  }

  async getByUserId(id: UserType['id']) {
    const cart = await this.repository.getByUserId(id)
    return cart.asDto()
  }

  async getProductsInCart(id: UserType['id']) {
    const cart = await this.repository.getByUserId(id)
    return cart.asDto().products
  }

  async getCartDetails(id: UserType['id']) {
    const cart = await this.repository.getByUserId(id)
    let totalPrice = 0
    let cartProducts: { data: ProductType; amount: number; cost: number }[] = []

    for (let product of cart.asDto().products) {
      const productDetails = await productsService.getProductById(
        product.product_id
      )
      if (!productDetails) {
        this.removeAllFromKind(id, product.product_id)
      } else {
        totalPrice += productDetails.price
        cartProducts.push({
          data: productDetails,
          amount: product.amount,
          cost: product.amount * productDetails.price
        })
      }
    }
    return { cartProducts, totalPrice }
  }

  async addProductToCart(
    user_id: UserType['id'],
    product_id: ProductType['id'],
    amount?: number
  ) {
    const cart = await this.repository.getByUserId(user_id)
    if (!cart) throw new Error('Cart not found.')
    const product = await productsService.getProductById(product_id)
    if (!product) throw new Error('Product not found.')

    cart.addProduct(product.id, amount)

    const updatedCart = await this.repository.updateByUserId(user_id, cart)
    return updatedCart
  }

  async removeAllProductsFromCart(user_id: UserType['id']) {
    const cart = await this.repository.getByUserId(user_id)

    cart.removeAllProducts()

    const updatedCart = await this.repository.updateByUserId(user_id, cart)
    return updatedCart
  }

  async removeOneProductFromCart(
    user_id: UserType['id'],
    product_id: ProductType['id']
  ) {
    const cart = await this.repository.getByUserId(user_id)

    cart.removeProduct(product_id)

    const updatedCart = await this.repository.updateByUserId(user_id, cart)
    return updatedCart
  }

  async removeAllFromKind(
    user_id: UserType['id'],
    product_id: ProductType['id']
  ) {
    const cart = await this.repository.getByUserId(user_id)

    cart.removeAllFromKind(product_id)

    const updatedCart = await this.repository.updateByUserId(user_id, cart)
    return updatedCart
  }
}
