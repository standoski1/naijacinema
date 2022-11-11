import { NextApiRequest, NextApiResponse } from 'next';
import Cinhandler from '../../middleware/cinemahandler';
import { uploads } from '../../middleware/uploads';
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

Cinhandler.use(uploads).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {name} = req?.body
  const {state} = req?.body
  const {address} = req?.body
  const filename = req?.file
  const image = 'https://newnodebucket.s3.eu-west-2.amazonaws.com/' + filename?.key
  
  try {
    const newCinema = await Cinema.create({
        name,state,image,address
    })
    res.status(200).json(newCinema)
  } catch (error:any) {
    res.status(401).json(error.message)
  }
})


export default Cinhandler






