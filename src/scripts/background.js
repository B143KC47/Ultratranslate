// Translation cache with LRU eviction
const translationCache = new Map();
const MAX_CACHE_SIZE = 1000;
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Wrap in try-catch to handle synchronous errors
    try {
        if (request.action === 'translate') {
            // Verify request has required data
            if (!request.texts || !Array.isArray(request.texts)) {
                console.warn('Invalid translation request: missing texts array');
                sendResponse({ translations: [] });
                return false;
            }

            handleTranslation(request.texts, request.settings)
                .then(translations => {
                    // Verify extension context is still valid before responding
                    try {
                        if (chrome.runtime?.id) {
                            sendResponse({ translations });
                        } else {
                            console.warn('Extension context invalidated, cannot send response');
                        }
                    } catch (e) {
                        console.warn('Error sending translation response:', e);
                    }
                })
                .catch(error => {
                    console.error('Translation error:', error);
                    // Verify extension context is still valid before responding
                    try {
                        if (chrome.runtime?.id) {
                            sendResponse({ translations: request.texts.map(() => '') });
                        } else {
                            console.warn('Extension context invalidated, cannot send error response');
                        }
                    } catch (e) {
                        console.warn('Error sending error response:', e);
                    }
                });
            return true; // Indicate async response
        } else if (request.action === 'clearCache') {
            translationCache.clear();
            sendResponse({ success: true });
            return true;
        } else if (request.action === 'getCacheSize') {
            sendResponse({ size: translationCache.size });
            return true;
        } else if (request.action === 'openSettings') {
            chrome.runtime.openOptionsPage();
            sendResponse({ success: true });
            return true;
        }

        // Unknown action
        return false;
    } catch (error) {
        console.error('Message handler error:', error);
        // Attempt to send error response
        try {
            if (chrome.runtime?.id) {
                sendResponse({
                    translations: request.texts?.map(() => '') || [],
                    error: error.message
                });
            }
        } catch (e) {
            console.warn('Failed to send error response:', e);
        }
        return false;
    }
});

function getCacheKey(text, targetLanguage, api) {
    return `${api}:${targetLanguage}:${text}`;
}

function getCachedTranslation(text, targetLanguage, api) {
    const key = getCacheKey(text, targetLanguage, api);
    const cached = translationCache.get(key);
    
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
        // Move to end (LRU)
        translationCache.delete(key);
        translationCache.set(key, cached);
        return cached.translation;
    }
    
    if (cached) {
        translationCache.delete(key);
    }
    
    return null;
}

function setCachedTranslation(text, targetLanguage, api, translation) {
    const key = getCacheKey(text, targetLanguage, api);
    
    // LRU eviction
    if (translationCache.size >= MAX_CACHE_SIZE) {
        const firstKey = translationCache.keys().next().value;
        translationCache.delete(firstKey);
    }
    
    translationCache.set(key, {
        translation,
        timestamp: Date.now()
    });
}

async function handleTranslation(texts, settings) {
    const { translationApi, apiKey, targetLanguage, customPrompt, modelName } = settings;
    
    switch (translationApi) {
        case 'google':
            return translateWithGoogle(texts, targetLanguage);
        case 'deepseek':
            return translateWithDeepSeek(texts, targetLanguage, apiKey, customPrompt, modelName);
        case 'openai':
            return translateWithOpenAI(texts, targetLanguage, apiKey, customPrompt, modelName);
        case 'baidu':
            return translateWithBaidu(texts, targetLanguage, apiKey);
        case 'gemini':
            return translateWithGemini(texts, targetLanguage, apiKey, customPrompt, modelName);
        case 'qwen':
            return translateWithQwen(texts, targetLanguage, apiKey, customPrompt, modelName);
        default:
            throw new Error(`Unsupported translation API: ${translationApi}`);
    }
}

async function translateWithGoogle(texts, targetLanguage) {
    const translations = [];
    const uncachedTexts = [];
    const uncachedIndices = [];
    
    // Check cache first
    for (let i = 0; i < texts.length; i++) {
        const cached = getCachedTranslation(texts[i], targetLanguage, 'google');
        if (cached) {
            translations[i] = cached;
        } else {
            uncachedTexts.push(texts[i]);
            uncachedIndices.push(i);
        }
    }
    
    // Translate uncached texts
    for (let i = 0; i < uncachedTexts.length; i++) {
        const text = uncachedTexts[i];
        const index = uncachedIndices[i];
        
        try {
            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            if (data && data[0]) {
                const translated = data[0].map(item => item[0]).join('');
                translations[index] = translated;
                setCachedTranslation(text, targetLanguage, 'google', translated);
            } else {
                translations[index] = text;
            }
        } catch (error) {
            console.error('Google translation error:', error);
            translations[index] = text;
        }
    }
    
    return translations;
}

async function translateWithDeepSeek(texts, targetLanguage, apiKey, customPrompt, modelName) {
    if (!apiKey) {
        throw new Error('DeepSeek API key is required');
    }
    
    // Check cache for all texts
    const translations = [];
    const uncachedTexts = [];
    const uncachedIndices = [];
    
    for (let i = 0; i < texts.length; i++) {
        const cached = getCachedTranslation(texts[i], targetLanguage, 'deepseek');
        if (cached) {
            translations[i] = cached;
        } else {
            uncachedTexts.push(texts[i]);
            uncachedIndices.push(i);
        }
    }
    
    if (uncachedTexts.length === 0) {
        return translations;
    }
    
    const systemPrompt = customPrompt || getSystemPrompt(targetLanguage);
    const userPrompt = uncachedTexts.join('\n---\n');
    
    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName || 'deepseek-chat',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.3,
                max_tokens: 2000
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const translatedTexts = data.choices[0].message.content.split('\n---\n').map(t => t.trim());
            
            for (let i = 0; i < translatedTexts.length && i < uncachedTexts.length; i++) {
                const translation = translatedTexts[i];
                const originalText = uncachedTexts[i];
                const index = uncachedIndices[i];
                
                translations[index] = translation;
                setCachedTranslation(originalText, targetLanguage, 'deepseek', translation);
            }
        } else {
            for (let i = 0; i < uncachedIndices.length; i++) {
                translations[uncachedIndices[i]] = uncachedTexts[i];
            }
        }
        
        return translations;
    } catch (error) {
        console.error('DeepSeek translation error:', error);
        for (let i = 0; i < uncachedIndices.length; i++) {
            translations[uncachedIndices[i]] = uncachedTexts[i];
        }
        return translations;
    }
}

async function translateWithOpenAI(texts, targetLanguage, apiKey, customPrompt, modelName) {
    if (!apiKey) {
        throw new Error('OpenAI API key is required');
    }
    
    // Check cache for all texts
    const translations = [];
    const uncachedTexts = [];
    const uncachedIndices = [];
    
    for (let i = 0; i < texts.length; i++) {
        const cached = getCachedTranslation(texts[i], targetLanguage, 'openai');
        if (cached) {
            translations[i] = cached;
        } else {
            uncachedTexts.push(texts[i]);
            uncachedIndices.push(i);
        }
    }
    
    if (uncachedTexts.length === 0) {
        return translations;
    }
    
    const systemPrompt = customPrompt || getSystemPrompt(targetLanguage);
    const userPrompt = uncachedTexts.join('\n---\n');
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName || 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.3,
                max_tokens: 2000
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const translatedTexts = data.choices[0].message.content.split('\n---\n').map(t => t.trim());
            
            for (let i = 0; i < translatedTexts.length && i < uncachedTexts.length; i++) {
                const translation = translatedTexts[i];
                const originalText = uncachedTexts[i];
                const index = uncachedIndices[i];
                
                translations[index] = translation;
                setCachedTranslation(originalText, targetLanguage, 'openai', translation);
            }
        } else {
            for (let i = 0; i < uncachedIndices.length; i++) {
                translations[uncachedIndices[i]] = uncachedTexts[i];
            }
        }
        
        return translations;
    } catch (error) {
        console.error('OpenAI translation error:', error);
        for (let i = 0; i < uncachedIndices.length; i++) {
            translations[uncachedIndices[i]] = uncachedTexts[i];
        }
        return translations;
    }
}

async function translateWithBaidu(texts, targetLanguage, apiKey) {
    if (!apiKey) {
        throw new Error('Baidu API key is required');
    }
    
    const translations = [];
    const baiduLangCode = getBaiduLanguageCode(targetLanguage);
    
    for (const text of texts) {
        try {
            const salt = Date.now();
            const sign = generateBaiduSign(text, apiKey, salt);
            
            const params = new URLSearchParams({
                q: text,
                from: 'auto',
                to: baiduLangCode,
                appid: apiKey.split(':')[0],
                salt: salt,
                sign: sign
            });
            
            const response = await fetch(`https://fanyi-api.baidu.com/api/trans/vip/translate?${params}`);
            const data = await response.json();
            
            if (data.trans_result && data.trans_result[0]) {
                translations.push(data.trans_result[0].dst);
            } else {
                translations.push(text);
            }
        } catch (error) {
            console.error('Baidu translation error:', error);
            translations.push(text);
        }
    }
    
    return translations;
}

async function translateWithGemini(texts, targetLanguage, apiKey, customPrompt, modelName) {
    if (!apiKey) {
        throw new Error('Gemini API key is required');
    }
    
    // Check cache for all texts
    const translations = [];
    const uncachedTexts = [];
    const uncachedIndices = [];
    
    for (let i = 0; i < texts.length; i++) {
        const cached = getCachedTranslation(texts[i], targetLanguage, 'gemini');
        if (cached) {
            translations[i] = cached;
        } else {
            uncachedTexts.push(texts[i]);
            uncachedIndices.push(i);
        }
    }
    
    if (uncachedTexts.length === 0) {
        return translations;
    }
    
    const systemPrompt = customPrompt || getSystemPrompt(targetLanguage);
    const userPrompt = uncachedTexts.join('\n---\n');
    const model = modelName || 'gemini-1.5-flash';
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `${systemPrompt}\n\n${userPrompt}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.3,
                    maxOutputTokens: 2000,
                    topP: 0.8,
                    topK: 40
                }
            })
        });
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const translatedContent = data.candidates[0].content.parts[0].text;
            const translatedTexts = translatedContent.split('\n---\n').map(t => t.trim());
            
            for (let i = 0; i < translatedTexts.length && i < uncachedTexts.length; i++) {
                const translation = translatedTexts[i];
                const originalText = uncachedTexts[i];
                const index = uncachedIndices[i];
                
                translations[index] = translation;
                setCachedTranslation(originalText, targetLanguage, 'gemini', translation);
            }
        } else {
            for (let i = 0; i < uncachedIndices.length; i++) {
                translations[uncachedIndices[i]] = uncachedTexts[i];
            }
        }
        
        return translations;
    } catch (error) {
        console.error('Gemini translation error:', error);
        for (let i = 0; i < uncachedIndices.length; i++) {
            translations[uncachedIndices[i]] = uncachedTexts[i];
        }
        return translations;
    }
}

async function translateWithQwen(texts, targetLanguage, apiKey, customPrompt, modelName) {
    if (!apiKey) {
        throw new Error('Qwen API key is required');
    }
    
    // Check cache for all texts
    const translations = [];
    const uncachedTexts = [];
    const uncachedIndices = [];
    
    for (let i = 0; i < texts.length; i++) {
        const cached = getCachedTranslation(texts[i], targetLanguage, 'qwen');
        if (cached) {
            translations[i] = cached;
        } else {
            uncachedTexts.push(texts[i]);
            uncachedIndices.push(i);
        }
    }
    
    if (uncachedTexts.length === 0) {
        return translations;
    }
    
    const systemPrompt = customPrompt || getSystemPrompt(targetLanguage);
    const userPrompt = uncachedTexts.join('\n---\n');
    const model = modelName || 'qwen-plus';
    
    try {
        // Qwen uses OpenAI-compatible API through DashScope
        const response = await fetch('https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.3,
                max_tokens: 2000
            })
        });
        
        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            const translatedTexts = data.choices[0].message.content.split('\n---\n').map(t => t.trim());
            
            for (let i = 0; i < translatedTexts.length && i < uncachedTexts.length; i++) {
                const translation = translatedTexts[i];
                const originalText = uncachedTexts[i];
                const index = uncachedIndices[i];
                
                translations[index] = translation;
                setCachedTranslation(originalText, targetLanguage, 'qwen', translation);
            }
        } else {
            for (let i = 0; i < uncachedIndices.length; i++) {
                translations[uncachedIndices[i]] = uncachedTexts[i];
            }
        }
        
        return translations;
    } catch (error) {
        console.error('Qwen translation error:', error);
        for (let i = 0; i < uncachedIndices.length; i++) {
            translations[uncachedIndices[i]] = uncachedTexts[i];
        }
        return translations;
    }
}

function getSystemPrompt(targetLanguage) {
    const langName = getLanguageName(targetLanguage);
    return `You are a professional translator. Translate the following text to ${langName}. 
    Maintain the original meaning and tone. 
    If multiple texts are separated by '---', translate each one separately and return them in the same format.
    Only return the translated text, no explanations.`;
}

function getLanguageName(code) {
    const languages = {
        'zh-CN': 'Simplified Chinese',
        'zh-TW': 'Traditional Chinese',
        'en': 'English',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese',
        'ko': 'Korean',
        'ru': 'Russian',
        'ar': 'Arabic'
    };
    return languages[code] || code;
}

function getBaiduLanguageCode(code) {
    const mapping = {
        'zh-CN': 'zh',
        'zh-TW': 'cht',
        'en': 'en',
        'es': 'spa',
        'fr': 'fra',
        'de': 'de',
        'ja': 'jp',
        'ko': 'kor',
        'ru': 'ru',
        'ar': 'ara'
    };
    return mapping[code] || 'en';
}

function generateBaiduSign(query, apiKey, salt) {
    const [appid, secretKey] = apiKey.split(':');
    const str = appid + query + salt + secretKey;
    return md5(str);
}

function md5(string) {
    function rotateLeft(n, b) {
        return (n << b) | (n >>> (32 - b));
    }
    
    function addUnsigned(x, y) {
        const x4 = (x & 0x40000000);
        const y4 = (y & 0x40000000);
        const x8 = (x & 0x80000000);
        const y8 = (y & 0x80000000);
        const result = (x & 0x3FFFFFFF) + (y & 0x3FFFFFFF);
        if (x4 & y4) return (result ^ 0x80000000 ^ x8 ^ y8);
        if (x4 | y4) {
            if (result & 0x40000000) return (result ^ 0xC0000000 ^ x8 ^ y8);
            else return (result ^ 0x40000000 ^ x8 ^ y8);
        } else {
            return (result ^ x8 ^ y8);
        }
    }
    
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    
    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    
    function convertToWordArray(string) {
        let wordArray = [];
        const stringLength = string.length;
        let numberOfWords = (((stringLength + 8) - ((stringLength + 8) % 64)) / 64 + 1) * 16;
        for (let i = 0; i < numberOfWords; i++) {
            wordArray[i] = 0;
        }
        let bytePosition = 0;
        let byteCount = 0;
        while (byteCount < stringLength) {
            const wordCount = (byteCount - (byteCount % 4)) / 4;
            bytePosition = (byteCount % 4) * 8;
            wordArray[wordCount] = wordArray[wordCount] | (string.charCodeAt(byteCount) << bytePosition);
            byteCount++;
        }
        const wordCount = (byteCount - (byteCount % 4)) / 4;
        bytePosition = (byteCount % 4) * 8;
        wordArray[wordCount] = wordArray[wordCount] | (0x80 << bytePosition);
        wordArray[numberOfWords - 2] = stringLength << 3;
        wordArray[numberOfWords - 1] = stringLength >>> 29;
        return wordArray;
    }
    
    function wordToHex(value) {
        let hex = "";
        for (let count = 0; count <= 3; count++) {
            const byte = (value >>> (count * 8)) & 255;
            const temp = "0" + byte.toString(16);
            hex = hex + temp.substr(temp.length - 2, 2);
        }
        return hex;
    }
    
    const x = convertToWordArray(unescape(encodeURIComponent(string)));
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    
    const S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    const S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    const S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    const S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    
    for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}