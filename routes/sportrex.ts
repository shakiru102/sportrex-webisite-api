import { Router } from "express";
import { createUserAirdrop, createUserWaitlist, subscribedSportrexEmail } from "../controllers/sportrex";
import { subscribedBlowxEmail } from "../controllers/blow";

const route = Router()

route.post('/waitlist',createUserWaitlist)
route.post('/airdrop',createUserAirdrop)
route.post('/subscribers', subscribedSportrexEmail)
route.post('/subscribers-blowx', subscribedBlowxEmail)

export default route