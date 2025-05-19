# VELO.NEW

*Empower your ideas, build with effortless innovation.*

![last-commit](https://img.shields.io/github/last-commit/KunalMeher19/Velo.new?style=flat&logo=git&logoColor=white&color=0080ff)
![repo-top-language](https://img.shields.io/github/languages/top/KunalMeher19/Velo.new?style=flat&color=0080ff)
![repo-language-count](https://img.shields.io/github/languages/count/KunalMeher19/Velo.new?style=flat&color=0080ff)

*Built with the tools and technologies:*

![Express](https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white)
![Autoprefixer](https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white)
![.ENV](https://img.shields.io/badge/.ENV-ECD53F.svg?style=flat&logo=dotenv&logoColor=black)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white)

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Testing](#testing)

## Overview

Velo.new is an innovative developer tool designed to streamline the process of building and managing web applications.

**Why Velo.new?**

This project empowers developers to create scalable applications efficiently while integrating seamlessly with modern technologies. The core features include:

- 🎨 **TypeScript Build Management:** Efficiently manages TypeScript build information, enhancing compilation and tracking.
- 🔒 **Environment Variable Configuration:** Securely integrates with external services like the Anthropic API, ensuring smooth communication.
- ⚙️ **Robust Project Structure:** Provides a solid foundation for both backend and frontend development, promoting maintainability.
- 🚀 **Dynamic User Interface Components:** Offers interactive components for real-time previews and file management, improving user experience.
- ⚡ **Automated Project Setup:** Streamlines the creation of starter projects with predefined configurations, reducing setup time.

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### Installation

Build Velo.new from the source and install dependencies:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/KunalMeher19/Velo.new
   ```

2. **Navigate to the project directory:**
   ```sh
   cd Velo.new
   ```

3. **Set up environment variables:**
   ```sh
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your Anthropic API key. You can get an API key from the [Anthropic Console](https://console.anthropic.com/).

4. **Install the dependencies for both backend and frontend:**

   **For backend:**
   ```sh
   cd be
   npm install
   ```

   **For frontend:**
   ```sh
   cd ../Frontend
   npm install
   ```

### Usage

Run the project components separately:

**For backend (from project root):**
```sh
cd be
npm run dev
```

**For frontend (from project root):**
```sh
cd Frontend
npm run dev
```

This will start both servers in development mode with hot-reloading.

### Testing

Velo.new uses the **test_framework** test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm test
```

---

[⬆ Return to top](#velo.new)