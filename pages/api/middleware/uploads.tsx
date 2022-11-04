import multer from 'multer';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
}

export const uploads = multer({
  
  storage: multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, path.join(process.cwd(), "public", "uploads"))
      },
       filename: (req, file, cb) => {
          cb(null, Date.now() + "-" + file.originalname)
      }
  })
})