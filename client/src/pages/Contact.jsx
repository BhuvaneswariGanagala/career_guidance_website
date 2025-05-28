import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/auth';

const URL = "http://localhost:5000/api/form/contact";

export const Contact = () => {
  const [contactData, setContactData] = useState({
    username: '',
    email: '',
    message: ''
  });

  const [userDataFilled, setUserDataFilled] = useState(false);
  const { user } = useAuth();

  // Auto-fill username and email
  useEffect(() => {
    if (user && !userDataFilled) {
      setContactData({
        username: user.username || '',
        email: user.email || '',
        message: ''
      });
      setUserDataFilled(true);
    }
  }, [user, userDataFilled]);

  const handleChange = (e) => {
    setContactData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    const { username, email, message } = contactData;

    if (!username || !email || !message) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (res.ok) {
        const res_data = await res.json();
        alert("Message sent successfully!");
        console.log("Server response:", res_data);
        setContactData({ username: '', email: '', message: '' });
      } else {
        alert("Failed to send message. Please check your input.");
      }
    } catch (error) {
      console.error("Error sending contact message:", error);
      alert("Something went wrong. Check console for details.");
    }
  };

  return (
    <div>
      <div className="relative h-96 overflow-hidden">
        <img
          src="/images/contact_img.jpeg"
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto mt-10 px-4 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col justify-center bg-blue-50 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">We'd Love to Hear From You</h2>
          <p className="text-blue-800 mb-4">
            Whether you have questions, feedback, or just want to say hello, our team is here to help.
          </p>
          <p className="text-blue-700">
            Our office hours are Monday to Friday, 9 AM to 6 PM.
          </p>
        </div>

        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Let's Start a Conversation</h2>
          <form onSubmit={handleContactForm}>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={contactData.username}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
              required
            />

            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={contactData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
              required
            />

            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Any query? You can find answers here"
              value={contactData.message}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-4"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
