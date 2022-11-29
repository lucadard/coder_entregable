import { Request, Response } from 'express'
import { cartDAO, productDAO } from '../databases'

export const get = {
  getProductsInCart: async (req: Request, res: Response) => {
    const { id } = req.params
    const cartProducts = (await cartDAO.findById(id))?.products
    return cartProducts
      ? res.status(200).send({ data: cartProducts })
      : res.status(404).send({ error: 'cart not found' })
  }
}

export const post = {
  addProductToCart: async (req: Request, res: Response) => {
    const { id_user, id_prod } = req.params
    const product = await productDAO.findById(id_prod)
    if (!product) return res.status(404).send({ error: 'product not found' })
    const updatedCart: any = await cartDAO.addProduct(id_user, product.id)
    return updatedCart
      ? res.status(200).send({ data: updatedCart })
      : res.status(404).send({ error: 'cart not found' })
  }
}

export const eliminate = {
  deleteAllProductsFromCart: async (req: Request, res: Response) => {
    const { user_id } = req.params
    const cart = await cartDAO.emptyCart(user_id)
    return cart
      ? res.status(200).send({ data: cart })
      : res.status(404).send({ error: 'cart not found' })
  },
  deleteOneProductFromCart: async (req: Request, res: Response) => {
    const { id_user, id_prod } = req.params
    const { deleteAll } = req.query

    const product: any = await productDAO.findById(id_prod)
    if (!product) return res.status(404).send({ error: 'product not found' })

    const updatedCart =
      deleteAll === 'true'
        ? await cartDAO.removeAll(id_user, product.id)
        : await cartDAO.removeSingle(id_user, product.id)

    return updatedCart
      ? res.status(200).send({ data: updatedCart })
      : res.status(404).send({ error: 'cart not found' })
  }
}
