let isTranslating = false;
let translatedNodes = new WeakSet(); // Changed to WeakSet to avoid memory leaks
let currentSettings = {};
// WeakMap to store original text without polluting DOM
const originalTextMap = new WeakMap();
// Cache for computed styles to improve performance
const computedStyleCache = new WeakMap();
// Enable realtime translation after a manual translate, even if autoTranslate is off
let manualRealtimeEnabled = false;
// View toggle state (for popup control)
let isShowingOriginal = false;
// Track if extension context is still valid (to avoid flood of error messages)
let extensionContextValid = true;

// RTL languages list
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur', 'yi', 'ji', 'iw', 'ku', 'ms', 'ml'];

// Loading indicator functions
function createLoadingIndicator() {
    if (loadingIndicator) return;
    
    // Get loading text based on interface language
    const loadingTexts = {
        'en': 'Translating',
        'zh-CN': '翻译中',
        'zh-TW': '翻譯中',
        'ja': '翻訳中',
        'ko': '번역 중',
        'es': 'Traduciendo',
        'fr': 'Traduction',
        'de': 'Übersetzen',
        'ru': 'Перевод',
        'ar': 'الترجمة'
    };
    
    const interfaceLang = currentSettings.interfaceLanguage || 'en';
    const loadingText = loadingTexts[interfaceLang] || loadingTexts['en'];
    
    loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'ultra-translate-loading';
    loadingIndicator.innerHTML = `
        <div class="ultra-translate-loading-compact">
            <span class="ultra-translate-loading-text">${loadingText}</span>
            <span class="ultra-translate-loading-progress">0%</span>
            <div class="ultra-translate-loading-bar">
                <div class="ultra-translate-loading-bar-fill"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingIndicator);
}

function updateLoadingProgress(current, total) {
    if (!loadingIndicator) return;
    
    const percent = Math.round((current / total) * 100);
    const progressText = loadingIndicator.querySelector('.ultra-translate-loading-progress');
    const progressBar = loadingIndicator.querySelector('.ultra-translate-loading-bar-fill');
    
    if (progressText) progressText.textContent = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;
}

function removeLoadingIndicator() {
    if (loadingIndicator) {
        loadingIndicator.remove();
        loadingIndicator = null;
    }
}

let loadingIndicator = null;

chrome.storage.sync.get({
    translationApi: 'google',
    apiKey: '',
    targetLanguage: 'zh-CN',
    preserveOriginal: true,
    autoTranslate: false,
    interfaceLanguage: 'en',
    autoPromptTranslation: true,
    promptedSites: {}
}, (settings) => {
    currentSettings = settings;

    // Auto translate if enabled
    if (settings.autoTranslate && shouldTranslatePage()) {
        setTimeout(() => translatePage(settings), 2000);
    }
    // Auto prompt for translation on non-target language sites
    else if (settings.autoPromptTranslation !== false && shouldPromptTranslation(settings)) {
        setTimeout(() => showTranslationPrompt(settings), 1000);
    }
});

// Reset extension context flag when page is refreshed/reloaded
window.addEventListener('beforeunload', () => {
    extensionContextValid = true;
});

// Check if page should be translated
function shouldTranslatePage() {
    // Skip if page is already in target language
    const pageLang = detectPageLanguage();
    const targetLangCode = currentSettings.targetLanguage.toLowerCase().substring(0, 2);
    if (pageLang && pageLang.startsWith(targetLangCode)) {
        return false;
    }
    
    // Check excluded sites
    const excludedSites = currentSettings.excludedSites?.split('\n').filter(s => s.trim());
    if (excludedSites?.some(site => window.location.href.includes(site.trim()))) {
        return false;
    }
    
    return true;
}

// Check if should prompt for translation
function shouldPromptTranslation(settings) {
    // Don't prompt if auto-translate is on
    if (settings.autoTranslate) return false;
    
    // Check if already prompted for this site
    const currentHost = window.location.hostname;
    if (settings.promptedSites && settings.promptedSites[currentHost]) {
        const siteSettings = settings.promptedSites[currentHost];
        // If user previously chose 'never' for this site, don't prompt
        if (siteSettings.action === 'never') return false;
        // If user chose 'always', auto-translate instead of prompting
        if (siteSettings.action === 'always') {
            setTimeout(() => translatePage(settings), 2000);
            return false;
        }
    }
    
    // Check if page language differs from target language
    const pageLang = detectPageLanguage();
    const targetLangCode = settings.targetLanguage.toLowerCase().substring(0, 2);
    
    // Don't prompt if page is already in target language
    if (pageLang && pageLang.startsWith(targetLangCode)) {
        return false;
    }
    
    // Check excluded sites
    const excludedSites = settings.excludedSites?.split('\n').filter(s => s.trim());
    if (excludedSites?.some(site => window.location.href.includes(site.trim()))) {
        return false;
    }
    
    // Only prompt if there's substantial text content
    const textContent = document.body?.innerText || '';
    if (textContent.length < 100) return false;
    
    return true;
}

// Improved language detection
function detectPageLanguage() {
    // Priority 1: HTML lang attribute
    let pageLang = document.documentElement.lang?.toLowerCase();
    if (pageLang) return pageLang.split('-')[0];
    
    // Priority 2: Meta language tags
    const metaLang = document.querySelector('meta[http-equiv="content-language"]')?.content ||
                     document.querySelector('meta[name="language"]')?.content;
    if (metaLang) return metaLang.toLowerCase().split('-')[0];
    
    // Priority 3: Detect from text content
    const sampleText = getSampleText();
    if (sampleText) {
        return detectLanguageFromText(sampleText);
    }
    
    return null;
}

// Get sample text for language detection
function getSampleText() {
    // Get text from main content areas
    const contentSelectors = [
        'main', 'article', '[role="main"]', '#content', '.content',
        'p', 'h1', 'h2', 'h3'
    ];
    
    let sampleText = '';
    for (const selector of contentSelectors) {
        const elements = document.querySelectorAll(selector);
        for (const elem of elements) {
            sampleText += elem.innerText + ' ';
            if (sampleText.length > 500) break;
        }
        if (sampleText.length > 500) break;
    }
    
    return sampleText.trim();
}

// Detect language from text content
function detectLanguageFromText(text) {
    if (!text) return null;
    
    // Common language patterns
    const patterns = {
        'zh': /[\u4e00-\u9fff\u3400-\u4dbf]/g, // Chinese
        'ja': /[\u3040-\u309f\u30a0-\u30ff]/g, // Japanese
        'ko': /[\uac00-\ud7af\u1100-\u11ff]/g, // Korean
        'ar': /[\u0600-\u06ff\u0750-\u077f]/g, // Arabic
        'ru': /[\u0400-\u04ff]/g, // Cyrillic
        'he': /[\u0590-\u05ff]/g, // Hebrew
        'th': /[\u0e00-\u0e7f]/g, // Thai
        'hi': /[\u0900-\u097f]/g, // Hindi
    };
    
    // Count matches for each language
    const counts = {};
    for (const [lang, pattern] of Object.entries(patterns)) {
        const matches = text.match(pattern);
        if (matches) {
            counts[lang] = matches.length;
        }
    }
    
    // Find language with most matches
    let maxCount = 0;
    let detectedLang = null;
    for (const [lang, count] of Object.entries(counts)) {
        if (count > maxCount && count > text.length * 0.1) { // At least 10% of text
            maxCount = count;
            detectedLang = lang;
        }
    }
    
    // If no non-Latin script detected, check for Latin-based languages
    if (!detectedLang) {
        // Simple heuristic for common words
        const langIndicators = {
            'en': /\b(the|and|of|to|in|is|you|that|was|for)\b/gi,
            'es': /\b(el|la|de|que|y|en|un|por|con|para)\b/gi,
            'fr': /\b(le|de|et|la|les|des|un|une|pour|dans)\b/gi,
            'de': /\b(der|die|und|das|den|von|zu|mit|sich|auf)\b/gi,
            'pt': /\b(o|a|de|e|do|da|em|para|com|por)\b/gi,
            'it': /\b(il|di|e|la|che|in|un|per|con|del)\b/gi,
        };
        
        for (const [lang, pattern] of Object.entries(langIndicators)) {
            const matches = text.match(pattern);
            if (matches && matches.length > 5) {
                counts[lang] = matches.length;
            }
        }
        
        // Find the best match
        maxCount = 0;
        for (const [lang, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                detectedLang = lang;
            }
        }
    }
    
    return detectedLang;
}

// Show translation prompt
function showTranslationPrompt(settings) {
    // Don't show if already showing
    if (document.querySelector('.ultra-translate-prompt')) return;
    
    // Get detected language name
    const pageLang = detectPageLanguage();
    const langNames = {
        'zh': '中文',
        'en': 'English',
        'ja': '日本語',
        'ko': '한국어',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'ru': 'Русский',
        'ar': 'العربية',
        'pt': 'Português',
        'it': 'Italiano',
        'hi': 'हिन्दी',
        'th': 'ไทย',
        'he': 'עברית'
    };
    
    const fromLang = langNames[pageLang] || pageLang || 'foreign language';
    const targetLang = getLanguageName(settings.targetLanguage);
    
    // Create prompt container
    const promptContainer = document.createElement('div');
    promptContainer.className = 'ultra-translate-prompt';
    promptContainer.innerHTML = `
        <div class="ultra-translate-prompt-content">
            <div class="ultra-translate-prompt-icon">🌐</div>
            <div class="ultra-translate-prompt-text">
                <div class="ultra-translate-prompt-title">
                    ${getPromptText('title', settings.interfaceLanguage)}
                </div>
                <div class="ultra-translate-prompt-subtitle">
                    ${getPromptText('detected', settings.interfaceLanguage)}: <strong>${fromLang}</strong> → <strong>${targetLang}</strong>
                </div>
            </div>
            <div class="ultra-translate-prompt-actions">
                <button class="ultra-translate-prompt-btn ultra-translate-prompt-translate">
                    ${getPromptText('translate', settings.interfaceLanguage)}
                </button>
                <button class="ultra-translate-prompt-btn ultra-translate-prompt-always">
                    ${getPromptText('always', settings.interfaceLanguage)}
                </button>
                <button class="ultra-translate-prompt-btn ultra-translate-prompt-never">
                    ${getPromptText('never', settings.interfaceLanguage)}
                </button>
                <button class="ultra-translate-prompt-close">×</button>
            </div>
        </div>
    `;
    
    // Add styles
    const styles = `
        .ultra-translate-prompt {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 2147483647;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            animation: ultra-translate-slide-in 0.3s ease-out;
            max-width: 420px;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        @keyframes ultra-translate-slide-in {
            from {
                transform: translateX(420px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .ultra-translate-prompt-content {
            display: flex;
            align-items: center;
            padding: 16px;
            gap: 12px;
        }
        
        .ultra-translate-prompt-icon {
            font-size: 32px;
            flex-shrink: 0;
        }
        
        .ultra-translate-prompt-text {
            flex: 1;
            min-width: 0;
        }
        
        .ultra-translate-prompt-title {
            font-size: 14px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 4px;
        }
        
        .ultra-translate-prompt-subtitle {
            font-size: 12px;
            color: #666;
        }
        
        .ultra-translate-prompt-subtitle strong {
            color: #333;
            font-weight: 500;
        }
        
        .ultra-translate-prompt-actions {
            display: flex;
            flex-direction: column;
            gap: 6px;
            margin-left: 8px;
        }
        
        .ultra-translate-prompt-btn {
            padding: 6px 12px;
            border: none;
            border-radius: 6px;
            font-size: 12px;
            cursor: pointer;
            white-space: nowrap;
            transition: all 0.2s;
            font-weight: 500;
        }
        
        .ultra-translate-prompt-translate {
            background: #10a37f;
            color: white;
        }
        
        .ultra-translate-prompt-translate:hover {
            background: #0d8968;
        }
        
        .ultra-translate-prompt-always {
            background: #e7f3ff;
            color: #0066cc;
        }
        
        .ultra-translate-prompt-always:hover {
            background: #d0e5ff;
        }
        
        .ultra-translate-prompt-never {
            background: #f5f5f5;
            color: #666;
        }
        
        .ultra-translate-prompt-never:hover {
            background: #e8e8e8;
        }
        
        .ultra-translate-prompt-close {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 24px;
            height: 24px;
            border: none;
            background: transparent;
            color: #999;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .ultra-translate-prompt-close:hover {
            background: #f0f0f0;
            color: #333;
        }
        
        @media (max-width: 480px) {
            .ultra-translate-prompt {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .ultra-translate-prompt-content {
                padding: 12px;
            }
            
            .ultra-translate-prompt-actions {
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
        
        @media (prefers-color-scheme: dark) {
            .ultra-translate-prompt {
                background: #2a2a2a;
                border-color: rgba(255, 255, 255, 0.1);
            }
            
            .ultra-translate-prompt-title {
                color: #f0f0f0;
            }
            
            .ultra-translate-prompt-subtitle {
                color: #aaa;
            }
            
            .ultra-translate-prompt-subtitle strong {
                color: #ddd;
            }
            
            .ultra-translate-prompt-never {
                background: #3a3a3a;
                color: #ccc;
            }
            
            .ultra-translate-prompt-never:hover {
                background: #444;
            }
            
            .ultra-translate-prompt-close:hover {
                background: #3a3a3a;
                color: #f0f0f0;
            }
        }
    `;
    
    // Add styles to page
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Add prompt to page
    document.body.appendChild(promptContainer);
    
    // Add event listeners
    const translateBtn = promptContainer.querySelector('.ultra-translate-prompt-translate');
    const alwaysBtn = promptContainer.querySelector('.ultra-translate-prompt-always');
    const neverBtn = promptContainer.querySelector('.ultra-translate-prompt-never');
    const closeBtn = promptContainer.querySelector('.ultra-translate-prompt-close');
    
    translateBtn.addEventListener('click', () => {
        removePrompt();
        translatePage(settings);
    });
    
    alwaysBtn.addEventListener('click', () => {
        saveSitePreference('always');
        removePrompt();
        translatePage(settings);
    });
    
    neverBtn.addEventListener('click', () => {
        saveSitePreference('never');
        removePrompt();
    });
    
    closeBtn.addEventListener('click', () => {
        removePrompt();
    });
    
    // Auto-hide after 30 seconds
    setTimeout(() => {
        removePrompt();
    }, 30000);
    
    function removePrompt() {
        promptContainer.style.animation = 'ultra-translate-slide-out 0.3s ease-in';
        setTimeout(() => {
            promptContainer.remove();
        }, 300);
    }
    
    // Add slide-out animation
    const slideOutStyle = document.createElement('style');
    slideOutStyle.textContent = `
        @keyframes ultra-translate-slide-out {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(420px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(slideOutStyle);
}

// Get prompt text in appropriate language
function getPromptText(key, interfaceLang = 'en') {
    const texts = {
        'en': {
            title: 'Translate this page?',
            detected: 'Detected',
            translate: 'Translate',
            always: 'Always',
            never: 'Never'
        },
        'zh-CN': {
            title: '翻译此页面？',
            detected: '检测到',
            translate: '翻译',
            always: '总是翻译',
            never: '永不翻译'
        },
        'zh-TW': {
            title: '翻譯此頁面？',
            detected: '偵測到',
            translate: '翻譯',
            always: '總是翻譯',
            never: '永不翻譯'
        },
        'ja': {
            title: 'このページを翻訳しますか？',
            detected: '検出された',
            translate: '翻訳',
            always: '常に翻訳',
            never: '翻訳しない'
        },
        'ko': {
            title: '이 페이지를 번역하시겠습니까?',
            detected: '감지됨',
            translate: '번역',
            always: '항상 번역',
            never: '번역 안 함'
        },
        'es': {
            title: '¿Traducir esta página?',
            detected: 'Detectado',
            translate: 'Traducir',
            always: 'Siempre',
            never: 'Nunca'
        },
        'fr': {
            title: 'Traduire cette page?',
            detected: 'Détecté',
            translate: 'Traduire',
            always: 'Toujours',
            never: 'Jamais'
        },
        'de': {
            title: 'Diese Seite übersetzen?',
            detected: 'Erkannt',
            translate: 'Übersetzen',
            always: 'Immer',
            never: 'Niemals'
        },
        'ru': {
            title: 'Перевести эту страницу?',
            detected: 'Обнаружен',
            translate: 'Перевести',
            always: 'Всегда',
            never: 'Никогда'
        }
    };
    
    return texts[interfaceLang]?.[key] || texts['en'][key];
}

// Save site preference
function saveSitePreference(action) {
    const currentHost = window.location.hostname;
    chrome.storage.sync.get(['promptedSites'], (result) => {
        const promptedSites = result.promptedSites || {};
        promptedSites[currentHost] = {
            action: action,
            timestamp: Date.now()
        };
        chrome.storage.sync.set({ promptedSites });
    });
}

// Get language name
function getLanguageName(code) {
    const languages = {
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'ja': '日本語',
        'ko': '한국어',
        'ru': 'Русский',
        'ar': 'العربية'
    };
    return languages[code] || code;
}

// Toggle between showing original and translated text
function toggleViewMode() {
    isShowingOriginal = !isShowingOriginal;

    if (isShowingOriginal) {
        document.body.classList.add('ultra-show-original');
        document.body.classList.remove('ultra-show-translated');
    } else {
        // When toggling back to show translation
        document.body.classList.remove('ultra-show-original');

        // If preserveOriginal is enabled, remove all toggle classes to show both
        // Otherwise, add ultra-show-translated to show only translated
        if (currentSettings.preserveOriginal) {
            document.body.classList.remove('ultra-show-translated');
        } else {
            document.body.classList.add('ultra-show-translated');
        }
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'translatePage') {
        currentSettings = request.settings;
        translatePage(request.settings);
        sendResponse({success: true});
    } else if (request.action === 'updateSettings') {
        currentSettings = request.settings;
    } else if (request.action === 'stopTranslation') {
        isTranslating = false;
        removeLoadingIndicator();
        sendResponse({success: true});
    } else if (request.action === 'toggleTranslation') {
        toggleTranslation();
        sendResponse({success: true});
    } else if (request.action === 'restoreOriginal') {
        restoreOriginalText(document.body);
        sendResponse({success: true});
    } else if (request.action === 'getTranslationState') {
        // Check if page is translated
        const isTranslated = document.querySelector('.ultra-translate-wrapper, .ultra-translate-translated') !== null;
        // Check if original text is preserved (wrapper only exists when preserveOriginal is true)
        const hasOriginalText = document.querySelector('.ultra-translate-wrapper') !== null;
        sendResponse({
            isTranslated: isTranslated,
            isShowingOriginal: isShowingOriginal,
            targetLanguage: currentSettings.targetLanguage,
            hasOriginalText: hasOriginalText
        });
    } else if (request.action === 'toggleView') {
        // Toggle between original and translated view
        toggleViewMode();
        sendResponse({
            success: true,
            isShowingOriginal: isShowingOriginal
        });
    }
    return true;
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt+T: Toggle translation
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTranslation();
    }
    // Alt+O: Toggle original text visibility (when preserve mode is on)
    else if (e.altKey && e.key === 'o') {
        e.preventDefault();
        toggleOriginalTextVisibility();
    }
});

// Toggle visibility of original text in preserve mode
function toggleOriginalTextVisibility() {
    const originalElements = document.querySelectorAll('.ultra-translate-original');
    originalElements.forEach(elem => {
        const currentDisplay = window.getComputedStyle(elem).display;
        elem.style.display = currentDisplay === 'none' ? '' : 'none';
    });
}

async function translatePage(settings) {
    if (isTranslating) {
        console.log('Translation already in progress');
        return;
    }
    
    isTranslating = true;
    // Allow realtime incremental translation after manual trigger
    manualRealtimeEnabled = true;
    
    // Create loading indicator
    createLoadingIndicator();
    
    const textNodes = getTextNodes(document.body);
    
    // Group text nodes by similarity and context for better batch processing
    const optimizedBatches = createOptimizedBatches(textNodes, settings);
    const totalBatches = optimizedBatches.length;
    let processedBatches = 0;
    
    // Process batches with concurrent translation for better performance
    const concurrentLimit = 3;
    for (let i = 0; i < optimizedBatches.length; i += concurrentLimit) {
        const currentBatches = optimizedBatches.slice(i, i + concurrentLimit);
        await Promise.all(currentBatches.map(async batch => {
            await translateBatch(batch, settings);
            processedBatches++;
            updateLoadingProgress(processedBatches, totalBatches);
        }));
        await delay(50); // Reduced delay for better performance
    }
    
    // Translate form elements and attributes
    await translateFormElements(settings);
    await translateAttributes(settings);
    
    // Remove loading indicator
    removeLoadingIndicator();
    isTranslating = false;

    // Best-effort pass to ensure dynamic UI (nav/dropdowns) are also translated once after full pass
    try {
        await translateDynamicElements(settings);
    } catch (e) {
        // no-op
    }

    // Set initial view state based on preserveOriginal setting
    // Only set view state for first-time translation; preserve user's choice for re-translation
    const isFirstTranslation = !document.querySelector('.ultra-translate-wrapper, .ultra-translate-translated');

    if (isFirstTranslation) {
        // First-time translation: set initial view state
        if (settings.preserveOriginal) {
            // When preserveOriginal is true, show both by default (no toggle class)
            isShowingOriginal = false;
            document.body.classList.remove('ultra-show-original');
            document.body.classList.remove('ultra-show-translated');
        } else {
            // When preserveOriginal is false, show only translated (replacement mode)
            isShowingOriginal = false;
            document.body.classList.add('ultra-show-translated');
            document.body.classList.remove('ultra-show-original');
        }
    }
    // For re-translation: preserve user's current view state (isShowingOriginal and CSS classes remain unchanged)
}

function getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function(node) {
                // Skip if already translated
                if (translatedNodes.has(node)) return NodeFilter.FILTER_REJECT;
                
                const parent = node.parentElement;
                if (!parent) return NodeFilter.FILTER_REJECT;
                
                // Enhanced tag filtering
                const tagName = parent.tagName?.toLowerCase();
                const skipTags = [
                    'script', 'style', 'noscript', 'iframe', 'object', 'embed',
                    'pre', 'code', 'kbd', 'samp', 'var', // Code-related elements
                    'math', 'svg', 'canvas', // Technical elements
                    'textarea', 'input' // Form input elements (but keep select/option for translation)
                ];
                if (skipTags.includes(tagName)) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Skip contenteditable elements
                if (parent.contentEditable === 'true' || parent.isContentEditable) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Skip aria-hidden elements
                if (parent.getAttribute('aria-hidden') === 'true') {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Skip translation attributes
                if (parent.getAttribute('translate') === 'no' || 
                    parent.classList?.contains('notranslate') ||
                    parent.classList?.contains('ultra-translate-wrapper') ||
                    parent.classList?.contains('ultra-translate-original') ||
                    parent.classList?.contains('ultra-translate-translated')) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Check visibility with cached computed styles
                if (!isElementVisible(parent)) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Text content validation
                const text = node.nodeValue.trim();
                if (text.length < 2) return NodeFilter.FILTER_REJECT;
                
                // Skip pure numbers, punctuation, and symbols
                if (/^[\d\s\.\,\!\?\-\+\*\/\=\(\)\[\]\{\}\<\>\@\#\$\%\^\&\*\_\~\`\|\\]+$/.test(text)) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                // Skip URLs and emails
                if (/^(https?:\/\/|www\.|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.test(text)) {
                    return NodeFilter.FILTER_REJECT;
                }
                
                return NodeFilter.FILTER_ACCEPT;
            }
        }
    );
    
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }
    
    return textNodes;
}

// Check element visibility with caching
function isElementVisible(element) {
    // Check cache first
    if (computedStyleCache.has(element)) {
        return computedStyleCache.get(element);
    }
    
    const rect = element.getBoundingClientRect();
    // Skip zero-sized elements
    if (rect.width === 0 || rect.height === 0) {
        computedStyleCache.set(element, false);
        return false;
    }
    
    const style = window.getComputedStyle(element);
    // Skip hidden elements
    const isVisible = !(
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        style.opacity === '0' ||
        (element.offsetWidth === 0 && element.offsetHeight === 0)
    );
    
    // Cache the result
    computedStyleCache.set(element, isVisible);
    return isVisible;
}

function createBatches(nodes, batchSize) {
    const batches = [];
    for (let i = 0; i < nodes.length; i += batchSize) {
        batches.push(nodes.slice(i, i + batchSize));
    }
    return batches;
}

function createOptimizedBatches(nodes, settings) {
    const batches = [];
    const maxBatchSize = settings.translationApi === 'google' ? 30 : 50;
    const maxTextLength = 1000; // Max characters per batch
    
    // Group nodes by context for better translation coherence
    const contextGroups = groupNodesByContext(nodes);
    
    for (const group of contextGroups) {
        let currentBatch = [];
        let currentLength = 0;
        
        for (const nodeInfo of group) {
            const textLength = nodeInfo.text.length;
            
            // Start new batch if current batch is full
            if (currentBatch.length >= maxBatchSize || 
                (currentLength + textLength > maxTextLength && currentBatch.length > 0)) {
                if (currentBatch.length > 0) {
                    batches.push(currentBatch.map(info => info.node));
                }
                currentBatch = [];
                currentLength = 0;
            }
            
            currentBatch.push(nodeInfo);
            currentLength += textLength;
        }
        
        if (currentBatch.length > 0) {
            batches.push(currentBatch.map(info => info.node));
        }
    }
    
    return batches;
}

// Group nodes by their context (parent element) for better translation coherence
function groupNodesByContext(nodes) {
    const groups = new Map();
    const segmenter = createSegmenter();
    
    for (const node of nodes) {
        const parent = node.parentElement;
        const context = getContextKey(parent);
        
        if (!groups.has(context)) {
            groups.set(context, []);
        }
        
        // Segment text if it's long enough
        const text = node.nodeValue.trim();
        if (segmenter && text.length > 100) {
            const segments = segmentText(text, segmenter);
            // If text contains multiple sentences, consider splitting
            if (segments.length > 1) {
                // Store original text for later reconstruction
                originalTextMap.set(node, text);
            }
        }
        
        groups.get(context).push({
            node: node,
            text: text,
            parent: parent
        });
    }
    
    return Array.from(groups.values());
}

// Create appropriate segmenter based on source language
function createSegmenter() {
    if (!Intl.Segmenter) {
        console.warn('Intl.Segmenter not supported in this browser');
        return null;
    }
    
    try {
        // Detect page language
        const pageLang = document.documentElement.lang || 'en';
        const langCode = pageLang.split('-')[0];
        
        // Create sentence segmenter for detected language
        return new Intl.Segmenter(langCode, { granularity: 'sentence' });
    } catch (error) {
        console.warn('Failed to create segmenter:', error);
        // Fallback to English segmenter
        try {
            return new Intl.Segmenter('en', { granularity: 'sentence' });
        } catch {
            return null;
        }
    }
}

// Segment text into sentences
function segmentText(text, segmenter) {
    if (!segmenter) return [text];
    
    const segments = [];
    const iterator = segmenter.segment(text);
    
    for (const {segment} of iterator) {
        const trimmed = segment.trim();
        if (trimmed.length > 0) {
            segments.push(trimmed);
        }
    }
    
    return segments.length > 0 ? segments : [text];
}

// Get a unique key for grouping nodes by context
function getContextKey(element) {
    if (!element) return 'none';
    
    // Group by parent element and its position
    const tag = element.tagName?.toLowerCase() || 'unknown';
    const id = element.id ? `#${element.id}` : '';
    
    // Handle className safely (for SVG elements, className is an object, not a string)
    let classNameStr = '';
    if (element.className) {
        if (typeof element.className === 'string') {
            classNameStr = `.${element.className.split(' ')[0]}`;
        } else if (element.className.baseVal !== undefined) {
            // SVG element
            classNameStr = element.className.baseVal ? `.${element.className.baseVal.split(' ')[0]}` : '';
        }
    }
    
    // Include parent's parent for better context
    const parentTag = element.parentElement?.tagName?.toLowerCase() || '';
    
    return `${parentTag}>${tag}${id}${classNameStr}`;
}

async function translateBatch(nodes, settings) {
    // Stop if extension context is invalid
    if (!extensionContextValid) {
        return;
    }

    const texts = nodes.map(node => node.nodeValue.trim());

    try {
        const translations = await sendTranslationRequest(texts, settings);

        nodes.forEach((node, index) => {
            if (translations[index]) {
                applyTranslation(node, translations[index], settings.preserveOriginal);
                translatedNodes.add(node);
            }
        });
    } catch (error) {
        console.error('Translation error:', error);
    }
}

async function sendTranslationRequest(texts, settings) {
    return new Promise((resolve) => {
        // Check global flag first (fast path - avoid repeated checks)
        if (!extensionContextValid) {
            resolve(texts.map(() => ''));
            return;
        }

        // Check if extension context is still valid
        if (!chrome.runtime?.id) {
            // Only log warning once when context becomes invalid
            if (extensionContextValid) {
                extensionContextValid = false;
                console.info('🔄 Extension was reloaded. Translation stopped. Please refresh the page to continue translating.');
            }
            resolve(texts.map(() => ''));
            return;
        }

        // Set up timeout to prevent hanging promises
        const timeout = setTimeout(() => {
            if (extensionContextValid) {
                extensionContextValid = false;
                console.info('🔄 Translation request timed out. Extension may have been reloaded. Please refresh the page.');
            }
            resolve(texts.map(() => ''));
        }, 10000); // 10 second timeout

        try {
            chrome.runtime.sendMessage({
                action: 'translate',
                texts: texts,
                settings: settings
            }, (response) => {
                // Clear timeout since we got a response
                clearTimeout(timeout);

                try {
                    // Check for runtime errors
                    if (chrome.runtime.lastError) {
                        // Only log once when context becomes invalid
                        if (extensionContextValid && chrome.runtime.lastError.message?.includes('Extension context invalidated')) {
                            extensionContextValid = false;
                            console.info('🔄 Extension context invalidated. Translation stopped. Please refresh the page to continue translating.');
                        }
                        resolve(texts.map(() => ''));
                        return;
                    }

                    if (response && response.translations) {
                        resolve(response.translations);
                    } else {
                        resolve(texts.map(() => ''));
                    }
                } catch (error) {
                    if (extensionContextValid) {
                        console.warn('Error processing translation response:', error);
                    }
                    resolve(texts.map(() => ''));
                }
            });
        } catch (error) {
            clearTimeout(timeout);
            // Only log warning once when context becomes invalid
            if (extensionContextValid) {
                extensionContextValid = false;
                console.info('🔄 Extension context invalidated. Translation stopped. Please refresh the page to continue translating.');
            }
            resolve(texts.map(() => ''));
        }
    });
}

// Translate form elements (select options, buttons, labels)
async function translateFormElements(settings) {
    // Stop if extension context is invalid
    if (!extensionContextValid) {
        return;
    }

    // Translate select options
    const options = document.querySelectorAll('option');
    const optionTexts = [];
    const optionElements = [];
    
    options.forEach(option => {
        const text = option.textContent.trim();
        if (text && text.length > 1 && !translatedNodes.has(option)) {
            optionTexts.push(text);
            optionElements.push(option);
        }
    });
    
    // Translate button texts
    const buttons = document.querySelectorAll('button, input[type="button"], input[type="submit"], input[type="reset"]');
    const buttonTexts = [];
    const buttonElements = [];
    
    buttons.forEach(button => {
        const text = button.textContent?.trim() || button.value?.trim();
        if (text && text.length > 1 && !translatedNodes.has(button)) {
            buttonTexts.push(text);
            buttonElements.push(button);
        }
    });
    
    // Translate labels
    const labels = document.querySelectorAll('label');
    const labelTexts = [];
    const labelElements = [];
    
    labels.forEach(label => {
        const text = label.textContent.trim();
        if (text && text.length > 1 && !translatedNodes.has(label) && !label.querySelector('input, select, textarea')) {
            labelTexts.push(text);
            labelElements.push(label);
        }
    });
    
    // Combine all texts for batch translation
    const allTexts = [...optionTexts, ...buttonTexts, ...labelTexts];
    const allElements = [...optionElements, ...buttonElements, ...labelElements];
    
    if (allTexts.length > 0) {
        const translations = await sendTranslationRequest(allTexts, settings);
        
        // Apply translations
        allElements.forEach((element, index) => {
            if (translations[index]) {
                if (element.tagName === 'OPTION') {
                    element.textContent = translations[index];
                    translatedNodes.add(element);
                } else if (element.tagName === 'INPUT') {
                    element.value = translations[index];
                    translatedNodes.add(element);
                } else if (element.tagName === 'BUTTON' || element.tagName === 'LABEL') {
                    // For buttons and labels, preserve child elements
                    const children = Array.from(element.childNodes);
                    const textNode = children.find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.textContent = translations[index];
                    } else {
                        element.textContent = translations[index];
                    }
                    translatedNodes.add(element);
                }
            }
        });
    }
}

// Translate dynamic dropdown and navigation elements with improved detection
async function translateDynamicElements(settings) {
    // Stop if extension context is invalid
    if (!extensionContextValid) {
        return;
    }

    // Use attribute-based detection for more flexibility
    const dynamicElements = findDynamicElements();

    for (const element of dynamicElements) {
        // Skip if already processed
        if (element.classList.contains('ultra-translate-processed')) {
            continue;
        }
        
        // Mark as processed to avoid re-translation
        element.classList.add('ultra-translate-processed');
        
        // Get text nodes within this dynamic element
        const textNodes = getTextNodes(element);
        if (textNodes.length > 0) {
            const batches = createOptimizedBatches(textNodes, settings);
            for (const batch of batches) {
                await translateBatch(batch, settings);
            }
        }
        
        // Also translate form elements within dynamic content
        await translateFormElementsInContainer(element, settings);
    }
}

// Find dynamic elements using multiple detection strategies
function findDynamicElements() {
    const elements = new Set();
    
    // Strategy 1: Role-based detection
    const roleElements = document.querySelectorAll([
        '[role="menu"]',
        '[role="listbox"]',
        '[role="dialog"]',
        '[role="tooltip"]',
        '[role="alert"]',
        '[role="navigation"]'
    ].join(','));
    roleElements.forEach(el => elements.add(el));
    
    // Strategy 2: Aria attributes
    const ariaElements = document.querySelectorAll([
        '[aria-expanded="true"]',
        '[aria-hidden="false"]',
        '[aria-live]',
        '[aria-haspopup]'
    ].join(','));
    ariaElements.forEach(el => elements.add(el));
    
    // Strategy 3: Data attributes commonly used for dynamic content
    const dataElements = document.querySelectorAll([
        '[data-toggle]',
        '[data-dropdown]',
        '[data-menu]',
        '[data-tooltip]',
        '[data-popover]'
    ].join(','));
    dataElements.forEach(el => elements.add(el));
    
    // Strategy 4: Visibility-based detection
    const visibilitySelectors = [];
    
    // Check computed styles for recently shown elements
    document.querySelectorAll('*').forEach(el => {
        // Skip if too many child elements (performance)
        if (el.children.length > 100) return;
        
        const style = window.getComputedStyle(el);
        
        // Check if element is visible and positioned
        if (style.display !== 'none' && 
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            (style.position === 'absolute' || style.position === 'fixed')) {
            
            // Check if it looks like a dropdown/tooltip/modal
            const rect = el.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                // Check for dropdown-like characteristics
                const hasDropdownClass = el.className && typeof el.className === 'string' && 
                    /dropdown|menu|popup|popover|tooltip|modal|dialog|overlay/i.test(el.className);
                
                const hasDropdownId = el.id && 
                    /dropdown|menu|popup|popover|tooltip|modal|dialog|overlay/i.test(el.id);
                
                if (hasDropdownClass || hasDropdownId) {
                    elements.add(el);
                }
            }
        }
    });
    
    // Strategy 5: Framework-specific detection (non-hardcoded)
    // Look for elements with framework-specific patterns
    const frameworkPatterns = [
        // React/Vue/Angular patterns
        el => el.hasAttribute('v-show') || el.hasAttribute('v-if'),
        el => el.hasAttribute('ng-show') || el.hasAttribute('ng-if'),
        el => el.hasAttribute('x-show') || el.hasAttribute('x-if'),
        // Check for state classes
        el => {
            const className = el.className;
            if (typeof className === 'string') {
                return /\b(is-open|is-active|is-visible|is-expanded|is-shown|--open|--active|--visible)\b/.test(className);
            }
            return false;
        }
    ];
    
    document.querySelectorAll('*').forEach(el => {
        if (el.children.length > 100) return; // Performance guard
        
        for (const pattern of frameworkPatterns) {
            if (pattern(el)) {
                elements.add(el);
                break;
            }
        }
    });
    
    return Array.from(elements);
}

// Helper function to translate form elements within a specific container
async function translateFormElementsInContainer(container, settings) {
    // Stop if extension context is invalid
    if (!extensionContextValid) {
        return;
    }

    const options = container.querySelectorAll('option');
    const buttons = container.querySelectorAll('button, input[type="button"], input[type="submit"]');
    const labels = container.querySelectorAll('label');
    const ariaLabels = container.querySelectorAll('[aria-label]');

    const texts = [];
    const elements = [];
    
    // Collect texts from all elements
    options.forEach(opt => {
        if (!translatedNodes.has(opt) && opt.textContent?.trim()) {
            texts.push(opt.textContent.trim());
            elements.push({ elem: opt, type: 'option' });
        }
    });
    
    buttons.forEach(btn => {
        const text = btn.textContent?.trim() || btn.value?.trim();
        if (!translatedNodes.has(btn) && text) {
            texts.push(text);
            elements.push({ elem: btn, type: 'button' });
        }
    });
    
    labels.forEach(lbl => {
        if (!translatedNodes.has(lbl) && lbl.textContent?.trim()) {
            texts.push(lbl.textContent.trim());
            elements.push({ elem: lbl, type: 'label' });
        }
    });
    
    ariaLabels.forEach(elem => {
        const ariaLabel = elem.getAttribute('aria-label');
        if (ariaLabel && !elem.dataset.originalAriaLabel) {
            texts.push(ariaLabel);
            elements.push({ elem: elem, type: 'aria-label', originalValue: ariaLabel });
        }
    });
    
    if (texts.length > 0) {
        const translations = await sendTranslationRequest(texts, settings);
        
        elements.forEach((item, index) => {
            if (translations[index]) {
                if (item.type === 'option' || item.type === 'button' || item.type === 'label') {
                    item.elem.textContent = translations[index];
                    translatedNodes.add(item.elem);
                } else if (item.type === 'aria-label') {
                    item.elem.dataset.originalAriaLabel = item.originalValue;
                    item.elem.setAttribute('aria-label', translations[index]);
                }
            }
        });
    }
}

// Translate attributes (title, placeholder, alt)
async function translateAttributes(settings) {
    // Stop if extension context is invalid
    if (!extensionContextValid) {
        return;
    }

    const elementsWithTitle = document.querySelectorAll('[title]');
    const elementsWithPlaceholder = document.querySelectorAll('[placeholder]');
    const elementsWithAlt = document.querySelectorAll('[alt]');

    const attributeTexts = [];
    const attributeInfo = [];
    
    // Collect title attributes
    elementsWithTitle.forEach(elem => {
        const title = elem.getAttribute('title')?.trim();
        if (title && title.length > 1) {
            attributeTexts.push(title);
            attributeInfo.push({ element: elem, attribute: 'title', originalValue: title });
        }
    });
    
    // Collect placeholder attributes
    elementsWithPlaceholder.forEach(elem => {
        const placeholder = elem.getAttribute('placeholder')?.trim();
        if (placeholder && placeholder.length > 1) {
            attributeTexts.push(placeholder);
            attributeInfo.push({ element: elem, attribute: 'placeholder', originalValue: placeholder });
        }
    });
    
    // Collect alt attributes
    elementsWithAlt.forEach(elem => {
        const alt = elem.getAttribute('alt')?.trim();
        if (alt && alt.length > 1) {
            attributeTexts.push(alt);
            attributeInfo.push({ element: elem, attribute: 'alt', originalValue: alt });
        }
    });
    
    if (attributeTexts.length > 0) {
        const translations = await sendTranslationRequest(attributeTexts, settings);
        
        // Apply translated attributes
        attributeInfo.forEach((info, index) => {
            if (translations[index]) {
                info.element.setAttribute(info.attribute, translations[index]);
                // Store original value for restoration
                if (!info.element.dataset.originalAttributes) {
                    info.element.dataset.originalAttributes = JSON.stringify({});
                }
                const originalAttrs = JSON.parse(info.element.dataset.originalAttributes);
                originalAttrs[info.attribute] = info.originalValue;
                info.element.dataset.originalAttributes = JSON.stringify(originalAttrs);
            }
        });
    }
}

function applyTranslation(textNode, translation, preserveOriginal) {
    if (!translation || translation === textNode.nodeValue.trim()) return;
    
    const parent = textNode.parentElement;
    if (!parent) return;
    
    // Store original text in WeakMap
    const originalText = textNode.nodeValue;
    originalTextMap.set(textNode, originalText);
    
    // Detect source and target languages
    const sourceLang = detectLanguage(originalText);
    const targetLang = currentSettings.targetLanguage || 'en';
    const isRTL = RTL_LANGUAGES.includes(targetLang.split('-')[0]);
    
    // Check parent element type for better layout handling
    const parentTag = parent.tagName?.toLowerCase();
    const isInlineContext = ['span', 'a', 'strong', 'em', 'b', 'i', 'u', 'mark', 'abbr', 'cite', 'q'].includes(parentTag);
    const isBlockContext = ['p', 'div', 'li', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(parentTag);
    
    if (preserveOriginal) {
        const wrapper = document.createElement(isInlineContext ? 'span' : 'div');
        wrapper.className = 'ultra-translate-wrapper';
        
        // Add accessibility attributes to wrapper
        wrapper.setAttribute('role', 'group');
        wrapper.setAttribute('aria-label', 'Translation');
        
        // Original text span with accessibility attributes
        const originalSpan = document.createElement('span');
        originalSpan.className = 'ultra-translate-original';
        originalSpan.textContent = originalText;
        originalSpan.title = 'Original text';
        originalSpan.setAttribute('lang', sourceLang);
        originalSpan.setAttribute('aria-hidden', 'true'); // Prevent screen readers from reading twice
        originalSpan.setAttribute('translate', 'no');
        
        // Translated text span with proper language attributes
        const translatedSpan = document.createElement('span');
        translatedSpan.className = 'ultra-translate-translated';
        translatedSpan.textContent = translation;
        translatedSpan.title = 'Translated text';
        translatedSpan.setAttribute('lang', targetLang);
        translatedSpan.setAttribute('aria-live', 'polite');
        
        // Add RTL support if needed
        if (isRTL) {
            translatedSpan.setAttribute('dir', 'rtl');
        }
        
        // Structure based on context
        if (isInlineContext) {
            // For inline elements, use separator
            const separator = document.createElement('span');
            separator.className = 'ultra-translate-separator';
            separator.setAttribute('aria-hidden', 'true');
            separator.textContent = ' | ';
            
            wrapper.appendChild(originalSpan);
            wrapper.appendChild(separator);
            wrapper.appendChild(translatedSpan);
        } else {
            // For block elements, stack vertically
            wrapper.appendChild(originalSpan);
            wrapper.appendChild(translatedSpan);
        }
        
        // Store original text mapping to wrapper for restoration
        originalTextMap.set(wrapper, originalText);
        parent.replaceChild(wrapper, textNode);
    } else {
        // Replacement mode - store original in WeakMap
        const translatedSpan = document.createElement('span');
        translatedSpan.className = 'ultra-translate-translated';
        translatedSpan.textContent = translation;
        translatedSpan.title = originalText; // Tooltip shows original
        translatedSpan.setAttribute('lang', targetLang);
        translatedSpan.setAttribute('data-original-lang', sourceLang);
        
        // Add RTL support if needed
        if (isRTL) {
            translatedSpan.setAttribute('dir', 'rtl');
        }
        
        // Store reference to original text
        originalTextMap.set(translatedSpan, originalText);
        
        parent.replaceChild(translatedSpan, textNode);
    }
    
    // Mark as translated
    translatedNodes.add(textNode);
}

// Simple language detection based on Unicode ranges
function detectLanguage(text) {
    if (!text) return 'en';
    
    // Check for common scripts
    const hasHan = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(text); // Chinese
    const hasHiragana = /[\u3040-\u309f]/.test(text); // Japanese
    const hasKatakana = /[\u30a0-\u30ff]/.test(text); // Japanese
    const hasHangul = /[\uac00-\ud7af\u1100-\u11ff]/.test(text); // Korean
    const hasArabic = /[\u0600-\u06ff\u0750-\u077f]/.test(text); // Arabic
    const hasCyrillic = /[\u0400-\u04ff]/.test(text); // Russian, etc.
    const hasHebrew = /[\u0590-\u05ff]/.test(text); // Hebrew
    
    // Return detected language code
    if (hasHan) return 'zh';
    if (hasHiragana || hasKatakana) return 'ja';
    if (hasHangul) return 'ko';
    if (hasArabic) return 'ar';
    if (hasCyrillic) return 'ru';
    if (hasHebrew) return 'he';
    
    // Try to use page language or default to English
    return document.documentElement.lang?.split('-')[0] || 'en';
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Debounce function for better performance
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

// Throttled translation for mutation observer
const throttledTranslate = debounce(async () => {
    if (!(currentSettings.autoTranslate || manualRealtimeEnabled) || isTranslating) return;
    
    const newTextNodes = getTextNodes(document.body);
    if (newTextNodes.length > 0) {
        const optimizedBatches = createOptimizedBatches(newTextNodes, currentSettings);
        for (const batch of optimizedBatches) {
            await translateBatch(batch, currentSettings);
        }
    }
    
    // Also translate any new form elements and attributes
    await translateFormElements(currentSettings);
    await translateAttributes(currentSettings);
    
    // Translate dynamic dropdown and navigation elements
    await translateDynamicElements(currentSettings);
}, 500); // Reduced debounce time for faster response

// Function to restore original text
function restoreOriginalText(element) {
    const translatedElements = element.querySelectorAll('.ultra-translate-wrapper, .ultra-translate-translated');
    
    translatedElements.forEach(elem => {
        const originalText = originalTextMap.get(elem);
        if (originalText) {
            const textNode = document.createTextNode(originalText);
            elem.parentNode?.replaceChild(textNode, elem);
            originalTextMap.delete(elem);
        }
    });
    
    // Restore original attributes
    const elementsWithOriginalAttributes = element.querySelectorAll('[data-original-attributes]');
    elementsWithOriginalAttributes.forEach(elem => {
        try {
            const originalAttrs = JSON.parse(elem.dataset.originalAttributes);
            Object.entries(originalAttrs).forEach(([attr, value]) => {
                elem.setAttribute(attr, value);
            });
            delete elem.dataset.originalAttributes;
        } catch (e) {
            console.error('Error restoring attributes:', e);
        }
    });
    
    // WeakSet automatically garbage collects when nodes are removed
    // translatedNodes.clear(); // WeakSet doesn't have clear method
}

// Toggle translation on/off
function toggleTranslation() {
    // Check if page is already translated
    if (document.querySelector('.ultra-translate-wrapper, .ultra-translate-translated')) {
        // Use CSS-based toggle for instant switching
        toggleViewMode();
    } else {
        // Start new translation
        translatePage(currentSettings);
    }
}

const observer = new MutationObserver((mutations) => {
    if (!(currentSettings.autoTranslate || manualRealtimeEnabled)) return;
    
    let hasNewContent = false;
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent?.trim();
                    if (text && text.length > 1) {
                        hasNewContent = true;
                    }
                } else if (node.nodeType === Node.ELEMENT_NODE) {
                    // Skip if already translated
                    if (node.classList && 
                        (node.classList.contains('ultra-translate-wrapper') || 
                         node.classList.contains('ultra-translate-translated'))) {
                        return;
                    }
                    
                    // Check for text content or form elements
                    if (node.textContent?.trim() || 
                        node.tagName === 'SELECT' || 
                        node.tagName === 'OPTION' ||
                        node.tagName === 'BUTTON' ||
                        node.tagName === 'LABEL' ||
                        node.querySelector && node.querySelector('select, option, button, label, [title], [placeholder], [alt]')) {
                        hasNewContent = true;
                    }
                }
            });
        } else if (mutation.type === 'attributes') {
            // Check for dynamically added attributes or visibility changes
            if (mutation.attributeName === 'title' || 
                mutation.attributeName === 'placeholder' || 
                mutation.attributeName === 'alt' ||
                mutation.attributeName === 'value' ||
                mutation.attributeName === 'aria-label' ||
                mutation.attributeName === 'aria-expanded' ||
                mutation.attributeName === 'style' ||
                mutation.attributeName === 'class') {
                // Check if element became visible
                const target = mutation.target;
                if (target.nodeType === Node.ELEMENT_NODE) {
                    const style = window.getComputedStyle(target);
                    if (style.display !== 'none' && style.visibility !== 'hidden') {
                        hasNewContent = true;
                    }
                }
            }
        }
    });
    
    if (hasNewContent) {
        throttledTranslate();
    }
});

// Video subtitle translation functionality
let videoSubtitleSettings = {
    enabled: false,
    mode: 'translate', // 'off' | 'translate' | 'asr'
    bilingualMode: 'overlay', // 'track' | 'overlay'
    asrProvider: 'whisper', // 'whisper' | 'google-stt' | 'deepgram'
    latencyMode: 'balanced' // 'low' | 'balanced' | 'high'
};

const translatedTracks = new WeakMap();
const videoObservers = new WeakMap();

// VTT/SRT parsing utilities with improved robustness
function parseVTT(content) {
    const cues = [];
    const lines = content.split(/\r?\n/);
    let i = 0;
    
    // Skip WEBVTT header and any metadata
    while (i < lines.length && !lines[i].includes('-->')) {
        // Skip NOTE blocks and other metadata
        if (lines[i].startsWith('NOTE') || lines[i].startsWith('STYLE')) {
            // Skip until empty line
            while (i < lines.length && lines[i].trim()) {
                i++;
            }
        }
        i++;
    }
    
    while (i < lines.length) {
        // Skip empty lines and cue identifiers
        while (i < lines.length && (!lines[i].trim() || /^\d+$/.test(lines[i].trim()))) {
            i++;
        }
        
        if (i >= lines.length) break;
        
        // Check for timestamp line with more flexible pattern
        const timestampLine = lines[i];
        const timestampMatch = timestampLine.match(/([\d:.]+)\s*-->\s*([\d:.]+)/);
        
        if (timestampMatch) {
            const [, start, end] = timestampMatch;
            const startTime = parseVTTTime(start);
            const endTime = parseVTTTime(end);
            
            // Skip invalid timestamps
            if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
                i++;
                continue;
            }
            
            i++;
            const textLines = [];
            
            // Collect text lines until timestamp or significant gap
            while (i < lines.length) {
                const line = lines[i];
                
                // Stop if we hit another timestamp
                if (line.includes('-->')) break;
                
                // Stop if we hit a cue number followed by timestamp
                if (/^\d+$/.test(line.trim()) && 
                    i + 1 < lines.length && 
                    lines[i + 1].includes('-->')) {
                    break;
                }
                
                // Add non-empty lines
                if (line.trim()) {
                    // Strip VTT tags like <v>, <c>, etc.
                    const cleanLine = line.replace(/<[^>]+>/g, '').trim();
                    if (cleanLine) {
                        textLines.push(cleanLine);
                    }
                }
                
                i++;
                
                // Break on double empty lines
                if (i < lines.length - 1 && 
                    !lines[i - 1].trim() && 
                    !lines[i].trim()) {
                    break;
                }
            }
            
            if (textLines.length > 0) {
                cues.push({
                    startTime,
                    endTime,
                    text: textLines.join('\n')
                });
            }
        } else {
            i++;
        }
    }
    
    return cues;
}

function parseSRT(content) {
    const cues = [];
    
    // More robust SRT parsing that handles missing empty lines
    const lines = content.split(/\r?\n/);
    let i = 0;
    
    while (i < lines.length) {
        // Skip empty lines and BOM
        while (i < lines.length && (!lines[i].trim() || lines[i].charCodeAt(0) === 0xFEFF)) {
            i++;
        }
        
        if (i >= lines.length) break;
        
        // Skip cue number if present
        if (/^\d+$/.test(lines[i].trim())) {
            i++;
        }
        
        // Look for timestamp line
        if (i < lines.length) {
            const timestampMatch = lines[i].match(/([\d:,]+)\s*-->\s*([\d:,]+)/);
            
            if (timestampMatch) {
                const [, start, end] = timestampMatch;
                const startTime = parseSRTTime(start);
                const endTime = parseSRTTime(end);
                
                // Skip invalid timestamps
                if (isNaN(startTime) || isNaN(endTime) || startTime >= endTime) {
                    i++;
                    continue;
                }
                
                i++;
                const textLines = [];
                
                // Collect subtitle text
                while (i < lines.length) {
                    const line = lines[i].trim();
                    
                    // Stop at next cue number or timestamp
                    if (/^\d+$/.test(line) && 
                        i + 1 < lines.length && 
                        lines[i + 1].includes('-->')) {
                        break;
                    }
                    
                    // Stop at next timestamp
                    if (line.includes('-->')) {
                        break;
                    }
                    
                    // Add non-empty lines
                    if (line) {
                        // Remove formatting tags
                        const cleanLine = line
                            .replace(/<[^>]+>/g, '')
                            .replace(/\{[^}]+\}/g, '')
                            .trim();
                        if (cleanLine) {
                            textLines.push(cleanLine);
                        }
                    } else if (textLines.length > 0) {
                        // Empty line after text might indicate end of cue
                        i++;
                        break;
                    }
                    
                    i++;
                }
                
                if (textLines.length > 0) {
                    cues.push({
                        startTime,
                        endTime,
                        text: textLines.join('\n')
                    });
                }
            } else {
                i++;
            }
        }
    }
    
    return cues;
}

function parseVTTTime(timeStr) {
    // Handle various time formats more robustly
    timeStr = timeStr.trim();
    
    // Handle milliseconds with both . and ,
    timeStr = timeStr.replace(',', '.');
    
    const parts = timeStr.split(':');
    
    try {
        if (parts.length === 3) {
            const [h, m, s] = parts;
            return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseFloat(s);
        } else if (parts.length === 2) {
            const [m, s] = parts;
            return parseInt(m, 10) * 60 + parseFloat(s);
        } else if (parts.length === 1) {
            // Just seconds
            return parseFloat(parts[0]);
        }
    } catch (e) {
        console.warn('Failed to parse time:', timeStr, e);
    }
    
    return 0;
}

function parseSRTTime(timeStr) {
    // Handle SRT format: HH:MM:SS,mmm or HH:MM:SS.mmm
    timeStr = timeStr.trim();
    
    // Replace comma with dot for milliseconds
    timeStr = timeStr.replace(',', '.');
    
    // Some SRT files use different separators
    timeStr = timeStr.replace(/[;]/g, ':');
    
    return parseVTTTime(timeStr);
}

function formatVTTTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = (seconds % 60).toFixed(3);
    
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.padStart(6, '0')}`;
    } else {
        return `${m.toString().padStart(2, '0')}:${s.padStart(6, '0')}`;
    }
}

// Subtitle detection and extraction
async function detectVideoSubtitles(video) {
    const subtitleInfo = {
        hasSubtitles: false,
        tracks: [],
        targetLanguageAvailable: false
    };
    
    // Check for HTML5 video tracks
    if (video.textTracks && video.textTracks.length > 0) {
        for (let i = 0; i < video.textTracks.length; i++) {
            const track = video.textTracks[i];
            if (track.kind === 'subtitles' || track.kind === 'captions') {
                subtitleInfo.hasSubtitles = true;
                subtitleInfo.tracks.push({
                    language: track.language,
                    label: track.label,
                    mode: track.mode,
                    track: track,
                    index: i
                });
                
                if (track.language === currentSettings.targetLanguage) {
                    subtitleInfo.targetLanguageAvailable = true;
                }
            }
        }
    }
    
    // Check for track elements
    const trackElements = video.querySelectorAll('track');
    trackElements.forEach(trackEl => {
        const kind = trackEl.kind || 'subtitles';
        if (kind === 'subtitles' || kind === 'captions') {
            subtitleInfo.hasSubtitles = true;
        }
    });
    
    return subtitleInfo;
}

// Extract subtitle cues from track with improved fallbacks
async function extractSubtitleCues(track, video) {
    const cues = [];
    
    // First try to get cues directly
    if (track.cues && track.cues.length > 0) {
        for (let i = 0; i < track.cues.length; i++) {
            const cue = track.cues[i];
            cues.push({
                startTime: cue.startTime,
                endTime: cue.endTime,
                text: cue.text || cue.getCueAsHTML?.()?.textContent || ''
            });
        }
        return cues;
    }
    
    // Try multiple methods to find track element
    let trackElement = document.querySelector(`track[srclang="${track.language}"]`);
    
    if (!trackElement && track.id) {
        trackElement = document.querySelector(`track#${track.id}`);
    }
    
    if (!trackElement && track.label) {
        trackElement = document.querySelector(`track[label="${track.label}"]`);
    }
    
    if (!trackElement && video) {
        // Find track element within video element
        trackElement = video.querySelector('track');
    }
    
    if (trackElement && trackElement.src) {
        try {
            // Handle relative URLs
            const url = new URL(trackElement.src, window.location.href);
            
            const response = await fetch(url.toString(), {
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'text/vtt, text/plain, application/x-subrip'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            
            // Try to detect format
            if (!content || content.trim().length === 0) {
                console.warn('Empty subtitle file');
                return cues;
            }
            
            // Try multiple parsers with fallback
            try {
                if (content.includes('WEBVTT') || content.includes('webvtt')) {
                    return parseVTT(content);
                } else if (content.includes('-->')) {
                    // Could be SRT or VTT without header
                    const vttCues = parseVTT('WEBVTT\n\n' + content);
                    if (vttCues.length > 0) return vttCues;
                    
                    return parseSRT(content);
                } else {
                    // Try SRT first, then VTT
                    const srtCues = parseSRT(content);
                    if (srtCues.length > 0) return srtCues;
                    
                    return parseVTT(content);
                }
            } catch (parseError) {
                console.warn('Failed to parse subtitle content:', parseError);
                // Try generic line-by-line parsing as last resort
                return parseGenericSubtitles(content);
            }
        } catch (error) {
            console.warn('Failed to fetch subtitle track:', error);
            
            // Try alternative fetch through background script
            try {
                const result = await chrome.runtime.sendMessage({
                    action: 'fetchSubtitles',
                    url: trackElement.src
                });
                
                if (result && result.content) {
                    return parseVTT(result.content) || parseSRT(result.content) || [];
                }
            } catch (bgError) {
                console.warn('Background fetch also failed:', bgError);
            }
        }
    }
    
    return cues;
}

// Generic subtitle parser for non-standard formats
function parseGenericSubtitles(content) {
    const cues = [];
    const lines = content.split(/\r?\n/);
    
    let currentTime = 0;
    const defaultDuration = 3; // Default 3 seconds per line
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip empty lines and metadata
        if (!trimmed || /^(WEBVTT|NOTE|STYLE|REGION)/i.test(trimmed)) {
            continue;
        }
        
        // Check if it's a timestamp line
        if (trimmed.includes('-->')) {
            const timestampMatch = trimmed.match(/([\d:.]+)\s*-->\s*([\d:.]+)/);
            if (timestampMatch) {
                currentTime = parseVTTTime(timestampMatch[2]);
            }
            continue;
        }
        
        // Skip cue numbers
        if (/^\d+$/.test(trimmed)) {
            continue;
        }
        
        // Treat as subtitle text
        const cleanText = trimmed
            .replace(/<[^>]+>/g, '') // Remove tags
            .replace(/\{[^}]+\}/g, '') // Remove style tags
            .trim();
        
        if (cleanText) {
            cues.push({
                startTime: currentTime,
                endTime: currentTime + defaultDuration,
                text: cleanText
            });
            currentTime += defaultDuration;
        }
    }
    
    return cues;
}

// Batch translate subtitle cues
async function translateSubtitleCues(cues, settings) {
    const batchSize = 50;
    const maxCharsPerBatch = 5000;
    const translatedCues = [];
    
    for (let i = 0; i < cues.length; i += batchSize) {
        const batch = [];
        let currentChars = 0;
        
        for (let j = i; j < Math.min(i + batchSize, cues.length); j++) {
            const cue = cues[j];
            if (currentChars + cue.text.length > maxCharsPerBatch && batch.length > 0) {
                break;
            }
            batch.push(cue);
            currentChars += cue.text.length;
        }
        
        if (batch.length === 0) continue;
        
        // Extract texts for translation
        const texts = batch.map(cue => cue.text);
        
        try {
            // Send translation request
            const translations = await sendTranslationRequest(texts, settings);
            
            // Map translations back to cues
            batch.forEach((cue, index) => {
                translatedCues.push({
                    startTime: cue.startTime,
                    endTime: cue.endTime,
                    originalText: cue.text,
                    text: translations[index] || cue.text
                });
            });
        } catch (error) {
            console.error('Subtitle translation error:', error);
            // Fallback to original text
            batch.forEach(cue => {
                translatedCues.push({
                    startTime: cue.startTime,
                    endTime: cue.endTime,
                    originalText: cue.text,
                    text: cue.text
                });
            });
        }
        
        // Small delay between batches
        await delay(100);
    }
    
    return translatedCues;
}

// Generate VTT content from cues
function generateVTT(cues, language) {
    let vtt = 'WEBVTT\n\n';
    
    cues.forEach((cue, index) => {
        vtt += `${index + 1}\n`;
        vtt += `${formatVTTTime(cue.startTime)} --> ${formatVTTTime(cue.endTime)}\n`;
        vtt += `${cue.text}\n\n`;
    });
    
    return vtt;
}

// Create and inject translated subtitle track
function injectTranslatedTrack(video, translatedCues, targetLanguage) {
    // Remove existing translated track if any
    const existingTrack = video.querySelector('track.ultra-translate-track');
    if (existingTrack) {
        existingTrack.remove();
    }
    
    // Generate VTT content
    const vttContent = generateVTT(translatedCues, targetLanguage);
    
    // Create blob URL
    const blob = new Blob([vttContent], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    
    // Create track element
    const trackElement = document.createElement('track');
    trackElement.className = 'ultra-translate-track';
    trackElement.kind = 'subtitles';
    trackElement.srclang = targetLanguage;
    trackElement.label = `UltraTranslate (${targetLanguage})`;
    trackElement.src = url;
    trackElement.default = true;
    
    // Add track to video
    video.appendChild(trackElement);
    
    // Set track mode to showing
    setTimeout(() => {
        const addedTrack = Array.from(video.textTracks).find(
            t => t.label === `UltraTranslate (${targetLanguage})`
        );
        if (addedTrack) {
            addedTrack.mode = 'showing';
            
            // Hide other tracks
            for (let i = 0; i < video.textTracks.length; i++) {
                const track = video.textTracks[i];
                if (track !== addedTrack && (track.kind === 'subtitles' || track.kind === 'captions')) {
                    track.mode = 'hidden';
                }
            }
        }
    }, 100);
    
    // Store reference for cleanup
    translatedTracks.set(video, { url, trackElement });
}

// Create bilingual subtitle overlay with improved positioning
function createBilingualOverlay(video, translatedCues) {
    // Remove existing overlay if any
    const existingOverlay = document.querySelector('.ultra-translate-subtitle-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Find the best container for the overlay
    const videoContainer = findBestVideoContainer(video);
    
    // Create overlay container
    const overlay = document.createElement('div');
    overlay.className = 'ultra-translate-subtitle-overlay';
    overlay.dataset.videoId = video.id || 'video-' + Date.now();
    
    // Create original text element
    const originalText = document.createElement('div');
    originalText.className = 'ultra-translate-subtitle-original';
    
    // Create translated text element
    const translatedText = document.createElement('div');
    translatedText.className = 'ultra-translate-subtitle-translated';
    
    overlay.appendChild(originalText);
    overlay.appendChild(translatedText);
    
    // Apply styles based on container type and video player detection
    applyOverlayStyles(overlay, originalText, translatedText, video, videoContainer);
    
    // Append overlay to the container
    if (videoContainer === document.body) {
        // If we're appending to body, position fixed relative to video
        positionOverlayFixed(overlay, video);
        document.body.appendChild(overlay);
    } else {
        // Ensure container has position relative/absolute
        const containerPosition = window.getComputedStyle(videoContainer).position;
        if (containerPosition === 'static') {
            videoContainer.style.position = 'relative';
        }
        videoContainer.appendChild(overlay);
    }
    
    // Update overlay based on video time
    let currentCue = null;
    
    const updateOverlay = () => {
        const currentTime = video.currentTime;
        const activeCue = translatedCues.find(
            cue => currentTime >= cue.startTime && currentTime <= cue.endTime
        );
        
        if (activeCue !== currentCue) {
            currentCue = activeCue;
            if (activeCue) {
                originalText.textContent = activeCue.originalText || '';
                translatedText.textContent = activeCue.text;
                overlay.style.display = 'block';
                
                // Update position if using fixed positioning
                if (overlay.style.position === 'fixed') {
                    positionOverlayFixed(overlay, video);
                }
            } else {
                overlay.style.display = 'none';
            }
        }
    };
    
    // Listen to video time updates
    video.addEventListener('timeupdate', updateOverlay);
    
    // Handle video resize/fullscreen
    const resizeHandler = () => {
        if (overlay.style.position === 'fixed') {
            positionOverlayFixed(overlay, video);
        }
        // Adjust font size based on video size
        adjustOverlayFontSize(overlay, video);
    };
    
    video.addEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);
    document.addEventListener('fullscreenchange', resizeHandler);
    
    // Store reference for cleanup
    const overlayData = translatedTracks.get(video) || {};
    overlayData.overlay = overlay;
    overlayData.updateHandler = updateOverlay;
    overlayData.resizeHandler = resizeHandler;
    translatedTracks.set(video, overlayData);
}

// Find the best container for video overlay
function findBestVideoContainer(video) {
    // Check for common video player containers
    const playerSelectors = [
        '.video-player', '.player', '.video-container', '.video-wrapper',
        '.html5-video-container', '.jw-wrapper', '.vjs-tech', '.plyr',
        '.mejs-container', '.video-js', '.flowplayer', '.fp-player',
        '[class*="player"]', '[class*="video"]', '[id*="player"]'
    ];
    
    // Try to find a player container
    for (const selector of playerSelectors) {
        const container = video.closest(selector);
        if (container) {
            return container;
        }
    }
    
    // Check parent elements for suitable container
    let parent = video.parentElement;
    let depth = 0;
    const maxDepth = 5;
    
    while (parent && depth < maxDepth) {
        const position = window.getComputedStyle(parent).position;
        const overflow = window.getComputedStyle(parent).overflow;
        
        // Good container characteristics
        if ((position === 'relative' || position === 'absolute') &&
            overflow !== 'hidden' &&
            parent.offsetWidth >= video.offsetWidth * 0.9) {
            return parent;
        }
        
        // Check if this is a fullscreen element
        if (parent.classList.contains('fullscreen') || 
            parent.webkitDisplayingFullscreen ||
            parent.matches(':fullscreen')) {
            return parent;
        }
        
        parent = parent.parentElement;
        depth++;
    }
    
    // Fallback to immediate parent or body
    return video.parentElement || document.body;
}

// Apply overlay styles based on context
function applyOverlayStyles(overlay, originalText, translatedText, video, container) {
    const isFullscreen = document.fullscreenElement || 
                         document.webkitFullscreenElement ||
                         document.mozFullScreenElement;
    
    // Detect video player type for specific adjustments
    const isYouTube = window.location.hostname.includes('youtube.com');
    const isVimeo = window.location.hostname.includes('vimeo.com');
    const isNetflix = window.location.hostname.includes('netflix.com');
    
    // Base styles
    let overlayStyles = `
        text-align: center;
        pointer-events: none;
        z-index: 2147483647;
        max-width: 80%;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.4;
    `;
    
    // Position based on container
    if (container === document.body) {
        overlayStyles += `
            position: fixed;
        `;
    } else {
        overlayStyles += `
            position: absolute;
            bottom: ${isYouTube ? '15%' : '10%'};
            left: 50%;
            transform: translateX(-50%);
        `;
    }
    
    // Adjust for specific platforms
    if (isNetflix) {
        overlayStyles += `
            bottom: 20%;
        `;
    }
    
    // Font size based on video size
    const videoHeight = video.offsetHeight;
    let fontSize = Math.max(14, Math.min(32, videoHeight / 25));
    
    if (isFullscreen) {
        fontSize = Math.max(20, Math.min(48, window.innerHeight / 30));
    }
    
    overlayStyles += `
        font-size: ${fontSize}px;
        text-shadow: 
            2px 2px 4px rgba(0, 0, 0, 0.9),
            -1px -1px 2px rgba(0, 0, 0, 0.9),
            1px -1px 2px rgba(0, 0, 0, 0.9),
            -1px 1px 2px rgba(0, 0, 0, 0.9);
    `;
    
    overlay.style.cssText = overlayStyles;
    
    // Original text styles
    originalText.style.cssText = `
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: ${fontSize / 4}px;
        font-size: ${fontSize * 0.9}px;
        font-weight: 400;
    `;
    
    // Translated text styles
    translatedText.style.cssText = `
        color: #10a37f;
        font-weight: 600;
        font-size: ${fontSize}px;
        text-shadow: 
            2px 2px 6px rgba(0, 0, 0, 1),
            -1px -1px 3px rgba(0, 0, 0, 1),
            1px -1px 3px rgba(0, 0, 0, 1),
            -1px 1px 3px rgba(0, 0, 0, 1);
    `;
}

// Position overlay when using fixed positioning
function positionOverlayFixed(overlay, video) {
    const rect = video.getBoundingClientRect();
    const bottomOffset = rect.height * 0.1;
    
    overlay.style.position = 'fixed';
    overlay.style.left = rect.left + 'px';
    overlay.style.width = rect.width + 'px';
    overlay.style.bottom = (window.innerHeight - rect.bottom + bottomOffset) + 'px';
    overlay.style.transform = 'none';
    overlay.style.textAlign = 'center';
}

// Adjust font size based on video dimensions
function adjustOverlayFontSize(overlay, video) {
    const videoHeight = video.offsetHeight;
    const isFullscreen = document.fullscreenElement || 
                        document.webkitFullscreenElement;
    
    let fontSize = Math.max(14, Math.min(32, videoHeight / 25));
    
    if (isFullscreen) {
        fontSize = Math.max(20, Math.min(48, window.innerHeight / 30));
    }
    
    overlay.style.fontSize = fontSize + 'px';
    
    const originalText = overlay.querySelector('.ultra-translate-subtitle-original');
    const translatedText = overlay.querySelector('.ultra-translate-subtitle-translated');
    
    if (originalText) {
        originalText.style.fontSize = (fontSize * 0.9) + 'px';
        originalText.style.marginBottom = (fontSize / 4) + 'px';
    }
    
    if (translatedText) {
        translatedText.style.fontSize = fontSize + 'px';
    }
}

// Main video subtitle translation handler with improved error handling
async function handleVideoSubtitles(video) {
    try {
        // Skip if already processed
        if (translatedTracks.has(video)) {
            return;
        }
        
        // Mark as being processed to prevent duplicate processing
        translatedTracks.set(video, { processing: true });
        
        const subtitleInfo = await detectVideoSubtitles(video);
        
        if (!subtitleInfo.hasSubtitles) {
            // No subtitles found, try alternative detection methods
            const alternativeSubtitles = await detectAlternativeSubtitles(video);
            
            if (alternativeSubtitles.length > 0) {
                // Process alternative subtitles
                const translatedCues = await translateSubtitleCues(alternativeSubtitles, currentSettings);
                
                if (videoSubtitleSettings.bilingualMode === 'overlay') {
                    createBilingualOverlay(video, translatedCues);
                } else {
                    injectTranslatedTrack(video, translatedCues, currentSettings.targetLanguage);
                }
                return;
            }
            
            // Show ASR option if no subtitles found
            if (videoSubtitleSettings.mode === 'asr') {
                showASRNotification(video);
            }
            
            // Clean up processing marker
            translatedTracks.delete(video);
            return;
        }
        
        if (subtitleInfo.targetLanguageAvailable) {
            // Target language already available, just enable it
            const targetTrack = subtitleInfo.tracks.find(
                t => t.language === currentSettings.targetLanguage
            );
            if (targetTrack) {
                targetTrack.track.mode = 'showing';
            }
            translatedTracks.delete(video);
            return;
        }
        
        // Find a source track to translate
        const sourceTrack = subtitleInfo.tracks.find(t => t.track.mode === 'showing') ||
                            subtitleInfo.tracks.find(t => t.track.mode !== 'disabled') || 
                            subtitleInfo.tracks[0];
        
        if (!sourceTrack) {
            console.log('No source subtitle track found');
            translatedTracks.delete(video);
            return;
        }
        
        // Ensure track is loaded with better error handling
        sourceTrack.track.mode = 'hidden';
        
        // Wait for cues to load with multiple attempts
        let cues = [];
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts && cues.length === 0) {
            await new Promise(resolve => {
                if (sourceTrack.track.cues && sourceTrack.track.cues.length > 0) {
                    resolve();
                } else {
                    const loadHandler = () => resolve();
                    sourceTrack.track.addEventListener('load', loadHandler, { once: true });
                    sourceTrack.track.addEventListener('cuechange', loadHandler, { once: true });
                    
                    // Force track reload
                    if (attempts > 0) {
                        sourceTrack.track.mode = 'showing';
                        setTimeout(() => {
                            sourceTrack.track.mode = 'hidden';
                        }, 100);
                    }
                    
                    setTimeout(resolve, 2000); // Timeout after 2 seconds
                }
            });
            
            // Extract cues
            cues = await extractSubtitleCues(sourceTrack.track, video);
            attempts++;
            
            if (cues.length === 0 && attempts < maxAttempts) {
                console.log(`Attempt ${attempts} failed, retrying...`);
                await delay(500);
            }
        }
        
        if (cues.length === 0) {
            console.log('No subtitle cues found after multiple attempts');
            
            // Try extracting from video player's custom subtitle system
            const customCues = await extractCustomPlayerSubtitles(video);
            if (customCues.length > 0) {
                cues = customCues;
            } else {
                translatedTracks.delete(video);
                return;
            }
        }
        
        // Translate cues with error recovery
        let translatedCues;
        try {
            translatedCues = await translateSubtitleCues(cues, currentSettings);
        } catch (translationError) {
            console.error('Translation failed:', translationError);
            // Show partial translation if some succeeded
            translatedCues = cues.map(cue => ({
                ...cue,
                originalText: cue.text,
                text: cue.text // Fallback to original
            }));
        }
        
        // Apply based on bilingual mode
        if (videoSubtitleSettings.bilingualMode === 'overlay') {
            createBilingualOverlay(video, translatedCues);
        } else {
            injectTranslatedTrack(video, translatedCues, currentSettings.targetLanguage);
        }
        
        // Update processing status
        const trackData = translatedTracks.get(video) || {};
        trackData.processing = false;
        translatedTracks.set(video, trackData);
        
    } catch (error) {
        console.error('Error handling video subtitles:', error);
        translatedTracks.delete(video);
    }
}

// Detect alternative subtitle sources
async function detectAlternativeSubtitles(video) {
    const cues = [];
    
    // Check for YouTube-style captions
    const captionElements = document.querySelectorAll(
        '.ytp-caption-segment, .caption-visual-line, .player-timedtext'
    );
    
    if (captionElements.length > 0) {
        // Extract from live caption elements
        let currentTime = video.currentTime;
        captionElements.forEach(el => {
            const text = el.textContent?.trim();
            if (text) {
                cues.push({
                    startTime: currentTime,
                    endTime: currentTime + 3,
                    text: text
                });
                currentTime += 3;
            }
        });
    }
    
    return cues;
}

// Extract subtitles from custom video players
async function extractCustomPlayerSubtitles(video) {
    const cues = [];
    
    // Check for video.js captions
    const vjsTextTrack = video.parentElement?.querySelector('.vjs-text-track-display');
    if (vjsTextTrack) {
        const cueElements = vjsTextTrack.querySelectorAll('.vjs-text-track-cue');
        cueElements.forEach(el => {
            const text = el.textContent?.trim();
            if (text) {
                cues.push({
                    startTime: video.currentTime,
                    endTime: video.currentTime + 3,
                    text: text
                });
            }
        });
    }
    
    // Check for JW Player captions
    const jwCaptions = document.querySelector('.jw-captions');
    if (jwCaptions) {
        const text = jwCaptions.textContent?.trim();
        if (text) {
            cues.push({
                startTime: video.currentTime,
                endTime: video.currentTime + 3,
                text: text
            });
        }
    }
    
    return cues;
}

// Show notification for ASR feature (placeholder)
function showASRNotification(video) {
    const notification = document.createElement('div');
    notification.className = 'ultra-translate-asr-notification';
    notification.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 999999;
        pointer-events: auto;
        cursor: pointer;
    `;
    notification.textContent = 'No subtitles detected. ASR feature coming soon...';
    
    const container = findBestVideoContainer(video);
    if (container) {
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// Clean up video subtitle resources
function cleanupVideoSubtitles(video) {
    const data = translatedTracks.get(video);
    if (data) {
        // Clean up blob URL
        if (data.url) {
            URL.revokeObjectURL(data.url);
        }
        
        // Remove track element
        if (data.trackElement) {
            data.trackElement.remove();
        }
        
        // Remove overlay
        if (data.overlay) {
            data.overlay.remove();
        }
        
        // Remove event handlers
        if (data.updateHandler) {
            video.removeEventListener('timeupdate', data.updateHandler);
        }
        
        if (data.resizeHandler) {
            video.removeEventListener('resize', data.resizeHandler);
            window.removeEventListener('resize', data.resizeHandler);
            document.removeEventListener('fullscreenchange', data.resizeHandler);
        }
        
        translatedTracks.delete(video);
    }
    
    // Clean up observer
    const observer = videoObservers.get(video);
    if (observer) {
        observer.disconnect();
        videoObservers.delete(video);
    }
}

// Monitor for new videos on the page
function observeVideos() {
    // Process existing videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (!videoObservers.has(video) && videoSubtitleSettings.enabled) {
            // Observe video for changes
            const observer = new MutationObserver(() => {
                if (videoSubtitleSettings.enabled) {
                    handleVideoSubtitles(video);
                }
            });
            
            observer.observe(video, {
                attributes: true,
                attributeFilter: ['src'],
                childList: true
            });
            
            videoObservers.set(video, observer);
            
            // Handle subtitles when video is ready
            if (video.readyState >= 2) {
                handleVideoSubtitles(video);
            } else {
                video.addEventListener('loadedmetadata', () => {
                    handleVideoSubtitles(video);
                }, { once: true });
            }
        }
    });
}

// Update video subtitle settings from storage
chrome.storage.sync.get({
    videoSubtitles: false,
    videoSubtitleMode: 'translate',
    videoBilingualMode: 'overlay'
}, (settings) => {
    videoSubtitleSettings.enabled = settings.videoSubtitles;
    videoSubtitleSettings.mode = settings.videoSubtitleMode;
    videoSubtitleSettings.bilingualMode = settings.videoBilingualMode;
    
    if (videoSubtitleSettings.enabled) {
        observeVideos();
    }
});

// Listen for settings updates
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateVideoSettings') {
        videoSubtitleSettings = { ...videoSubtitleSettings, ...request.settings };
        
        if (videoSubtitleSettings.enabled) {
            observeVideos();
        } else {
            // Clean up all video subtitles
            document.querySelectorAll('video').forEach(video => {
                cleanupVideoSubtitles(video);
            });
        }
        
        sendResponse({ success: true });
    }
});

// Observe DOM for new video elements
const videoMutationObserver = new MutationObserver((mutations) => {
    if (!videoSubtitleSettings.enabled) return;
    
    let hasNewVideos = false;
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'VIDEO' || 
                    (node.nodeType === Node.ELEMENT_NODE && node.querySelector && node.querySelector('video'))) {
                    hasNewVideos = true;
                }
            });
        }
    });
    
    if (hasNewVideos) {
        observeVideos();
    }
});

videoMutationObserver.observe(document.body, {
    childList: true,
    subtree: true
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['title', 'placeholder', 'alt', 'value', 'aria-label', 'aria-expanded', 'style', 'class']
});

// Add event listeners for interactions that might reveal hidden content
document.addEventListener('click', (e) => {
    if (!(currentSettings.autoTranslate || manualRealtimeEnabled)) return;
    
    // Delay to allow dropdown/menu to fully render
    setTimeout(() => {
        throttledTranslate();
    }, 100);
}, true);

document.addEventListener('mouseenter', (e) => {
    if (!(currentSettings.autoTranslate || manualRealtimeEnabled)) return;
    
    // Check if hovering over elements that typically show dropdowns
    const target = e.target;
    if (target.matches && (
        target.matches('[data-toggle], [aria-haspopup], [role="button"], .dropdown, .has-dropdown, .menu-item, nav a, nav button'))) {
        setTimeout(() => {
            throttledTranslate();
        }, 150);
    }
}, true);

// Handle focus events for keyboard navigation
document.addEventListener('focus', (e) => {
    if (!(currentSettings.autoTranslate || manualRealtimeEnabled)) return;
    
    const target = e.target;
    if (target.matches && target.matches('select, input, button, [role="combobox"], [role="listbox"]')) {
        setTimeout(() => {
            throttledTranslate();
        }, 100);
    }
}, true);