import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../middleware/handler';
import { uploads } from '../../middleware/uploads';
import absoluteUrl from 'next-absolute-url'
import { Cinema } from '../../model/cinemaModel';



export const config = {
  api: {
    bodyParser: false,
  },
}

interface MulterRequest extends NextApiRequest {
  file: any
  headers: any
}

handler.use(uploads.single('file')).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {name} = req.body
  const {state} = req.body
  const {address} = req.body
  const {filename} = req.file
  const { origin } = absoluteUrl(req)
  const URL = `${origin}/uploads/${filename}` 
  
  try {
    const newCinema = await Cinema.create({
        name,state,image:URL,address
    })
    res.status(200).json(newCinema)
  } catch (error:any) {
    res.status(401).json(error.message)
  }
})


export default handler






