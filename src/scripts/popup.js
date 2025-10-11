const translations = {
    'en': {
        appName: 'UltraTranslate',
        translationApi: 'Translation API:',
        apiKey: 'API Key:',
        apiKeyPlaceholder: 'Enter your API key',
        targetLanguage: 'Target Language:',
        preserveOriginal: 'Preserve Original Text',
        preserveOriginalDesc: 'Show both original and translated text',
        autoTranslate: 'Auto Translate',
        autoTranslateDesc: 'Automatically translate pages',
        saveSettings: 'Save Settings',
        translatePage: 'Translate Page',
        langZhCN: 'Chinese (Simplified)',
        langZhTW: 'Chinese (Traditional)',
        langEn: 'English',
        langEs: 'Spanish',
        langFr: 'French',
        langDe: 'German',
        langJa: 'Japanese',
        langKo: 'Korean',
        langRu: 'Russian',
        langAr: 'Arabic',
        settingsSaved: 'Settings saved successfully!',
        errorSaving: 'Error saving settings',
        enterApiKey: 'Please enter an API key',
        translationStarted: 'Translation started!',
        translationFailed: 'Translation failed',
        refreshPage: 'Error: Please refresh the page first',
        customPrompt: 'Custom Translation Prompt:',
        customPromptPlaceholder: 'Enter custom prompt for AI translation (e.g., "Translate to {language} keeping technical terms, be concise and natural")',
        customPromptDesc: 'Only for DeepSeek and OpenAI APIs',
        cacheInfo: 'Cache Information:',
        cacheSize: 'Cache Size:',
        clearCache: 'Clear Cache',
        cacheCleared: 'Cache cleared successfully!',
        stopTranslation: 'Stop Translation',
        cache: 'Cache',
        videoSubtitles: 'Video Subtitles',
        translatedTo: 'Page translated to',
        showOriginal: 'Show Original',
        showTranslation: 'Show Translation'
    },
    'zh-CN': {
        appName: '超级翻译',
        translationApi: '翻译API：',
        apiKey: 'API密钥：',
        apiKeyPlaceholder: '请输入您的API密钥',
        targetLanguage: '目标语言：',
        preserveOriginal: '保留原文',
        preserveOriginalDesc: '同时显示原文和译文',
        autoTranslate: '自动翻译',
        autoTranslateDesc: '自动翻译页面',
        saveSettings: '保存设置',
        translatePage: '翻译页面',
        langZhCN: '中文（简体）',
        langZhTW: '中文（繁体）',
        langEn: '英语',
        langEs: '西班牙语',
        langFr: '法语',
        langDe: '德语',
        langJa: '日语',
        langKo: '韩语',
        langRu: '俄语',
        langAr: '阿拉伯语',
        settingsSaved: '设置保存成功！',
        errorSaving: '保存设置失败',
        enterApiKey: '请输入API密钥',
        translationStarted: '开始翻译！',
        translationFailed: '翻译失败',
        refreshPage: '错误：请先刷新页面',
        customPrompt: '自定义翻译提示词：',
        customPromptPlaceholder: '输入AI翻译的自定义提示词（例如："翻译成{语言}，保留专业术语，简洁自然"）',
        customPromptDesc: '仅适用于DeepSeek和OpenAI API',
        cacheInfo: '缓存信息：',
        cacheSize: '缓存大小：',
        clearCache: '清除缓存',
        cacheCleared: '缓存清除成功！',
        stopTranslation: '停止翻译',
        cache: '缓存',
        videoSubtitles: '视频字幕',
        translatedTo: '页面已翻译为',
        showOriginal: '显示原文',
        showTranslation: '显示翻译'
    },
    'zh-TW': {
        appName: '超級翻譯',
        translationApi: '翻譯API：',
        apiKey: 'API金鑰：',
        apiKeyPlaceholder: '請輸入您的API金鑰',
        targetLanguage: '目標語言：',
        preserveOriginal: '保留原文',
        preserveOriginalDesc: '同時顯示原文和譯文',
        autoTranslate: '自動翻譯',
        autoTranslateDesc: '自動翻譯頁面',
        saveSettings: '儲存設定',
        translatePage: '翻譯頁面',
        langZhCN: '中文（簡體）',
        langZhTW: '中文（繁體）',
        langEn: '英語',
        langEs: '西班牙語',
        langFr: '法語',
        langDe: '德語',
        langJa: '日語',
        langKo: '韓語',
        langRu: '俄語',
        langAr: '阿拉伯語',
        settingsSaved: '設定儲存成功！',
        errorSaving: '儲存設定失敗',
        enterApiKey: '請輸入API金鑰',
        translationStarted: '開始翻譯！',
        translationFailed: '翻譯失敗',
        refreshPage: '錯誤：請先重新整理頁面',
        customPrompt: '自訂翻譯提示詞：',
        customPromptPlaceholder: '輸入AI翻譯的自訂提示詞（例如："翻譯成{語言}，保留專業術語，簡潔自然"）',
        customPromptDesc: '僅適用於DeepSeek和OpenAI API',
        cacheInfo: '快取資訊：',
        cacheSize: '快取大小：',
        clearCache: '清除快取',
        cacheCleared: '快取清除成功！',
        stopTranslation: '停止翻譯',
        cache: '快取',
        videoSubtitles: '視頻字幕',
        translatedTo: '頁面已翻譯為',
        showOriginal: '顯示原文',
        showTranslation: '顯示翻譯'
    },
    'ja': {
        appName: 'ウルトラ翻訳',
        translationApi: '翻訳API：',
        apiKey: 'APIキー：',
        apiKeyPlaceholder: 'APIキーを入力してください',
        targetLanguage: 'ターゲット言語：',
        preserveOriginal: '原文を保持',
        preserveOriginalDesc: '原文と翻訳文を同時に表示',
        autoTranslate: '自動翻訳',
        autoTranslateDesc: 'ページを自動的に翻訳',
        saveSettings: '設定を保存',
        translatePage: 'ページを翻訳',
        langZhCN: '中国語（簡体字）',
        langZhTW: '中国語（繁体字）',
        langEn: '英語',
        langEs: 'スペイン語',
        langFr: 'フランス語',
        langDe: 'ドイツ語',
        langJa: '日本語',
        langKo: '韓国語',
        langRu: 'ロシア語',
        langAr: 'アラビア語',
        settingsSaved: '設定が正常に保存されました！',
        errorSaving: '設定の保存に失敗しました',
        enterApiKey: 'APIキーを入力してください',
        translationStarted: '翻訳を開始しました！',
        translationFailed: '翻訳に失敗しました',
        refreshPage: 'エラー：最初にページを更新してください',
        stopTranslation: '翻訳を停止',
        cache: 'キャッシュ',
        videoSubtitles: 'ビデオ字幕',
        translatedTo: 'ページを翻訳しました',
        showOriginal: '原文を表示',
        showTranslation: '翻訳を表示'
    },
    'ko': {
        appName: '울트라 번역',
        translationApi: '번역 API:',
        apiKey: 'API 키:',
        apiKeyPlaceholder: 'API 키를 입력하세요',
        targetLanguage: '대상 언어:',
        preserveOriginal: '원문 보존',
        preserveOriginalDesc: '원문과 번역문을 함께 표시',
        autoTranslate: '자동 번역',
        autoTranslateDesc: '페이지 자동 번역',
        saveSettings: '설정 저장',
        translatePage: '페이지 번역',
        langZhCN: '중국어(간체)',
        langZhTW: '중국어(번체)',
        langEn: '영어',
        langEs: '스페인어',
        langFr: '프랑스어',
        langDe: '독일어',
        langJa: '일본어',
        langKo: '한국어',
        langRu: '러시아어',
        langAr: '아랍어',
        settingsSaved: '설정이 저장되었습니다!',
        errorSaving: '설정 저장 실패',
        enterApiKey: 'API 키를 입력하세요',
        translationStarted: '번역 시작!',
        translationFailed: '번역 실패',
        refreshPage: '오류: 먼저 페이지를 새로고침하세요',
        stopTranslation: '번역 중지',
        cache: '캐시',
        videoSubtitles: '비디오 자막',
        translatedTo: '페이지가 번역되었습니다',
        showOriginal: '원문 표시',
        showTranslation: '번역 표시'
    },
    'es': {
        appName: 'UltraTraducir',
        translationApi: 'API de traducción:',
        apiKey: 'Clave API:',
        apiKeyPlaceholder: 'Ingrese su clave API',
        targetLanguage: 'Idioma de destino:',
        preserveOriginal: 'Preservar texto original',
        preserveOriginalDesc: 'Mostrar texto original y traducido',
        autoTranslate: 'Traducción automática',
        autoTranslateDesc: 'Traducir páginas automáticamente',
        saveSettings: 'Guardar configuración',
        translatePage: 'Traducir página',
        langZhCN: 'Chino (simplificado)',
        langZhTW: 'Chino (tradicional)',
        langEn: 'Inglés',
        langEs: 'Español',
        langFr: 'Francés',
        langDe: 'Alemán',
        langJa: 'Japonés',
        langKo: 'Coreano',
        langRu: 'Ruso',
        langAr: 'Árabe',
        settingsSaved: '¡Configuración guardada con éxito!',
        errorSaving: 'Error al guardar la configuración',
        enterApiKey: 'Por favor ingrese una clave API',
        translationStarted: '¡Traducción iniciada!',
        translationFailed: 'La traducción falló',
        refreshPage: 'Error: Por favor actualice la página primero',
        stopTranslation: 'Detener traducción',
        cache: 'Caché',
        videoSubtitles: 'Subtítulos de video',
        translatedTo: 'Página traducida a',
        showOriginal: 'Mostrar original',
        showTranslation: 'Mostrar traducción'
    },
    'fr': {
        appName: 'UltraTraduction',
        translationApi: 'API de traduction:',
        apiKey: 'Clé API:',
        apiKeyPlaceholder: 'Entrez votre clé API',
        targetLanguage: 'Langue cible:',
        preserveOriginal: 'Conserver le texte original',
        preserveOriginalDesc: 'Afficher le texte original et traduit',
        autoTranslate: 'Traduction automatique',
        autoTranslateDesc: 'Traduire automatiquement les pages',
        saveSettings: 'Enregistrer les paramètres',
        translatePage: 'Traduire la page',
        langZhCN: 'Chinois (simplifié)',
        langZhTW: 'Chinois (traditionnel)',
        langEn: 'Anglais',
        langEs: 'Espagnol',
        langFr: 'Français',
        langDe: 'Allemand',
        langJa: 'Japonais',
        langKo: 'Coréen',
        langRu: 'Russe',
        langAr: 'Arabe',
        settingsSaved: 'Paramètres enregistrés avec succès!',
        errorSaving: 'Erreur lors de l\'enregistrement des paramètres',
        enterApiKey: 'Veuillez entrer une clé API',
        translationStarted: 'Traduction commencée!',
        translationFailed: 'La traduction a échoué',
        refreshPage: 'Erreur: Veuillez d\'abord actualiser la page',
        stopTranslation: 'Arrêter la traduction',
        cache: 'Cache',
        videoSubtitles: 'Sous-titres vidéo',
        translatedTo: 'Page traduite en',
        showOriginal: 'Afficher l\'original',
        showTranslation: 'Afficher la traduction'
    },
    'de': {
        appName: 'UltraÜbersetzer',
        translationApi: 'Übersetzungs-API:',
        apiKey: 'API-Schlüssel:',
        apiKeyPlaceholder: 'Geben Sie Ihren API-Schlüssel ein',
        targetLanguage: 'Zielsprache:',
        preserveOriginal: 'Originaltext beibehalten',
        preserveOriginalDesc: 'Original- und übersetzten Text anzeigen',
        autoTranslate: 'Automatisch übersetzen',
        autoTranslateDesc: 'Seiten automatisch übersetzen',
        saveSettings: 'Einstellungen speichern',
        translatePage: 'Seite übersetzen',
        langZhCN: 'Chinesisch (vereinfacht)',
        langZhTW: 'Chinesisch (traditionell)',
        langEn: 'Englisch',
        langEs: 'Spanisch',
        langFr: 'Französisch',
        langDe: 'Deutsch',
        langJa: 'Japanisch',
        langKo: 'Koreanisch',
        langRu: 'Russisch',
        langAr: 'Arabisch',
        settingsSaved: 'Einstellungen erfolgreich gespeichert!',
        errorSaving: 'Fehler beim Speichern der Einstellungen',
        enterApiKey: 'Bitte geben Sie einen API-Schlüssel ein',
        translationStarted: 'Übersetzung gestartet!',
        translationFailed: 'Übersetzung fehlgeschlagen',
        refreshPage: 'Fehler: Bitte aktualisieren Sie zuerst die Seite',
        stopTranslation: 'Übersetzung stoppen',
        cache: 'Cache',
        videoSubtitles: 'Video-Untertitel',
        translatedTo: 'Seite übersetzt in',
        showOriginal: 'Original anzeigen',
        showTranslation: 'Übersetzung anzeigen'
    },
    'ru': {
        appName: 'УльтраПеревод',
        translationApi: 'API перевода:',
        apiKey: 'API ключ:',
        apiKeyPlaceholder: 'Введите ваш API ключ',
        targetLanguage: 'Целевой язык:',
        preserveOriginal: 'Сохранить оригинальный текст',
        preserveOriginalDesc: 'Показать оригинал и перевод',
        autoTranslate: 'Автоперевод',
        autoTranslateDesc: 'Автоматически переводить страницы',
        saveSettings: 'Сохранить настройки',
        translatePage: 'Перевести страницу',
        langZhCN: 'Китайский (упрощенный)',
        langZhTW: 'Китайский (традиционный)',
        langEn: 'Английский',
        langEs: 'Испанский',
        langFr: 'Французский',
        langDe: 'Немецкий',
        langJa: 'Японский',
        langKo: 'Корейский',
        langRu: 'Русский',
        langAr: 'Арабский',
        settingsSaved: 'Настройки успешно сохранены!',
        errorSaving: 'Ошибка сохранения настроек',
        enterApiKey: 'Пожалуйста, введите API ключ',
        translationStarted: 'Перевод начат!',
        translationFailed: 'Перевод не удался',
        refreshPage: 'Ошибка: Сначала обновите страницу',
        stopTranslation: 'Остановить перевод',
        cache: 'Кэш',
        videoSubtitles: 'Видео субтитры',
        translatedTo: 'Страница переведена на',
        showOriginal: 'Показать оригинал',
        showTranslation: 'Показать перевод'
    }
};

let currentLang = 'en';

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

function getMessage(key) {
    return translations[currentLang][key] || translations['en'][key] || key;
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadQuickSettings();
    await updateCacheSize();
    await updateApiStatus();
    await updateTranslationStatus();

    // Event listeners with error checking
    const settingsBtn = document.getElementById('open-settings');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Settings button clicked');
            openSettingsPage();
            return false;
        });
    } else {
        console.error('Settings button not found');
    }
    
    const translateBtn = document.getElementById('translate-now');
    if (translateBtn) {
        translateBtn.addEventListener('click', translateCurrentPage);
    }

    // Close button to simply close popup without triggering any translation
    const closeBtn = document.getElementById('close-popup');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => window.close());
    }
    
    const stopBtn = document.getElementById('stop-translation');
    if (stopBtn) {
        stopBtn.addEventListener('click', stopTranslation);
    }
    
    const langSelect = document.getElementById('quick-target-language');
    if (langSelect) {
        langSelect.addEventListener('change', saveQuickSettings);
    }
    
    const preserveCheck = document.getElementById('quick-preserve-original');
    if (preserveCheck) {
        preserveCheck.addEventListener('change', saveQuickSettings);
    }
    
    const autoCheck = document.getElementById('quick-auto-translate');
    if (autoCheck) {
        autoCheck.addEventListener('change', saveQuickSettings);
    }
    
    const videoCheck = document.getElementById('quick-video-subtitles');
    if (videoCheck) {
        videoCheck.addEventListener('change', saveQuickSettings);
    }
    
    // Update cache size periodically
    setInterval(updateCacheSize, 5000);
});

async function loadQuickSettings() {
    try {
        const defaults = {
            targetLanguage: 'zh-CN',
            preserveOriginal: true,
            autoTranslate: false,
            interfaceLanguage: 'en',
            videoSubtitles: false
        };
        const settings = await new Promise((resolve) => {
            chrome.storage.sync.get(defaults, (result) => resolve(result || defaults));
        });

        document.getElementById('quick-target-language').value = settings.targetLanguage;
        document.getElementById('quick-preserve-original').checked = settings.preserveOriginal;
        document.getElementById('quick-auto-translate').checked = settings.autoTranslate;

        const videoCheck = document.getElementById('quick-video-subtitles');
        if (videoCheck) {
            videoCheck.checked = settings.videoSubtitles;
        }

        updateInterfaceLanguage(settings.interfaceLanguage);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

async function saveQuickSettings() {
    const settings = {
        targetLanguage: document.getElementById('quick-target-language').value,
        preserveOriginal: document.getElementById('quick-preserve-original').checked,
        autoTranslate: document.getElementById('quick-auto-translate').checked,
        videoSubtitles: document.getElementById('quick-video-subtitles')?.checked || false
    };
    
    try {
        await chrome.storage.sync.set(settings);
        
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            if (tabs[0]?.id) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: 'updateSettings',
                    settings: settings
                }, () => {
                    // Handle any errors silently
                    if (chrome.runtime.lastError) {
                        console.debug('Settings update:', chrome.runtime.lastError.message);
                    }
                });
                
                // Send video settings update if changed
                if ('videoSubtitles' in settings) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: 'updateVideoSettings',
                        settings: {
                            enabled: settings.videoSubtitles
                        }
                    }, () => {
                        // Handle any errors silently
                        if (chrome.runtime.lastError) {
                            console.debug('Video settings update:', chrome.runtime.lastError.message);
                        }
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

async function openSettingsPage() {
    console.log('Opening settings page...');

    // Simple direct approach - use chrome.tabs.create which works reliably
    const optionsUrl = chrome.runtime.getURL('src/pages/options.html');
    console.log('Options URL:', optionsUrl);
    
    chrome.tabs.create({
        url: optionsUrl,
        active: true
    }, (tab) => {
        if (chrome.runtime.lastError) {
            console.error('Error opening settings:', chrome.runtime.lastError);
            // Fallback: Try chrome.runtime.openOptionsPage
            if (chrome.runtime && chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage((result) => {
                    if (chrome.runtime.lastError) {
                        console.error('OpenOptionsPage also failed:', chrome.runtime.lastError);
                        // Last resort: alert user
                        alert('Unable to open settings. Please right-click the extension icon and select "Options".');
                    }
                });
            } else {
                alert('Unable to open settings. Please right-click the extension icon and select "Options".');
            }
        } else {
            console.log('Settings page opened successfully');
            // Optionally close the popup after opening settings
            window.close();
        }
    });
}

function openSettingsPageFallback() {
    // This function is no longer needed, but keeping for compatibility
    openSettingsPage();
}

async function translateCurrentPage() {
    const defaults = {
        translationApi: 'google',
        apiKey: '',
        targetLanguage: 'zh-CN',
        preserveOriginal: true,
        modelName: '',
        customPrompt: ''
    };
    const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(defaults, (result) => resolve(result || defaults));
    });

    if (settings.translationApi !== 'google' && !settings.apiKey) {
        showStatus(getMessage('enterApiKey'), 'error');
        return;
    }

    // Show loading state in button
    const translateBtn = document.getElementById('translate-now');
    const originalText = translateBtn.textContent;
    translateBtn.textContent = '⏳ ' + getMessage('translationStarted');
    translateBtn.disabled = true;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTabId = (tabs && tabs[0]) ? tabs[0].id : null;
        if (!activeTabId) {
            showStatus(getMessage('refreshPage'), 'error');
            translateBtn.textContent = originalText;
            translateBtn.disabled = false;
            return;
        }

        chrome.tabs.sendMessage(activeTabId, {
            action: 'translatePage',
            settings: settings
        }, (response) => {
            if (chrome.runtime.lastError) {
                showStatus(getMessage('refreshPage'), 'error');
                translateBtn.textContent = originalText;
                translateBtn.disabled = false;
                return;
            }

            if (response && response.success) {
                showStatus(getMessage('translationStarted'), 'success');
                // Keep the button disabled and show progress
                translateBtn.textContent = '✓ ' + getMessage('translationStarted');
                setTimeout(() => {
                    window.close();
                }, 1500);
            } else {
                showStatus(getMessage('translationFailed'), 'error');
                translateBtn.textContent = originalText;
                translateBtn.disabled = false;
            }
        });
    });
}

function showStatus(message, type) {
    const statusElement = document.getElementById('quick-status-message');
    statusElement.textContent = message;
    statusElement.className = type;
    
    setTimeout(() => {
        statusElement.className = '';
        statusElement.textContent = '';
    }, 3000);
}

async function stopTranslation() {
    const stopBtn = document.getElementById('stop-translation');
    const originalText = stopBtn.textContent;
    stopBtn.textContent = '⏸️ Stopping...';
    stopBtn.disabled = true;
    
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'stopTranslation'
            }, (response) => {
                // Check for runtime errors
                if (chrome.runtime.lastError) {
                    console.debug('Stop translation:', chrome.runtime.lastError.message);
                    showStatus(getMessage('refreshPage'), 'error');
                    return;
                }
                
                if (response && response.success) {
                    showStatus('Translation stopped', 'success');
                    stopBtn.textContent = '✓ Stopped';
                
                // Re-enable translate button
                const translateBtn = document.getElementById('translate-now');
                translateBtn.disabled = false;
                translateBtn.textContent = getMessage('translatePage');
                
                setTimeout(() => {
                    stopBtn.textContent = originalText;
                    stopBtn.disabled = false;
                }, 2000);
            } else {
                stopBtn.textContent = originalText;
                stopBtn.disabled = false;
            }
        });
        }
    });
}

async function updateApiStatus() {
    const defaults = { translationApi: 'google', apiKey: '' };
    const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(defaults, (result) => resolve(result || defaults));
    });
    
    const apiIndicator = document.getElementById('api-status');
    
    const apiNames = {
        'google': 'Google Translate',
        'deepseek': 'DeepSeek',
        'openai': 'OpenAI',
        'baidu': 'Baidu',
        'gemini': 'Google Gemini',
        'qwen': 'Alibaba Qwen'
    };
    
    if (settings.translationApi === 'google') {
        apiIndicator.textContent = apiNames[settings.translationApi];
        apiIndicator.classList.remove('offline');
    } else if (settings.apiKey) {
        apiIndicator.textContent = apiNames[settings.translationApi] || settings.translationApi.charAt(0).toUpperCase() + settings.translationApi.slice(1);
        apiIndicator.classList.remove('offline');
    } else {
        apiIndicator.textContent = 'No API Key';
        apiIndicator.classList.add('offline');
    }
}

function getDefaultPrompt(targetLanguage) {
    const langName = getLanguageName(targetLanguage);
    return `You are a professional translator. Translate the following text to ${langName}.
Keep the original meaning and tone. Make the translation natural and fluent.
Preserve technical terms and proper nouns appropriately.
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

async function updateCacheSize() {
    chrome.runtime.sendMessage({ action: 'getCacheSize' }, (response) => {
        if (response && response.size !== undefined) {
            document.getElementById('cache-count').textContent = response.size;
        }
    });
}

// Query translation state from content script
async function updateTranslationStatus() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'getTranslationState'
            }, (response) => {
                if (chrome.runtime.lastError) {
                    // Page not ready or content script not injected
                    hideTranslationStatus();
                    return;
                }

                if (response && response.isTranslated) {
                    showTranslationStatus(response.isShowingOriginal, response.targetLanguage, response.hasOriginalText);
                } else {
                    hideTranslationStatus();
                }
            });
        }
    });
}

// Show translation status section
function showTranslationStatus(isShowingOriginal, targetLanguage, hasOriginalText) {
    const statusSection = document.getElementById('translation-status-section');
    const toggleBtn = document.getElementById('toggle-view-btn');
    const toggleText = document.getElementById('toggle-view-text');
    const langName = document.getElementById('target-language-name');

    // Update language name
    langName.textContent = getLanguageName(targetLanguage);

    // Only show toggle button if original text is preserved
    if (hasOriginalText) {
        // Update button text based on current view
        if (isShowingOriginal) {
            toggleText.textContent = getMessage('showTranslation');
        } else {
            toggleText.textContent = getMessage('showOriginal');
        }

        // Show toggle button
        toggleBtn.style.display = '';

        // Add toggle button listener if not already added
        if (!toggleBtn.dataset.listenerAdded) {
            toggleBtn.addEventListener('click', handleToggleView);
            toggleBtn.dataset.listenerAdded = 'true';
        }
    } else {
        // Hide toggle button when preserve original is disabled
        toggleBtn.style.display = 'none';
    }

    // Show the status section
    statusSection.classList.remove('hidden');
}

// Hide translation status section
function hideTranslationStatus() {
    const statusSection = document.getElementById('translation-status-section');
    statusSection.classList.add('hidden');
}

// Handle toggle view button click
async function handleToggleView() {
    const toggleBtn = document.getElementById('toggle-view-btn');
    const toggleText = document.getElementById('toggle-view-text');

    // Disable button temporarily
    toggleBtn.disabled = true;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'toggleView'
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Toggle view error:', chrome.runtime.lastError);
                    toggleBtn.disabled = false;
                    return;
                }

                if (response && response.success) {
                    // Update button text
                    if (response.isShowingOriginal) {
                        toggleText.textContent = getMessage('showTranslation');
                    } else {
                        toggleText.textContent = getMessage('showOriginal');
                    }
                }

                toggleBtn.disabled = false;
            });
        }
    });
}