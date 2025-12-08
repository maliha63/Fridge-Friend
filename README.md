# Fridge‑Friend 🥖

A smart web app that suggests recipes based on the ingredients you already have in your fridge.

---<img width="1366" height="768" alt="Fridge Friend" src="https://github.com/user-attachments/assets/0ae8c24e-e603-456c-b8e4-f78d6188f764" />


## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Usage](#usage)
* [Scripts](#scripts)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Demo

Live version: [Fridge‑Friend](https://fridge-friend-chi.vercel.app/)

---

## Features

* **Ingredient Input**: Add your fridge ingredients manually
* **Recipe Suggestions**: AI-powered suggestions using Gemini API
* **Responsive UI**: Works on mobile and desktop
* **Favorites**: Save your favorite recipes (planned feature)
* **History**: Keep track of previously suggested recipes
* **Shopping List**: Export missing ingredients (planned feature)
* **Favicon**: Polished app icon for browser tab

---

## Tech Stack

* **Vite** — Modern build tool
* **React / Vanilla JS** — User interface
* **Gemini API** — AI-powered recipe suggestions
* **CSS / Tailwind CSS** — Styling
* **Vercel** — Deployment

---

## Project Structure

```
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── src/
│   ├── main.js              # Entry point JS
│   ├── App.js               # Main App component
│   ├── components/          # Reusable components
│   └── assets/              # Images, favicon, etc.
└── .env.local               # Environment variables (API key)
```

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/maliha63/fridge-friend.git
cd fridge-friend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env.local`** and add your API key

```
VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

4. **Run development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

---

## Usage

1. Open the app in your browser (`http://localhost:3000`)
2. Enter ingredients available in your fridge
3. Click **Find Recipes**
4. Browse suggestions or save favorites

---

## Scripts

* `npm run dev` — Start development server
* `npm run build` — Build production-ready app

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Make changes and test locally
4. Commit (`git commit -m "Add feature"`)
5. Push (`git push origin feature/my-feature`)
6. Open a Pull Request

**Tips:**

* Follow existing code style
* Test your changes locally before submitting
* Document new features / changes in the README

---

## License

This project is licensed under the MIT License.

---

## Contact

* **Author**: Maliha Bathool C — [malihabathoolc@gmail.com](mailto:malihabathoolc@gmail.com)
* **GitHub**: [https://github.com/maliha63](https://github.com/maliha63)
* **Live App**: [https://fridge-friend-chi.vercel.app/](https://fridge-friend-chi.vercel.app/)

---

Built with ❤️ using Vite, React, and Gemini API
