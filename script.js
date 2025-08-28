// 增强版本 - 添加了更多功能和用户体验改进

// DOM元素
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const weatherElement = document.getElementById('weather');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherCity = document.getElementById('weatherCity');
const weatherDesc = document.getElementById('weatherDesc');
const searchInput = document.getElementById('searchInput');
const searchEngineSelector = document.getElementById('searchEngine');
const defaultSearchEngine = document.getElementById('defaultSearchEngine');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const notesContent = document.getElementById('notesContent');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const newsContainer = document.getElementById('newsContainer');
const settingsToggle = document.getElementById('settingsToggle');
const settingsPanel = document.getElementById('settingsPanel');
const settingsClose = document.getElementById('settingsClose');
const overlay = document.getElementById('overlay');
const notification = document.getElementById('notification');

// 模态窗口元素
const linkModal = document.getElementById('linkModal');
const modalClose = document.getElementById('modalClose');
const modalLinkName = document.getElementById('modalLinkName');
const modalLinkUrl = document.getElementById('modalLinkUrl');
const modalLinkIcon = document.getElementById('modalLinkIcon');
const modalAddLink = document.getElementById('modalAddLink');
const modalLinkList = document.getElementById('modalLinkList');

// 按钮
const addTodoBtn = document.getElementById('addTodoBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const refreshNewsBtn = document.getElementById('refreshNewsBtn');
const editQuoteBtn = document.getElementById('editQuoteBtn');
const saveCityBtn = document.getElementById('saveCityBtn');
const exportDataBtn = document.getElementById('exportDataBtn');
const importDataBtn = document.getElementById('importDataBtn');
const resetDataBtn = document.getElementById('resetDataBtn');
const editLinksBtn = document.getElementById('editLinks');
const editQuotesBtn = document.getElementById('editQuotesBtn');
const fetchNewsBtn = document.getElementById('fetchNewsBtn');
const saveBgImageBtn = document.getElementById('saveBgImageBtn');
const resetBgImageBtn = document.getElementById('resetBgImageBtn');
const bgImageInput = document.getElementById('bgImageInput');

// 主题选项
const themeOptions = document.querySelectorAll('.theme-option');

// 搜索引擎配置
const searchEngines = {
    'baidu': 'https://www.baidu.com/s?wd=',
    'google': 'https://www.google.com/search?q=',
    'bing': 'https://www.bing.com/search?q=',
    'duckduckgo': 'https://duckduckgo.com/?q='
};

// 名言库
let quotes = [
    { text: "成功不是终点，失败不是致命：真正重要的是继续前进的勇气。", author: "温斯顿·丘吉尔" },
    { text: "唯一限制你的是你给自己设定的限制。", author: "未知" },
    { text: "未来属于那些相信梦想之美的人。", author: "埃莉诺·罗斯福" },
    { text: "不要等待时机，创造时机。", author: "乔治·伯纳德·肖" },
    { text: "唯一真正的错误是我们从中什么也没学到。", author: "亨利·福特" },
    { text: "生活不是等待暴风雨过去，而是学会在雨中跳舞。", author: "未知" },
    { text: "你的时间有限，所以不要浪费时间去过别人的生活。", author: "史蒂夫·乔布斯" }
];

// 更新时间
function updateDateTime() {
    const now = new Date();
    
    const time = now.toLocaleTimeString('zh-CN');
    const date = now.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
    });
    
    timeElement.textContent = time;
    dateElement.textContent = date;
    
    requestAnimationFrame(updateDateTime);
}

// 初始化时间
function initTime() {
    updateDateTime();
}

// 显示通知
function showNotification(message, duration = 3000) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, duration);
}

// 获取天气数据
async function getWeatherData(city = '北京') {
    try {
        const apiKey = localStorage.getItem('weatherApiKey') || 'bd2d467295d607048dc38941c7b85708';
        
        if (!apiKey) {
            throw new Error('没有API密钥，使用模拟数据');
        }
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_cn`);
        
        if (!response.ok) {
            throw new Error('无法获取天气数据');
        }
        
        const data = await response.json();
        
        weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
        weatherCity.textContent = data.name;
        weatherDesc.textContent = data.weather[0].description;
        
        const iconCode = data.weather[0].icon;
        weatherIcon.className = `fas fa-${getWeatherIcon(iconCode)}`;
        
        localStorage.setItem('weatherCity', city);
        
    } catch (error) {
        console.error('获取天气数据失败:', error);
        const temperatures = {
            '北京': '25°C',
            '上海': '27°C', 
            '广州': '30°C',
            '深圳': '29°C',
            '杭州': '26°C',
            '南京': '25°C',
            '武汉': '28°C',
            '成都': '24°C'
        };
        
        weatherTemp.textContent = temperatures[city] || '25°C';
        weatherCity.textContent = city;
        weatherDesc.textContent = '晴朗';
        weatherIcon.className = 'fas fa-sun';
    }
}

// 根据天气代码获取图标
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud',
        '04n': 'cloud',
        '09d': 'cloud-rain',
        '09n': 'cloud-rain',
        '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain',
        '11d': 'bolt',
        '11n': 'bolt',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog'
    };
    
    return iconMap[iconCode] || 'cloud';
}

// 添加待办事项
function addTodoItem(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <input type="checkbox" class="todo-check">
        <span class="todo-text">${text}</span>
        <button class="todo-delete"><i class="fas fa-times"></i></button>
    `;
    
    const deleteBtn = li.querySelector('.todo-delete');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTodoItems();
        showNotification('任务已删除');
    });
    
    const checkBox = li.querySelector('.todo-check');
    checkBox.addEventListener('change', () => {
        li.querySelector('.todo-text').style.textDecoration = 
            checkBox.checked ? 'line-through' : 'none';
        saveTodoItems();
    });
    
    todoList.appendChild(li);
    saveTodoItems();
}

// 保存待办事项到本地存储
function saveTodoItems() {
    const items = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        items.push({
            text: item.querySelector('.todo-text').textContent,
            completed: item.querySelector('.todo-check').checked
        });
    });
    
    localStorage.setItem('todoItems', JSON.stringify(items));
}

// 加载待办事项
function loadTodoItems() {
    const savedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    
    todoList.innerHTML = '';
    savedItems.forEach(item => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" class="todo-check" ${item.completed ? 'checked' : ''}>
            <span class="todo-text" style="text-decoration: ${item.completed ? 'line-through' : 'none'}">${item.text}</span>
            <button class="todo-delete"><i class="fas fa-times"></i></button>
        `;
        
        const deleteBtn = li.querySelector('.todo-delete');
        deleteBtn.addEventListener('click', () => {
            li.remove();
            saveTodoItems();
            showNotification('任务已删除');
        });
        
        const checkBox = li.querySelector('.todo-check');
        checkBox.addEventListener('change', () => {
            li.querySelector('.todo-text').style.textDecoration = 
                checkBox.checked ? 'line-through' : 'none';
            saveTodoItems();
        });
        
        todoList.appendChild(li);
    });
}

// 加载和保存链接
function loadLinks() {
    const savedLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    const quickLinks = document.getElementById('quickLinks');
    
    const defaultLinks = [
        { name: '百度', url: 'https://www.baidu.com', icon: 'fas fa-search' },
        { name: 'GitHub', url: 'https://www.github.com', icon: 'fab fa-github' },
        { name: 'YouTube', url: 'https://www.youtube.com', icon: 'fab fa-youtube' }
    ];
    
    quickLinks.innerHTML = '';
    
    // 合并默认链接和保存的链接
    const allLinks = [...defaultLinks, ...savedLinks];
    
    allLinks.forEach(link => {
        addLinkToDOM(link.name, link.url, link.icon);
    });
    
    updateModalLinkList();
}

function addLinkToDOM(name, url, iconClass) {
    const quickLinks = document.getElementById('quickLinks');
    const linkItem = document.createElement('a');
    linkItem.href = url;
    linkItem.className = 'link-item';
    linkItem.target = '_blank';
    
    linkItem.innerHTML = `
        <div class="link-icon">
            <i class="${iconClass}"></i>
        </div>
        <span class="link-name">${name}</span>
        <button class="link-delete">×</button>
    `;
    
    const deleteBtn = linkItem.querySelector('.link-delete');
    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // 确认删除
        if (confirm(`确定要删除"${name}"链接吗？`)) {
            linkItem.remove();
            saveLinks();
            updateModalLinkList();
            showNotification(`已删除链接: ${name}`);
        }
    });
    
    quickLinks.appendChild(linkItem);
}

function saveLinks() {
    const links = [];
    document.querySelectorAll('.link-item').forEach(item => {
        links.push({
            name: item.querySelector('.link-name').textContent,
            url: item.href,
            icon: item.querySelector('.link-icon i').className
        });
    });
    
    localStorage.setItem('customLinks', JSON.stringify(links));
}

// 更新模态窗口中的链接列表
function updateModalLinkList() {
    const savedLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    modalLinkList.innerHTML = '';
    
    if (savedLinks.length === 0) {
        modalLinkList.innerHTML = '<p style="text-align: center; opacity: 0.7;">暂无自定义链接</p>';
        return;
    }
    
    savedLinks.forEach((link, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'link-list-item';
        listItem.innerHTML = `
            <div class="link-list-name">${link.name}</div>
            <div class="link-list-actions">
                <button class="link-list-btn edit" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="link-list-btn delete" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        modalLinkList.appendChild(listItem);
    });
    
    // 添加删除事件监听器
    document.querySelectorAll('.link-list-btn.delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            deleteLink(index);
        });
    });
    
    // 添加编辑事件监听器
    document.querySelectorAll('.link-list-btn.edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            editLink(index);
        });
    });
}

// 删除链接
function deleteLink(index) {
    const savedLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    if (index >= 0 && index < savedLinks.length) {
        const deletedLink = savedLinks[index];
        savedLinks.splice(index, 1);
        localStorage.setItem('customLinks', JSON.stringify(savedLinks));
        loadLinks();
        showNotification(`已删除链接: ${deletedLink.name}`);
    }
}

// 编辑链接
function editLink(index) {
    const savedLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    if (index >= 0 && index < savedLinks.length) {
        const link = savedLinks[index];
        modalLinkName.value = link.name;
        modalLinkUrl.value = link.url;
        modalLinkIcon.value = link.icon || '';
        
        // 更改添加按钮文本
        modalAddLink.textContent = '更新链接';
        modalAddLink.setAttribute('data-edit-index', index);
    }
}

// 打开链接模态窗口
function openLinkModal() {
    linkModal.classList.add('open');
    overlay.classList.add('overlay-visible');
    
    // 重置表单
    modalLinkName.value = '';
    modalLinkUrl.value = '';
    modalLinkIcon.value = '';
    modalAddLink.textContent = '添加链接';
    modalAddLink.removeAttribute('data-edit-index');
    
    updateModalLinkList();
}

// 关闭链接模态窗口
function closeLinkModal() {
    linkModal.classList.remove('open');
    overlay.classList.remove('overlay-visible');
}

// 添加或更新链接
function addOrUpdateLink() {
    const name = modalLinkName.value.trim();
    const url = modalLinkUrl.value.trim();
    const icon = modalLinkIcon.value.trim();
    const editIndex = modalAddLink.getAttribute('data-edit-index');
    
    if (name && url) {
        // 确保URL格式正确
        let finalUrl = url;
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            finalUrl = 'https://' + url;
        }
        
        const savedLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
        
        if (editIndex !== null) {
            // 更新现有链接
            savedLinks[editIndex] = {
                name: name,
                url: finalUrl,
                icon: icon || 'fas fa-link'
            };
            showNotification(`已更新链接: ${name}`);
        } else {
            // 添加新链接
            savedLinks.push({
                name: name,
                url: finalUrl,
                icon: icon || 'fas fa-link'
            });
            showNotification(`已添加链接: ${name}`);
        }
        
        localStorage.setItem('customLinks', JSON.stringify(savedLinks));
        loadLinks();
        
        // 重置表单
        modalLinkName.value = '';
        modalLinkUrl.value = '';
        modalLinkIcon.value = '';
        modalAddLink.textContent = '添加链接';
        modalAddLink.removeAttribute('data-edit-index');
    }
}

// 名言功能
function showRandomQuote() {
    const savedQuotes = JSON.parse(localStorage.getItem('userQuotes') || '[]');
    const allQuotes = savedQuotes.length > 0 ? savedQuotes : quotes;
    
    const randomIndex = Math.floor(Math.random() * allQuotes.length);
    quoteText.textContent = `"${allQuotes[randomIndex].text}"`;
    quoteAuthor.textContent = `- ${allQuotes[randomIndex].author}`;
}

// 编辑名言
function editQuote() {
    const newText = prompt('请输入新的名言文本:', quoteText.textContent.replace(/"/g, ''));
    if (newText !== null) {
        const newAuthor = prompt('请输入作者:', quoteAuthor.textContent.replace('- ', ''));
        if (newAuthor !== null) {
            quoteText.textContent = `"${newText}"`;
            quoteAuthor.textContent = `- ${newAuthor}`;
            
            // 保存到用户自定义名言
            const savedQuotes = JSON.parse(localStorage.getItem('userQuotes') || '[]');
            savedQuotes.push({
                text: newText,
                author: newAuthor
            });
            localStorage.setItem('userQuotes', JSON.stringify(savedQuotes));
            
            showNotification('名言已更新并保存');
        }
    }
}

// 获取新闻数据 - 使用百度热搜API替代知乎API
async function fetchNews() {
    try {
        // 使用百度热搜API
        const response = await fetch('https://www.baidu.com/s?wd=百度热搜', {
            mode: 'no-cors' // 避免CORS问题
        });
        
        // 由于百度热搜API有CORS限制，我们使用模拟数据
        // 在实际应用中，您可能需要使用后端代理来获取真实数据
        const mockNews = [
            { title: '人工智能技术新突破', hotness: '823万' },
            { title: '太空探索最新进展', hotness: '756万' },
            { title: '全球气候变化峰会', hotness: '689万' },
            { title: '新能源汽车市场增长', hotness: '642万' },
            { title: '数字货币发展趋势', hotness: '598万' },
            { title: '健康生活方式指南', hotness: '543万' },
            { title: '教育改革新政策', hotness: '512万' },
            { title: '国际体育赛事结果', hotness: '487万' }
        ];
        
        newsContainer.innerHTML = '';
        
        mockNews.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <div class="news-title">${item.title}</div>
                <div class="news-hotness"><i class="fas fa-fire"></i> <span>热度: ${item.hotness}</span></div>
            `;
            
            newsContainer.appendChild(newsItem);
        });
        
    } catch (error) {
        console.error('获取新闻失败:', error);
        newsContainer.innerHTML = `
            <div class="news-item">
                <div class="news-title">无法加载新闻数据，请检查网络连接</div>
                <div class="news-hotness"><i class="fas fa-exclamation-triangle"></i> <span>错误</span></div>
            </div>
        `;
    }
}

// 设置自定义背景
function setCustomBackground() {
    const bgUrl = bgImageInput.value.trim();
    if (bgUrl) {
        document.body.classList.add('custom-bg');
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        localStorage.setItem('customBackground', bgUrl);
        showNotification('自定义背景已应用');
    }
}

// 重置背景
function resetBackground() {
    document.body.classList.remove('custom-bg');
    document.body.style.backgroundImage = '';
    localStorage.removeItem('customBackground');
    bgImageInput.value = '';
    showNotification('背景已重置为默认渐变');
}

// 加载自定义背景
function loadCustomBackground() {
    const bgUrl = localStorage.getItem('customBackground');
    if (bgUrl) {
        document.body.classList.add('custom-bg');
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        bgImageInput.value = bgUrl;
    }
}

// 初始化所有事件监听器
function initEventListeners() {
    // 搜索功能
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const engine = searchEngineSelector.value;
                const searchUrl = searchEngines[engine] + encodeURIComponent(query);
                window.location.href = searchUrl;
            }
        }
    });
    
    // 搜索引擎切换
    searchEngineSelector.addEventListener('change', (e) => {
        localStorage.setItem('searchEngine', e.target.value);
    });
    
    // 添加待办事项事件
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                addTodoItem(text);
                todoInput.value = '';
                showNotification('任务已添加');
            }
        }
    });
    
    addTodoBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodoItem(text);
            todoInput.value = '';
            showNotification('任务已添加');
        }
    });
    
    // 笔记功能
    function saveNote() {
        localStorage.setItem('userNotes', notesContent.value);
        showNotification('笔记已保存');
    }
    
    saveNoteBtn.addEventListener('click', saveNote);
    
    // 自动保存笔记
    notesContent.addEventListener('input', debounce(saveNote, 1000));
    
    // 新闻刷新
    refreshNewsBtn.addEventListener('click', () => {
        fetchNews();
        showNotification('新闻已刷新');
    });
    
    // 编辑名言
    editQuoteBtn.addEventListener('click', editQuote);
    
    // 设置面板控制
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.add('settings-open');
        overlay.classList.add('overlay-visible');
        
        // 填充已保存的设置
        document.getElementById('apiKeyInput').value = localStorage.getItem('weatherApiKey') || '';
        document.getElementById('cityInput').value = localStorage.getItem('weatherCity') || '北京';
        document.getElementById('defaultSearchEngine').value = localStorage.getItem('searchEngine') || 'baidu';
    });
    
    settingsClose.addEventListener('click', () => {
        settingsPanel.classList.remove('settings-open');
        overlay.classList.remove('overlay-visible');
    });
    
    overlay.addEventListener('click', () => {
        settingsPanel.classList.remove('settings-open');
        overlay.classList.remove('overlay-visible');
        closeLinkModal();
    });
    
    // 主题切换
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            
            // 移除所有主题类
            document.body.classList.remove('theme-default', 'theme-dark', 'theme-blue', 'theme-orange', 'theme-purple', 'theme-red');
            
            // 添加选中主题类
            document.body.classList.add(`theme-${theme}`);
            
            // 更新活动状态
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // 保存主题偏好
            localStorage.setItem('theme', theme);
            
            showNotification(`已切换至${theme}主题`);
        });
    });
    
    // 保存城市和API密钥
    saveCityBtn.addEventListener('click', () => {
        const city = document.getElementById('cityInput').value.trim();
        const apiKey = document.getElementById('apiKeyInput').value.trim();
        
        if (apiKey) {
            localStorage.setItem('weatherApiKey', apiKey);
        }
        
        if (city) {
            getWeatherData(city);
            showNotification(`城市已设置为: ${city}`);
        } else if (apiKey) {
            showNotification('API密钥已保存');
        }
    });
    
    // 链接编辑模态窗口
    editLinksBtn.addEventListener('click', openLinkModal);
    modalClose.addEventListener('click', closeLinkModal);
    modalAddLink.addEventListener('click', addOrUpdateLink);
    
    // 默认搜索引擎设置
    defaultSearchEngine.addEventListener('change', (e) => {
        localStorage.setItem('searchEngine', e.target.value);
        searchEngineSelector.value = e.target.value;
        showNotification(`默认搜索引擎已设置为: ${e.target.value}`);
    });
    
    // 编辑名言库
    editQuotesBtn.addEventListener('click', () => {
        alert('名言编辑功能将在后续版本中提供');
    });
    
    // 刷新新闻
    fetchNewsBtn.addEventListener('click', () => {
        fetchNews();
        showNotification('新闻已刷新');
    });
    
    // 自定义背景
    saveBgImageBtn.addEventListener('click', setCustomBackground);
    resetBgImageBtn.addEventListener('click', resetBackground);
    
    // 数据导出
    exportDataBtn.addEventListener('click', () => {
        const data = {
            notes: notesContent.value,
            todos: JSON.parse(localStorage.getItem('todoItems') || '[]'),
            links: JSON.parse(localStorage.getItem('customLinks') || '[]'),
            city: localStorage.getItem('weatherCity') || '北京',
            theme: localStorage.getItem('theme') || 'default',
            apiKey: localStorage.getItem('weatherApiKey') || '',
            quotes: JSON.parse(localStorage.getItem('userQuotes') || '[]'),
            searchEngine: localStorage.getItem('searchEngine') || 'baidu',
            background: localStorage.getItem('customBackground') || ''
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dashboard-data.json';
        a.click();
        
        URL.revokeObjectURL(url);
        
        showNotification('数据已导出');
    });
    
    // 数据导入
    importDataBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    if (data.notes) {
                        notesContent.value = data.notes;
                        localStorage.setItem('userNotes', data.notes);
                    }
                    
                    if (data.todos) {
                        localStorage.setItem('todoItems', JSON.stringify(data.todos));
                        loadTodoItems();
                    }
                    
                    if (data.links) {
                        localStorage.setItem('customLinks', JSON.stringify(data.links));
                        loadLinks();
                    }
                    
                    if (data.city) {
                        localStorage.setItem('weatherCity', data.city);
                        getWeatherData(data.city);
                    }
                    
                    if (data.theme) {
                        localStorage.setItem('theme', data.theme);
                        document.body.classList.remove('theme-default', 'theme-dark', 'theme-blue', 'theme-orange', 'theme-purple', 'theme-red');
                        document.body.classList.add(`theme-${data.theme}`);
                        
                        themeOptions.forEach(option => {
                            option.classList.remove('active');
                            if (option.getAttribute('data-theme') === data.theme) {
                                option.classList.add('active');
                            }
                        });
                    }
                    
                    if (data.apiKey) {
                        localStorage.setItem('weatherApiKey', data.apiKey);
                    }
                    
                    if (data.quotes) {
                        localStorage.setItem('userQuotes', JSON.stringify(data.quotes));
                    }
                    
                    if (data.searchEngine) {
                        localStorage.setItem('searchEngine', data.searchEngine);
                        searchEngineSelector.value = data.searchEngine;
                        defaultSearchEngine.value = data.searchEngine;
                    }
                    
                    if (data.background) {
                        localStorage.setItem('customBackground', data.background);
                        loadCustomBackground();
                    }
                    
                    showNotification('数据已导入成功');
                } catch (error) {
                    console.error('导入数据失败:', error);
                    showNotification('导入数据失败，文件格式不正确');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    });
    
    // 重置数据
    resetDataBtn.addEventListener('click', () => {
        if (confirm('确定要重置所有数据吗？此操作不可撤销。')) {
            localStorage.clear();
            location.reload();
        }
    });
    
    // 天气点击刷新
    weatherElement.addEventListener('click', () => {
        const city = localStorage.getItem('weatherCity') || '北京';
        getWeatherData(city);
        showNotification('天气数据已刷新');
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 初始化应用
function initApp() {
    // 初始化时间
    initTime();
    
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme') || 'default';
    document.body.classList.add(`theme-${savedTheme}`);
    
    // 设置活动主题按钮
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === savedTheme) {
            option.classList.add('active');
        }
    });
    
    // 加载搜索引擎设置
    const savedSearchEngine = localStorage.getItem('searchEngine') || 'baidu';
    searchEngineSelector.value = savedSearchEngine;
    defaultSearchEngine.value = savedSearchEngine;
    
    // 初始化天气数据
    const savedCity = localStorage.getItem('weatherCity') || '北京';
    getWeatherData(savedCity);
    
    // 加载保存的笔记
    const savedNotes = localStorage.getItem('userNotes');
    if (savedNotes) {
        notesContent.value = savedNotes;
    }
    
    // 加载待办事项
    loadTodoItems();
    
    // 加载链接
    loadLinks();
    
    // 显示随机名言
    showRandomQuote();
    
    // 加载新闻
    fetchNews();
    
    // 加载自定义背景
    loadCustomBackground();
    
    // 初始化事件监听器
    initEventListeners();
    
    console.log("个性化起始页已加载！");
}

// 当DOM完全加载后初始化应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}