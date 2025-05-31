import React, { useState } from "react";
import GroupedChatRoom from "../pages/GroupedChatRoom";

const domains = [
  "Engineering",
  "Medicine",
  "Law",
  "Agriculture",
  "Arts",
  "Commerce",
  "Science",
];

const ChatPage = ({ userName }) => {
  const [selectedDomain, setSelectedDomain] = useState("");

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {!selectedDomain ? (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Select Your Domain</h2>
          <div className="grid grid-cols-2 gap-3">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <GroupedChatRoom userInterest={selectedDomain} userName={userName} />
      )}
    </div>
  );
};

export default ChatPage;
