# 🌐 UltraTranslate - Multi-API Browser Translation Extension

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green.svg)
![License](https://img.shields.io/badge/license-MIT-purple.svg)
![APIs](https://img.shields.io/badge/APIs-4+-orange.svg)
![Languages](https://img.shields.io/badge/languages-9-red.svg)

**🚀 A powerful Chrome extension for real-time webpage translation with multi-API support**

### 📚 Documentation Languages

[**English**](README.md) | [**中文简体**](docs/README.zh-CN.md) | [**日本語**](docs/README.ja.md) | [**한국어**](docs/README.ko.md) | [**Español**](docs/README.es.md)

</div>

---

### ✨ Features

<table>
<tr>
<td width="50%">

#### 🎯 Core Features
- 🔄 **Multi-API Support** - Google, DeepSeek, OpenAI, Baidu
- 📝 **Preserve Original** - Side-by-side comparison
- 🎨 **Smart Detection** - Advanced text filtering
- ⚡ **Real-time Translation** - With progress indicators
- 💾 **Smart Caching** - LRU cache for performance

</td>
<td width="50%">

#### 🎨 User Interface
- 🌙 **Dark Theme** - OpenAI-inspired design
- 🌍 **9 Languages** - EN/中文/日本語/한국어 & more
- 🚀 **Quick Popup** - Fast access controls
- ⚙️ **Settings Page** - Comprehensive options

</td>
</tr>
</table>

### 🌟 Supported Languages

<div align="center">

| Interface Language | Native Name | Flag |
|:---:|:---:|:---:|
| English | English | 🇬🇧 |
| Chinese Simplified | 中文简体 | 🇨🇳 |
| Chinese Traditional | 中文繁體 | 🇹🇼 |
| Japanese | 日本語 | 🇯🇵 |
| Korean | 한국어 | 🇰🇷 |
| Spanish | Español | 🇪🇸 |
| French | Français | 🇫🇷 |
| German | Deutsch | 🇩🇪 |
| Russian | Русский | 🇷🇺 |

</div>

### 🚀 Advanced Features
- 🤖 **Custom AI Prompts** - Personalize translation behavior
- 📦 **Batch Processing** - Optimize multiple translations
- ↔️ **RTL Support** - Arabic, Hebrew, Persian support
- ♿ **Accessibility** - ARIA, keyboard shortcuts, screen reader
- 🔄 **Auto-translate** - Smart language detection
- 🚫 **Site Exclusion** - Configure never-translate sites

## 📦 Installation

<details>
<summary><b>📥 Quick Install Guide</b></summary>

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ultratranslate.git

# 2. Open Chrome Extensions
chrome://extensions/

# 3. Enable Developer Mode
Toggle → ON

# 4. Load Extension
Click "Load unpacked" → Select folder
```

</details>

### 🎯 Step-by-Step Installation

| Step | Action | Description |
|:---:|:---|:---|
| 1️⃣ | **Download** | Clone or download this repository |
| 2️⃣ | **Open Extensions** | Navigate to `chrome://extensions/` |
| 3️⃣ | **Developer Mode** | Enable toggle in top right |
| 4️⃣ | **Load Unpacked** | Click and select extension folder |
| 5️⃣ | **Success!** | Extension icon appears in toolbar |

## ⚙️ Configuration

### Quick Setup
1. Click the UltraTranslate icon in your browser toolbar
2. Select your target language from the dropdown
3. Toggle "Preserve Original" if you want to keep both texts
4. Click "Translate Page" to start translation

### API Configuration

#### Google Translate (Default)
- No configuration required
- Free to use
- Works out of the box

#### DeepSeek API
1. Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)
2. Open extension settings (⚙️ button in popup)
3. Go to API Configuration section
4. Select "DeepSeek" from dropdown
5. Enter your API key
6. Save settings

#### OpenAI API
1. Get your API key from [OpenAI Platform](https://platform.openai.com/)
2. Open extension settings
3. Select "OpenAI" from dropdown
4. Enter your API key
5. Optionally customize the translation prompt
6. Save settings

#### Baidu Translate API
1. Get APP ID and Secret Key from [Baidu Translate](https://fanyi-api.baidu.com/)
2. Open extension settings
3. Select "Baidu" from dropdown
4. Enter credentials in format: `appid:secretkey`
5. Save settings

## 🚀 Usage

### Basic Translation
1. Navigate to any webpage you want to translate
2. Click the UltraTranslate icon
3. Click "Translate Page"
4. Watch the progress indicator as the page translates
5. Original text will be shown with reduced opacity, translations highlighted in green

### Stop Translation
- Click "Stop Translation" button to halt ongoing translation
- Useful for large pages or if you want to cancel

### Toggle Translation Display
- Use keyboard shortcuts:
  - `Alt+T`: Toggle translation on/off
  - `Alt+O`: Toggle original text visibility

### Custom Translation Prompts (AI APIs only)
1. Open settings page
2. Navigate to Translation section
3. Enter custom prompt in the text area
4. Use `{language}` placeholder for target language
5. Example: "Translate to {language} keeping technical terms, be concise and natural"

### Batch Size and Performance
- Adjust batch size in settings (default: 50 texts)
- Lower values = more accurate but slower
- Higher values = faster but may miss context
- Translation delay between batches can be adjusted (default: 50ms)

## 🔧 Advanced Settings

### Cache Management
- **Cache Size**: View current number of cached translations
- **Cache Limit**: Maximum 1000 translations stored
- **Cache Expiry**: Default 24 hours
- **Clear Cache**: Remove all cached translations

### Appearance Customization
- **Translation Style**: Choose from Highlight, Underline, Bubble, or Side-by-side
- **Translation Color**: Customize the highlight color
- **Font Size Adjustment**: Scale translated text (50-150%)
- **Original Text Opacity**: Adjust visibility of original text (0-100%)

### Excluded Sites
Add URLs or domains that should never be auto-translated:
```
example.com
github.com
localhost
```

### Debug Mode
Enable console logging for troubleshooting translation issues

### Import/Export Settings
- **Export**: Save all settings to JSON file for backup
- **Import**: Restore settings from previously exported file
- **Reset**: Return all settings to default values

## 🏗️ Technical Architecture

### Components
- **Manifest V3**: Modern Chrome extension architecture
- **Content Script**: Injects translation functionality into web pages
- **Background Service Worker**: Handles API calls and message routing
- **Options Page**: Full settings management interface
- **Popup Interface**: Quick access controls

### Text Processing Pipeline
1. **Text Detection**: TreeWalker API with NodeFilter for efficient DOM traversal
2. **Filtering**: Comprehensive rules to skip non-translatable content
3. **Segmentation**: Intl.Segmenter API for accurate sentence splitting
4. **Batching**: Intelligent grouping by context and similarity
5. **Translation**: Parallel API calls with concurrent limit
6. **Display**: DOM manipulation with original text preservation

### Performance Optimizations
- **LRU Cache**: Reduces duplicate API calls
- **Batch Processing**: Groups similar texts for efficiency
- **Concurrent Translation**: Processes multiple batches simultaneously
- **Debounced Mutations**: Prevents excessive re-translation
- **WeakMap Storage**: Memory-efficient original text storage

## 🔒 Privacy & Security

- All translations are processed through official API endpoints
- API keys are stored locally in Chrome's secure storage
- No data is collected or transmitted to third parties
- Original page content is never modified permanently
- Cache is stored locally and expires automatically

## 🐛 Troubleshooting

### Settings page won't open
- Right-click extension icon and select "Options"
- Or go to `chrome://extensions/` → UltraTranslate → Details → Extension options

### Translation not working
1. Check if API key is configured (for non-Google services)
2. Ensure the page has finished loading
3. Try refreshing the page
4. Check console for errors (F12 → Console)
5. Verify site isn't in excluded list

### Slow translation
- Reduce batch size in settings
- Clear cache if it's too large
- Check internet connection
- Consider using Google Translate (fastest)

### Text not being detected
- Some dynamic content may load after initial scan
- Try re-translating after page fully loads
- Check if content is in an iframe (limited support)

## 📝 Version History

### Version 1.0.0
- Initial release with multi-API support
- Preserve original text feature
- Dark theme UI
- 9 interface languages
- Advanced text filtering
- Translation caching
- Loading indicators
- Accessibility features
- RTL language support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style
- Use consistent indentation (2 spaces)
- Follow existing naming conventions
- Add comments for complex logic
- Ensure accessibility standards are met

## 📄 License

This project is provided as-is for educational and personal use.

## 🙏 Acknowledgments

- Chrome Extensions API documentation
- Translation API providers
- Open source community

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

Made with ❤️ for better web translation experience