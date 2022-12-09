declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      MONGO_URL: string
      SELECTED_DAO: 'archivo' | 'memoria' | 'mongodb' | 'firebase'
      NODE_ENV: 'production' | 'development'
    }
  }
  namespace Express {
    export interface Request {
      user?: any
    }
  }
}

export type User = {
  id: string
  username: string
  password: string
  admin: boolean
}
export type Product = {
  id: string
  code: string
  name: string
  description?: string
  timestamp: number
  photo_url?: string
  price: number
  stock: number
}
export type Cart = {
  id: string
  user_id: string
  timestamp: number
  products: {
    product_id: Product['id']
    amount: number
  }[]
}
export type Message = {
  id: string
  sender_id: string
  receiver_id: string
  timestamp: number
  content: string
}
