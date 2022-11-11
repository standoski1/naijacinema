import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import jwt from 'jsonwebtoken'


export const config = {
    api: {
      bodyParser: false,
    },
  }

const Cinhandler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, req, res){
    res.status(501).json(`sorry something happened ${error.message}`)
  },
  onNoMatch(req, res){
    res.status(401).json(`method ${req.method} is not allowed`)
  }
})

Cinhandler.use((req, res, next)=>{
    const authHeader = req?.headers?.token as string
    const token = authHeader?.split(" ")[1]
    
    if (authHeader) {
        try {
            jwt.verify(token, process.env.JWT_SEC!, (err, data) => {
                if (err) {
                    res.status(401).json(err.message)
                } else {
                    next()             
                }
            })
        } catch (error: any) {
            return res.status(401).json("not authenticated")
        }           
    }else if (!authHeader) {
        return res.status(401).json("not authenticated")
    }else{
        return res.status(401).json("not authenticated")
    }
})



export default Cinhandler