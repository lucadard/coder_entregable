import { Request, Response } from 'express'
import MessageService from '../negocio/MessageService'

const messageService = new MessageService()

export const get = {
  getAllMessages: async (req: Request, res: Response) => {
    const messages = await messageService.getAllMessages()
    return res.json({ messages })
  },
  
  getMessageById: async ({ params }: Request, res: Response) => {
    try {
      const message = await messageService.getMessageById(params.id)
      return res.json({ message })
    } catch (err) {
      return res.json({ error: 'No message with given id' })
    }
  }
}

export const post = {
  addMessage: async ({ body }: Request, res: Response) => {
    const message = await messageService.addMessage(body)
    return res.json({ message })
  }
}
