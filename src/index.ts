import express from "express"
import helmet from "helmet"
import cors from "cors"
import "reflect-metadata"
import * as bodyParser from "body-parser"

import loginRoutes from "./routes/login"

function main(){
  const port = 3000
  const app = express()

  app.use(cors({
    origin: '*'
  }))
  app.use(helmet())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.get("/", (req, res) => res.send("Rekompus API Server"))
  
  app.use('/login', loginRoutes)


  app.listen(port, () => {
    console.log(`[server] server running at http://localhost:${port} ⚡`)
  })
}

main()