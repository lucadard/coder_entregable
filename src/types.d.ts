declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      MONGO_URL: string
      SELECTED_DAO: 'memory' | 'mongodb'
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

type HasId = {
  id: string
}

export type DAOType<T> = {
  connect?: () => void

  getAll: () => Promise<T[]>

  findById: (id: string) => Promise<T>
  findByQuery?: (query: {}) => Promise<T>
  updateById: (id: string, newData: T) => Promise<T | UpdateResult>
  updateByQuery?: (query: {}, newData: T) => Promise<T | UpdateResult>

  addOne: (newItem: T) => Promise<T>

  deleteOne: (id: string) => Promise<string | DeleteResult>
  deleteAll: () => Promise<any | DeleteResult>

  count?: () => Promise<number>
}
