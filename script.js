document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  
  // Function to display a message in the chat
  function displayMessage(role, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (role === 'user') {
      messageDiv.classList.add('user-message');
      messageDiv.textContent = text; 
    } else {
      messageDiv.classList.add('bot-message');
      messageDiv.innerHTML = text;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  async function handleUserInput() {
    const text = userInput.value.trim();
    if (text === '') return;
    
    displayMessage('user', text);
    userInput.value = '';
    
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      const data = await response.json();
      displayMessage('model', data.response);
    } catch (error) {
      console.error('Error:', error);
      displayMessage('model', "Sorry, I'm having trouble connecting to the server.");
    }
  }
  
  sendButton.addEventListener('click', handleUserInput);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });
  
  userInput.focus();

  displayMessage('model', "Hello there! I'm KNHsians BOT, your friendly AI assistant from Kalayaan National High School. How can I help you today?");
});