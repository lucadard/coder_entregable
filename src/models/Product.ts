import { Product as ProductType } from '../types'

export default class Product {
  private _object: ProductType
  constructor(object: ProductType) {
    this._object = object
  }
  get() {
    return this._object
  }
  update(newProduct: ProductType) {
    this._object = newProduct
    return this._object
  }

  public asDto = () => Object.freeze(this.get())
}
