import { Router } from 'express'
import Conversation from '../models/Conversation.js'
const router = new Router()

router.post("/addConv" , async (req,res) =>{
    const newConversation = new Conversation({
        members:[req.body.serderId , req.body.receiverId]
    });

    try{
        const savedConverstation = await newConversation.save();

console.log(savedConverstation)
        res.status(200).json(savedConverstation);

    }catch(err){
        res.status(500).json(err)
    }
}
)

router.get("/:userId", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

 
  
 export default router