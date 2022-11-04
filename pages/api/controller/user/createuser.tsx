import type { NextApiRequest, NextApiResponse } from 'next'
import userModel from '../../model/userModel';
import CryptoJS from 'crypto-js';

type Data = {
  username: string
  accessToken: string
  error: any
}

export default async function Create(req: NextApiRequest, res: NextApiResponse<Data>) {

    // if(req.method === "POST"){
    //   const {email} = req.body
    //   const {password} = req.body
    //   const {username} = req.body
      
    //   try {
    //       await userModel.create({
    //         email,username,
    //         password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC!).toString(),
    //       })
    //       res.status(200).json("success")
    //   } catch (error:any) {
    //       res.status(400).json(error)
    //       console.log(error.message);
          
    //   }
    // }
}
