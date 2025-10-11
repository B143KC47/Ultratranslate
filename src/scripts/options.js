// Language translations (reusing from popup.js)
const translations = {
    'en': {
        settingsTitle: 'UltraTranslate Settings',
        generalSettings: 'General',
        apiSettings: 'API Configuration',
        translationSettings: 'Translation',
        appearanceSettings: 'Appearance',
        advancedSettings: 'Advanced',
        aboutSettings: 'About',
        interfaceLanguage: 'Interface Language:',
        defaultTargetLanguage: 'Default Target Language:',
        autoTranslate: 'Auto Translate',
        autoTranslateDesc: 'Automatically translate pages when loaded',
        preserveOriginal: 'Preserve Original Text',
        preserveOriginalDesc: 'Show both original and translated text',
        translationApi: 'Translation API:',
        apiKey: 'API Key:',
        apiKeyPlaceholder: 'Enter your API key',
        apiHelp: 'Get your API key from the provider\'s website',
        apiProviders: 'API Providers:',
        modelName: 'Model:',
        modelHelp: 'Select the model to use for translation',
        customPrompt: 'Custom Translation Prompt:',
        customPromptPlaceholder: 'Enter custom prompt for AI translation (e.g., "Translate to {language} keeping technical terms, be concise and natural")',
        customPromptDesc: 'Only works with DeepSeek, OpenAI, Gemini and Qwen APIs. Use {language} as placeholder for target language.',
        batchSize: 'Batch Size:',
        batchSizeDesc: 'Number of texts to translate in one batch',
        translationDelay: 'Translation Delay (ms):',
        translationDelayDesc: 'Delay between translation batches',
        translateTooltips: 'Translate Tooltips',
        translatePlaceholders: 'Translate Placeholders',
        translationStyle: 'Translation Style:',
        styleHighlight: 'Highlight',
        styleUnderline: 'Underline',
        styleBubble: 'Bubble',
        styleSideBySide: 'Side by Side',
        translationColor: 'Translation Color:',
        fontSize: 'Font Size Adjustment:',
        originalOpacity: 'Original Text Opacity:',
        cacheManagement: 'Cache Management',
        cacheSize: 'Cache Size:',
        cacheLimit: 'Cache Limit:',
        clearCache: 'Clear Cache',
        cacheExpiry: 'Cache Expiry (hours):',
        debugMode: 'Debug Mode',
        debugModeDesc: 'Show console logs for debugging',
        excludedSites: 'Excluded Sites',
        excludedSitesPlaceholder: 'Enter URLs to exclude (one per line)',
        excludedSitesDesc: 'Pages that won\'t be auto-translated',
        exportSettings: 'Export Settings',
        importSettings: 'Import Settings',
        resetSettings: 'Reset All Settings',
        version: 'Version: 1.0.0',
        features: 'Features',
        feature1: 'Multi-API translation support',
        feature2: 'Preserve original text option',
        feature3: 'Custom translation prompts',
        feature4: 'Translation caching',
        feature5: '9 interface languages',
        shortcuts: 'Keyboard Shortcuts',
        shortcut1: 'Toggle translation',
        shortcut2: 'Toggle original text',
        support: 'Support',
        supportText: 'For issues or suggestions, please visit our GitHub page.',
        settingsSaved: 'Settings saved successfully!',
        errorSaving: 'Error saving settings',
        cacheCleared: 'Cache cleared successfully!',
        settingsReset: 'All settings have been reset!',
        settingsExported: 'Settings exported successfully!',
        settingsImported: 'Settings imported successfully!',
        invalidFile: 'Invalid settings file!',
        videoSettings: 'Video Subtitles',
        enableVideoSubtitles: 'Enable Video Subtitle Translation',
        videoSubtitlesDesc: 'Automatically translate subtitles in video players',
        subtitleMode: 'Subtitle Mode:',
        subtitleModeOff: 'Off',
        subtitleModeTranslate: 'Translate Existing Subtitles',
        subtitleModeASR: 'Generate & Translate (ASR)',
        subtitleModeDesc: 'Choose how subtitles are handled',
        bilingualMode: 'Bilingual Display:',
        bilingualTrack: 'Separate Track',
        bilingualOverlay: 'Overlay (Original + Translation)',
        bilingualModeDesc: 'How to display translated subtitles',
        asrSettings: 'ASR Settings',
        asrProvider: 'ASR Provider:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google Speech-to-Text',
        asrDeepgram: 'Deepgram',
        asrLatency: 'Latency Mode:',
        latencyLow: 'Low Latency (Fast)',
        latencyBalanced: 'Balanced',
        latencyHigh: 'High Quality (Slow)',
        asrApiKey: 'ASR API Key:',
        asrApiKeyPlaceholder: 'Enter ASR API key',
        asrApiKeyDesc: 'Required for ASR functionality',
        videoSiteSettings: 'Site-Specific Settings',
        siteSettingsDesc: 'Enable/disable for specific video platforms',
        autoPromptTranslation: 'Auto-Prompt Translation',
        autoPromptDesc: 'Automatically prompt to translate non-target language pages',
        sitePreferences: 'Site Translation Preferences',
        clearSitePreferences: 'Clear All Site Preferences',
        alwaysTranslate: 'Always translate',
        neverTranslate: 'Never translate'
    },
    'zh-CN': {
        settingsTitle: '超级翻译 设置',
        generalSettings: '常规',
        apiSettings: 'API 配置',
        translationSettings: '翻译',
        appearanceSettings: '外观',
        advancedSettings: '高级',
        aboutSettings: '关于',
        interfaceLanguage: '界面语言：',
        defaultTargetLanguage: '默认目标语言：',
        autoTranslate: '自动翻译',
        autoTranslateDesc: '页面加载时自动翻译',
        preserveOriginal: '保留原文',
        preserveOriginalDesc: '同时显示原文和译文',
        translationApi: '翻译API：',
        apiKey: 'API密钥：',
        apiKeyPlaceholder: '请输入您的API密钥',
        apiHelp: '从提供商网站获取API密钥',
        apiProviders: 'API提供商：',
        modelName: '模型：',
        modelHelp: '选择要用于翻译的模型',
        customPrompt: '自定义翻译提示词：',
        customPromptPlaceholder: '输入AI翻译的自定义提示词（例如："翻译成{语言}，保留专业术语，简洁自然"）',
        customPromptDesc: '仅适用于DeepSeek、OpenAI、Gemini和Qwen API。使用{language}作为目标语言占位符。',
        batchSize: '批处理大小：',
        batchSizeDesc: '一批翻译的文本数量',
        translationDelay: '翻译延迟（毫秒）：',
        translationDelayDesc: '翻译批次之间的延迟',
        translateTooltips: '翻译工具提示',
        translatePlaceholders: '翻译占位符',
        translationStyle: '翻译样式：',
        styleHighlight: '高亮',
        styleUnderline: '下划线',
        styleBubble: '气泡',
        styleSideBySide: '并排',
        translationColor: '翻译颜色：',
        fontSize: '字体大小调整：',
        originalOpacity: '原文透明度：',
        cacheManagement: '缓存管理',
        cacheSize: '缓存大小：',
        cacheLimit: '缓存限制：',
        clearCache: '清除缓存',
        cacheExpiry: '缓存过期（小时）：',
        debugMode: '调试模式',
        debugModeDesc: '显示控制台日志用于调试',
        excludedSites: '排除的网站',
        excludedSitesPlaceholder: '输入要排除的URL（每行一个）',
        excludedSitesDesc: '不会自动翻译的页面',
        exportSettings: '导出设置',
        importSettings: '导入设置',
        resetSettings: '重置所有设置',
        version: '版本：1.0.0',
        features: '功能',
        feature1: '多API翻译支持',
        feature2: '保留原文选项',
        feature3: '自定义翻译提示词',
        feature4: '翻译缓存',
        feature5: '9种界面语言',
        shortcuts: '键盘快捷键',
        shortcut1: '切换翻译',
        shortcut2: '切换原文',
        support: '支持',
        supportText: '如有问题或建议，请访问我们的GitHub页面。',
        settingsSaved: '设置保存成功！',
        errorSaving: '保存设置失败',
        cacheCleared: '缓存清除成功！',
        settingsReset: '所有设置已重置！',
        settingsExported: '设置导出成功！',
        settingsImported: '设置导入成功！',
        invalidFile: '无效的设置文件！',
        videoSettings: '视频字幕',
        enableVideoSubtitles: '启用视频字幕翻译',
        videoSubtitlesDesc: '自动翻译视频播放器中的字幕',
        subtitleMode: '字幕模式：',
        subtitleModeOff: '关闭',
        subtitleModeTranslate: '翻译现有字幕',
        subtitleModeASR: '生成并翻译（ASR）',
        subtitleModeDesc: '选择字幕处理方式',
        bilingualMode: '双语显示：',
        bilingualTrack: '独立轨道',
        bilingualOverlay: '叠加显示（原文+译文）',
        bilingualModeDesc: '如何显示翻译后的字幕',
        asrSettings: 'ASR设置',
        asrProvider: 'ASR提供商：',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google语音转文字',
        asrDeepgram: 'Deepgram',
        asrLatency: '延迟模式：',
        latencyLow: '低延迟（快速）',
        latencyBalanced: '平衡',
        latencyHigh: '高质量（慢速）',
        asrApiKey: 'ASR API密钥：',
        asrApiKeyPlaceholder: '输入ASR API密钥',
        asrApiKeyDesc: 'ASR功能所需',
        videoSiteSettings: '站点特定设置',
        siteSettingsDesc: '为特定视频平台启用/禁用',
        autoPromptTranslation: '自动提示翻译',
        autoPromptDesc: '自动提示翻译非目标语言页面',
        sitePreferences: '网站翻译偏好',
        clearSitePreferences: '清除所有网站偏好',
        alwaysTranslate: '总是翻译',
        neverTranslate: '永不翻译'
    }
};

let currentLang = 'en';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    setupEventListeners();
    setupNavigation();
    await updateCacheSize();
    
    // Update cache size periodically
    setInterval(updateCacheSize, 5000);
});

// Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.settings-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('href').substring(1);
            
            // Update active states
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

// Event Listeners
function setupEventListeners() {
    // General settings
    document.getElementById('interface-language').addEventListener('change', handleInterfaceLanguageChange);
    document.getElementById('target-language').addEventListener('change', saveSettings);
    document.getElementById('auto-translate').addEventListener('change', saveSettings);
    document.getElementById('preserve-original').addEventListener('change', saveSettings);
    
    // Auto-prompt settings
    const autoPromptCheckbox = document.getElementById('auto-prompt-translation');
    if (autoPromptCheckbox) {
        autoPromptCheckbox.addEventListener('change', saveSettings);
    }
    const clearSitePrefsBtn = document.getElementById('clear-site-preferences');
    if (clearSitePrefsBtn) {
        clearSitePrefsBtn.addEventListener('click', clearSitePreferences);
    }
    
    // API settings
    document.getElementById('translation-api').addEventListener('change', handleApiChange);
    document.getElementById('api-key').addEventListener('blur', saveSettings);
    document.getElementById('toggle-api-key').addEventListener('click', toggleApiKeyVisibility);
    document.getElementById('model-name').addEventListener('change', saveSettings);
    
    // Translation settings
    document.getElementById('custom-prompt').addEventListener('blur', saveSettings);
    document.getElementById('batch-size').addEventListener('change', saveSettings);
    document.getElementById('translation-delay').addEventListener('change', saveSettings);
    document.getElementById('translate-tooltips').addEventListener('change', saveSettings);
    document.getElementById('translate-placeholders').addEventListener('change', saveSettings);
    
    // Appearance settings
    document.getElementById('translation-style').addEventListener('change', saveSettings);
    document.getElementById('translation-color').addEventListener('change', saveSettings);
    document.getElementById('font-size').addEventListener('input', handleFontSizeChange);
    document.getElementById('opacity').addEventListener('input', handleOpacityChange);
    
    // Advanced settings
    document.getElementById('clear-cache').addEventListener('click', clearCache);
    document.getElementById('cache-expiry').addEventListener('change', saveSettings);
    document.getElementById('debug-mode').addEventListener('change', saveSettings);
    document.getElementById('excluded-sites').addEventListener('blur', saveSettings);
    document.getElementById('export-settings').addEventListener('click', exportSettings);
    document.getElementById('import-settings').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', importSettings);
    document.getElementById('reset-settings').addEventListener('click', resetSettings);
    
    // Video subtitle settings
    const videoSubtitles = document.getElementById('video-subtitles');
    if (videoSubtitles) {
        videoSubtitles.addEventListener('change', saveVideoSettings);
    }
    const videoSubtitleMode = document.getElementById('video-subtitle-mode');
    if (videoSubtitleMode) {
        videoSubtitleMode.addEventListener('change', handleVideoModeChange);
    }
    const videoBilingualMode = document.getElementById('video-bilingual-mode');
    if (videoBilingualMode) {
        videoBilingualMode.addEventListener('change', saveVideoSettings);
    }
    const asrProvider = document.getElementById('asr-provider');
    if (asrProvider) {
        asrProvider.addEventListener('change', saveVideoSettings);
    }
    const asrLatency = document.getElementById('asr-latency');
    if (asrLatency) {
        asrLatency.addEventListener('change', saveVideoSettings);
    }
    const asrApiKey = document.getElementById('asr-api-key');
    if (asrApiKey) {
        asrApiKey.addEventListener('blur', saveVideoSettings);
    }
    // Site-specific settings
    ['youtube-captions', 'netflix-captions', 'vimeo-captions'].forEach(id => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.addEventListener('change', saveVideoSettings);
        }
    });
}

// Load settings
async function loadSettings() {
    try {
        const settings = await chrome.storage.sync.get(null);
        
        // General settings
        document.getElementById('interface-language').value = settings.interfaceLanguage || 'en';
        document.getElementById('target-language').value = settings.targetLanguage || 'zh-CN';
        document.getElementById('auto-translate').checked = settings.autoTranslate || false;
        document.getElementById('preserve-original').checked = settings.preserveOriginal !== false;
        
        // Auto-prompt settings
        const autoPromptCheckbox = document.getElementById('auto-prompt-translation');
        if (autoPromptCheckbox) {
            autoPromptCheckbox.checked = settings.autoPromptTranslation !== false;
        }
        
        // Load site preferences
        loadSitePreferences(settings.promptedSites || {});
        
        // API settings
        document.getElementById('translation-api').value = settings.translationApi || 'google';
        document.getElementById('api-key').value = settings.apiKey || '';
        handleApiChange();
        
        // Load model name after API change populates the options
        if (settings.modelName) {
            setTimeout(() => {
                const modelSelect = document.getElementById('model-name');
                if (modelSelect && Array.from(modelSelect.options).some(opt => opt.value === settings.modelName)) {
                    modelSelect.value = settings.modelName;
                }
            }, 100);
        }
        
        // Translation settings
        document.getElementById('custom-prompt').value = settings.customPrompt || '';
        document.getElementById('batch-size').value = settings.batchSize || 50;
        document.getElementById('translation-delay').value = settings.translationDelay || 50;
        document.getElementById('translate-tooltips').checked = settings.translateTooltips || false;
        document.getElementById('translate-placeholders').checked = settings.translatePlaceholders || false;
        
        // Appearance settings
        document.getElementById('translation-style').value = settings.translationStyle || 'highlight';
        document.getElementById('translation-color').value = settings.translationColor || '#10a37f';
        document.getElementById('font-size').value = settings.fontSize || 100;
        document.getElementById('opacity').value = settings.opacity || 60;
        handleFontSizeChange();
        handleOpacityChange();
        
        // Advanced settings
        document.getElementById('cache-expiry').value = settings.cacheExpiry || 24;
        document.getElementById('debug-mode').checked = settings.debugMode || false;
        document.getElementById('excluded-sites').value = settings.excludedSites || '';
        
        // Video subtitle settings
        const videoSubtitles = document.getElementById('video-subtitles');
        if (videoSubtitles) {
            videoSubtitles.checked = settings.videoSubtitles || false;
        }
        const videoSubtitleMode = document.getElementById('video-subtitle-mode');
        if (videoSubtitleMode) {
            videoSubtitleMode.value = settings.videoSubtitleMode || 'translate';
            handleVideoModeChange();
        }
        const videoBilingualMode = document.getElementById('video-bilingual-mode');
        if (videoBilingualMode) {
            videoBilingualMode.value = settings.videoBilingualMode || 'overlay';
        }
        const asrProvider = document.getElementById('asr-provider');
        if (asrProvider) {
            asrProvider.value = settings.asrProvider || 'whisper';
        }
        const asrLatency = document.getElementById('asr-latency');
        if (asrLatency) {
            asrLatency.value = settings.asrLatency || 'balanced';
        }
        const asrApiKey = document.getElementById('asr-api-key');
        if (asrApiKey) {
            asrApiKey.value = settings.asrApiKey || '';
        }
        // Site-specific settings
        const youtubeCaptions = document.getElementById('youtube-captions');
        if (youtubeCaptions) {
            youtubeCaptions.checked = settings.youtubeCaptions !== false;
        }
        const netflixCaptions = document.getElementById('netflix-captions');
        if (netflixCaptions) {
            netflixCaptions.checked = settings.netflixCaptions !== false;
        }
        const vimeoCaptions = document.getElementById('vimeo-captions');
        if (vimeoCaptions) {
            vimeoCaptions.checked = settings.vimeoCaptions !== false;
        }
        
        // Update interface language
        updateInterfaceLanguage(settings.interfaceLanguage || 'en');
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

// Save settings
async function saveSettings() {
    const settings = {
        // General
        interfaceLanguage: document.getElementById('interface-language').value,
        targetLanguage: document.getElementById('target-language').value,
        autoTranslate: document.getElementById('auto-translate').checked,
        preserveOriginal: document.getElementById('preserve-original').checked,
        autoPromptTranslation: document.getElementById('auto-prompt-translation')?.checked !== false,
        
        // API
        translationApi: document.getElementById('translation-api').value,
        apiKey: document.getElementById('api-key').value,
        modelName: document.getElementById('model-name').value,
        
        // Translation
        customPrompt: document.getElementById('custom-prompt').value,
        batchSize: parseInt(document.getElementById('batch-size').value),
        translationDelay: parseInt(document.getElementById('translation-delay').value),
        translateTooltips: document.getElementById('translate-tooltips').checked,
        translatePlaceholders: document.getElementById('translate-placeholders').checked,
        
        // Appearance
        translationStyle: document.getElementById('translation-style').value,
        translationColor: document.getElementById('translation-color').value,
        fontSize: parseInt(document.getElementById('font-size').value),
        opacity: parseInt(document.getElementById('opacity').value),
        
        // Advanced
        cacheExpiry: parseInt(document.getElementById('cache-expiry').value),
        debugMode: document.getElementById('debug-mode').checked,
        excludedSites: document.getElementById('excluded-sites').value
    };
    
    try {
        await chrome.storage.sync.set(settings);
        showStatus(getMessage('settingsSaved'), 'success');
    } catch (error) {
        showStatus(getMessage('errorSaving'), 'error');
        console.error('Error saving settings:', error);
    }
}

// Handle interface language change
function handleInterfaceLanguageChange(e) {
    const lang = e.target.value;
    updateInterfaceLanguage(lang);
    saveSettings();
}

// Update interface language
function updateInterfaceLanguage(lang) {
    currentLang = lang;
    const t = translations[lang] || translations['en'];
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (t[key]) {
            element.textContent = t[key];
        }
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            element.placeholder = t[key];
        }
    });
}

// Handle API change
function handleApiChange() {
    const api = document.getElementById('translation-api').value;
    const apiKeySection = document.getElementById('api-key-section');
    const modelSection = document.getElementById('model-selection-section');
    const modelSelect = document.getElementById('model-name');
    
    if (api === 'google') {
        apiKeySection.style.display = 'none';
        modelSection.style.display = 'none';
    } else {
        apiKeySection.style.display = 'block';
        
        // Show model selection for AI-based APIs
        if (['deepseek', 'openai', 'gemini', 'qwen'].includes(api)) {
            modelSection.style.display = 'block';
            populateModelOptions(api);
        } else {
            modelSection.style.display = 'none';
        }
    }
    
    saveSettings();
}

// Populate model options based on selected API
function populateModelOptions(api) {
    const modelSelect = document.getElementById('model-name');
    modelSelect.innerHTML = '';
    
    let models = [];
    switch(api) {
        case 'deepseek':
            models = [
                { value: 'deepseek-chat', text: 'DeepSeek Chat (Default)' },
                { value: 'deepseek-coder', text: 'DeepSeek Coder' }
            ];
            break;
        case 'openai':
            models = [
                { value: 'gpt-3.5-turbo', text: 'GPT-3.5 Turbo (Default)' },
                { value: 'gpt-4', text: 'GPT-4' },
                { value: 'gpt-4-turbo', text: 'GPT-4 Turbo' },
                { value: 'gpt-4o', text: 'GPT-4o' },
                { value: 'gpt-4o-mini', text: 'GPT-4o Mini' }
            ];
            break;
        case 'gemini':
            models = [
                { value: 'gemini-1.5-flash', text: 'Gemini 1.5 Flash (Default)' },
                { value: 'gemini-1.5-flash-8b', text: 'Gemini 1.5 Flash 8B' },
                { value: 'gemini-1.5-pro', text: 'Gemini 1.5 Pro' },
                { value: 'gemini-2.0-flash-exp', text: 'Gemini 2.0 Flash (Experimental)' }
            ];
            break;
        case 'qwen':
            models = [
                { value: 'qwen-plus', text: 'Qwen Plus (Default)' },
                { value: 'qwen-max', text: 'Qwen Max' },
                { value: 'qwen-flash', text: 'Qwen Flash' },
                { value: 'qwen-turbo', text: 'Qwen Turbo' }
            ];
            break;
    }
    
    models.forEach(model => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = model.text;
        modelSelect.appendChild(option);
    });
    
    // Load saved model if exists
    chrome.storage.sync.get(['modelName'], (result) => {
        if (result.modelName && Array.from(modelSelect.options).some(opt => opt.value === result.modelName)) {
            modelSelect.value = result.modelName;
        }
    });
}

// Toggle API key visibility
function toggleApiKeyVisibility() {
    const apiKeyInput = document.getElementById('api-key');
    const toggleBtn = document.getElementById('toggle-api-key');
    
    if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        apiKeyInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Handle font size change
function handleFontSizeChange() {
    const value = document.getElementById('font-size').value;
    document.getElementById('font-size-value').textContent = value + '%';
    saveSettings();
}

// Handle opacity change
function handleOpacityChange() {
    const value = document.getElementById('opacity').value;
    document.getElementById('opacity-value').textContent = value + '%';
    saveSettings();
}

// Update cache size
async function updateCacheSize() {
    chrome.runtime.sendMessage({ action: 'getCacheSize' }, (response) => {
        // Check for runtime errors
        if (chrome.runtime.lastError) {
            console.debug('Cache size update:', chrome.runtime.lastError.message);
            return;
        }
        
        if (response && response.size !== undefined) {
            document.getElementById('cache-size').textContent = response.size;
        }
    });
}

// Clear cache
async function clearCache() {
    chrome.runtime.sendMessage({ action: 'clearCache' }, (response) => {
        // Check for runtime errors
        if (chrome.runtime.lastError) {
            console.debug('Clear cache:', chrome.runtime.lastError.message);
            showStatus(getMessage('errorSaving'), 'error');
            return;
        }
        
        if (response && response.success) {
            showStatus(getMessage('cacheCleared'), 'success');
            updateCacheSize();
        }
    });
}

// Export settings
async function exportSettings() {
    const settings = await chrome.storage.sync.get(null);
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', 'ultratranslate-settings.json');
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
    
    showStatus(getMessage('settingsExported'), 'success');
}

// Import settings
async function importSettings(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const settings = JSON.parse(event.target.result);
            await chrome.storage.sync.set(settings);
            await loadSettings();
            showStatus(getMessage('settingsImported'), 'success');
        } catch (error) {
            showStatus(getMessage('invalidFile'), 'error');
            console.error('Error importing settings:', error);
        }
    };
    reader.readAsText(file);
}

// Reset settings
async function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        await chrome.storage.sync.clear();
        await loadSettings();
        showStatus(getMessage('settingsReset'), 'success');
    }
}

// Get message
function getMessage(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

// Handle video subtitle mode change
function handleVideoModeChange() {
    const mode = document.getElementById('video-subtitle-mode')?.value;
    const asrSettings = document.getElementById('asr-settings');
    if (asrSettings) {
        asrSettings.style.display = mode === 'asr' ? 'block' : 'none';
    }
    saveVideoSettings();
}

// Save video subtitle settings
async function saveVideoSettings() {
    const settings = {
        videoSubtitles: document.getElementById('video-subtitles')?.checked || false,
        videoSubtitleMode: document.getElementById('video-subtitle-mode')?.value || 'translate',
        videoBilingualMode: document.getElementById('video-bilingual-mode')?.value || 'overlay',
        asrProvider: document.getElementById('asr-provider')?.value || 'whisper',
        asrLatency: document.getElementById('asr-latency')?.value || 'balanced',
        asrApiKey: document.getElementById('asr-api-key')?.value || '',
        youtubeCaptions: document.getElementById('youtube-captions')?.checked !== false,
        netflixCaptions: document.getElementById('netflix-captions')?.checked !== false,
        vimeoCaptions: document.getElementById('vimeo-captions')?.checked !== false
    };
    
    try {
        await chrome.storage.sync.set(settings);
        
        // Send update to content scripts
        chrome.tabs.query({}, (tabs) => {
            tabs.forEach(tab => {
                if (tab.id) {
                    chrome.tabs.sendMessage(tab.id, {
                        action: 'updateVideoSettings',
                        settings: {
                            enabled: settings.videoSubtitles,
                            mode: settings.videoSubtitleMode,
                            bilingualMode: settings.videoBilingualMode,
                            asrProvider: settings.asrProvider,
                            latencyMode: settings.asrLatency
                        }
                    }, () => {
                        // Handle errors silently
                        if (chrome.runtime.lastError) {
                            // Expected for tabs without content script
                            console.debug('Tab update skipped:', tab.id, chrome.runtime.lastError.message);
                        }
                    });
                }
            });
        });
        
        showStatus(getMessage('settingsSaved'), 'success');
    } catch (error) {
        showStatus(getMessage('errorSaving'), 'error');
        console.error('Error saving video settings:', error);
    }
}

// Load site preferences
function loadSitePreferences(promptedSites) {
    const listContainer = document.getElementById('site-preferences-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    const sites = Object.entries(promptedSites);
    if (sites.length === 0) {
        listContainer.innerHTML = `<div style="color: #666; padding: 10px;">${getMessage('noSitePreferences') || 'No site preferences saved'}</div>`;
        return;
    }
    
    sites.forEach(([hostname, prefs]) => {
        const item = document.createElement('div');
        item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px solid #eee;';
        
        const siteInfo = document.createElement('div');
        siteInfo.innerHTML = `
            <strong>${hostname}</strong>
            <span style="margin-left: 10px; color: ${prefs.action === 'always' ? '#10a37f' : '#666'};">
                ${prefs.action === 'always' ? getMessage('alwaysTranslate') : getMessage('neverTranslate')}
            </span>
        `;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.style.cssText = 'border: none; background: #f0f0f0; color: #666; width: 24px; height: 24px; border-radius: 4px; cursor: pointer;';
        removeBtn.onclick = () => removeSitePreference(hostname);
        
        item.appendChild(siteInfo);
        item.appendChild(removeBtn);
        listContainer.appendChild(item);
    });
}

// Remove single site preference
function removeSitePreference(hostname) {
    chrome.storage.sync.get(['promptedSites'], (result) => {
        const promptedSites = result.promptedSites || {};
        delete promptedSites[hostname];
        chrome.storage.sync.set({ promptedSites }, () => {
            loadSitePreferences(promptedSites);
            showStatus(`Removed preference for ${hostname}`, 'success');
        });
    });
}

// Clear all site preferences
function clearSitePreferences() {
    if (confirm('Are you sure you want to clear all site translation preferences?')) {
        chrome.storage.sync.set({ promptedSites: {} }, () => {
            loadSitePreferences({});
            showStatus(getMessage('sitePreferencesCleared') || 'All site preferences cleared', 'success');
        });
    }
}

// Show status message
function showStatus(message, type) {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.className = type;
    
    setTimeout(() => {
        statusElement.className = '';
        statusElement.textContent = '';
    }, 3000);
}