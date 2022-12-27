import { Request, Response } from 'express'
import { cartsService } from '../services/index'
import { User as UserType } from '../types'

export const graphql = {
  getProductsInCart: async ({ user_id }: any) => {
    try {
      const cartProducts = await cartsService.getProductsInCart(user_id)
      return cartProducts
    } catch (err: any) {
      throw new Error(err)
    }
  },
  addProductToCart: async ({ amount, product_id, user_id }: any) => {
    try {
      const updatedCart = await cartsService.addProductToCart(
        user_id,
        product_id,
        amount
      )
      return updatedCart
    } catch (err: any) {
      throw new Error(err)
    }
  },
  removeAllProductsFromCart: async ({ user_id }: any) => {
    try {
      const updatedCart = await cartsService.removeAllProductsFromCart(user_id)
      return updatedCart
    } catch (err: any) {
      throw new Error(err)
    }
  },
  removeOneProductFromCart: async ({ user_id, product_id, removeAll }: any) => {
    try {
      const updatedCart = removeAll
        ? await cartsService.removeAllFromKind(user_id, product_id)
        : await cartsService.removeOneProductFromCart(user_id, product_id)
      return updatedCart
    } catch (err: any) {
      throw new Error(err)
    }
  }
}

export const get = {
  getUserCart: async (req: Request, res: Response) => {
    const { id } = req.user as UserType
    try {
      const cartProducts = await cartsService.getProductsInCart(id)
      res.status(200).send({ data: cartProducts })
    } catch (err) {
      res.status(404).send({ error: 'Cart not found.' })
    }
  },
  getProductsInCart: async (req: Request, res: Response) => {
    const { id } = req.params
    try {
      const cartProducts = await cartsService.getProductsInCart(id)
      res.status(200).send({ data: cartProducts })
    } catch (err) {
      res.status(404).send({ error: 'Cart not found.' })
    }
  }
}

export const post = {
  addProductToCart: async (req: Request, res: Response) => {
    const amount = +req.query.amount! || 1
    const id_prod = req.query.id_prod as string
    const { id: id_user } = req.user as UserType
    try {
      const updatedCart = await cartsService.addProductToCart(
        id_user,
        id_prod,
        amount
      )
      res.status(200).send({ data: updatedCart })
    } catch (err: any) {
      res.status(404).send({ error: err.message })
    }
  }
}

export const eliminate = {
  deleteAllProductsFromCart: async (req: Request, res: Response) => {
    const { id: user_id } = req.user as UserType
    try {
      const updatedCart = await cartsService.removeAllProductsFromCart(user_id)
      res.status(200).send({ data: updatedCart })
    } catch (err) {
      res.status(404).send({ error: 'cart not found' })
    }
  },

  deleteOneProductFromCart: async (req: Request, res: Response) => {
    const { id: id_user } = req.user as UserType
    const { id_prod } = req.params
    const { deleteAll } = req.query
    try {
      const updatedCart =
        deleteAll === 'true'
          ? await cartsService.removeAllFromKind(id_user, id_prod)
          : await cartsService.removeOneProductFromCart(id_user, id_prod)
      res.status(200).send({ data: updatedCart })
    } catch (err) {
      res.status(404).send({ error: 'cart not found' })
    }
  }
}
