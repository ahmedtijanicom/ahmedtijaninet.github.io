# Ahmed Tijani - DigitalSeventy Landing Page

A professional, multi-language landing page for Ahmed Tijani, Founder of DigitalSeventy.
Built with HTML, CSS, and JavaScript (jQuery).

## Features
- **Elegant Black & White Design**: High contrast, minimalist, and professional.
- **Multi-language Support**: English, French, and Arabic (RTL support included).
- **Responsive**: Fully optimized for mobile, tablet, and desktop.
- **Dynamic Content**: Text loaded via JSON files for easy translation management.

## Project Structure
```
/
├── index.html          # Main entry point
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # Logic for i18n and interactions
├── lang/               # Translation files
│   ├── en.json
│   ├── fr.json
│   └── ar.json
├── logo.svg            # Logo file
└── profile.jpeg        # Profile picture
```

## How to Run Locally
Because this project uses AJAX to load language files, it **will not work** if you simply double-click `index.html` (due to CORS security policies).

You must run a local server:
1. **VS Code**: Install "Live Server" extension -> Right-click `index.html` -> "Open with Live Server".
2. **Python**: Run `python -m http.server` in the terminal and open `http://localhost:8000`.
3. **Node**: Run `npx serve` and open the provided URL.

## Deployment
This project is ready for **GitHub Pages**.
1. Upload all files to your GitHub repository.
2. Go to **Settings** > **Pages**.
3. Select the `main` branch as the source.
4. Your site will be live at `https://your-username.github.io/repo-name/`.
