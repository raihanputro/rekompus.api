import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
import { expressjwt,  Request as JWTRequest } from "express-jwt"
import { Kampus } from '../entity/Kampus'
import { User } from "../entity/User"
import { Review } from "../entity/Review"

const router  = Router()
const authRequired = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

router.get(
  '/review/:id',
  authRequired,
  async (req, res, next) => {
    // const kampusId = req.params.id
    const review = await Review.find(
      {
        select: ['id', 'comment'],
        where: {
          kampus: true
        }
      })
    res.json({ status: 1, data: review });
  }
)


router.post(
  '/review',
  [
    authRequired,
    celebrate({
      body: Joi.object({
        kampus_id: Joi.string().required(),
        comment: Joi.string().required()
      })
    })
  ],
  async (req: JWTRequest , res, next) => {
    let { kampus_id, comment } = req.body
    const user = await User.findOneBy({ id: req.auth.id })
    const kampus = await Kampus.findOneBy({ id: kampus_id })
    
    let result = 0
    
    try {
      const review = new Review()
      review.user = user
      review.kampus = kampus
      review.comment = comment
      await review.save()

      res.json({ status: result, data: review })
    } catch (e) {
      return next(e)
    }
  }
)

export default router