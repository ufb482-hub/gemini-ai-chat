// App.jsx
import React, { useState } from "react";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const callAI = async () => {
    if (!question.trim()) return;

    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBApYrHpEFzWubXTUXaRJh9NruxXGkrUZ0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }],
          }),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      setResponse(text);
    } catch (error) {
      console.error("Error calling AI API:", error);
      setResponse("Something went wrong.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callAI();
  };

  return (
    <div className="app-container">
      <h1>Google Gemini AI Chat</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
        />
        <button type="submit">Ask</button>
      </form>

      <div className="response-container">
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
