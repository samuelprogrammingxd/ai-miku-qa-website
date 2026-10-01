// ==========================================
// STATE MANAGEMENT
// ==========================================

let conversationHistory = [];
let settings = {
    tone: 'friendly',
    responseLength: 'medium',
    autoSave: true
};

const STORAGE_KEYS = {
    CONVERSATION: 'miku_conversation_history',
    SETTINGS: 'miku_settings'
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    loadConversationHistory();
    initializeEventListeners();
    applyTheme();
});

function initializeEventListeners() {
    const submitBtn = document.getElementById('submitBtn');
    const questionInput = document.getElementById('questionInput');
    const clearBtn = document.getElementById('clearBtn');
    const themeToggle = document.getElementById('themeToggle');
    const settingsBtn = document.getElementById('settingsBtn');

    submitBtn.addEventListener('click', submitQuestion);
    questionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitQuestion();
        }
    });
    clearBtn.addEventListener('click', clearHistory);
    themeToggle.addEventListener('click', toggleTheme);
    settingsBtn.addEventListener('click', openSettings);

    // Settings modal
    document.getElementById('toneSetting').addEventListener('change', (e) => {
        settings.tone = e.target.value;
        saveSettings();
    });
    document.getElementById('lengthSetting').addEventListener('change', (e) => {
        settings.responseLength = e.target.value;
        saveSettings();
    });
    document.getElementById('autoSaveSetting').addEventListener('change', (e) => {
        settings.autoSave = e.target.checked;
        saveSettings();
    });

    // Close modal when clicking outside
    document.getElementById('settingsModal').addEventListener('click', (e) => {
        if (e.target.id === 'settingsModal') {
            closeSettings();
        }
    });
}

// ==========================================
// QUESTION SUBMISSION & AI RESPONSE
// ==========================================

function submitQuestion() {
    const input = document.getElementById('questionInput');
    const question = input.value.trim();

    if (!question) {
        alert('Please enter a question!');
        return;
    }

    // Add user message to chat
    addMessageToChat(question, 'user');
    input.value = '';

    // Save to history
    conversationHistory.push({
        type: 'user',
        content: question,
        timestamp: new Date().toISOString()
    });

    // Show loading indicator
    showLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
        const response = generateAIResponse(question);
        addMessageToChat(response, 'ai');

        conversationHistory.push({
            type: 'ai',
            content: response,
            timestamp: new Date().toISOString()
        });

        if (settings.autoSave) {
            saveConversationHistory();
        }

        showLoading(false);
    }, 1000 + Math.random() * 2000);
}

function loadExample(exampleQuestion) {
    document.getElementById('questionInput').value = exampleQuestion;
    document.getElementById('questionInput').focus();
}

function addMessageToChat(message, type) {
    const chatHistory = document.getElementById('chatHistory');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;

    const contentEl = document.createElement('div');
    contentEl.className = 'message-content';
    contentEl.innerHTML = formatMessage(message);

    messageEl.appendChild(contentEl);
    chatHistory.appendChild(messageEl);

    // Remove welcome message if first message
    const welcomeMsg = chatHistory.querySelector('.welcome-message');
    if (welcomeMsg && conversationHistory.length > 0) {
        welcomeMsg.remove();
    }

    // Scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function formatMessage(message) {
    // Convert URLs to links
    let formatted = message.replace(
        /https?:\/\/[^\s]+/g,
        '<a href="$&" target="_blank" style="color: var(--primary-color); text-decoration: underline;">$&</a>'
    );

    // Convert markdown-style bold
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Convert line breaks
    formatted = formatted.replace(/\n/g, '<br>');

    return formatted;
}

// ==========================================
// AI RESPONSE GENERATION (Mock)
// ==========================================

function generateAIResponse(question) {
    const responses = {
        'machine learning': `**Machine Learning** is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.\n\n**Key Concepts:**\n- **Supervised Learning**: Training with labeled data (e.g., predicting house prices)\n- **Unsupervised Learning**: Finding patterns in unlabeled data (e.g., customer segmentation)\n- **Reinforcement Learning**: Learning through rewards and penalties\n\n**How It Works:**\n1. Collect and prepare training data\n2. Choose an algorithm\n3. Train the model on the data\n4. Test and validate the model\n5. Deploy and monitor performance\n\n**Real-world Applications:**\n- Image recognition and computer vision\n- Natural language processing (like me!)\n- Recommendation systems (Netflix, Spotify)\n- Autonomous vehicles\n- Medical diagnosis\n\nMachine learning is transforming industries by automating complex tasks and discovering insights from data!`,

        'productivity': `**How to Improve Your Productivity:**\n\n**1. Time Management Techniques**\n- Try the Pomodoro Technique (25-minute focused work sessions)\n- Use time blocking to schedule deep work\n- Prioritize using the Eisenhower Matrix (urgent vs. important)\n\n**2. Eliminate Distractions**\n- Turn off notifications during focused work\n- Use website blockers if needed\n- Create a dedicated workspace\n\n**3. Work Smart**\n- Tackle difficult tasks during your peak energy hours\n- Break large projects into smaller milestones\n- Take regular breaks to recharge\n\n**4. Tool & Systems**\n- Use task management apps (Todoist, Asana, Trello)\n- Automate repetitive tasks\n- Keep your workspace organized\n\n**5. Health & Lifestyle**\n- Get adequate sleep (7-9 hours)\n- Exercise regularly\n- Stay hydrated and eat well\n\n**Pro Tip:** Track what works for you over time. Productivity is personal, so experiment and find your optimal workflow!`,

        'quantum computing': `**Quantum Computing Explained Simply:**\n\n**Traditional vs. Quantum Bits**\nRegular computers use **bits** (0 or 1). Quantum computers use **qubits** (quantum bits) that can be both 0 and 1 simultaneously - this is called **superposition**.\n\n**Three Core Principles:**\n1. **Superposition**: Qubits exist in multiple states at once\n2. **Entanglement**: Qubits become linked, affecting each other instantly\n3. **Interference**: Quantum algorithms guide solutions to be probable and errors to cancel out\n\n**Why It's Powerful:**\n- Can solve certain problems exponentially faster than classical computers\n- Processes millions of possibilities simultaneously\n\n**Current Challenges:**\n- Quantum decoherence (qubits lose their quantum state)\n- Error rates are still high\n- Extremely cold temperatures required (-273°C)\n- Limited practical applications today\n\n**Future Applications:**\n- Drug discovery and molecular simulation\n- Optimization problems\n- Cryptography\n- Financial modeling\n\nWe're still in the early stages, but quantum computing could revolutionize technology!`,

        'web design': `**Best Practices for Web Design:**\n\n**1. User Experience (UX)**\n- Keep layouts clean and uncluttered\n- Ensure intuitive navigation\n- Mobile-first responsive design\n- Fast loading times (under 3 seconds)\n\n**2. Visual Design**\n- Consistent color palette (2-3 main colors)\n- Readable typography (sans-serif for web)\n- Proper whitespace and hierarchy\n- High-quality images and graphics\n\n**3. Accessibility**\n- Keyboard navigation support\n- Alt text for images\n- Good color contrast (WCAG standards)\n- Screen reader compatibility\n\n**4. Performance**\n- Optimize images for web\n- Minimize CSS/JavaScript\n- Use CDNs for faster delivery\n- Lazy load content\n\n**5. Conversion & Engagement**\n- Clear call-to-action buttons\n- Trust signals (testimonials, security badges)\n- Fast checkout/signup process\n- Analytics and monitoring\n\n**6. Security**\n- Use HTTPS/SSL certificates\n- Keep plugins updated\n- Implement CSRF protection\n- Regular backups\n\nGreat web design combines aesthetics with functionality to create memorable user experiences!`
    };

    // Find best matching response
    const lowerQuestion = question.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerQuestion.includes(keyword)) {
            return response;
        }
    }

    // Default response for unmatched questions
    return getDefaultResponse(question);
}

function getDefaultResponse(question) {
    const defaultResponses = [
        `That's an interesting question! While I don't have specific pre-trained knowledge about "${question.substring(0, 30)}...", I'd be happy to help you explore this topic.\n\nTo get the best answer, I recommend:\n1. Breaking down the question into smaller parts\n2. Providing more context or specific details\n3. Asking follow-up questions\n\nFeel free to rephrase your question, and I'll do my best to assist!`,
        `Great question! This is a fascinating topic. Here's what I can tell you about it:\n\nThe question touches on multiple areas that would benefit from more specific information. Could you provide:\n- More context about what aspect you're interested in\n- Any background information\n- What specifically you'd like to know\n\nWith those details, I can provide a more comprehensive and helpful answer!`,
        `I appreciate you asking! This is a complex question that deserves a thoughtful answer. \n\nTo give you the most useful response, it would help to know:\n- Your current knowledge level on this topic\n- What specific aspect interests you most\n- How you plan to use this information\n\nFeel free to ask follow-up questions, and let's dive deeper together!`
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ==========================================
// CONVERSATION HISTORY
// ==========================================

function saveConversationHistory() {
    try {
        localStorage.setItem(STORAGE_KEYS.CONVERSATION, JSON.stringify(conversationHistory));
    } catch (error) {
        console.error('Error saving conversation:', error);
    }
}

function loadConversationHistory() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATION);
        if (saved) {
            conversationHistory = JSON.parse(saved);
            // Render conversation
            conversationHistory.forEach(msg => {
                if (msg.type === 'user' || msg.type === 'ai') {
                    addMessageToChat(msg.content, msg.type);
                }
            });
        }
    } catch (error) {
        console.error('Error loading conversation:', error);
    }
}

function clearHistory() {
    if (confirm('Are you sure you want to clear the chat history? This cannot be undone.')) {
        conversationHistory = [];
        document.getElementById('chatHistory').innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">🎵</div>
                <h2>Welcome to Miku AI!</h2>
                <p>Hi there! I'm your friendly AI assistant. I'm here to help you with any questions you have.</p>
                <div class="example-questions">
                    <p class="examples-title">Try asking me:</p>
                    <button class="example-btn" onclick="loadExample('What is machine learning and how does it work?')">What is machine learning?</button>
                    <button class="example-btn" onclick="loadExample('How can I improve my productivity?')">How to improve productivity</button>
                    <button class="example-btn" onclick="loadExample('Explain quantum computing in simple terms')">Explain quantum computing</button>
                    <button class="example-btn" onclick="loadExample('What are the best practices for web design?')">Web design best practices</button>
                </div>
            </div>
        `;
        localStorage.removeItem(STORAGE_KEYS.CONVERSATION);
    }
}

function exportChat() {
    if (conversationHistory.length === 0) {
        alert('No conversation to export!');
        return;
    }

    let exportText = 'Miku AI - Conversation Export\n';
    exportText += '=' .repeat(50) + '\n';
    exportText += `Exported: ${new Date().toLocaleString()}\n\n`;

    conversationHistory.forEach((msg, index) => {
        const type = msg.type === 'user' ? 'You' : 'Miku AI';
        const time = new Date(msg.timestamp).toLocaleTimeString();
        exportText += `[${time}] ${type}:\n${msg.content}\n\n`;
    });

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `miku-chat-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    closeSettings();
}

// ==========================================
// SETTINGS
// ==========================================

function saveSettings() {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (saved) {
            settings = { ...settings, ...JSON.parse(saved) };
            document.getElementById('toneSetting').value = settings.tone;
            document.getElementById('lengthSetting').value = settings.responseLength;
            document.getElementById('autoSaveSetting').checked = settings.autoSave;
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function openSettings() {
    document.getElementById('settingsModal').classList.add('show');
}

function closeSettings() {
    document.getElementById('settingsModal').classList.remove('show');
}

// ==========================================
// THEME TOGGLE
// ==========================================

function toggleTheme() {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.style.colorScheme === 'dark';
    
    if (isDarkMode || !localStorage.getItem('theme')) {
        htmlElement.style.colorScheme = 'light';
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        document.getElementById('themeToggle').textContent = '☀️';
    } else {
        htmlElement.style.colorScheme = 'dark';
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        document.getElementById('themeToggle').textContent = '🌙';
    }
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.documentElement.style.colorScheme = 'light';
        document.getElementById('themeToggle').textContent = '☀️';
    } else {
        document.documentElement.style.colorScheme = 'dark';
        document.getElementById('themeToggle').textContent = '🌙';
    }
}

// ==========================================
// LOADING INDICATOR
// ==========================================

function showLoading(show) {
    const indicator = document.getElementById('loadingIndicator');
    if (show) {
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}

// ==========================================
// API INTEGRATION (Ready for real API)
// ==========================================

// Placeholder for real API integration
// To connect a real AI API (OpenAI, Hugging Face, etc.):
// 1. Replace generateAIResponse() with an actual API call
// 2. Handle authentication and error cases
// 3. Update loading states appropriately
// 4. Implement rate limiting and error handling

async function callAIAPI(question) {
    // Example structure for real API integration
    /*
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                question: question,
                tone: settings.tone,
                length: settings.responseLength,
                history: conversationHistory
            })
        });

        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        return data.answer;
    } catch (error) {
        console.error('API Error:', error);
        return 'Sorry, I encountered an error. Please try again.';
    }
    */
}
