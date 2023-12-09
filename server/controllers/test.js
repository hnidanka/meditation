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

//Remove result
export const removeResult = async (req, res) => {
  try {
    const userId = req.query.userId; // Use req.query to get userId from URL parameters
    const resultId = req.query.resultId;// Destructure userId and resultId from req.body

    // Find the user by ID
    const user = await User.findById(userId);

    console.log(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has any results
    if (user.result.length === 0) {
      return res.status(404).json({ error: 'No results to remove' });
    }

    // Remove the last result from the user's results array
    const removedResult = user.result.pop();

    // Save the updated user
    await user.save();

    // Delete the corresponding Result document
    await Result.findByIdAndDelete(resultId);

    res.json({ message: 'Result removed successfully' });
  } catch (error) {
    console.error('Error removing result:', error);
    res.status(500).json({ error: 'Error removing result' });
  }
};