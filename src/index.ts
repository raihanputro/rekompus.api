import express from "express"
import cors from "cors"
import "reflect-metadata"

function main(){
  const port = 3000
  const app = express()

  app.use(cors({
    origin: '*'
  }))

  app.get("/", (req, res) => res.send("Rekompus API Server"))

  app.listen(port, () => {
    console.log(`[server] server running at http://localhost:${port} ⚡`)
  })
}

main()