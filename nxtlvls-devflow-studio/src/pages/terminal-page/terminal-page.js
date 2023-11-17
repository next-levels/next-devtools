// src/pages/TerminalPage.js
import React, { useState, useEffect, useRef } from "react";
import "./terminal-page.css";
import io from "socket.io-client";

const socket = io("http://localhost:3010");

function TerminalPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const outputEndRef = useRef(null);

  const scrollToBottom = () => {
    outputEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  useEffect(() => {
    socket.on("message", (message) => {
      setOutput((prevOutput) => [...prevOutput, message]);
    });
    socket.on("log", (message) => {
      setOutput((prevOutput) => [...prevOutput, message]);
    });

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("command", input);
    setOutput((prevOutput) => [...prevOutput, input]);

    setInput('');
  };

  return (
    <div className="TerminalPage">
      <div className="output">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
      ))}
        <div ref={outputEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
}

export default TerminalPage;
