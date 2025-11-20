<div align="center">

# 🧊 Fridge‑Friend

**Reduce food waste. Save time. Cook delicious meals.**

A smart web application that leverages AI to suggest recipes based on the ingredients currently in your fridge.



[![Vite](https://img.shields.io/badge/Vite-B73C9D?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](https://fridge-friend-chi.vercel.app/) • [Report Bug](https://github.com/maliha63/fridge-friend/issues) • [Request Feature](https://github.com/maliha63/fridge-friend/issues)

</div>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#-usage)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 💡 About the Project

**Fridge-Friend** solves the daily dilemma of "What should I cook?" by utilizing the Gemini API. Instead of browsing endless recipe sites, simply input what you have on hand, and let AI generate a custom recipe for you. It's designed to be fast, mobile-responsive, and user-friendly.

---

## ✨ Key Features

### Currently Available
* 🥕 **Smart Ingredient Input**: easily add ingredients manually to your virtual fridge.
* 🤖 **AI-Powered Recipes**: Generates unique recipes using Google's Gemini API based *only* on your inputs.
* 📱 **Fully Responsive**: Optimized for a seamless experience on both mobile and desktop.
* 📜 **Recipe History**: Keep track of previously generated suggestions.
* 🎨 **Modern UI**: Clean interface styled with Tailwind CSS.

### 🚀 Upcoming (Roadmap)
* ⭐ **Favorites System**: Save your best recipes for later.
* 🛒 **Shopping List Export**: Automatically generate a list for missing ingredients.
* 🔐 **User Accounts**: Sync your fridge across devices.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Build Tool** | ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Fast development server and bundler |
| **Frontend** | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Component-based UI library |
| **AI Model** | ![Gemini](https://img.shields.io/badge/-Gemini-8E75B2?logo=google&logoColor=white) | LLM for recipe generation |
| **Styling** | ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first CSS framework |
| **Deployment** | ![Vercel](https://img.shields.io/badge/-Vercel-000000?logo=vercel&logoColor=white) | Cloud platform for static sites |

---

## 📂 Project Structure

```bash
fridge-friend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, icons
│   ├── components/      # Reusable UI components
│   ├── App.jsx          # Main Application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles (Tailwind directives)
├── .env.local           # Environment variables (Git ignored)
├── index.html           # HTML template
├── package.json         # Project dependencies & scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration

🚀 Getting Started
Follow these instructions to set up the project locally on your machine.

Prerequisites
Ensure you have the following installed:

Node.js (v14 or higher)

npm (Node Package Manager)

Installation
Clone the repository

Bash

git clone [https://github.com/maliha63/fridge-friend.git](https://github.com/maliha63/fridge-friend.git)
cd fridge-friend
Install dependencies

Bash

npm install
Configure Environment Variables Create a .env.local file in the root directory and add your Gemini API key:

Ini, TOML

VITE_GEMINI_API_KEY=your_actual_api_key_here
Note: You can get a free API key from Google AI Studio.

Start the development server

Bash

npm run dev
Open the app Visit http://localhost:5173 (or the port shown in your terminal) in your browser.

🎮 Usage
Add Ingredients: Type an ingredient (e.g., "Chicken", "Tomato") and hit enter or click add.

Generate: Click the "Find Recipes" button.

Cook: Follow the step-by-step instructions provided by the AI.

Review: Check your history tab to see past suggestions.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact
Maliha Bathool C

<div align="center"> <br /> Built with ❤️ using <b>Vite</b>, <b>React</b>, and <b>Gemini API</b> </div>
