const chat = document.getElementById("chat");
const input = document.getElementById("input");

/* Add message to chat */
function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

/* Send text message */
function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  // Simulated assistant reply
  setTimeout(() => {
    addMessage("I’m here to help you. Please tell me more.", "bot");
  }, 600);
}

/* 🎤 Voice input (Browser Speech API) */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input is not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.start();

  recognition.onstart = () => {
    input.placeholder = "Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    input.placeholder = "Message LUMI...";
    input.value = transcript;
    sendMessage();
  };

  recognition.onerror = () => {
    input.placeholder = "Message LUMI...";
  };

  recognition.onend = () => {
    input.placeholder = "Message LUMI...";
  };
}
