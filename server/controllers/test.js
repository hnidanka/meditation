import Question from "../models/Question.js"
 
import User from "../models/User.js";
import questions, {answers} from "../data/questions.js";

import Result from "../models/Result.js";
//get questions from db
export const getQuestions = async (req, res) => {
  try {
   
   const q =  await Question.find();
      res.json(q)
  
} catch (error) {
  res.json({ error })
}
}

// Dodanie pytań, odpowiedzi i kombinacji
export const insertQuestions = async (req, res) => {
  try {
    await Question.insertMany({ questions, answers });
    res.json({ msg: "Data Saved Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};


//Store User answer post all result

export async function storeResult(req, res) {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // const { result } = req.body.result;
    // user.result.push(result);
    // await user.save();
     const { userId, result} = req.body;
     const newResult = new Result({
      username: user.username,
      result,
     })
     await newResult.save();
     await User.findByIdAndUpdate(req.body.userId, {
      $push: { result: newResult },
  })
    console.log('Result Saved Successfully...!');
    res.json({ msg: 'Result Saved Successfully...!' });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.json({ error: error.message });
  }
}




//Get Results


export const getResult = async (req, res) => {
  try {
   const r = await Result.find()
    res.json(r)
  } catch (error) {
  res.json({ error })
}
}
