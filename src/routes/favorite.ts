import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
import { expressjwt } from "express-jwt"
import * as jwt from "jsonwebtoken"
import { AppDataSource } from '../data-source'
import { Kampus } from '../entity/Kampus'
import { User } from "../entity/User"

const router  = Router()
const authRequired = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

router.get(
  '/favorite',
  authRequired,
  async (req, res, next) => {
    const authHeader = req.headers["authorization"].replace('Bearer ', '')
    const decoded = <any>jwt.verify(authHeader, process.env.JWT_SECRET)
    const user = await User.find(
      {
        select: ['id', 'name', 'email'],
        relations: {
          kampus: true,
        },
        where: {
          email: decoded.email
        }
      })
    res.json({ status: 1, data: user });
  }
)


router.post(
  '/favorite',
  [
    authRequired,
    celebrate({
      body: Joi.object({
        kampus_id: Joi.string().required()
      })
    })
  ],
  async (req, res, next) => {
    const authHeader = req.headers["authorization"].replace('Bearer ', '')
    const decoded = <any>jwt.verify(authHeader, process.env.JWT_SECRET)
    const user = await User.findOneBy({ email: decoded.email })
    
    let { kampus_id } = req.body
    let result = 0
    
    try {
      const kampus = await Kampus.findOneBy({ id: kampus_id })
      if (kampus) {
        user.kampus = [kampus]
        await user.save()
        result = 1
      }

      res.json({ status: result, data: null })
    } catch (e) {
      return next(e)
    }
  }
)


router.delete(
  '/favorite',
  [
    authRequired,
    celebrate({
      body: Joi.object({
        kampus_id: Joi.string().required()
      })
    })
  ],
  async (req, res, next) => {
    const { kampus_id } = req.body
    const authHeader = req.headers["authorization"].replace('Bearer ', '')
    const decoded = <any>jwt.verify(authHeader, process.env.JWT_SECRET)
    const user = await User.findOneBy({ email: decoded.email })
    const kampus = await Kampus.findOneBy({ id: kampus_id })
    
    let status = 0
    
    try {
      if (user && kampus) {
        const result = await AppDataSource.manager.query(`DELETE FROM user_kampus_kampus WHERE userId='${user.id}' AND kampusId='${kampus.id}'`)
        if (result.affectedRows > 0) {
          status = 1
        }
        res.json({ status: status, data: null })
      }
    } catch (e) {
      return next(e)
    }
  }
)

export default router