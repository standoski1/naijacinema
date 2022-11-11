import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../middleware/handler';
import { uploads } from '../../middleware/uploads';
import { Post } from '../../model/postModel';




interface MulterRequest extends NextApiRequest {
  file: any
  headers: any
}

handler.use(uploads).post(async (req: MulterRequest, res:NextApiResponse)=>{
  const {title} = req.body
  const {text} = req.body
  const {category} = req.body
  const filename = req?.file
  const image = 'https://newnodebucket.s3.eu-west-2.amazonaws.com/' + filename?.key
  
  try {
    await Post.create({
      title,text,image,category
    })
    res.status(200).json('successfull')
  } catch (error:any) {
    res.status(401).json(error.message)
  }
})


export default handler






