# PromptSave

Curated and sharable prompt management tool for creators, developers, and marketers.

---

## 📝 Problem Statement
Prompt engineering is valuable, but people often lose their best prompts in scattered notes or apps. There is no unified, searchable, and shareable platform for managing, tagging, and organizing prompts for personal and community use.

## ✅ Solution
PromptSave provides a professional, end-to-end solution for prompt management. It allows users to save, organize, tag (with AI), and share prompts. Prompts are separated into personal vaults and community collections, making it easy to find, reuse, and share valuable prompts.

---

## ⚙️ Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **AI Tagging:** Gemini API
- **Real-time:** Socket.io

---

## 🌐 End-to-End Flow

1. **User Authentication**
   - Register/Login via email/password
   - Session managed with cookies
   - Protected routes for dashboard and vault

2. **Prompt Management**
   - Create, edit, delete prompts
   - Organize prompts into folders/libraries
   - Tag prompts using Gemini AI
   - Save prompts to personal vault or share to community

3. **Community & Personal Vault Separation**
   - Personal vault: Private prompts
   - Community: Public, sharable prompts
   - Search and filter by tags, folders, or keywords

4. **Real-time Updates**
   - Socket.io for live updates (prompt creation, deletion, library changes)

5. **AI Tagging**
   - Gemini API auto-tags prompts for better searchability

---

## 📦 API Endpoints

### Backend (Express)

#### User
- `POST /user/register` — Register new user
  - **Request:** `{ email, password }`
  - **Response:** `{ message, user }`
- `POST /user/login` — Login user
  - **Request:** `{ email, password }`
  - **Response:** `{ message, user }`
- `GET /user/logout` — Logout user
  - **Response:** `{ message }`

#### Dashboard
- `GET /dashboard` — Get user dashboard data
  - **Response:** `{ user, prompts, libraries }`

#### Prompts
- `POST /prompt/create` — Create new prompt
  - **Request:** `{ content, tags, folder }`
  - **Response:** `{ message, prompt }`
- `PUT /prompt/edit/:id` — Edit prompt
  - **Request:** `{ content, tags, folder }`
  - **Response:** `{ message, prompt }`
- `DELETE /prompt/delete/:id` — Delete prompt
  - **Response:** `{ message }`
- `GET /prompt/community` — Get community prompts
  - **Response:** `{ prompts }`

#### Libraries
- `POST /library/create` — Create new library/folder
  - **Request:** `{ name }`
  - **Response:** `{ message, library }`
- `DELETE /library/delete/:id` — Delete library
  - **Response:** `{ message }`

#### AI Tagging
- `POST /ai/tag` — Get AI-generated tags for prompt
  - **Request:** `{ content }`
  - **Response:** `{ tags }`

---

## 🔗 Frontend Requests & Responses

- **Login/Register:**
  - Request: `{ email, password }`
  - Response: `{ message, user }`
- **Dashboard:**
  - Request: (cookie/session)
  - Response: `{ user, prompts, libraries }`
- **Prompt CRUD:**
  - Create/Edit/Delete prompt via forms and buttons
  - Response: `{ message, prompt }` or `{ message }`
- **Library CRUD:**
  - Create/Delete library via modal
  - Response: `{ message, library }` or `{ message }`
- **AI Tagging:**
  - Request: `{ content }`
  - Response: `{ tags }`

---

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   ```
2. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. **Configure environment variables**
   - Set up `.env` files in both `backend` and `frontend` for API keys, DB URI, etc.
4. **Run backend**
   ```bash
   cd backend
   npm start
   ```
5. **Run frontend**
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📚 Features
- Curated prompt management
- AI-powered tagging
- Personal & community vaults
- Real-time updates
- Secure authentication
- Responsive UI

---

## 👨‍💻 Author
- GitHub: [itzadmin001](https://github.com/itzadmin001)
- Instagram: [itz__admin__01](https://instagram.com/itz__admin__01)
- LinkedIn: [Yogesh Kumar](https://www.linkedin.com/in/yogesh-kumar-558b4b26b/)

---

## 📄 License
This project is licensed under the MIT License.
