import { Router } from "express";
import { createUserAirdrop, createUserWaitlist } from "../controllers/sportrex";

const route = Router()

route.post('/waitlist',createUserWaitlist)
route.post('/airdrop',createUserAirdrop)

export default route