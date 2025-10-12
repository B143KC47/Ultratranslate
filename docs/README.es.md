# 🌐 UltraTranslate - Extensión de Traducción Multi-API para Navegador

<div align="center">

![Versión](https://img.shields.io/badge/versión-1.0.0-blue.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extensión-green.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-purple.svg)
![APIs](https://img.shields.io/badge/APIs-4+-orange.svg)
![Idiomas](https://img.shields.io/badge/idiomas-9-red.svg)

**🚀 Una poderosa extensión de Chrome para traducción de páginas web en tiempo real con soporte multi-API**

### 📚 Idiomas de Documentación

[**English**](../README.md) | [**中文简体**](README.zh-CN.md) | [**日本語**](README.ja.md) | [**한국어**](README.ko.md) | [**Español**](README.es.md)

</div>

---

### ✨ Características

<table>
<tr>
<td width="50%">

#### 🎯 Características Principales
- 🔄 **Soporte Multi-API** - Google, DeepSeek, OpenAI, Baidu
- 📝 **Preservar Original** - Comparación lado a lado
- 🎨 **Detección Inteligente** - Filtrado de texto avanzado
- ⚡ **Traducción en Tiempo Real** - Con indicadores de progreso
- 💾 **Caché Inteligente** - Caché LRU para rendimiento

</td>
<td width="50%">

#### 🎨 Interfaz de Usuario
- 🌙 **Tema Oscuro** - Diseño inspirado en OpenAI
- 🌍 **9 Idiomas** - ES/EN/中文/日本語 y más
- 🚀 **Popup Rápido** - Controles de acceso rápido
- ⚙️ **Página de Configuración** - Opciones completas

</td>
</tr>
</table>

### 🌟 Idiomas de Interfaz Soportados

<div align="center">

| Idioma de Interfaz | Nombre Nativo | Bandera |
|:---:|:---:|:---:|
| Inglés | English | 🇬🇧 |
| Chino Simplificado | 中文简体 | 🇨🇳 |
| Chino Tradicional | 中文繁體 | 🇹🇼 |
| Japonés | 日本語 | 🇯🇵 |
| Coreano | 한국어 | 🇰🇷 |
| Español | Español | 🇪🇸 |
| Francés | Français | 🇫🇷 |
| Alemán | Deutsch | 🇩🇪 |
| Ruso | Русский | 🇷🇺 |

</div>

### 🚀 Características Avanzadas
- 🤖 **Prompts IA Personalizados** - Personaliza el comportamiento de traducción
- 📦 **Procesamiento por Lotes** - Optimiza múltiples traducciones
- ↔️ **Soporte RTL** - Soporte para árabe, hebreo, persa
- ♿ **Accesibilidad** - ARIA, atajos de teclado, lector de pantalla
- 🔄 **Auto-traducción** - Detección inteligente de idioma
- 🚫 **Exclusión de Sitios** - Configura sitios que nunca traducir

## 📦 Instalación

<details>
<summary><b>📥 Guía de Instalación Rápida</b></summary>

```bash
# 1. Clonar el repositorio
git clone https://github.com/yourusername/ultratranslate.git

# 2. Abrir página de extensiones de Chrome
chrome://extensions/

# 3. Habilitar modo desarrollador
Alternar → ON

# 4. Cargar extensión
Clic en "Cargar descomprimida" → Seleccionar carpeta
```

</details>

### 🎯 Instalación Paso a Paso

| Paso | Acción | Descripción |
|:---:|:---|:---|
| 1️⃣ | **Descargar** | Clonar o descargar este repositorio |
| 2️⃣ | **Abrir Extensiones** | Navegar a `chrome://extensions/` |
| 3️⃣ | **Modo Desarrollador** | Habilitar interruptor en la esquina superior derecha |
| 4️⃣ | **Cargar Descomprimida** | Clic y seleccionar carpeta de extensión |
| 5️⃣ | **¡Éxito!** | El icono de la extensión aparece en la barra de herramientas |

## ⚙️ Configuración

### 🚀 Configuración Rápida
1. Hacer clic en el icono de UltraTranslate en la barra de herramientas del navegador
2. Seleccionar idioma objetivo del menú desplegable
3. Alternar "Preservar Original" si deseas mantener ambos textos
4. Hacer clic en "Traducir Página" para comenzar la traducción

### 🔑 Configuración de API

<details>
<summary><b>Google Translate (Predeterminado)</b></summary>

- ✅ No requiere configuración
- ✅ Uso gratuito
- ✅ Funciona de inmediato

</details>

<details>
<summary><b>DeepSeek API</b></summary>

1. Obtener clave API de [Plataforma DeepSeek](https://platform.deepseek.com/)
2. Abrir configuración de extensión (botón ⚙️ en popup)
3. Ir a sección de Configuración API
4. Seleccionar "DeepSeek" del menú desplegable
5. Ingresar tu clave API
6. Guardar configuración

</details>

<details>
<summary><b>OpenAI API</b></summary>

1. Obtener clave API de [Plataforma OpenAI](https://platform.openai.com/)
2. Abrir configuración de extensión
3. Seleccionar "OpenAI" del menú desplegable
4. Ingresar tu clave API
5. Opcional: personalizar el prompt de traducción
6. Guardar configuración

</details>

<details>
<summary><b>Baidu Translate API</b></summary>

1. Obtener APP ID y clave secreta de [Baidu Translate](https://fanyi-api.baidu.com/)
2. Abrir configuración de extensión
3. Seleccionar "Baidu" del menú desplegable
4. Ingresar credenciales en formato: `appid:secretkey`
5. Guardar configuración

</details>

## 🎮 Uso

### 📖 Traducción Básica
1. Navegar a cualquier página web que desees traducir
2. Hacer clic en el icono de UltraTranslate
3. Hacer clic en "Traducir Página"
4. Observar el indicador de progreso mientras la página se traduce
5. El texto original se mostrará con opacidad reducida, las traducciones resaltadas en verde

### ⏹️ Detener Traducción
- Hacer clic en botón "Detener Traducción" para detener la traducción en curso
- Útil para páginas grandes o si deseas cancelar

### ⌨️ Atajos de Teclado
- `Alt+T`: Alternar traducción encendido/apagado
- `Alt+O`: Alternar visibilidad del texto original

### 🤖 Prompts de Traducción Personalizados (Solo APIs IA)
1. Abrir página de configuración
2. Navegar a sección de Traducción
3. Ingresar prompt personalizado en el área de texto
4. Usar `{language}` como marcador de posición para idioma objetivo
5. Ejemplo: "Traducir a {language} manteniendo términos técnicos, ser conciso y natural"

## 🔧 Configuración Avanzada

### 💾 Gestión de Caché
- **Tamaño de Caché**: Ver número actual de traducciones en caché
- **Límite de Caché**: Máximo 1000 traducciones almacenadas
- **Expiración de Caché**: Predeterminado 24 horas
- **Limpiar Caché**: Eliminar todas las traducciones en caché

### 🎨 Personalización de Apariencia
- **Estilo de Traducción**: Elegir entre Resaltado, Subrayado, Burbuja o Lado a lado
- **Color de Traducción**: Personalizar el color de resaltado
- **Ajuste de Tamaño de Fuente**: Escalar texto traducido (50-150%)
- **Opacidad del Texto Original**: Ajustar visibilidad del texto original (0-100%)

### 🚫 Sitios Excluidos
Agregar URLs o dominios que nunca deberían ser auto-traducidos:
```
example.com
github.com
localhost
```

### 🐛 Modo de Depuración
Habilitar registro de consola para solucionar problemas de traducción

## 🏗️ Arquitectura Técnica

### 📋 Componentes
- **Manifest V3**: Arquitectura moderna de extensión Chrome
- **Content Script**: Inyecta funcionalidad de traducción en páginas web
- **Background Service Worker**: Maneja llamadas API y enrutamiento de mensajes
- **Options Page**: Interfaz completa de gestión de configuración
- **Popup Interface**: Controles de acceso rápido

### 🔄 Pipeline de Procesamiento de Texto
1. **Detección de Texto**: API TreeWalker con NodeFilter para recorrido eficiente del DOM
2. **Filtrado**: Reglas completas para omitir contenido no traducible
3. **Segmentación**: API Intl.Segmenter para división precisa de oraciones
4. **Procesamiento por Lotes**: Agrupación inteligente por contexto y similitud
5. **Traducción**: Llamadas API paralelas
6. **Visualización**: Manipulación DOM con preservación del texto original

### ⚡ Optimizaciones de Rendimiento
- **Caché LRU**: Reduce llamadas API duplicadas
- **Procesamiento por Lotes**: Agrupa textos similares para eficiencia
- **Traducción Concurrente**: Procesa múltiples lotes simultáneamente
- **Mutaciones con Debounce**: Previene re-traducción excesiva
- **Almacenamiento WeakMap**: Almacenamiento eficiente en memoria del texto original

## 🔒 Privacidad y Seguridad

- ✅ Todas las traducciones se procesan a través de endpoints API oficiales
- ✅ Las claves API se almacenan localmente en el almacenamiento seguro de Chrome
- ✅ No se recopilan ni transmiten datos a terceros
- ✅ El contenido original de la página nunca se modifica permanentemente
- ✅ El caché se almacena localmente y expira automáticamente

## 🐛 Solución de Problemas

### La página de configuración no se abre
- Hacer clic derecho en el icono de la extensión y seleccionar "Opciones"
- O ir a `chrome://extensions/` → UltraTranslate → Detalles → Opciones de extensión

### La traducción no funciona
1. Verificar si la clave API está configurada (para servicios no-Google)
2. Asegurar que la página haya terminado de cargar
3. Intentar refrescar la página
4. Verificar errores en consola (F12 → Consola)
5. Verificar que el sitio no esté en la lista de exclusión

### Traducción lenta
- Reducir tamaño de lote en configuración
- Limpiar caché si es demasiado grande
- Verificar conexión a internet
- Considerar usar Google Translate (más rápido)

## 📝 Historial de Versiones

### Versión 1.0.0
- ✨ Lanzamiento inicial con soporte multi-API
- ✨ Función de preservar texto original
- ✨ UI con tema oscuro
- ✨ 9 idiomas de interfaz
- ✨ Filtrado de texto avanzado
- ✨ Caché de traducción
- ✨ Indicadores de carga
- ✨ Características de accesibilidad
- ✨ Soporte para idiomas RTL

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar issues o pull requests.

## 📄 Licencia

Este proyecto se proporciona tal cual para uso educativo y personal.

## 📧 Soporte

Para problemas, preguntas o sugerencias:
- Abrir un issue en GitHub
- Revisar documentación existente
- Revisar sección de solución de problemas

---

Hecho con ❤️ para una mejor experiencia de traducción web