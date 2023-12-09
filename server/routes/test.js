import { Router } from 'express'
import { insertQuestions ,getQuestions} from '../controllers/test.js'
import { checkAuth } from '../utils/checkAuth.js'
import { storeResult, getResult, removeResult } from '../controllers/test.js'
const router = new Router()

//Get all questions
router.get('/questions',getQuestions,checkAuth)

// insert questions
// http://localhost:3002/api/test
router.post('/questions',insertQuestions)

//post all results
router.post('/results',storeResult,checkAuth )
//get all results
router.get('/results',getResult )
router.delete('/removeResult', removeResult)
 export default router