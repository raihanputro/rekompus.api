import { Router } from "express"
// import * as jwt from "jsonwebtoken"

const router  = Router()

router.post('/', (req, res, next) => {
  let { email, password } = req.body
  res.json({ status: 1, body: email + ' --- ' + password });
})

export default router