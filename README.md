# Node.js Documentation Website

A comprehensive, professional, and responsive documentation website for learning Node.js—from fundamentals to advanced topics—built with HTML, CSS, and JavaScript. Includes interactive code demos, theme toggling, smooth animations, and curated resources.

## Features
- Complete Node.js syllabus: Introduction, Getting Started, Core Concepts, Built-in Modules, NPM, Express.js, Databases, Auth & Security, REST APIs, Error Handling, Testing, Performance, WebSockets, Deployment
- Responsive design with mobile-friendly navigation
- Dark/Light theme toggle with saved preference
- Smooth animations and hover effects
- Interactive live code editor with sample snippets
- Copy-to-clipboard buttons for all code blocks
- Scroll progress bar and scroll-to-top button
- Accessibility enhancements (focus styles, reduced motion support)

## Live Demo (Local)
Open the site locally in your browser:
1. Double-click the `index.html` file, or
2. Serve with a local server (recommended for best experience):

```bash
# Option 1: Using VS Code Live Server extension
# Install the extension, open the folder, right-click index.html → "Open with Live Server"

# Option 2: Using Node's http-server
npm install -g http-server
http-server . -p 5500
# Visit http://localhost:5500
```

## Project Structure
```
node js/
├─ index.html        # Main site with all content sections
├─ styles.css        # Theme, layout, responsive styles, animations
├─ script.js         # Interactivity, editor, theme toggle, helpers
└─ README.md         # Project overview and usage
```

## Sections Overview
- Introduction: What is Node.js and why use it
- Getting Started: Installation, first app, CLI basics
- Core Concepts: Event loop, async patterns, buffers, streams, event emitters
- Built-in Modules: `fs`, `path`, `http`, `url`, `os`, `process`, `child_process`, `crypto`
- NPM: Project init, dependencies, scripts, `package.json`
- Express.js: Routing, middleware, JSON APIs
- Databases: MongoDB (Mongoose), MySQL, PostgreSQL
- Auth & Security: JWT, bcrypt, middleware patterns
- REST APIs: Best practices and full CRUD examples
- Error Handling: Custom errors, async wrappers, global handlers
- Testing: Jest unit tests, Supertest for HTTP endpoints
- Performance: Clustering, caching, compression
- WebSockets: Real-time with Socket.IO
- Deployment: Env vars, PM2, Docker

## Usage Tips
- Try the examples under the **Live Code Editor** section
- Use the **example buttons** to load different code snippets
- Use shortcuts: `Ctrl/Cmd + Enter` to run, `Ctrl/Cmd + L` to clear
- Click the **copy** icon on any code block to copy the snippet
- Toggle the theme using the moon/sun button (top-right)

## Customization
- Colors and theme variables are defined in `styles.css` under the `:root` and `[data-theme="dark"]` sections
- Navigation links map to content sections via element IDs in `index.html`
- Add new examples by extending the `codeExamples` object in `script.js`

## Requirements
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Optional: Node.js for running local servers and trying backend examples

## Creator
- Name: Priyanshu
- Email: showlittlemercy@gmail.com
- GitHub: https://github.com/showlittlemercy
- LinkedIn: https://www.linkedin.com/in/priyanshu-thakur-a47774360/
- Instagram: https://www.instagram.com/showlittlemercy/

## Contributing
Contributions are welcome! Feel free to open issues or submit PRs to improve content, examples, styling, or accessibility.

## License
This project is provided as an educational resource. You may adapt it for personal or educational use. For commercial use or redistribution, please add appropriate attribution.
