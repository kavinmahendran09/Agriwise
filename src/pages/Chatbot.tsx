import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Mic, Send, Clock, Person, Robot, Files, Book, Gear, House } from "react-bootstrap-icons";
import Navbar from "./Navbar";
import axios from "axios";

// Define types for props
interface ChatMessageProps {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// ChatMessage component
const ChatMessage: React.FC<ChatMessageProps> = ({ text, sender, timestamp }) => {
  return (
    <div className={`d-flex mb-3 ${sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
      {sender === "bot" && (
        <div className="me-2">
          <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
            <Robot className="text-white" size={20} />
          </div>
        </div>
      )}
      <div className={`p-3 rounded-3 shadow-sm ${sender === "user" ? "bg-success text-white" : "bg-white"}`} style={{ maxWidth: "75%" }}>
        <div className="mb-1">{text}</div>
        <div className={`d-flex align-items-center ${sender === "user" ? "justify-content-end" : ""}`}>
          <small className={sender === "user" ? "text-white-50" : "text-muted"} style={{ fontSize: "0.7rem" }}>
            <Clock size={10} className="me-1" />
            {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </small>
        </div>
      </div>
      {sender === "user" && (
        <div className="ms-2">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
            <Person className="text-white" size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

// TypingIndicator component
const TypingIndicator: React.FC = () => {
  return (
    <div className="d-flex mb-3 justify-content-start">
      <div className="me-2">
        <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
          <Robot className="text-white" size={20} />
        </div>
      </div>
      <div className="p-3 rounded-3 shadow-sm bg-white" style={{ maxWidth: "75%" }}>
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

// Sidebar component
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`sidebar bg-white border-end shadow-sm ${isOpen ? "d-block" : "d-none d-md-block"}`}
      style={{ width: "250px", transition: "all 0.3s ease" }}
    >
      <div className="d-flex align-items-center p-3 border-bottom">
        <div className="bg-success rounded-circle p-2 me-2">
          <Robot className="text-white" size={20} />
        </div>
        <h4 className="mb-0 text-success fw-bold">Agriwise</h4>
        <button className="btn btn-sm ms-auto d-md-none" onClick={toggleSidebar}>
          <span className="text-muted">✕</span>
        </button>
      </div>

      <div className="p-3">
        <div className="mb-4">
          <h6 className="text-uppercase text-muted fw-bold small mb-3">Menu</h6>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="#" className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light">
                <House className="me-2" /> Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light">
                <Files className="me-2" /> Documents
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light">
                <Book className="me-2" /> Resources
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-decoration-none d-flex align-items-center p-2 rounded hover-bg-light">
                <Gear className="me-2" /> Settings
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Chatbot component
const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      text: "Hello! I'm Agriwise, your agricultural assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default to English
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const translateText = async (text: string, targetLang: string) => {
    try {
      const response = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
        params: {
          q: text,
          target: targetLang,
          key: 'YOUR_GOOGLE_TRANSLATE_API_KEY', // Replace with your Google Translate API key
        },
      });
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return the original text if translation fails
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage: ChatMessageProps = {
        text: inputText,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInputText("");
      setIsTyping(true);

      try {
        let translatedInput = inputText;
        if (selectedLanguage !== "en") {
          translatedInput = await translateText(inputText, "en");
        }

        const response = await axios.post('http://127.0.0.1:5000/chat', {
          message: translatedInput,
          is_voice: true,
          language: selectedLanguage,
        });

        let botResponse = response.data.response;
        if (selectedLanguage !== "en") {
          botResponse = await translateText(botResponse, selectedLanguage);
        }

        const botMessage: ChatMessageProps = {
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

        if (response.data.audio) {
          const audio = new Audio(`data:audio/mp3;base64,${response.data.audio}`);
          audio.play();
        }
      } catch (error) {
        console.error("Error sending message:", error);
        const botMessage: ChatMessageProps = {
          text: "Sorry, I couldn't process your request. Please try again.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleVoiceInput = async () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice input.");
      return;
    }

    // Request microphone permission explicitly
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
      console.error("Microphone access denied:", error);
      alert("Please allow microphone access in your browser settings.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = selectedLanguage; // Use the selected language for voice input
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const spokenText = event.results[0][0].transcript;
      setInputText(spokenText);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Voice input error:", event.error);
      setIsListening(false);

      if (event.error === "service-not-allowed") {
        alert("Please allow microphone access in your browser settings.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="d-flex flex-column flex-grow-1 bg-light">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex-grow-1 p-3 p-md-4 overflow-auto" style={{ backgroundColor: "#f8f9fa" }}>
          {/* Language Dropdown at the Top */}
          <div className="d-flex justify-content-end mb-3">
            <select
              className="form-select form-select-sm w-auto"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="bn">Bengali</option>
              <option value="mr">Marathi</option>
              <option value="gu">Gujarati</option>
              <option value="kn">Kannada</option>
              <option value="ml">Malayalam</option>
              <option value="pa">Punjabi</option>
            </select>
          </div>
          <div className="container-fluid">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <ChatMessage key={index} text={message.text} sender={message.sender} timestamp={message.timestamp} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <div className="p-3 bg-white border-top shadow-sm">
          <div className="container-fluid">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg rounded-pill rounded-end"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                style={{ borderRight: "none" }}
              />
              <button
                className="btn btn-outline-secondary rounded-pill rounded-start"
                type="button"
                onClick={handleVoiceInput}
                disabled={isListening}
                style={{ borderLeft: "none" }}
              >
                <Mic size={20} className={isListening ? "text-danger" : ""} />
              </button>
              <button
                className="btn btn-success rounded-pill ms-2"
                type="button"
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
              >
                <Send size={20} /> <span className="d-none d-md-inline ms-1">Send</span>
              </button>
            </div>
            <div className="text-center mt-2">
              <small className="text-muted">Ask me about crops, weather, pests, or farming techniques</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;