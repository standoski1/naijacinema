import type { NextApiRequest, NextApiResponse } from 'next'
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'
import userModel from '../../model/userModel';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "POST"){
      const {email} = req.body.userData
      const {password} = req.body.userData
      
      try {
          const user = await userModel.findOne({email:email})
          
          if (!user) {
              res.status(401).json("wrong credentials")
          } else {
              const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC as string)
              const verifypassword = hashedPassword.toString(CryptoJS.enc.Utf8)
              if (verifypassword !== password) {
                  res.status(401).json("wrong credentials")
              }else{
                  const username = user.username
  
                  const accessToken = jwt.sign({
                    id: user._id,
                }, process.env.JWT_SEC!, {expiresIn: "1d"})
  
                  res.status(200).json({username, accessToken})
              }
          }
      } catch (error:any) {
          res.status(400).json(error.message)          
      }
    }
}
