import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId, io, userSocketMap } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUser = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users for sidebar" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMassage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl,
    });
    await newMassage.save();
    const reciverSocketId = getReciverSocketId(receiverId);

    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage", newMassage);
    }

    res.status(200).json(newMassage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error " });
  }
};
