import { Router } from 'express'
import {getRewards, addRewards, addUserRewards, getAllUserRewards} from '../controllers/reward.js'
import { checkAuth } from '../utils/checkAuth.js'
const router = new Router()

//Get all reward
router.get('/getRewards',getRewards)

// insert rewards
// http://localhost:3002/api/test
router.post('/addRewards',addRewards)

//post user reward
 router.post('/addUserRewards',addUserRewards)
// //get all user reward
 router.get('/getAllUserRewards/:userId',getAllUserRewards )
 export default router