import express, { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'class-validator'
import 'reflect-metadata'
import 'dotenv/config'
import helmet from 'helmet'
import cors from 'cors'
import * as bodyParser from 'body-parser'
import { isCelebrateError } from 'celebrate'
import { AppDataSource } from './data-source'
import routes from './routes'

function main(){
  const port = process.env.PORT || 3000
  const prefix = process.env.ENDPOINT_PREFIX || 'api'
  const app = express()

  app.use(cors({
    origin: '*'
  }))
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.get("/", (req, res) => res.send("Rekompus API Server"))
  
  app.use("/images", express.static('./uploads'))
  app.use('/', routes)
  app.use(`/${prefix}`, routes)
  
  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    // console.log(err)
    if (isCelebrateError(err)) {
      return res.status(400).json({ error: 'Invalid data' }).end()
    } else if (err instanceof Array && err[0] instanceof ValidationError) {
      const messageArr: Array<string> = []
      let e: ValidationError
      for (e of err) {
        Object.values(e.constraints).forEach((msg: string) => {
          messageArr.push(msg)
        })
      }
      return res.status(400).json({ errors: messageArr }).end()
    } else if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: err.message })
    } else {
      next(err)
    }
  })

  AppDataSource.initialize()

  app.listen(port, () => {
    console.log(`[server] server running at http://localhost:${port} ⚡`)
  })
}

main()