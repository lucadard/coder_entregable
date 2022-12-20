export default class Generic<T> {
  private _object: T
  constructor(object: T) {
    this._object = object
  }
  get() {
    return this._object
  }
  update(object: T) {
    this._object = { ...this._object, ...object }
  }
  public asDto = () => Object.freeze(this.get())
}
