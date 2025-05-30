import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"; // make sure the path is correct

export const Community = () => {
  const { token, user, isLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [replyText, setReplyText] = useState({});

  // useEffect(() => {
  //   fetch("https://my-career-compass-website.onrender.com/api/posts/all")
  //     .then((res) => res.json())
  //     .then(setPosts)
  //     .catch(console.error);
  // }, []);
  useEffect(() => {
    fetch("https://my-career-compass-website.onrender.com/api/posts/all")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Server Error:", errorText);
          throw new Error("Failed to load posts");
        }

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          setPosts(data);
        } else {
          const text = await res.text();
          console.error("Expected JSON, got:", text);
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  }, []);

  const handlePostSubmit = async () => {
    if (!content) return alert("Post cannot be empty.");

    try {
      const res = await fetch("https://my-career-compass-website.onrender.com/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      if (res.ok) {
        setPosts([data.post, ...posts]);
        setContent("");
      } else {
        alert(data.message || "Failed to post");
      }
    } catch (error) {
      alert("Error creating post");
    }
  };


  const handleReply = async (postId) => {
    if (!replyText[postId]) return alert("Reply cannot be empty.");

    try {
      const res = await fetch(`https://my-career-compass-website.onrender.com/api/posts/${postId}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: replyText[postId] }),
      });

      const data = await res.json();
      if (res.ok) {
        setPosts((prev) =>
          prev.map((post) => (post._id === postId ? data.post : post))
        );
        setReplyText({ ...replyText, [postId]: "" });
      } else {
        alert(data.message || "Failed to add reply");
      }
    } catch (error) {
      alert("Error adding reply");
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Posts */}
        <div className="md:col-span-2 space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center space-x-3 mb-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${post.email}`}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-gray-700 text-sm font-semibold">{post.email}</p>
              </div>
              <p className="text-gray-800">{post.content}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="mt-3 rounded-lg max-h-60 object-cover"
                />
              )}

              <div className="mt-4 space-y-2">
                {post.replies.map((reply, idx) => (
                  <div key={idx} className="bg-gray-100 p-2 rounded text-sm">
                    <strong>{reply.email}</strong>: {reply.message}
                  </div>
                ))}
              </div>

              {isLoggedIn && (
                <div className="mt-3">
                  <textarea
                    rows={1}
                    className="w-full p-2 border rounded text-sm mb-2 outline-none resize-none"
                    placeholder="Write a reply..."
                    value={replyText[post._id] || ""}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [post._id]: e.target.value })
                    }
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleReply(post._id)}
                  >
                    Reply
                  </button>
                </div>
              )}
              {user?.isAdmin && (
                <button
                  className="text-red-600 hover:text-red-800 ml-3"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this post?")) {
                      try {
                        const res = await fetch(`https://my-career-compass-website.onrender.com/api/posts/${post._id}`, {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        });
                        if (res.ok) {
                          setPosts(posts.filter((p) => p._id !== post._id));
                        } else {
                          const errorData = await res.json();
                          alert(errorData.message || "Failed to delete post");
                        }
                      } catch (error) {
                        alert("Error deleting post");
                      }
                    }
                  }}
                >
                  Delete
                </button>
              )}

            </div>
          ))}
        </div>

        {/* Right: Create Post */}
        <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-6 h-fit w-full">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span>📝</span> Create a New Post
          </h2>
          <textarea
            className="w-full p-3 border rounded mb-3 outline-none resize-none"
            placeholder="Share your thoughts..."
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mb-3 text-sm text-gray-600 space-y-1">
            <p className="font-medium text-gray-700">💡 What can you post?</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>📢 Share your experiences or stories.</li>
              <li>❓ Have questions? Ask for help or suggestions.</li>
              <li>🤝 Looking to collaborate? Find like-minded peers.</li>
              <li>🎯 Post your goals and get feedback.</li>
              <li>💬 Start a meaningful discussion on any topic.</li>
            </ul>
          </div>
          {/* <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded cursor-pointer inline-block mb-3">
            📷 Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
          {image && <p className="text-sm text-green-700">Selected: {image.name}</p>} */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded transition"
            onClick={handlePostSubmit}
            disabled={!isLoggedIn}
          >
            Post
          </button>
          {!isLoggedIn && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              🔒 Please login to post or reply.
            </p>
          )}
        </div>
      </div>
    </div>

  );
};


// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth"; // make sure the path is correct

// export const Community = () => {
//   const { token, user, isLoggedIn } = useAuth();
//   const [posts, setPosts] = useState([]);
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState(null);
//   const [replyText, setReplyText] = useState({});

//   // Fetch posts on load
//   useEffect(() => {
//     fetch("https://my-career-compass-website.onrender.com/api/posts/all")
//       .then((res) => res.json())
//       .then(setPosts)
//       .catch(console.error);
//   }, []);

//   const handlePostSubmit = async () => {
//     if (!content) return alert("Post content cannot be empty.");

//     try {
//       const res = await fetch("https://my-career-compass-website.onrender.com/api/posts/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setPosts([data.post, ...posts]);
//         setContent("");
//         setImage(null);
//       } else {
//         alert(data.message || "Failed to post");
//       }
//     } catch (error) {
//       alert("Error creating post");
//     }
//   };

//   const handleReply = async (postId) => {
//     if (!replyText[postId]) return alert("Reply cannot be empty.");

//     try {
//       const res = await fetch(`https://my-career-compass-website.onrender.com/api/posts/${postId}/reply`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message: replyText[postId] }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setPosts((prev) =>
//           prev.map((post) => (post._id === postId ? data.post : post))
//         );
//         setReplyText({ ...replyText, [postId]: "" });
//       } else {
//         alert(data.message || "Failed to add reply");
//       }
//     } catch (error) {
//       alert("Error adding reply");
//     }
//   };

//   return (
//     <div className="min-h-screen p-10 bg-gray-100">
//       <div className="max-w-4xl mx-auto space-y-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-bold mb-4">Create Post</h2>
//           <textarea
//             className="w-full p-3 border rounded mb-4"
//             placeholder="Write your post..."
//             rows={3}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//             onClick={handlePostSubmit}
//             disabled={!isLoggedIn}
//           >
//             Post
//           </button>
//           {!isLoggedIn && (
//             <p className="text-red-600 text-sm mt-2">
//               🔒 Please login to post or reply.
//             </p>
//           )}
//         </div>

//         {posts.map((post) => (
//           <div key={post._id} className="bg-white p-4 rounded shadow">
//             <p className="text-sm text-gray-600">📧 {post.email}</p>
//             <p className="mt-2">{post.content}</p>

//             <div className="mt-4 space-y-2">
//               {post.replies.map((reply, idx) => (
//                 <div key={idx} className="bg-gray-100 p-2 rounded text-sm">
//                   <strong>{reply.email}</strong>: {reply.message}
//                 </div>
//               ))}
//             </div>

//             {isLoggedIn && (
//               <div className="mt-3">
//                 <textarea
//                   rows={1}
//                   className="w-full p-2 border rounded text-sm mb-2"
//                   placeholder="Write a reply..."
//                   value={replyText[post._id] || ""}
//                   onChange={(e) =>
//                     setReplyText({ ...replyText, [post._id]: e.target.value })
//                   }
//                 />
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 rounded"
//                   onClick={() => handleReply(post._id)}
//                 >
//                   Reply
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
