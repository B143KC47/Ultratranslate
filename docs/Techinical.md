# UltraTranslate - Technical Documentation

## Overview
UltraTranslate is a Chrome extension that provides multi-API translation capabilities with the option to preserve original text alongside translations.

## Architecture

### Components

1. **Manifest (manifest.json)**
   - Uses Manifest V3
   - Defines permissions for storage, activeTab, and contextMenus
   - Configures content scripts and background service worker
   - Includes options page configuration

2. **Quick Popup Interface (popup.html, popup.js, popup.css)**
   - Streamlined interface for quick actions
   - Target language selection
   - Toggle preserve original text
   - Toggle auto-translate
   - Translate/Stop buttons
   - API status indicator
   - Cache counter
   - Settings button to open full options page

3. **Options Page (options.html, options.js, options.css)**
   - Full settings interface in separate tab
   - Organized into sections: General, API, Translation, Appearance, Advanced, About
   - Detailed configuration options
   - Cache management
   - Export/Import settings
   - Custom prompt editor
   - Excluded sites list
   - Debug mode

4. **Content Script (content.js, content.css)**
   - Injected into web pages
   - Identifies translatable text nodes
   - Manages translation display
   - Handles preserve original text feature
   - Implements mutation observer for dynamic content

5. **Background Script (background.js)**
   - Handles API communication
   - Supports multiple translation services:
     - Google Translate (no API key required)
     - DeepSeek API
     - OpenAI API
     - Baidu Translate API
   - Routes translation requests to appropriate service

## Features

### Dark Theme UI
- Modern OpenAI-inspired dark theme design
- Color scheme: #202123 background with #10a37f accent
- Improved readability and reduced eye strain
- Professional appearance with smooth transitions

### Multi-Language Interface
Supports 9 interface languages:
- English
- Chinese (Simplified) - 中文简体
- Chinese (Traditional) - 中文繁體
- Japanese - 日本語
- Korean - 한국어
- Spanish - Español
- French - Français
- German - Deutsch
- Russian - Русский

### Multi-API Support
- **Google Translate**: Free, no API key required
- **DeepSeek**: Requires API key
- **OpenAI**: Requires API key
- **Baidu**: Requires APP ID and Secret Key (format: appid:secretkey)

### Preserve Original Text
When enabled, displays both original and translated text:
- Original text shown with reduced opacity (0.7)
- Translation highlighted with green accent (#10a37f)
- Subtle background highlight for better visibility
- Maintains document structure

### Auto-Translate
- Automatically translates pages when loaded
- Monitors DOM changes for new content
- Translates dynamically added content

## Installation

1. Open Chrome Extensions page (chrome://extensions/)
2. Enable Developer Mode
3. Click "Load unpacked"
4. Select the extension directory
5. Generate proper icon files using generate-icons.html

## Configuration

### API Keys
- **Google**: No configuration needed
- **DeepSeek**: Get API key from https://platform.deepseek.com/
- **OpenAI**: Get API key from https://platform.openai.com/
- **Baidu**: Get APP ID and Secret Key from https://fanyi-api.baidu.com/

### Usage

#### Quick Actions (Popup)
1. Click extension icon to open quick popup
2. Select target language from dropdown
3. Toggle preserve original text if needed
4. Toggle auto-translate for automatic translation
5. Click "Translate Page" to start translation
6. Click "Stop Translation" to stop ongoing translation
7. View API status and cache size in status bar
8. Click ⚙️ button to open full settings page

#### Detailed Settings (Options Page)
1. Click ⚙️ in popup or right-click extension icon → Options
2. Navigate between sections using sidebar
3. Configure API keys and translation providers
4. Customize translation prompts for AI models
5. Adjust appearance settings (colors, opacity, styles)
6. Manage cache and excluded sites
7. Export/Import settings for backup
8. View keyboard shortcuts and documentation

## Technical Details

### Text Selection Algorithm

#### Enhanced Filtering Rules
- **Skip Tags**: script, style, noscript, iframe, object, embed, pre, code, kbd, samp, var, math, svg, canvas, textarea, input, select, option
- **Skip Attributes**: 
  - `contenteditable="true"` elements
  - `aria-hidden="true"` elements
  - `translate="no"` elements
  - Elements with class `notranslate`
- **Visibility Checks**:
  - Zero-sized elements (width or height = 0)
  - `display: none` or `visibility: hidden`
  - `opacity: 0` elements
- **Content Validation**:
  - Minimum 2 characters
  - Skip pure numbers/punctuation
  - Skip URLs and email addresses
  - Cache computed styles for performance

#### Sentence Segmentation
- **Intl.Segmenter API**: Uses native browser API for accurate sentence splitting
- **Language Detection**: Automatic detection based on Unicode ranges
- **Context Grouping**: Groups text nodes by parent element for coherent translation
- **Fallback Support**: Graceful degradation for browsers without Segmenter API

### Translation Process
1. Content script identifies text nodes
2. Sends batch translation requests to background script
3. Background script calls selected API
4. Returns translations to content script
5. Content script updates DOM with translations

### Performance Optimizations

#### Translation Caching
- **LRU Cache**: Implements Least Recently Used eviction strategy
- **Cache Size**: Maximum 1000 translations
- **Expiry Time**: 24 hours per cached translation
- **Cache Management**: Clear cache button in settings
- **Real-time Monitoring**: Cache size displayed in popup

#### Batch Processing
- **Optimized Batching**: Groups text by context and similarity
- **Dynamic Batch Size**: 30 nodes for Google, 50 for AI APIs
- **Character Limit**: 1000 characters per batch maximum
- **Concurrent Processing**: Up to 3 batches processed simultaneously
- **Reduced Delays**: 50ms between batch groups (down from 100ms)

#### DOM Optimization
- **Debounced Mutations**: 1.5 second debounce for DOM changes
- **Skip Translated**: Ignores already translated elements
- **Smart Element Creation**: Uses inline/block elements based on context
- **Layout Preservation**: Maintains original page structure

#### Custom Translation Prompts
- **User Customizable**: Edit prompts for AI-based translations
- **Default Templates**: Optimized prompts for each language
- **Context Aware**: Preserves technical terms and proper nouns
- **Per-API Support**: Works with DeepSeek and OpenAI

#### Enhanced Styling
- **Adaptive Display**: Different styles for inline vs block content
- **Gradient Backgrounds**: Subtle visual hierarchy
- **Hover Effects**: Interactive feedback on translated text
- **Dark Mode Support**: Automatic color adjustment
- **Special Handling**: Optimized for headers, links, and lists
- **Print Styles**: Clean output for printing

#### Accessibility Features
- **ARIA Attributes**:
  - `aria-hidden="true"` on original text to prevent duplicate screen reader announcement
  - `aria-live="polite"` on translations for dynamic updates
  - `role="group"` and `aria-label` for semantic structure
- **Language Attributes**:
  - Proper `lang` attributes for source and target languages
  - `dir` attribute for RTL language support
- **Keyboard Shortcuts**:
  - Alt+T: Toggle translation on/off
  - Alt+O: Toggle original text visibility
- **High Contrast Mode**: Enhanced borders and opacity
- **Reduced Motion**: Respects user preference for animations

#### RTL Language Support
- **Supported Languages**: Arabic, Hebrew, Persian, Urdu, Yiddish, Kurdish
- **Direction Handling**: 
  - Automatic `dir="rtl"` attribute
  - Border positioning adjustment
  - Text alignment adaptation
- **Unicode Bidirectional**: Proper text isolation with `unicode-bidi`
- **Font Support**: Optimized font stacks for different scripts

#### Memory Management
- **WeakMap Storage**: Original text stored in WeakMap to prevent memory leaks
- **No DOM Pollution**: Avoids adding data-* attributes to DOM
- **Cache Management**: Computed styles cached for performance
- **Cleanup**: Proper cleanup when restoring original text

### Loading Indicator System

#### Visual Feedback
- **Full-Screen Overlay**: Dark semi-transparent backdrop with blur effect
- **Progress Tracking**: Real-time percentage and progress bar
- **Multi-language Support**: Loading text in user's interface language
- **Smooth Animations**: Spinning loader and progress bar animations

#### Implementation Details
- **Progress Calculation**: Tracks batch completion for accurate progress
- **Auto-removal**: Cleans up when translation completes or stops
- **Responsive Design**: Adapts to mobile and desktop screens
- **Performance**: Minimal DOM impact with single overlay element

#### Button States
- **Translation Button**: Shows loading state with emoji indicators
- **Stop Button**: Visual feedback during stop operation
- **Disabled States**: Prevents duplicate actions during translation
- **Auto-recovery**: Buttons return to normal state after completion