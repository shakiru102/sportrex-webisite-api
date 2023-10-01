import joi from 'joi'
import { WaitlistProps } from '../types'

const waitlistSchema = joi.object<WaitlistProps>({
    address: joi.string().required().min(18),
    email: joi.string().email().required(),
})

export const waitlistValidation = ((data: WaitlistProps) => waitlistSchema.validate(data))

const airdropsSchema = joi.object<{address: string}>({
    address: joi.string().required().min(18)
})

export const airdropValidation = ((data: {address: string}) =>  airdropsSchema.validate(data))

const emailSchema = joi.object<{email: string}>({
    email: joi.string().email().required()
})

export const emailValidation = ((data: {address: string}) =>  emailSchema.validate(data))