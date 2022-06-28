import { Router } from "express"
import { celebrate, Joi } from 'celebrate'
import { User } from '../entity/User'
import * as jwt from "jsonwebtoken"
import { expressjwt,  Request as JWTRequest } from "express-jwt"
const router  = Router()
const authRequired = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] })

/**
* @swagger
* /register:
*   post:
*     summary: Pendaftaran user baru
*     tags:
*       - user
*   parameters:
*     - in: path
*       name: email
*       required: true 
*       schema:
*         type: string
*       description: Alamat email
*     - in: path
*       name: name
*       required: true
*       schema:
*         type: string
*       description: nama lengkap
*     - in: path
*       name: password
*       required: true
*       schema:
*         type: string
*       description: Password
*/
router.post(
  '/register',
  celebrate({
    body: Joi.object({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      password: Joi.string().required()
    }),
  }),  
  async (req, res, next) => {
    let { name, email, password } = req.body
    
    const user = new User()
    user.name = name
    user.email = email
    user.password= password
    await user.save()

    res.json({ status: 1, data: user });
  }
)

/**
 * @swagger
 *
 * /login:
 *   post:
 *     summary: Login ke aplikasi
 *     tags:
 *       - user
 *     consumes:
 *        - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         type: object
 *         description: login object
 *         required: true 
 *         schema:
 *            type: object
 *            properties:   
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *        200:
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                          status:
 *                            type: number
 *                            description: 1 = sukses, 0 = error
 *                          message:
 *                            type: string
 *                          data:
 *                            type: string
 *                            description: jika sukses berisi jwt token
 */
router.post(
  '/login',
  celebrate({
    body: Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),  
  async (req, res, next) => {
    let { email, password } = req.body

    try {
      const user = await User.findOneBy({ email: email });  

      if (!user) {
        res.json({ status: 0, message: 'Invalid email or password !' });
      }
  
      if (!user.checkIfPasswordMatch(password)) {
        res.json({ status: 0, message: 'Invalid email or password !' });
      }  

      const token = jwt.sign(
        { id: user.id, role: user.role }
        , process.env.JWT_SECRET
        , { expiresIn: process.env.JWT_EXPIRATION, algorithm: 'HS256' }
        );

      return res.json({ status: 1, data: token, message: '' });
    } catch (e) {
      return next(e);
    }    
  }
)

router.post(
  '/logout',
  authRequired,
  async (req, res, next) => {
    const authHeader = req.headers["authorization"].replace('Bearer ', '')
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
      if (logout) {
        res.json({ status: 1, message: '' });
      } else {
        res.send({msg:'Error'});
        res.json({ status: 0, message: err });
      }
    })
  }
)

router.get(
  '/me',
  authRequired,
  async (req: JWTRequest, res, next) => {
    const user = await User.find(
      {
        select: ['id', 'name', 'email', 'role'],
        where: {
          id: req.auth.id
        }
      })
    res.json({ status: 1, data: user });
  }
)

export default router
