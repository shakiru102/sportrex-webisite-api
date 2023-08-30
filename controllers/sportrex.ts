import { Request, Response } from "express";
import { airdropValidation, waitlistValidation } from "../utils/joi";
import { WaitlistProps } from "../types";
import Waitlist from "../models/Waitlist";
import { nanoid } from "nanoid";
import Airdrop from "../models/Airdrop";

export const createUserWaitlist = async (req: Request, res: Response) => {
    try {
        const { address, email }: WaitlistProps = req.body
        const { error } = waitlistValidation({ address, email }) 
        if(error) return res.status(400).json({
            success: false,
            error: error.details[0].message
        })
        
        const isAddress = await Waitlist.findOne({ address })
        if(isAddress) return res.status(400).json({ success: false, error: "waitlist already exist" })

        const isEmail = await Waitlist.findOne({ email })
        if(isEmail) return res.status(400).json({ success: false, error: "waitlist already exist" })

        const referral = req.query.referral
        
        
        const referralCode = nanoid(10)
        const waitlist = await Waitlist.create({ address, referralCode, email })
        if(!waitlist) return res.status(400).json({
            success: false,
            error: "Could not create waitlist"
        })
        if(referral) {
            await Waitlist.updateOne({ referralCode : referral }, {
                $inc : {
                    referrals: 1
                }
            })
        }
        res.status(200).json({
            success: true,
            message: "waitlist created successfully",
            waitlist
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const createUserAirdrop = async (req: Request, res: Response) => {
  try {
    
    const { error } = airdropValidation(req.body)
    if(error) return res.status(400).json({
        success: false,
        error: error.details[0].message
    })
    const isAddress = await Airdrop.findOne({ address: req.body.address})
    if(isAddress) return res.status(400).json({ success: false, error: "wallet address already exist" })

    const airdrop = await Airdrop.create({ address: req.body.address})
    if(!airdrop) return res.status(400).json({ success: false, error: "Could not create airdrop" })

    res.status(200).json({ 
        success: true,
        message: "Airdrop created successfully",
        airdrop
    })
  } catch (error: any) {
    res.status(500).json({
        success: false,
        error: error.message
    })
  }
}