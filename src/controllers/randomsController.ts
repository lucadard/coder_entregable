import { Request, Response } from 'express'

export const get = {
  getRandoms: (req: Request, res: Response) => {
    let cant: number = req.query.cant ? +req.query.cant : 100000000
    res.json(calculate(cant))
  }
}

function calculate(amount: number) {
  const randoms: { [key: string]: number } = {}

  const startTime = performance.now()
  for (let i = 0; i < amount; i++) {
    const randomNumber = Math.ceil(Math.random() * (1000 + 1) - 1)
    if (randoms[randomNumber]) randoms[randomNumber]++
    else randoms[randomNumber] = 1
  }
  const endTime = performance.now()

  return {
    randoms,
    time: `in ${((endTime - startTime) / 1000).toFixed(3)}s`,
    by: `Worker ${process.pid}`
  }
}
