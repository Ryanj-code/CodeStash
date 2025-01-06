# CodeStash: A Snippet Management App

CodeStash is a user-friendly snippet manager designed to help developers organize, search, and manage their code snippets efficiently. The app supports syntax highlighting, tagging, and detailed snippet views, making it a valuable tool for coders of all levels.

---

## Features

- **Authentication:**

  - Secure login, signup, and logout functionality.

- **Snippet Management:**

  - Add, edit, and delete code snippets with ease.
  - Create or edit snippets with built in editor.

- **Search and Filters:**

  - Search snippets by title and content.
  - Filter snippets by programming language or custom tags.

- **Detailed View:**

  - Click on a snippet to access its detailed view for easier readability and management.

- **Syntax Highlighting:**
  - Built-in syntax highlighting for better code visibility.

---

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repo-url>
   ```

2. Cd into **frontend** and **backend** folders and install node modules:

   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   ```

3. Create .env files in **frontend** and **backend**

   ```bash
   frontend .env
   VITE_API_BASE_URL=<"your url">

   backend .env
   MONGO_URI=<"mongodb uri">
   PORT=<PORT>
   JWT_SECRET=<KEY>
   ```

4. Start **frontend** and **backend**
   ```bash
   frontend
   npm run dev
   backend
   nodemon or node index.js
   ```
