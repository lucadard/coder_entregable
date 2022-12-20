import { Cart as CartType, Product as ProductType } from '../types'

export default class Cart {
  private _object: CartType
  constructor(object: CartType) {
    this._object = object
  }
  get() {
    return this._object
  }
  setProducts(newProductList: CartType['products']) {
    this._object.products = newProductList
    return this._object
  }

  addProduct(product_id: ProductType['id'], amount?: number) {
    const index = this.get().products.findIndex(
      (p) => product_id === p.product_id
    )
    if (!amount || amount < 1) amount = 1
    if (index !== -1) this.get().products[index].amount += amount
    else {
      this.get().products.push({
        product_id,
        amount
      })
    }
    return this.get()
  }

  removeProduct(product_id: ProductType['id']) {
    const index = this.get().products.findIndex(
      (p) => product_id === p.product_id
    )
    if (index === -1) throw new Error('Product is not in cart.')
    if (this.get().products[index].amount > 1)
      this.get().products[index].amount -= 1
  }

  removeAllFromKind(product_id: ProductType['id']) {
    return this.setProducts(
      this.get().products.filter((p) => p.product_id !== product_id)
    )
  }

  removeAllProducts() {
    return this.setProducts([])
  }

  public asDto = () => Object.freeze(this.get())
}
