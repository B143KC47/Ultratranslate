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
        neverTranslate: 'Never translate',
        stylePreview: 'Translation Style Preview',
        stylePreviewDesc: 'Preview how translations will appear on pages',
        enableContainerEffects: 'Enable Container Effects',
        containerEffectsDesc: 'Add background, border, and shadow to translations',
        previewOriginalText: 'This is a sample text to demonstrate translation styling.',
        previewTranslatedText: '这是一个演示翻译样式的示例文本。'
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
        neverTranslate: '永不翻译',
        stylePreview: '翻译样式预览',
        stylePreviewDesc: '预览翻译在页面上的显示效果',
        enableContainerEffects: '启用容器特效',
        containerEffectsDesc: '为翻译添加背景、边框和阴影',
        previewOriginalText: '这是一个演示翻译样式的示例文本。',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'zh-TW': {
        settingsTitle: '超級翻譯 設定',
        generalSettings: '常規',
        apiSettings: 'API 配置',
        translationSettings: '翻譯',
        appearanceSettings: '外觀',
        advancedSettings: '進階',
        aboutSettings: '關於',
        interfaceLanguage: '介面語言：',
        defaultTargetLanguage: '預設目標語言：',
        autoTranslate: '自動翻譯',
        autoTranslateDesc: '頁面載入時自動翻譯',
        preserveOriginal: '保留原文',
        preserveOriginalDesc: '同時顯示原文和譯文',
        translationApi: '翻譯API：',
        apiKey: 'API金鑰：',
        apiKeyPlaceholder: '請輸入您的API金鑰',
        apiHelp: '從提供商網站獲取API金鑰',
        apiProviders: 'API提供商：',
        modelName: '模型：',
        modelHelp: '選擇要用於翻譯的模型',
        customPrompt: '自訂翻譯提示詞：',
        customPromptPlaceholder: '輸入AI翻譯的自訂提示詞（例如："翻譯成{語言}，保留專業術語，簡潔自然"）',
        customPromptDesc: '僅適用於DeepSeek、OpenAI、Gemini和Qwen API。使用{language}作為目標語言佔位符。',
        batchSize: '批次處理大小：',
        batchSizeDesc: '一批翻譯的文字數量',
        translationDelay: '翻譯延遲（毫秒）：',
        translationDelayDesc: '翻譯批次之間的延遲',
        translateTooltips: '翻譯工具提示',
        translatePlaceholders: '翻譯佔位符',
        translationStyle: '翻譯樣式：',
        styleHighlight: '高亮',
        styleUnderline: '底線',
        styleBubble: '氣泡',
        styleSideBySide: '並排',
        translationColor: '翻譯顏色：',
        fontSize: '字體大小調整：',
        originalOpacity: '原文透明度：',
        cacheManagement: '快取管理',
        cacheSize: '快取大小：',
        cacheLimit: '快取限制：',
        clearCache: '清除快取',
        cacheExpiry: '快取過期（小時）：',
        debugMode: '偵錯模式',
        debugModeDesc: '顯示控制台日誌用於偵錯',
        excludedSites: '排除的網站',
        excludedSitesPlaceholder: '輸入要排除的URL（每行一個）',
        excludedSitesDesc: '不會自動翻譯的頁面',
        exportSettings: '匯出設定',
        importSettings: '匯入設定',
        resetSettings: '重置所有設定',
        version: '版本：1.0.0',
        features: '功能',
        feature1: '多API翻譯支援',
        feature2: '保留原文選項',
        feature3: '自訂翻譯提示詞',
        feature4: '翻譯快取',
        feature5: '9種介面語言',
        shortcuts: '鍵盤快捷鍵',
        shortcut1: '切換翻譯',
        shortcut2: '切換原文',
        support: '支援',
        supportText: '如有問題或建議，請造訪我們的GitHub頁面。',
        settingsSaved: '設定儲存成功！',
        errorSaving: '儲存設定失敗',
        cacheCleared: '快取清除成功！',
        settingsReset: '所有設定已重置！',
        settingsExported: '設定匯出成功！',
        settingsImported: '設定匯入成功！',
        invalidFile: '無效的設定檔案！',
        videoSettings: '視訊字幕',
        enableVideoSubtitles: '啟用視訊字幕翻譯',
        videoSubtitlesDesc: '自動翻譯視訊播放器中的字幕',
        subtitleMode: '字幕模式：',
        subtitleModeOff: '關閉',
        subtitleModeTranslate: '翻譯現有字幕',
        subtitleModeASR: '生成並翻譯（ASR）',
        subtitleModeDesc: '選擇字幕處理方式',
        bilingualMode: '雙語顯示：',
        bilingualTrack: '獨立軌道',
        bilingualOverlay: '疊加顯示（原文+譯文）',
        bilingualModeDesc: '如何顯示翻譯後的字幕',
        asrSettings: 'ASR設定',
        asrProvider: 'ASR提供商：',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google語音轉文字',
        asrDeepgram: 'Deepgram',
        asrLatency: '延遲模式：',
        latencyLow: '低延遲（快速）',
        latencyBalanced: '平衡',
        latencyHigh: '高品質（慢速）',
        asrApiKey: 'ASR API金鑰：',
        asrApiKeyPlaceholder: '輸入ASR API金鑰',
        asrApiKeyDesc: 'ASR功能所需',
        videoSiteSettings: '站點特定設定',
        siteSettingsDesc: '為特定視訊平台啟用/停用',
        autoPromptTranslation: '自動提示翻譯',
        autoPromptDesc: '自動提示翻譯非目標語言頁面',
        sitePreferences: '網站翻譯偏好',
        clearSitePreferences: '清除所有網站偏好',
        alwaysTranslate: '總是翻譯',
        neverTranslate: '永不翻譯',
        stylePreview: '翻譯樣式預覽',
        stylePreviewDesc: '預覽翻譯在頁面上的顯示效果',
        enableContainerEffects: '啟用容器特效',
        containerEffectsDesc: '為翻譯添加背景、邊框和陰影',
        previewOriginalText: '這是一個演示翻譯樣式的示例文字。',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'ja': {
        settingsTitle: 'ウルトラ翻訳 設定',
        generalSettings: '一般',
        apiSettings: 'API 設定',
        translationSettings: '翻訳',
        appearanceSettings: '外観',
        advancedSettings: '詳細',
        aboutSettings: 'について',
        interfaceLanguage: 'インターフェース言語：',
        defaultTargetLanguage: 'デフォルトのターゲット言語：',
        autoTranslate: '自動翻訳',
        autoTranslateDesc: 'ページ読み込み時に自動翻訳',
        preserveOriginal: '原文を保持',
        preserveOriginalDesc: '原文と翻訳文を同時に表示',
        translationApi: '翻訳API：',
        apiKey: 'APIキー：',
        apiKeyPlaceholder: 'APIキーを入力してください',
        apiHelp: 'プロバイダーのウェブサイトからAPIキーを取得',
        apiProviders: 'APIプロバイダー：',
        modelName: 'モデル：',
        modelHelp: '翻訳に使用するモデルを選択',
        customPrompt: 'カスタム翻訳プロンプト：',
        customPromptPlaceholder: 'AI翻訳のカスタムプロンプトを入力（例："{language}に翻訳し、専門用語を保持し、簡潔で自然にする"）',
        customPromptDesc: 'DeepSeek、OpenAI、Gemini、Qwen APIでのみ動作します。{language}をターゲット言語のプレースホルダーとして使用します。',
        batchSize: 'バッチサイズ：',
        batchSizeDesc: '一度に翻訳するテキストの数',
        translationDelay: '翻訳遅延（ミリ秒）：',
        translationDelayDesc: '翻訳バッチ間の遅延',
        translateTooltips: 'ツールチップを翻訳',
        translatePlaceholders: 'プレースホルダーを翻訳',
        translationStyle: '翻訳スタイル：',
        styleHighlight: 'ハイライト',
        styleUnderline: '下線',
        styleBubble: 'バブル',
        styleSideBySide: '並列',
        translationColor: '翻訳の色：',
        fontSize: 'フォントサイズ調整：',
        originalOpacity: '原文の不透明度：',
        cacheManagement: 'キャッシュ管理',
        cacheSize: 'キャッシュサイズ：',
        cacheLimit: 'キャッシュ制限：',
        clearCache: 'キャッシュをクリア',
        cacheExpiry: 'キャッシュ有効期限（時間）：',
        debugMode: 'デバッグモード',
        debugModeDesc: 'デバッグ用のコンソールログを表示',
        excludedSites: '除外サイト',
        excludedSitesPlaceholder: '除外するURLを入力（1行に1つ）',
        excludedSitesDesc: '自動翻訳されないページ',
        exportSettings: '設定をエクスポート',
        importSettings: '設定をインポート',
        resetSettings: 'すべての設定をリセット',
        version: 'バージョン：1.0.0',
        features: '機能',
        feature1: 'マルチAPI翻訳サポート',
        feature2: '原文保持オプション',
        feature3: 'カスタム翻訳プロンプト',
        feature4: '翻訳キャッシュ',
        feature5: '9つのインターフェース言語',
        shortcuts: 'キーボードショートカット',
        shortcut1: '翻訳を切り替え',
        shortcut2: '原文を切り替え',
        support: 'サポート',
        supportText: '問題や提案については、GitHubページをご覧ください。',
        settingsSaved: '設定が正常に保存されました！',
        errorSaving: '設定の保存に失敗しました',
        cacheCleared: 'キャッシュが正常にクリアされました！',
        settingsReset: 'すべての設定がリセットされました！',
        settingsExported: '設定が正常にエクスポートされました！',
        settingsImported: '設定が正常にインポートされました！',
        invalidFile: '無効な設定ファイル！',
        videoSettings: 'ビデオ字幕',
        enableVideoSubtitles: 'ビデオ字幕翻訳を有効にする',
        videoSubtitlesDesc: 'ビデオプレーヤーの字幕を自動翻訳',
        subtitleMode: '字幕モード：',
        subtitleModeOff: 'オフ',
        subtitleModeTranslate: '既存の字幕を翻訳',
        subtitleModeASR: '生成して翻訳（ASR）',
        subtitleModeDesc: '字幕の処理方法を選択',
        bilingualMode: 'バイリンガル表示：',
        bilingualTrack: '別トラック',
        bilingualOverlay: 'オーバーレイ（原文+翻訳）',
        bilingualModeDesc: '翻訳された字幕の表示方法',
        asrSettings: 'ASR設定',
        asrProvider: 'ASRプロバイダー：',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google音声テキスト変換',
        asrDeepgram: 'Deepgram',
        asrLatency: 'レイテンシーモード：',
        latencyLow: '低レイテンシー（高速）',
        latencyBalanced: 'バランス',
        latencyHigh: '高品質（低速）',
        asrApiKey: 'ASR APIキー：',
        asrApiKeyPlaceholder: 'ASR APIキーを入力',
        asrApiKeyDesc: 'ASR機能に必要',
        videoSiteSettings: 'サイト固有の設定',
        siteSettingsDesc: '特定のビデオプラットフォームで有効/無効',
        autoPromptTranslation: '自動翻訳プロンプト',
        autoPromptDesc: 'ターゲット言語以外のページを自動的に翻訳プロンプト',
        sitePreferences: 'サイト翻訳設定',
        clearSitePreferences: 'すべてのサイト設定をクリア',
        alwaysTranslate: '常に翻訳',
        neverTranslate: '翻訳しない',
        stylePreview: '翻訳スタイルプレビュー',
        stylePreviewDesc: 'ページ上での翻訳の表示をプレビュー',
        enableContainerEffects: 'コンテナエフェクトを有効にする',
        containerEffectsDesc: '翻訳に背景、枠線、シャドウを追加',
        previewOriginalText: 'これは翻訳スタイルを示すサンプルテキストです。',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'ko': {
        settingsTitle: '울트라 번역 설정',
        generalSettings: '일반',
        apiSettings: 'API 구성',
        translationSettings: '번역',
        appearanceSettings: '외관',
        advancedSettings: '고급',
        aboutSettings: '정보',
        interfaceLanguage: '인터페이스 언어:',
        defaultTargetLanguage: '기본 대상 언어:',
        autoTranslate: '자동 번역',
        autoTranslateDesc: '페이지 로드 시 자동 번역',
        preserveOriginal: '원문 보존',
        preserveOriginalDesc: '원문과 번역문을 함께 표시',
        translationApi: '번역 API:',
        apiKey: 'API 키:',
        apiKeyPlaceholder: 'API 키를 입력하세요',
        apiHelp: '제공업체 웹사이트에서 API 키 받기',
        apiProviders: 'API 제공업체:',
        modelName: '모델:',
        modelHelp: '번역에 사용할 모델 선택',
        customPrompt: '커스텀 번역 프롬프트:',
        customPromptPlaceholder: 'AI 번역을 위한 커스텀 프롬프트 입력 (예: "{language}로 번역하고, 기술 용어를 유지하며, 간결하고 자연스럽게")',
        customPromptDesc: 'DeepSeek, OpenAI, Gemini, Qwen API에서만 작동합니다. {language}를 대상 언어 자리 표시자로 사용합니다.',
        batchSize: '배치 크기:',
        batchSizeDesc: '한 번에 번역할 텍스트 수',
        translationDelay: '번역 지연(밀리초):',
        translationDelayDesc: '번역 배치 간 지연',
        translateTooltips: '툴팁 번역',
        translatePlaceholders: '플레이스홀더 번역',
        translationStyle: '번역 스타일:',
        styleHighlight: '하이라이트',
        styleUnderline: '밑줄',
        styleBubble: '버블',
        styleSideBySide: '나란히',
        translationColor: '번역 색상:',
        fontSize: '글꼴 크기 조정:',
        originalOpacity: '원문 투명도:',
        cacheManagement: '캐시 관리',
        cacheSize: '캐시 크기:',
        cacheLimit: '캐시 제한:',
        clearCache: '캐시 지우기',
        cacheExpiry: '캐시 만료(시간):',
        debugMode: '디버그 모드',
        debugModeDesc: '디버깅을 위한 콘솔 로그 표시',
        excludedSites: '제외된 사이트',
        excludedSitesPlaceholder: '제외할 URL 입력(한 줄에 하나씩)',
        excludedSitesDesc: '자동 번역되지 않을 페이지',
        exportSettings: '설정 내보내기',
        importSettings: '설정 가져오기',
        resetSettings: '모든 설정 재설정',
        version: '버전: 1.0.0',
        features: '기능',
        feature1: '다중 API 번역 지원',
        feature2: '원문 보존 옵션',
        feature3: '커스텀 번역 프롬프트',
        feature4: '번역 캐싱',
        feature5: '9개 인터페이스 언어',
        shortcuts: '키보드 단축키',
        shortcut1: '번역 전환',
        shortcut2: '원문 전환',
        support: '지원',
        supportText: '문제나 제안사항은 GitHub 페이지를 방문해주세요.',
        settingsSaved: '설정이 저장되었습니다!',
        errorSaving: '설정 저장 실패',
        cacheCleared: '캐시가 지워졌습니다!',
        settingsReset: '모든 설정이 재설정되었습니다!',
        settingsExported: '설정이 내보내졌습니다!',
        settingsImported: '설정을 가져왔습니다!',
        invalidFile: '잘못된 설정 파일!',
        videoSettings: '비디오 자막',
        enableVideoSubtitles: '비디오 자막 번역 활성화',
        videoSubtitlesDesc: '비디오 플레이어의 자막 자동 번역',
        subtitleMode: '자막 모드:',
        subtitleModeOff: '끄기',
        subtitleModeTranslate: '기존 자막 번역',
        subtitleModeASR: '생성 및 번역(ASR)',
        subtitleModeDesc: '자막 처리 방법 선택',
        bilingualMode: '이중 언어 표시:',
        bilingualTrack: '별도 트랙',
        bilingualOverlay: '오버레이(원문+번역)',
        bilingualModeDesc: '번역된 자막 표시 방법',
        asrSettings: 'ASR 설정',
        asrProvider: 'ASR 제공업체:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google 음성-텍스트 변환',
        asrDeepgram: 'Deepgram',
        asrLatency: '지연 모드:',
        latencyLow: '낮은 지연(빠름)',
        latencyBalanced: '균형',
        latencyHigh: '고품질(느림)',
        asrApiKey: 'ASR API 키:',
        asrApiKeyPlaceholder: 'ASR API 키 입력',
        asrApiKeyDesc: 'ASR 기능에 필요',
        videoSiteSettings: '사이트별 설정',
        siteSettingsDesc: '특정 비디오 플랫폼에서 활성화/비활성화',
        autoPromptTranslation: '자동 번역 프롬프트',
        autoPromptDesc: '대상 언어가 아닌 페이지 자동 번역 프롬프트',
        sitePreferences: '사이트 번역 기본 설정',
        clearSitePreferences: '모든 사이트 기본 설정 지우기',
        alwaysTranslate: '항상 번역',
        neverTranslate: '번역하지 않음',
        stylePreview: '번역 스타일 미리보기',
        stylePreviewDesc: '페이지에서 번역이 어떻게 표시되는지 미리보기',
        enableContainerEffects: '컨테이너 효과 활성화',
        containerEffectsDesc: '번역에 배경, 테두리, 그림자 추가',
        previewOriginalText: '번역 스타일을 보여주기 위한 샘플 텍스트입니다.',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'es': {
        settingsTitle: 'Configuración de UltraTraducir',
        generalSettings: 'General',
        apiSettings: 'Configuración de API',
        translationSettings: 'Traducción',
        appearanceSettings: 'Apariencia',
        advancedSettings: 'Avanzado',
        aboutSettings: 'Acerca de',
        interfaceLanguage: 'Idioma de la interfaz:',
        defaultTargetLanguage: 'Idioma de destino predeterminado:',
        autoTranslate: 'Traducción automática',
        autoTranslateDesc: 'Traducir automáticamente al cargar páginas',
        preserveOriginal: 'Conservar texto original',
        preserveOriginalDesc: 'Mostrar texto original y traducido',
        translationApi: 'API de traducción:',
        apiKey: 'Clave API:',
        apiKeyPlaceholder: 'Ingrese su clave API',
        apiHelp: 'Obtenga su clave API del sitio web del proveedor',
        apiProviders: 'Proveedores de API:',
        modelName: 'Modelo:',
        modelHelp: 'Seleccione el modelo a usar para traducción',
        customPrompt: 'Prompt de traducción personalizado:',
        customPromptPlaceholder: 'Ingrese prompt personalizado para traducción AI (ej: "Traduce a {language} manteniendo términos técnicos, sé conciso y natural")',
        customPromptDesc: 'Solo funciona con las API de DeepSeek, OpenAI, Gemini y Qwen. Use {language} como marcador de posición para el idioma de destino.',
        batchSize: 'Tamaño del lote:',
        batchSizeDesc: 'Número de textos a traducir en un lote',
        translationDelay: 'Retraso de traducción (ms):',
        translationDelayDesc: 'Retraso entre lotes de traducción',
        translateTooltips: 'Traducir información sobre herramientas',
        translatePlaceholders: 'Traducir marcadores de posición',
        translationStyle: 'Estilo de traducción:',
        styleHighlight: 'Resaltado',
        styleUnderline: 'Subrayado',
        styleBubble: 'Burbuja',
        styleSideBySide: 'Lado a lado',
        translationColor: 'Color de traducción:',
        fontSize: 'Ajuste de tamaño de fuente:',
        originalOpacity: 'Opacidad del texto original:',
        cacheManagement: 'Gestión de caché',
        cacheSize: 'Tamaño de caché:',
        cacheLimit: 'Límite de caché:',
        clearCache: 'Borrar caché',
        cacheExpiry: 'Caducidad de caché (horas):',
        debugMode: 'Modo de depuración',
        debugModeDesc: 'Mostrar registros de consola para depuración',
        excludedSites: 'Sitios excluidos',
        excludedSitesPlaceholder: 'Ingrese URLs para excluir (una por línea)',
        excludedSitesDesc: 'Páginas que no se traducirán automáticamente',
        exportSettings: 'Exportar configuración',
        importSettings: 'Importar configuración',
        resetSettings: 'Restablecer toda la configuración',
        version: 'Versión: 1.0.0',
        features: 'Características',
        feature1: 'Soporte de traducción multi-API',
        feature2: 'Opción de conservar texto original',
        feature3: 'Prompts de traducción personalizados',
        feature4: 'Caché de traducción',
        feature5: '9 idiomas de interfaz',
        shortcuts: 'Atajos de teclado',
        shortcut1: 'Alternar traducción',
        shortcut2: 'Alternar texto original',
        support: 'Soporte',
        supportText: 'Para problemas o sugerencias, visite nuestra página de GitHub.',
        settingsSaved: '¡Configuración guardada con éxito!',
        errorSaving: 'Error al guardar la configuración',
        cacheCleared: '¡Caché borrado con éxito!',
        settingsReset: '¡Toda la configuración se ha restablecido!',
        settingsExported: '¡Configuración exportada con éxito!',
        settingsImported: '¡Configuración importada con éxito!',
        invalidFile: '¡Archivo de configuración inválido!',
        videoSettings: 'Subtítulos de video',
        enableVideoSubtitles: 'Habilitar traducción de subtítulos de video',
        videoSubtitlesDesc: 'Traducir automáticamente subtítulos en reproductores de video',
        subtitleMode: 'Modo de subtítulos:',
        subtitleModeOff: 'Apagado',
        subtitleModeTranslate: 'Traducir subtítulos existentes',
        subtitleModeASR: 'Generar y traducir (ASR)',
        subtitleModeDesc: 'Elija cómo se manejan los subtítulos',
        bilingualMode: 'Visualización bilingüe:',
        bilingualTrack: 'Pista separada',
        bilingualOverlay: 'Superposición (Original + Traducción)',
        bilingualModeDesc: 'Cómo mostrar subtítulos traducidos',
        asrSettings: 'Configuración de ASR',
        asrProvider: 'Proveedor de ASR:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google Texto a voz',
        asrDeepgram: 'Deepgram',
        asrLatency: 'Modo de latencia:',
        latencyLow: 'Baja latencia (Rápido)',
        latencyBalanced: 'Equilibrado',
        latencyHigh: 'Alta calidad (Lento)',
        asrApiKey: 'Clave API de ASR:',
        asrApiKeyPlaceholder: 'Ingrese clave API de ASR',
        asrApiKeyDesc: 'Requerido para funcionalidad ASR',
        videoSiteSettings: 'Configuración específica del sitio',
        siteSettingsDesc: 'Habilitar/deshabilitar para plataformas de video específicas',
        autoPromptTranslation: 'Prompt de traducción automática',
        autoPromptDesc: 'Prompt automático para traducir páginas que no estén en el idioma de destino',
        sitePreferences: 'Preferencias de traducción del sitio',
        clearSitePreferences: 'Borrar todas las preferencias del sitio',
        alwaysTranslate: 'Siempre traducir',
        neverTranslate: 'Nunca traducir',
        stylePreview: 'Vista previa del estilo de traducción',
        stylePreviewDesc: 'Vista previa de cómo aparecerán las traducciones en las páginas',
        enableContainerEffects: 'Habilitar efectos de contenedor',
        containerEffectsDesc: 'Agregar fondo, borde y sombra a las traducciones',
        previewOriginalText: 'Este es un texto de muestra para demostrar el estilo de traducción.',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'fr': {
        settingsTitle: 'Paramètres de UltraTraduction',
        generalSettings: 'Général',
        apiSettings: 'Configuration API',
        translationSettings: 'Traduction',
        appearanceSettings: 'Apparence',
        advancedSettings: 'Avancé',
        aboutSettings: 'À propos',
        interfaceLanguage: 'Langue de l\'interface:',
        defaultTargetLanguage: 'Langue cible par défaut:',
        autoTranslate: 'Traduction automatique',
        autoTranslateDesc: 'Traduire automatiquement lors du chargement des pages',
        preserveOriginal: 'Conserver le texte original',
        preserveOriginalDesc: 'Afficher le texte original et traduit',
        translationApi: 'API de traduction:',
        apiKey: 'Clé API:',
        apiKeyPlaceholder: 'Entrez votre clé API',
        apiHelp: 'Obtenez votre clé API depuis le site du fournisseur',
        apiProviders: 'Fournisseurs d\'API:',
        modelName: 'Modèle:',
        modelHelp: 'Sélectionnez le modèle à utiliser pour la traduction',
        customPrompt: 'Prompt de traduction personnalisé:',
        customPromptPlaceholder: 'Entrez un prompt personnalisé pour la traduction IA (ex: "Traduis en {language} en conservant les termes techniques, sois concis et naturel")',
        customPromptDesc: 'Fonctionne uniquement avec les API DeepSeek, OpenAI, Gemini et Qwen. Utilisez {language} comme espace réservé pour la langue cible.',
        batchSize: 'Taille du lot:',
        batchSizeDesc: 'Nombre de textes à traduire en un lot',
        translationDelay: 'Délai de traduction (ms):',
        translationDelayDesc: 'Délai entre les lots de traduction',
        translateTooltips: 'Traduire les info-bulles',
        translatePlaceholders: 'Traduire les espaces réservés',
        translationStyle: 'Style de traduction:',
        styleHighlight: 'Surbrillance',
        styleUnderline: 'Soulignement',
        styleBubble: 'Bulle',
        styleSideBySide: 'Côte à côte',
        translationColor: 'Couleur de traduction:',
        fontSize: 'Ajustement de la taille de police:',
        originalOpacity: 'Opacité du texte original:',
        cacheManagement: 'Gestion du cache',
        cacheSize: 'Taille du cache:',
        cacheLimit: 'Limite du cache:',
        clearCache: 'Vider le cache',
        cacheExpiry: 'Expiration du cache (heures):',
        debugMode: 'Mode débogage',
        debugModeDesc: 'Afficher les journaux de console pour le débogage',
        excludedSites: 'Sites exclus',
        excludedSitesPlaceholder: 'Entrez les URL à exclure (une par ligne)',
        excludedSitesDesc: 'Pages qui ne seront pas traduites automatiquement',
        exportSettings: 'Exporter les paramètres',
        importSettings: 'Importer les paramètres',
        resetSettings: 'Réinitialiser tous les paramètres',
        version: 'Version: 1.0.0',
        features: 'Fonctionnalités',
        feature1: 'Support de traduction multi-API',
        feature2: 'Option de conservation du texte original',
        feature3: 'Prompts de traduction personnalisés',
        feature4: 'Mise en cache de traduction',
        feature5: '9 langues d\'interface',
        shortcuts: 'Raccourcis clavier',
        shortcut1: 'Basculer la traduction',
        shortcut2: 'Basculer le texte original',
        support: 'Support',
        supportText: 'Pour les problèmes ou suggestions, visitez notre page GitHub.',
        settingsSaved: 'Paramètres enregistrés avec succès!',
        errorSaving: 'Erreur lors de l\'enregistrement des paramètres',
        cacheCleared: 'Cache vidé avec succès!',
        settingsReset: 'Tous les paramètres ont été réinitialisés!',
        settingsExported: 'Paramètres exportés avec succès!',
        settingsImported: 'Paramètres importés avec succès!',
        invalidFile: 'Fichier de paramètres invalide!',
        videoSettings: 'Sous-titres vidéo',
        enableVideoSubtitles: 'Activer la traduction des sous-titres vidéo',
        videoSubtitlesDesc: 'Traduire automatiquement les sous-titres dans les lecteurs vidéo',
        subtitleMode: 'Mode sous-titres:',
        subtitleModeOff: 'Désactivé',
        subtitleModeTranslate: 'Traduire les sous-titres existants',
        subtitleModeASR: 'Générer et traduire (ASR)',
        subtitleModeDesc: 'Choisissez comment gérer les sous-titres',
        bilingualMode: 'Affichage bilingue:',
        bilingualTrack: 'Piste séparée',
        bilingualOverlay: 'Superposition (Original + Traduction)',
        bilingualModeDesc: 'Comment afficher les sous-titres traduits',
        asrSettings: 'Paramètres ASR',
        asrProvider: 'Fournisseur ASR:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google Synthèse vocale',
        asrDeepgram: 'Deepgram',
        asrLatency: 'Mode de latence:',
        latencyLow: 'Faible latence (Rapide)',
        latencyBalanced: 'Équilibré',
        latencyHigh: 'Haute qualité (Lent)',
        asrApiKey: 'Clé API ASR:',
        asrApiKeyPlaceholder: 'Entrez la clé API ASR',
        asrApiKeyDesc: 'Requis pour la fonctionnalité ASR',
        videoSiteSettings: 'Paramètres spécifiques au site',
        siteSettingsDesc: 'Activer/désactiver pour des plateformes vidéo spécifiques',
        autoPromptTranslation: 'Prompt de traduction automatique',
        autoPromptDesc: 'Proposer automatiquement de traduire les pages qui ne sont pas dans la langue cible',
        sitePreferences: 'Préférences de traduction du site',
        clearSitePreferences: 'Effacer toutes les préférences du site',
        alwaysTranslate: 'Toujours traduire',
        neverTranslate: 'Ne jamais traduire',
        stylePreview: 'Aperçu du style de traduction',
        stylePreviewDesc: 'Aperçu de l\'apparence des traductions sur les pages',
        enableContainerEffects: 'Activer les effets de conteneur',
        containerEffectsDesc: 'Ajouter un arrière-plan, une bordure et une ombre aux traductions',
        previewOriginalText: 'Ceci est un texte d\'exemple pour démontrer le style de traduction.',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'de': {
        settingsTitle: 'UltraÜbersetzer Einstellungen',
        generalSettings: 'Allgemein',
        apiSettings: 'API-Konfiguration',
        translationSettings: 'Übersetzung',
        appearanceSettings: 'Aussehen',
        advancedSettings: 'Erweitert',
        aboutSettings: 'Über',
        interfaceLanguage: 'Schnittstellensprache:',
        defaultTargetLanguage: 'Standard-Zielsprache:',
        autoTranslate: 'Automatisch übersetzen',
        autoTranslateDesc: 'Beim Laden von Seiten automatisch übersetzen',
        preserveOriginal: 'Originaltext beibehalten',
        preserveOriginalDesc: 'Original- und übersetzten Text anzeigen',
        translationApi: 'Übersetzungs-API:',
        apiKey: 'API-Schlüssel:',
        apiKeyPlaceholder: 'Geben Sie Ihren API-Schlüssel ein',
        apiHelp: 'Holen Sie sich Ihren API-Schlüssel von der Website des Anbieters',
        apiProviders: 'API-Anbieter:',
        modelName: 'Modell:',
        modelHelp: 'Wählen Sie das Modell für die Übersetzung',
        customPrompt: 'Benutzerdefinierter Übersetzungsprompt:',
        customPromptPlaceholder: 'Geben Sie einen benutzerdefinierten Prompt für die KI-Übersetzung ein (z.B.: "Übersetze nach {language}, behalte technische Begriffe bei, sei prägnant und natürlich")',
        customPromptDesc: 'Funktioniert nur mit den APIs von DeepSeek, OpenAI, Gemini und Qwen. Verwenden Sie {language} als Platzhalter für die Zielsprache.',
        batchSize: 'Stapelgröße:',
        batchSizeDesc: 'Anzahl der Texte, die in einem Stapel übersetzt werden sollen',
        translationDelay: 'Übersetzungsverzögerung (ms):',
        translationDelayDesc: 'Verzögerung zwischen Übersetzungsstapeln',
        translateTooltips: 'Tooltips übersetzen',
        translatePlaceholders: 'Platzhalter übersetzen',
        translationStyle: 'Übersetzungsstil:',
        styleHighlight: 'Hervorhebung',
        styleUnderline: 'Unterstrichen',
        styleBubble: 'Blase',
        styleSideBySide: 'Nebeneinander',
        translationColor: 'Übersetzungsfarbe:',
        fontSize: 'Schriftgrößenanpassung:',
        originalOpacity: 'Deckkraft des Originaltexts:',
        cacheManagement: 'Cache-Verwaltung',
        cacheSize: 'Cache-Größe:',
        cacheLimit: 'Cache-Limit:',
        clearCache: 'Cache leeren',
        cacheExpiry: 'Cache-Ablauf (Stunden):',
        debugMode: 'Debug-Modus',
        debugModeDesc: 'Konsolenprotokolle für Debugging anzeigen',
        excludedSites: 'Ausgeschlossene Sites',
        excludedSitesPlaceholder: 'Geben Sie auszuschließende URLs ein (eine pro Zeile)',
        excludedSitesDesc: 'Seiten, die nicht automatisch übersetzt werden',
        exportSettings: 'Einstellungen exportieren',
        importSettings: 'Einstellungen importieren',
        resetSettings: 'Alle Einstellungen zurücksetzen',
        version: 'Version: 1.0.0',
        features: 'Funktionen',
        feature1: 'Multi-API-Übersetzungsunterstützung',
        feature2: 'Option zum Beibehalten des Originaltexts',
        feature3: 'Benutzerdefinierte Übersetzungsprompts',
        feature4: 'Übersetzungs-Caching',
        feature5: '9 Schnittstellensprachen',
        shortcuts: 'Tastaturkürzel',
        shortcut1: 'Übersetzung umschalten',
        shortcut2: 'Originaltext umschalten',
        support: 'Unterstützung',
        supportText: 'Bei Problemen oder Vorschlägen besuchen Sie bitte unsere GitHub-Seite.',
        settingsSaved: 'Einstellungen erfolgreich gespeichert!',
        errorSaving: 'Fehler beim Speichern der Einstellungen',
        cacheCleared: 'Cache erfolgreich geleert!',
        settingsReset: 'Alle Einstellungen wurden zurückgesetzt!',
        settingsExported: 'Einstellungen erfolgreich exportiert!',
        settingsImported: 'Einstellungen erfolgreich importiert!',
        invalidFile: 'Ungültige Einstellungsdatei!',
        videoSettings: 'Video-Untertitel',
        enableVideoSubtitles: 'Video-Untertitelübersetzung aktivieren',
        videoSubtitlesDesc: 'Untertitel in Videoplayern automatisch übersetzen',
        subtitleMode: 'Untertitelmodus:',
        subtitleModeOff: 'Aus',
        subtitleModeTranslate: 'Vorhandene Untertitel übersetzen',
        subtitleModeASR: 'Generieren und übersetzen (ASR)',
        subtitleModeDesc: 'Wählen Sie, wie Untertitel behandelt werden',
        bilingualMode: 'Zweisprachige Anzeige:',
        bilingualTrack: 'Separate Spur',
        bilingualOverlay: 'Überlagerung (Original + Übersetzung)',
        bilingualModeDesc: 'Wie übersetzte Untertitel angezeigt werden',
        asrSettings: 'ASR-Einstellungen',
        asrProvider: 'ASR-Anbieter:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google Speech-to-Text',
        asrDeepgram: 'Deepgram',
        asrLatency: 'Latenzmodus:',
        latencyLow: 'Niedrige Latenz (Schnell)',
        latencyBalanced: 'Ausgeglichen',
        latencyHigh: 'Hohe Qualität (Langsam)',
        asrApiKey: 'ASR-API-Schlüssel:',
        asrApiKeyPlaceholder: 'ASR-API-Schlüssel eingeben',
        asrApiKeyDesc: 'Erforderlich für ASR-Funktionalität',
        videoSiteSettings: 'Websitespezifische Einstellungen',
        siteSettingsDesc: 'Für bestimmte Videoplattformen aktivieren/deaktivieren',
        autoPromptTranslation: 'Automatischer Übersetzungsprompt',
        autoPromptDesc: 'Automatisch zum Übersetzen von Seiten auffordern, die nicht in der Zielsprache sind',
        sitePreferences: 'Website-Übersetzungseinstellungen',
        clearSitePreferences: 'Alle Website-Einstellungen löschen',
        alwaysTranslate: 'Immer übersetzen',
        neverTranslate: 'Nie übersetzen',
        stylePreview: 'Vorschau des Übersetzungsstils',
        stylePreviewDesc: 'Vorschau, wie Übersetzungen auf Seiten erscheinen werden',
        enableContainerEffects: 'Containereffekte aktivieren',
        containerEffectsDesc: 'Hintergrund, Rand und Schatten zu Übersetzungen hinzufügen',
        previewOriginalText: 'Dies ist ein Beispieltext zur Demonstration des Übersetzungsstils.',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
    },
    'ru': {
        settingsTitle: 'Настройки УльтраПеревод',
        generalSettings: 'Общие',
        apiSettings: 'Конфигурация API',
        translationSettings: 'Перевод',
        appearanceSettings: 'Внешний вид',
        advancedSettings: 'Расширенные',
        aboutSettings: 'О программе',
        interfaceLanguage: 'Язык интерфейса:',
        defaultTargetLanguage: 'Целевой язык по умолчанию:',
        autoTranslate: 'Автоперевод',
        autoTranslateDesc: 'Автоматически переводить при загрузке страниц',
        preserveOriginal: 'Сохранить оригинальный текст',
        preserveOriginalDesc: 'Показать оригинал и перевод',
        translationApi: 'API перевода:',
        apiKey: 'API ключ:',
        apiKeyPlaceholder: 'Введите ваш API ключ',
        apiHelp: 'Получите API ключ с сайта поставщика',
        apiProviders: 'Поставщики API:',
        modelName: 'Модель:',
        modelHelp: 'Выберите модель для перевода',
        customPrompt: 'Пользовательский промпт перевода:',
        customPromptPlaceholder: 'Введите пользовательский промпт для AI перевода (например: "Переведи на {language}, сохраняя технические термины, будь кратким и естественным")',
        customPromptDesc: 'Работает только с API DeepSeek, OpenAI, Gemini и Qwen. Используйте {language} как заполнитель для целевого языка.',
        batchSize: 'Размер пакета:',
        batchSizeDesc: 'Количество текстов для перевода в одном пакете',
        translationDelay: 'Задержка перевода (мс):',
        translationDelayDesc: 'Задержка между пакетами перевода',
        translateTooltips: 'Переводить всплывающие подсказки',
        translatePlaceholders: 'Переводить заполнители',
        translationStyle: 'Стиль перевода:',
        styleHighlight: 'Подсветка',
        styleUnderline: 'Подчеркивание',
        styleBubble: 'Пузырь',
        styleSideBySide: 'Рядом',
        translationColor: 'Цвет перевода:',
        fontSize: 'Регулировка размера шрифта:',
        originalOpacity: 'Прозрачность оригинального текста:',
        cacheManagement: 'Управление кэшем',
        cacheSize: 'Размер кэша:',
        cacheLimit: 'Лимит кэша:',
        clearCache: 'Очистить кэш',
        cacheExpiry: 'Срок действия кэша (часы):',
        debugMode: 'Режим отладки',
        debugModeDesc: 'Показывать логи консоли для отладки',
        excludedSites: 'Исключенные сайты',
        excludedSitesPlaceholder: 'Введите URL для исключения (по одному на строку)',
        excludedSitesDesc: 'Страницы, которые не будут переводиться автоматически',
        exportSettings: 'Экспортировать настройки',
        importSettings: 'Импортировать настройки',
        resetSettings: 'Сбросить все настройки',
        version: 'Версия: 1.0.0',
        features: 'Функции',
        feature1: 'Поддержка мультиAPI перевода',
        feature2: 'Опция сохранения оригинального текста',
        feature3: 'Пользовательские промпты перевода',
        feature4: 'Кэширование перевода',
        feature5: '9 языков интерфейса',
        shortcuts: 'Горячие клавиши',
        shortcut1: 'Переключить перевод',
        shortcut2: 'Переключить оригинальный текст',
        support: 'Поддержка',
        supportText: 'Для вопросов или предложений посетите нашу страницу на GitHub.',
        settingsSaved: 'Настройки успешно сохранены!',
        errorSaving: 'Ошибка сохранения настроек',
        cacheCleared: 'Кэш успешно очищен!',
        settingsReset: 'Все настройки сброшены!',
        settingsExported: 'Настройки успешно экспортированы!',
        settingsImported: 'Настройки успешно импортированы!',
        invalidFile: 'Неверный файл настроек!',
        videoSettings: 'Видео субтитры',
        enableVideoSubtitles: 'Включить перевод видео субтитров',
        videoSubtitlesDesc: 'Автоматически переводить субтитры в видеоплеерах',
        subtitleMode: 'Режим субтитров:',
        subtitleModeOff: 'Выкл',
        subtitleModeTranslate: 'Переводить существующие субтитры',
        subtitleModeASR: 'Генерировать и переводить (ASR)',
        subtitleModeDesc: 'Выберите, как обрабатывать субтитры',
        bilingualMode: 'Двуязычное отображение:',
        bilingualTrack: 'Отдельная дорожка',
        bilingualOverlay: 'Наложение (Оригинал + Перевод)',
        bilingualModeDesc: 'Как отображать переведенные субтитры',
        asrSettings: 'Настройки ASR',
        asrProvider: 'Поставщик ASR:',
        asrWhisper: 'OpenAI Whisper',
        asrGoogleSTT: 'Google Преобразование речи в текст',
        asrDeepgram: 'Deepgram',
        asrLatency: 'Режим задержки:',
        latencyLow: 'Низкая задержка (Быстро)',
        latencyBalanced: 'Сбалансированный',
        latencyHigh: 'Высокое качество (Медленно)',
        asrApiKey: 'API ключ ASR:',
        asrApiKeyPlaceholder: 'Введите API ключ ASR',
        asrApiKeyDesc: 'Требуется для функциональности ASR',
        videoSiteSettings: 'Настройки для конкретного сайта',
        siteSettingsDesc: 'Включить/выключить для конкретных видеоплатформ',
        autoPromptTranslation: 'Авто-запрос перевода',
        autoPromptDesc: 'Автоматически предлагать перевести страницы не на целевом языке',
        sitePreferences: 'Предпочтения перевода сайта',
        clearSitePreferences: 'Очистить все предпочтения сайта',
        alwaysTranslate: 'Всегда переводить',
        neverTranslate: 'Никогда не переводить',
        stylePreview: 'Предпросмотр стиля перевода',
        stylePreviewDesc: 'Предпросмотр того, как переводы будут выглядеть на страницах',
        enableContainerEffects: 'Включить эффекты контейнера',
        containerEffectsDesc: 'Добавить фон, границу и тень к переводам',
        previewOriginalText: 'Это образец текста для демонстрации стиля перевода.',
        previewTranslatedText: 'This is a sample text to demonstrate translation styling.'
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
    document.getElementById('enable-container-effects').addEventListener('change', handleContainerEffectsChange);
    document.getElementById('translation-color').addEventListener('change', () => {
        updatePreview();
        saveSettings();
    });
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
        document.getElementById('enable-container-effects').checked = settings.enableContainerEffects !== false;
        document.getElementById('translation-color').value = settings.translationColor || '#10a37f';
        document.getElementById('font-size').value = settings.fontSize || 100;
        document.getElementById('opacity').value = settings.opacity || 60;
        handleFontSizeChange();
        handleOpacityChange();
        updatePreview();
        
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
        enableContainerEffects: document.getElementById('enable-container-effects').checked,
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
    updatePreview();
    saveSettings();
}

// Handle opacity change
function handleOpacityChange() {
    const value = document.getElementById('opacity').value;
    document.getElementById('opacity-value').textContent = value + '%';
    updatePreview();
    saveSettings();
}

// Handle container effects change
function handleContainerEffectsChange() {
    updatePreview();
    saveSettings();
}

// Update preview based on settings
function updatePreview() {
    const preview = document.getElementById('preview-translated');
    if (!preview) return;

    const enableContainerEffects = document.getElementById('enable-container-effects').checked;
    const translationColor = document.getElementById('translation-color').value;
    const fontSize = document.getElementById('font-size').value;
    const opacity = document.getElementById('opacity').value;

    // Apply container effects class
    if (!enableContainerEffects) {
        preview.classList.add('no-container');
    } else {
        preview.classList.remove('no-container');
    }

    // Apply custom color
    const translatedSpan = preview.querySelector('.ultra-translate-translated');
    if (translatedSpan) {
        if (enableContainerEffects) {
            translatedSpan.style.borderLeftColor = translationColor;
            translatedSpan.style.color = '';
        } else {
            translatedSpan.style.color = translationColor;
            translatedSpan.style.borderLeftColor = '';
        }
    }

    // Apply font size
    preview.style.fontSize = fontSize + '%';

    // Apply opacity to original
    const originalSpan = preview.querySelector('.ultra-translate-original');
    if (originalSpan) {
        originalSpan.style.opacity = opacity / 100;
    }
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