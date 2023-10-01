import { Request, Response } from "express"
import { airdropValidation } from "../utils/joi"
import Blowx from "../models/Blowx"

export const subscribedBlowxEmail = async (req: Request, res: Response) => {
    try {
      
      const { error } = airdropValidation(req.body)
      if(error) return res.status(400).json({
          success: false,
          error: error.details[0].message
      })
      const isAddress = await Blowx.findOne({ email: req.body.email})
      if(isAddress) return res.status(400).json({ success: false, error: "email address already exist" })
  
      const airdrop = await Blowx.create({ email: req.body.email})
      if(!airdrop) return res.status(400).json({ success: false, error: "Could not create subscriber" })
  
      res.status(200).json({ 
          success: true,
          message: "you have successfully subcribed to the news letter",
          airdrop
      })
    } catch (error: any) {
      res.status(500).json({
          success: false,
          error: error.message
      })
    }
  }