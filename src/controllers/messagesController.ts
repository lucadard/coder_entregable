import { Request, Response } from 'express'

import { messagesService } from '../services'

export const get = {
  getAllMessages: async (req: Request, res: Response) => {
    const messages = await messagesService.getAllMessages()
    return res.json({ messages })
  },

  getMessageById: async ({ params }: Request, res: Response) => {
    try {
      const message = await messagesService.getMessageById(params.id)
      return res.json({ message })
    } catch (err) {
      return res.json({ error: 'No message with given id' })
    }
  }
}

export const post = {
  addMessage: async ({ body }: Request, res: Response) => {
    const message = await messagesService.addMessage(body)
    return res.json({ message })
  }
}
