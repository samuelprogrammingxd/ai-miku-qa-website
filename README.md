# Miku AI - Interactive Q&A Website

An interactive, modern AI-powered Q&A website featuring Hatsune Miku-themed design with a beautiful gradient aesthetic.

## Features

### 🎵 Core Functionality
- **Question & Answer System**: Submit questions and receive detailed AI responses
- **Conversation History**: View previous questions and answers in a scrollable chat interface
- **Real-time Processing**: See loading indicators while AI processes your question
- **Auto-save**: Conversations are automatically saved to local storage

### 🎨 User Experience
- **Responsive Design**: Fully functional on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark (default) and light themes
- **Modern Aesthetics**: Hatsune Miku-inspired color scheme (teals, blues, purples)
- **Smooth Animations**: Floating Miku background, message transitions, and UI effects
- **Accessibility**: Keyboard navigation, alt text, and screen reader support

### ⚙️ Settings & Customization
- **Response Tone**: Choose between Professional, Friendly, Casual, or Detailed & Technical
- **Response Length**: Control whether responses are Short, Medium, or Long & Comprehensive
- **Export Conversations**: Download chat history as text files
- **Theme Customization**: Dark and Light mode options

## Project Structure

```
ai-miku-qa-website/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with animations
├── script.js           # Frontend logic and AI integration point
└── README.md           # This file
```

## Getting Started

### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/samuelprogrammingxd/ai-miku-qa-website.git
   cd ai-miku-qa-website
   ```

2. Open `index.html` in your web browser
   - Simply double-click the file, or
   - Use a local server: `python -m http.server 8000`
   - Then visit `http://localhost:8000`

### File Overview

#### `index.html`
- Structure and layout
- Input fields and buttons
- Chat history container
- Settings modal
- Loading indicators

#### `styles.css`
- Complete theming system using CSS variables
- Miku-themed color palette
- Responsive breakpoints (mobile, tablet, desktop)
- Animations: floating background, message transitions, button hover effects
- Dark/Light mode support
- Accessibility-focused contrast and spacing

#### `script.js`
- Conversation management
- Settings persistence (localStorage)
- Theme toggling
- Message formatting
- Mock AI responses (ready for real API integration)
- Export functionality

## Usage

### Asking Questions
1. Type your question in the input field
2. Press Enter or click the Submit button (➤)
3. Wait for Miku AI to process (loading indicator appears)
4. View the response in the chat area

### Example Questions
- "What is machine learning and how does it work?"
- "How can I improve my productivity?"
- "Explain quantum computing in simple terms"
- "What are the best practices for web design?"

### Managing Conversations
- **View History**: All messages are saved and displayed chronologically
- **Clear Chat**: Click "Clear History" to start fresh
- **Export Chat**: Open Settings → Export Chat to download as .txt file
- **Auto-save**: Enabled by default (can be toggled in Settings)

### Customization
1. Click the ⚙️ (Settings) button in the header
2. Adjust:
   - Response Tone
   - Response Length
   - Auto-save setting
3. Click "Close" or click outside the modal to exit

## API Integration

The website currently uses mock responses for demonstration. To integrate a real AI API:

### Steps to Integrate

1. **Choose an AI Provider**:
   - OpenAI (GPT-4, GPT-3.5-turbo)
   - Hugging Face
   - Google Vertex AI
   - Cohere
   - Others

2. **Update `script.js`**:
   ```javascript
   // Replace the generateAIResponse() function with:
   async function generateAIResponse(question) {
       return await callAIAPI(question);
   }
   ```

3. **Implement `callAIAPI()`**:
   ```javascript
   async function callAIAPI(question) {
       try {
           const response = await fetch('YOUR_API_ENDPOINT', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${API_KEY}`
               },
               body: JSON.stringify({
                   question: question,
                   tone: settings.tone,
                   length: settings.responseLength
               })
           });
           
           if (!response.ok) throw new Error('API Error');
           const data = await response.json();
           return data.answer;
       } catch (error) {
           console.error('API Error:', error);
           return 'Sorry, I encountered an error. Please try again.';
       }
   }
   ```

4. **Security Considerations**:
   - Never expose API keys in frontend code
   - Use environment variables or backend proxy
   - Implement rate limiting
   - Handle errors gracefully

## Customization Guide

### Colors & Theme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #00d9ff;      /* Miku cyan */
    --secondary-color: #6e4c9e;    /* Purple */
    --accent-color: #ff006e;       /* Pink */
    --bg-dark: #0a0e27;           /* Dark background */
    /* ... more variables */
}
```

### Background
Modify Miku background in `styles.css`:
```css
.miku-background {
    width: 500px;      /* Adjust size */
    opacity: 0.4;      /* Adjust transparency (0.4-0.6) */
    animation: mikuFloat 6s ease-in-out infinite; /* Animation speed */
}
```

### Fonts & Typography
Update font family:
```css
html, body {
    font-family: 'Your Font Here', sans-serif;
}
```

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance Optimizations
- Lazy loading for message rendering
- CSS variables for efficient theme switching
- Minimal JavaScript dependencies
- Optimized animations using CSS transitions
- Local storage for fast history loading

## Known Limitations (Current Mock Version)
- Responses are predetermined based on keywords
- No actual AI backend connected
- Conversation context not fully utilized
- Rate limiting not implemented

## Future Enhancements
- Real AI API integration
- User authentication
- Cloud sync for conversations
- Multiple language support
- Voice input/output
- Custom AI personality settings
- Conversation sharing
- Miku avatar reactions
- Advanced conversation analysis

## License
MIT License - Feel free to use and modify for your projects!

## Author
Created by @samuelprogrammingxd

## Support
For issues, questions, or suggestions, please open a GitHub issue.

---

**Note**: This project is a demonstration website. For production use with real AI APIs, ensure proper security measures, error handling, and rate limiting are in place.
