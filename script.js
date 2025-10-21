// 模拟的聊天机器人回复
const botReplies = [
    "这是个好问题！让我想想...",
    "我明白你的意思了 😊",
    "有趣的想法！我觉得...",
    "根据我的理解，这个问题可以这样看...",
    "让我帮你分析一下这个问题",
    "你说得对！我也这么认为",
    "这让我想到了一个相关的话题...",
    "嗯，从另一个角度来看...",
    "我可以帮你解答这个问题！",
    "这是个常见的疑问，让我来解释一下"
];

// 关键词匹配回复
const keywordReplies = {
    "你好": "你好！很高兴见到你 👋",
    "hi": "Hi! How can I help you today?",
    "hello": "Hello! Nice to meet you! 😊",
    "帮助": "我可以回答你的问题、提供建议或者和你聊天。试试问我任何事情吧！",
    "谢谢": "不客气！很高兴能帮到你 😊",
    "再见": "再见！期待下次见到你 👋",
    "天气": "抱歉，我暂时无法查询实时天气信息，但建议你查看天气预报网站哦！",
    "时间": `现在是 ${new Date().toLocaleTimeString('zh-CN')}`,
    "名字": "我是 AI 助手，一个友好的聊天机器人 🤖",
    "笑话": "为什么程序员喜欢黑夜？因为光污染太严重了！😄"
};

// DOM 元素
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

// 发送消息
function sendMessage() {
    const message = chatInput.value.trim();

    if (message === '') return;

    // 添加用户消息
    addMessage(message, 'user');

    // 清空输入框
    chatInput.value = '';

    // 显示打字指示器
    showTypingIndicator();

    // 模拟延迟后回复
    setTimeout(() => {
        hideTypingIndicator();
        const reply = generateReply(message);
        addMessage(reply, 'bot');
    }, 1000 + Math.random() * 1000); // 1-2秒随机延迟
}

// 添加消息到聊天区域
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);

    chatMessages.appendChild(messageDiv);

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 生成回复
function generateReply(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // 检查关键词匹配
    for (const [keyword, reply] of Object.entries(keywordReplies)) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
            return reply;
        }
    }

    // 随机回复
    return botReplies[Math.floor(Math.random() * botReplies.length)];
}

// 显示打字指示器
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = '🤖';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble typing-indicator';
    bubble.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);

    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 隐藏打字指示器
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 事件监听
sendButton.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 阻止输入框缩放导致的页面缩放（iOS）
chatInput.addEventListener('focus', () => {
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
});

chatInput.addEventListener('blur', () => {
    document.body.style.position = '';
    document.body.style.width = '';
});
