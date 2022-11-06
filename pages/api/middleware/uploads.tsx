import multer from 'multer'
import multers3 from 'multer-s3'
import {s3} from '../../../components/creadentials'
import dotenv from 'dotenv'
dotenv.config()

export const config = {
  api: {
    bodyParser: false,
  },
}

export const uploads = function(req, res, next) {

  const fileFilter = (req, file, cb) => {
     if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
      } else {
        cb("Invalid file type")
      }
   };


 const uploadz = multer({
  limits:{
    fileSize: 1024 * 1024 * 1
  },
  fileFilter,
  storage: multers3({
    s3,
    bucket: process.env.AWS_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, files, cb) {
     cb(null, `naijacinemas/image-${Date.now()}.png`)
   }
  }),
}).single('file')
uploadz(req,res, function(err){
  if(err){ 
      res.status(400).json({message: err});
      console.log(err);
  } else {
      next();
  }
})
}