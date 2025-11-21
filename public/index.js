const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const newChatBtn = document.getElementById("newChatBtn");

    async function sendMessage() {
      const message = messageInput.value.trim();
      if (!message) return;

      appendMessage("user", message);
      messageInput.value = "";

      const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const reply = data.reply || "Error getting response. maybe you are not connected to the internet";
      appendMessage("AI", reply);
    }

    function appendMessage(sender, text) {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message", sender);
      // if(msgDiv.innerHTML == "Error getting response. maybe you are not connected to the internet"){
      //   msgDiv.style.color = 'red';
      // }
      const avatar = document.createElement("div");
      avatar.classList.add("avatar");
      avatar.textContent = sender === "user" ? "You" : "AI";

      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      bubble.textContent = text;

      if (sender === "user") {
        msgDiv.appendChild(bubble);
        msgDiv.appendChild(avatar);
      } else {
        msgDiv.appendChild(avatar);
        msgDiv.appendChild(bubble);
      }

      chatBox.appendChild(msgDiv);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener("click", sendMessage);
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    newChatBtn.addEventListener("click", () => {
      chatBox.innerHTML = "";
    });

    //  Theme Toggle Logic
const themeSelect = document.getElementById("themeSelect");

// Load saved theme if available
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeSelect.value = savedTheme;

themeSelect.addEventListener("change", (e) => {
  const selectedTheme = e.target.value;
  document.documentElement.setAttribute("data-theme", selectedTheme);
  localStorage.setItem("theme", selectedTheme);
});