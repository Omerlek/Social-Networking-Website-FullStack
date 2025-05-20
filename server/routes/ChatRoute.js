import express from 'express';
import { createChat, findChat, userChats } from '../controllers/ChatController.js';

const router = express.Router();

router.post('/create', createChat); // נשאר רק זה
router.post('/', createChat);       // או רק אחד מהם
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
// DELETE chat by ID
router.delete("/:chatId", async (req, res) => {
  try {
    const result = await Chat.findByIdAndDelete(req.params.chatId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
export default router;
