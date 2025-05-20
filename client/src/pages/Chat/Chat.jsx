import React, { useRef, useState, useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Coversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import "./Chat.css";
import { userChats } from "../../api/ChatRequests";
import { getAllUser } from "../../api/UserRequests";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
const Chat = () => {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  // Get all users (for displaying potential chat targets)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getAllUser();
        setUsers(data.filter((u) => u._id !== user._id));
      } catch (err) {
        console.log("Error fetching users", err);
      }
    };
    fetchUsers();
  }, [user._id]);

  // Get user's chats
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  // Check if the user is online
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    return onlineUsers.some((u) => u.userId === chatMember);
  };

  // Handle starting a new chat with a user
  const handleStartChat = async (receiverId) => {
    const existingChat = chats.find((chat) =>
      chat.members.includes(user._id) && chat.members.includes(receiverId)
    );

    if (existingChat) {
      setCurrentChat(existingChat);
    } else {
      try {
        const { data } = await axios.post("/chat/create", {
          senderId: user._id,
          receiverId: receiverId,
        });
        setChats([...chats, data]);
        setCurrentChat(data);
      } catch (err) {
        console.log("Error creating chat", err);
      }
    }
  };

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />

        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat, index) => (
              <div key={index} onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>

          <h3>Start New Chat</h3>
          <div className="User-list">
            {users.map((u) => (
              <div key={u._id} onClick={() => handleStartChat(u._id)}>
                <div className="follower conversation">
                  <div>
                    <img
                      src={
                        u.profilePicture
                          ? process.env.REACT_APP_PUBLIC_FOLDER + u.profilePicture
                          : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                      }
                      alt="Profile"
                      className="followerImage"
                      style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                      <span>{u.firstname} {u.lastname}</span>
                    </div>
                  </div>
                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;