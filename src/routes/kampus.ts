// import { Jurusan } from './../entity/Jurusan'
import { Router } from "express"
import multer from 'multer'
import { celebrate, Joi } from 'celebrate'
import { Kampus } from '../entity/Kampus'

const router  = Router()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})
const upload = multer({ storage: storage })

router.get(
  '/kampus',
  async (req, res, next) => {
    try {
      const kampus = await Kampus.find({relations: {
        jurusan: true,
      }})

      return res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }    
  }
)

router.get(
  '/kampus/:id',
  async (req, res, next) => {
    const kampusId : number = parseInt(req.params.id)
    try {
      const kampus = await Kampus.find({
        relations: {
          jurusan: true,
        },
        where: {
          id: kampusId
        }
      })

      return res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }    
  }
)

router.post(
  '/kampus',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      // pictureId: Joi.string(),
      rating: Joi.number().required(),
      city: Joi.string().required(),
      akreditasiKampus: Joi.string().required(),
      statusPmb: Joi.string().required(),
      kelasTersedia: Joi.array().items(Joi.string())
      /* jurusan: Joi.array().items(Joi.object({
        Jurusan
      })) */
    }),
  }),  
  async (req, res, next) => {
    let { name, description, rating, city, akreditasiKampus, statusPmb, kelasTersedia } = req.body
    
    try {
      const kampus = new Kampus()
      kampus.name = name
      kampus.description = description
      kampus.rating = rating
      kampus.city = city
      kampus.akreditasiKampus = akreditasiKampus
      kampus.statusPmb = statusPmb
      kampus.kelasTersedia = kelasTersedia
      await kampus.save()

      res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }
  }
)

router.put(
  '/kampus/:id',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      rating: Joi.number().required(),
      city: Joi.string().required(),
      akreditasiKampus: Joi.string().required(),
      statusPmb: Joi.string().required(),
      kelasTersedia: Joi.array().items(Joi.string())
    }),
  }),  
  async (req, res, next) => {
    let { name, description, rating, city, akreditasiKampus, statusPmb, kelasTersedia } = req.body
    
    try {
      const kampus = await Kampus.findOneBy({
        id: parseInt(req.params.id)
      })
 
      kampus.name = name
      kampus.description = description
      kampus.rating = rating
      kampus.city = city
      kampus.akreditasiKampus = akreditasiKampus
      kampus.statusPmb = statusPmb
      kampus.kelasTersedia = kelasTersedia
      await kampus.save()

      res.json({ status: 1, data: kampus })
    } catch (e) {
      return next(e)
    }
  }
)

router.post(
  '/kampus/:id/pictureid',
  upload.single('pictureid'),
  async (req, res, next) => {
    
    try {
      const file = req.file.path
      console.log(file)
      if (!file) {
        res.json({ status: 0, message: "No File is selected." })
      }

      const kampus = await Kampus.findOneBy({
        id: parseInt(req.params.id)
      })

      kampus.pictureId = req.file.filename
      await kampus.save()

      res.json({ status: 1, data: file })
    } catch (e) {
      return next(e)
    }
  }
)

export default router