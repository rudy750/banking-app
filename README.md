# 🏦 Banking App

A modern banking application built with [GitHub Spark](https://githubnext.com/projects/github-spark) that provides users with a comprehensive view of their finances, transaction history, and account management capabilities.

![Banking App](https://img.shields.io/badge/Built%20with-GitHub%20Spark-blue)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)

## ✨ About GitHub Spark

This application was created using **GitHub Spark**, an AI-native tool for building and sharing micro apps ("sparks") that integrate seamlessly with GitHub's ecosystem. 

### What is GitHub Spark?

GitHub Spark is an experimental project from GitHub Next that allows developers to:

- **Create apps through natural language**: Describe what you want to build, and Spark generates the code
- **Iterate rapidly**: Make changes by conversing with AI, seeing updates in real-time
- **Deploy instantly**: Share your apps with a simple URL
- **Leverage modern web technologies**: Built on React, TypeScript, Vite, and Tailwind CSS

### How Spark Works

1. **Natural Language Interface**: You describe your app idea in plain English
2. **AI-Powered Generation**: Spark's AI generates React components, styling, and logic
3. **Live Preview**: See your changes instantly in a live development environment
4. **Refinement**: Continue the conversation to refine features, fix bugs, or add functionality
5. **One-Click Deploy**: Deploy and share your creation with others

## 🚀 Features

- **Account Overview Dashboard**: View all account balances at a glance
- **Transaction History**: Browse and search past transactions with filtering
- **Money Transfers**: Transfer funds between accounts securely
- **Account Management**: Manage account settings and preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For cloning the repository ([Download](https://git-scm.com/))

## 🛠️ Installation

### Clone the Repository

```bash
git clone https://github.com/rudy750/banking-app.git
cd banking-app
```

### Install Dependencies

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run the linter to check for code issues:

```bash
npm run lint
```

## 🐳 GitHub Codespaces

This repository is configured to work seamlessly with [GitHub Codespaces](https://github.com/features/codespaces), providing a complete cloud-based development environment.

### Quick Start with Codespaces

1. Click the green **"Code"** button at the top of this repository
2. Select the **"Codespaces"** tab
3. Click **"Create codespace on main"**

Within a few minutes, you'll have a fully configured development environment with:

- Node.js and npm pre-installed
- All dependencies automatically installed
- VS Code extensions for React, TypeScript, and Tailwind CSS
- Port forwarding for the development server

### Running in Codespaces

Once your Codespace is ready:

```bash
npm run dev
```

The development server will start, and Codespaces will automatically forward the port. Click the popup notification or go to the **Ports** tab to open the app in your browser.

## 📁 Project Structure

```
banking-app/
├── src/
│   ├── components/     # React components
│   ├── data/          # Mock data and data utilities
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── styles/        # Additional styles
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── .devcontainer/     # GitHub Codespaces configuration
├── public/            # Static assets
├── index.html         # HTML template
├── package.json       # Dependencies and scripts
├── vite.config.ts     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5.7
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Phosphor Icons, Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
