import Message from "../models/Message.model.js";
import Notification from "../models/Notification.model.js";

// 1. Send a Message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;
    
    // Naya message database mein save karna
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text: text
    });
    
    await newMessage.save();

    // Seller ko ek notification bhi bhej dete hain
    const notification = new Notification({
      user: receiverId,
      message: "You have a new message!"
    });
    await notification.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error: error.message });
  }
};

// 2. Get Chat History between two users
export const getChatHistory = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    // $or operator ka matlab hai:
    // Ya toh User1 ne User2 ko bheja ho, YA User2 ne User1 ko bheja ho
    const messages = await Message.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    }).sort({ createdAt: 1 }); // 1 ka matlab purane message upar, naye neeche (WhatsApp jaise)

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat", error: error.message });
  }
};