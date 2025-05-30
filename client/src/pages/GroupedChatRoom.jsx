import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../store/auth";
import { Send, MessageCircle } from "lucide-react";

// Automatically choose the right backend
const BACKEND_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://my-career-compass.onrender.com";

const socket = io(BACKEND_URL);

const GroupedChatRoom = () => {
  const { user, token } = useAuth();
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  const availableInterests = [
    "Engineering",
    "Doctor",
    "Arts",
    "Science",
    "Law",
    "Commerce",
  ];

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/chat/${interest}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setChat(data);
        } else {
          console.error("Failed to load chat history");
        }
      } catch (error) {
        console.error("Error fetching chat:", error.message);
      }
    };

    if (interest) {
      fetchChatHistory();
    }
  }, [interest, token]);

  useEffect(() => {
    if (user && interest) {
      socket.emit("joinRoom", { username: user.username, interest });
    }

    socket.on("receiveMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, [user, interest]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("sendMessage", {
        user: user.username,
        interest,
        text: message,
      });
      setMessage("");
    }
  };

  if (!interest) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl">
          <h2 className="text-2xl font-extrabold text-center text-blue-800 mb-4">
            <MessageCircle className="inline-block w-6 h-6 mr-2" />
            Choose Your Interest Group
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {availableInterests.map((field) => (
              <button
                key={field}
                onClick={() => setInterest(field)}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                {field}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-2xl flex flex-col">
        <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
          Group Chat: <span className="text-blue-600">{interest}</span>
        </h2>

        <div className="flex-1 overflow-y-auto space-y-2 bg-gray-100 rounded-xl p-4 h-96">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-xl max-w-[75%] text-sm shadow-md ${
                msg.user === user.username
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="font-semibold">{msg.user}</p>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 mt-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupedChatRoom;



// import React, { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";
// import { useAuth } from "../store/auth";
// import { Send, MessageCircle } from "lucide-react";

// const socket = io("https://my-career-compass.onrender.com"); // Update with your backend URL

// const GroupedChatRoom = () => {
//   const { user } = useAuth();
//   const [interest, setInterest] = useState("");
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const chatEndRef = useRef(null);

//   const availableInterests = [
//     "Engineering",
//     "Doctor",
//     "Arts",
//     "Science",
//     "Law",
//     "Commerce",
//   ];

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const res = await fetch(`https://my-career-compass.onrender.com/api/chat/${interest}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setChat(data);
//         } else {
//           console.error("Failed to load chat history");
//         }
//       } catch (error) {
//         console.error("Error fetching chat:", error.message);
//       }
//     };

//     if (interest) {
//       fetchChatHistory();
//     }
//   }, [interest]);

//   useEffect(() => {
//     if (user && interest) {
//       socket.emit("joinRoom", { username: user.username, interest });
//     }

//     socket.on("receiveMessage", (data) => {
//       setChat((prev) => [...prev, data]);
//     });

//     return () => socket.off("receiveMessage");
//   }, [user, interest]);

//   useEffect(() => {
//     if (chatEndRef.current) {
//       chatEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [chat]);

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (message.trim()) {
//       socket.emit("sendMessage", {
//         user: user.username,
//         interest,
//         text: message,
//       });
//       setMessage("");
//     }
//   };

//   if (!interest) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
//         <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl">
//           <h2 className="text-2xl font-extrabold text-center text-blue-800 mb-4">
//             <MessageCircle className="inline-block w-6 h-6 mr-2" />
//             Choose Your Interest Group
//           </h2>
//           <div className="grid grid-cols-2 gap-4">
//             {availableInterests.map((field) => (
//               <button
//                 key={field}
//                 onClick={() => setInterest(field)}
//                 className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-full font-semibold hover:scale-105 transition-transform"
//               >
//                 {field}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 py-10 px-4 flex justify-center">
//       <div className="bg-white shadow-xl rounded-3xl p-6 w-full max-w-2xl flex flex-col">
//         <h2 className="text-2xl font-bold text-center text-indigo-800 mb-4">
//           Group Chat: <span className="text-blue-600">{interest}</span>
//         </h2>

//         <div className="flex-1 overflow-y-auto space-y-2 bg-gray-100 rounded-xl p-4 h-96">
//           {chat.map((msg, i) => (
//             <div
//               key={i}
//               className={`p-2 rounded-xl max-w-[75%] text-sm shadow-md ${
//                 msg.user === user.username
//                   ? "bg-blue-500 text-white ml-auto"
//                   : "bg-white text-gray-800"
//               }`}
//             >
//               <p className="font-semibold">{msg.user}</p>
//               <p>{msg.text}</p>
//             </div>
//           ))}
//           <div ref={chatEndRef} />
//         </div>

//         <form onSubmit={handleSend} className="flex items-center gap-2 mt-4">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default GroupedChatRoom;
