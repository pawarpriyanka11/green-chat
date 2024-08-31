const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const inputIniHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "outgoing"
    ? `<p>${message}</p>`
    : `<span class="material-symbols-outlined">Smart_toy</span><p>${message}</p>`;
  
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = () => {
  const sustainableKeywords = [
    { keywords: ["sustainability"], response: "Sustainability is the practice of using resources in a way that meets our current needs without compromising the ability of future generations to meet theirs. It involves managing resources like energy, water, and materials responsibly and reducing environmental impact." },
    { keywords: ["carbon footprint"], response: "Reducing your carbon footprint can be achieved through various actions, such as using public transportation, reducing energy consumption at home, eating less meat, and supporting renewable energy sources. Small changes can add up to a significant impact." },
    { keywords: ["recycling"], response: "Recycling helps reduce waste and conserve natural resources. You can recycle materials like paper, plastic, glass, and metal. Make sure to separate your recyclables and clean them before disposal." },
    { keywords: ["water conservation"], response: "Saving water is crucial for sustainable living. Simple steps like fixing leaks, using low-flow showerheads, and watering your garden in the early morning can help conserve water." },
    { keywords: ["sustainable alternatives"], response: "Consider using reusable items such as water bottles, shopping bags, and food containers. Opt for products with minimal packaging and choose alternatives like beeswax wraps or glass containers instead of plastic wrap." },
    { keywords: ["business sustainability"], response: "Businesses can adopt sustainable practices by reducing waste, improving energy efficiency, using eco-friendly materials, supporting fair trade, and engaging in corporate social responsibility initiatives. Implementing a sustainability plan can benefit both the environment and the business." },
    { keywords: ["SDGs", "sustainable development goals"], response: "The SDGs are 17 global goals set by the United Nations to address urgent environmental, political, and economic challenges. They include goals such as ending poverty, ensuring clean water and sanitation, and combating climate change. Each goal has specific targets to achieve by 2030." },
    { keywords: ["local environmental initiatives"], response: "You can start by joining local environmental groups, participating in community clean-up events, supporting local sustainability projects, and staying informed about environmental issues. Volunteering with organizations focused on conservation and sustainability is also a great way to get involved." },
    // Add more keywords and responses as needed...
  ];

  const userWords = userMessage.toLowerCase().split(" ").map(word => word.trim());
  
  for (const category of sustainableKeywords) {
    const found = category.keywords.some(keyword => {
      const keywordWords = keyword.toLowerCase().split(" ");
      return keywordWords.every(word => userWords.includes(word));
    });

    if (found) {
      return category.response;
    }
  }

  // Responses for greetings
  if (userWords.includes("hi") || userWords.includes("hello")) {
    return "Hello! I'm SustainHub, your guide to sustainable living. How can I assist you today? Feel free to ask me anything about sustainability, eco-friendly practices, or how you can make a positive impact on the environment.";
  }

  // Responses for interactive features
  if (userWords.includes("quiz")) {
    return "Would you like to take a quick quiz to see how sustainable your current lifestyle is? Type 'start quiz' to begin.";
  }

  if (userWords.includes("tips")) {
    return "Type 'daily tips' to receive daily sustainable living tips!";
  }

  // Default response with Google search link
  const searchQuery = encodeURIComponent(userMessage);
  return `<div class="defaultResponse">
    I could not find information related to your question.<br>
    If you have a specific inquiry or need further assistance,
    please provide additional details,
    and I will do my best to assist you.<br>
    You may also wish to explore further information on this topic: 
    <a href="https://www.google.com/search?q=${searchQuery}" target="_blank">Explore Further</a>
  </div>`;
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputIniHeight}px`;

  const outgoingChatLi = createChatLi(userMessage, "outgoing");
  chatbox.appendChild(outgoingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);

    const response = generateResponse();
    incomingChatLi.querySelector("p").innerHTML = response;
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputIniHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);

chatbotCloseBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);

function data(obj) {
  const chatInput = document.querySelector(".chat-input textarea");
  const linkValue = obj.getAttribute("value");
  chatInput.value += ` ${linkValue}`;
  chatInput.focus();
}
