### AI Chat Assistant Application

This React application provides an AI chat assistant designed to answer questions related to healthcare laws and basic customer support inquiries. The user interface includes a chat area, predefined question buttons, and an input field with a send button.

#### Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Components](#components)
4. [Functions](#functions)
5. [Predefined Questions](#predefined-questions)
6. [Styling](#styling)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ai-chat-assistant.git
   cd ai-chat-assistant
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your API URL:
   ```env
   REACT_APP_API_URL=https://your-api-url.com
   ```

4. Start the application:
   ```sh
   npm start
   ```

### Usage

- **Chat Area:** Displays messages exchanged between the user and the AI bot.
- **Predefined Questions:** Provides quick question buttons related to healthcare laws and customer support.
- **Input Field and Send Button:** Allows users to type and send their own messages.

### Components

#### App Component

The main component that encompasses the entire chat application.

- **State Variables:**
  - `messages`: Array to store chat messages.
  - `input`: String to store the current user input.

- **Refs:**
  - `messagesEndRef`: Reference to the bottom of the messages list to ensure the view scrolls to the latest message.

- **Effect:**
  - `useEffect(scrollToBottom, [messages])`: Scrolls the view to the bottom whenever messages are updated.

### Functions

#### `scrollToBottom`

Scrolls the chat view to the most recent message.

```javascript
const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};
```

#### `handleSendMessage`

Handles sending messages:
- Validates the input.
- Adds the user's message to the `messages` state.
- Sends the message to the API and receives the bot's response.
- Updates the `messages` state with the bot's response.
- Handles errors and updates the `messages` state with an error message if needed.

```javascript
const handleSendMessage = async () => {
  if (input.trim() === "") return;

  const userMessage = { role: "user", content: input };
  setMessages([...messages, userMessage]);

  try {
    const response = await axios.post(process.env.REACT_APP_API_URL, {
      message: input,
    });
    const botMessage = { role: "bot", content: response.data.response };
    setMessages([...messages, userMessage, botMessage]);
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = {
      role: "bot",
      content: "An error occurred while processing your request.",
    };
    setMessages([...messages, userMessage, errorMessage]);
  }

  setInput("");
};
```

#### `handleKeyPress`

Handles the `Enter` key press to send the message.

```javascript
const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSendMessage();
  }
};
```

### Predefined Questions

A list of predefined questions related to healthcare laws and customer support.

```javascript
const predefinedQuestions = [
  "What are my rights under the Affordable Care Act?",
  "Can you explain the HIPAA privacy rules?",
  "How do I file a complaint about healthcare services?",
  "What should I do if my insurance claim is denied?",
];
```

### Styling

The application uses Tailwind CSS for styling. Below are the key styling classes used:

- **Container:** `flex flex-col min-h-screen bg-gradient-to-r from-purple-500 to-pink-500`
- **Header:** `bg-white text-pink-500 p-4 text-xl font-bold shadow-md`
- **Messages Area:** `flex-1 overflow-y-auto p-4 space-y-4`
- **Message Bubble:**
  - User: `bg-blue-500 text-white`
  - Bot: `bg-white text-gray-800`
- **Footer:**
  - Container: `sticky bottom-0 bg-white border-t shadow-md p-4`
  - Predefined Questions: `bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors`
  - Input Field: `flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`
  - Send Button: `bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`

### Example Usage

Start the application and interact with the AI chat assistant by clicking on predefined question buttons or typing your own questions into the input field. The AI will respond with information relevant to healthcare laws and customer support inquiries. For example:

- **User:** "What are my rights under the Affordable Care Act?"
- **Bot:** "The Affordable Care Act (ACA) provides several rights and protections that make health coverage more fair and easy to understand..."

This documentation should help you understand the structure and functionality of the AI Chat Assistant application.
