const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputField = document.getElementById('input-field');
const submitButton = document.getElementById('submit-button');
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const modifyButton = document.getElementById('modify-button');

// Initialize chatbot knowledge
const knowledgeBase = {
  "welcome": "Hello! I'm your personal chatbot. Currently, I'm learning and don't know much yet. Feel free to teach me by asking questions or giving answers! 🤖",
  "who are you": "I'm your personal chatbot, here to assist you. I'm learning and growing, so please help me improve! 🌟",
  "hi": "Hi! How can I help you today?",
  "hello": "Hello! How can I assist you?",
  "how are you": "I'm just a chatbot, but I'm here to help! How can I assist you today?",
  "what is your name": "I don't have a specific name, but you can call me Chatbot! 😊",
  "thank you": "You're welcome! If you have more questions or need assistance, just let me know!",
  "ok bye": "Goodbye! Have a great day!",
  "how can i contact support": "You can reach support by emailing support@example.com or visiting our website.",
  "what is your purpose": "My purpose is to assist you and provide information. If you have any questions or need help, feel free to ask!",
  "how can i help you": "I'm here to help you! You can ask me questions, provide information, or give commands to manage my knowledge.",
  "what can you do": "I can help answer questions, provide information, and learn from interactions. You can also add, delete, or modify my knowledge.",
  "can you tell me a joke": "Why did the scarecrow win an award? Because he was outstanding in his field! 😄",
  "what is the weather like": "I'm not able to provide current weather updates. You can check a weather website or app for the latest information.",
  "what time is it": "I can't check the time, but you can look at your device's clock for the current time.",
  "what is your favorite color": "I don't have personal preferences, but I can help you with information on various colors if you need it!",
  "where are you located": "I'm a digital assistant and don't have a physical location. I'm here to assist you online!",
  "how do i use this": "You can type your questions or commands in the input field and press 'Send'. You can also add, delete, or modify my knowledge using specific commands.",
  "help": "Sure! You can ask me questions, give commands to manage my knowledge, or let me know how I can assist you further."
};

// Display initial messages
const displayInitialMessages = () => {
    const initialMessages = [
        "Hi there! I'm your personal chatbot. 🤖",
        "Currently, I’m uneducated, but I’m here to learn from you! 🌟",
        "You can add, delete, or modify my knowledge. Just let me know what you'd like to do. 😊"
    ];

    initialMessages.forEach((message) => {
        addMessage('chatbot', message);
    });
};

displayInitialMessages();

// Add event listener to submit button
submitButton.addEventListener('click', function() {
    processInput(inputField.value.trim().toLowerCase());
    inputField.value = '';
});

// Add event listener to action buttons
addButton.addEventListener('click', function() {
    const input = prompt("Enter the question and answer to add (e.g., 'question / answer'):");
    processInput('add ' + input);
});

deleteButton.addEventListener('click', function() {
    const input = prompt("Enter the question to delete:");
    processInput('delete ' + input);
});

modifyButton.addEventListener('click', function() {
    const input = prompt("Enter the question and new answer (e.g., 'question / new answer'):");
    processInput('modify ' + input);
});

// Process user input
function processInput(input) {
    addMessage('user-message', input);

    // Process user input based on actions (add, delete, modify)
    if (input.startsWith('add ')) {
        handleAdd(input.substring(4).trim());
    } else if (input.startsWith('delete ')) {
        handleDelete(input.substring(7).trim());
    } else if (input.startsWith('modify ')) {
        handleModify(input.substring(7).trim());
    } else {
        // Generate chatbot response
        const response = generateResponse(input);

        // Add chatbot response to conversation
        addMessage('chatbot', response || "I don’t know the answer to that yet. If you want to manage my knowledge, please use the buttons provided.");
    }
}

// Add message to conversation
function addMessage(type, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('chatbot-message', type);
    messageElement.innerHTML = `<p class="chatbot-text">${message}</p>`;
    conversation.appendChild(messageElement);
    messageElement.scrollIntoView({behavior: "smooth"});
}

// Generate chatbot response function
function generateResponse(input) {
    return knowledgeBase[input] || null;
}

// Handle adding new Q&A
function handleAdd(input) {
    const [question, ...answerArr] = input.split(' / ');
    const answer = answerArr.join(' / ');

    if (question && answer) {
        knowledgeBase[question.trim().toLowerCase()] = answer.trim();
        addMessage('chatbot', "I've added the new information. 😊");
    } else {
        addMessage('chatbot', "Please provide a question and answer separated by ' / '.");
    }
}

// Handle deleting Q&A
function handleDelete(question) {
    if (knowledgeBase[question.trim().toLowerCase()]) {
        delete knowledgeBase[question.trim().toLowerCase()];
        addMessage('chatbot', "I've deleted the information. 😊");
    } else {
        addMessage('chatbot', "I couldn't find that information to delete.");
    }
}

// Handle modifying existing Q&A
function handleModify(input) {
    const [question, ...newAnswerArr] = input.split(' / ');
    const newAnswer = newAnswerArr.join(' / ');

    if (question && newAnswer) {
        if (knowledgeBase[question.trim().toLowerCase()]) {
            knowledgeBase[question.trim().toLowerCase()] = newAnswer.trim();
            addMessage('chatbot', "I've updated the information. 😊");
        } else {
            addMessage('chatbot', "I couldn't find that information to modify.");
        }
    } else {
        addMessage('chatbot', "Please provide the question and the new answer separated by ' / '.");
    }
}

// Tab switch alert
