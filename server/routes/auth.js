import { Router } from 'express'
import { register, login, getMe , changeUserName,finishMeditation,upgrateLevel, addUserImage, finishedDifferentMeditations,finisheProgramDay} from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'

const router = new Router()
// Register
// http://localhost:3002/api/auth/register
router.post('/register', register)

// Login
// http://localhost:3002/api/auth/login
router.post('/login', login)

// Get Me
// http://localhost:3002/api/auth/me
router.get('/me', checkAuth, getMe)

router.patch('/:userId/finishMeditation', finishMeditation);
router.put('/finishDifferentMeditations/:userId', finishedDifferentMeditations);
router.patch('/:userId/upgrateLevel', upgrateLevel);
router.put('/addUserImage', addUserImage);
router.put('/finisheProgramDay', finisheProgramDay);
router.put('/changeUserName', changeUserName);

 export default router