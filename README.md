# Compass Project

## 📌 Project Overview
**Compass** is a web application built with **React** and **Node.js (Express)**, providing a GUI interface for **AI-assisted Compass high-level synthesis optimization**.

Currently, only the functionality to **invoke Vitis HLS** has been implemented.

**Main files**:
- `server.js` (Backend server)
- `App.js` (Frontend application)

**Generally, you only need to modify `server.js` and `App.js` to get the project up and running.**

---

## 🚀 Installation & Running

### 1️⃣ **Clone the project**
```bash
git clone https://github.com/Noel23333/Compass.git
cd Compass
```

### 2️⃣ **Install dependencies**
```bash
npm install
```

### 3️⃣ **Run the project**
#### **Start the backend (Server)**
```bash
node server/server.js
```

#### **Start the frontend (React)**
```bash
npm start
```

By default, the project will run:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:5000`

---

## ⚙️ Key Configuration

### **🔹 Modify the backend (server.js)**
`server.js` is the main file for the Express server, handling API requests. You can configure the following in `server/server.js`:
- Set up API routes
- Connect to a database (if applicable)
- Change the server port (default: `5000`)

### **🔹 Modify the frontend (App.js)**
`App.js` is the entry file for the React app. In `src/App.js`, you can:
- Modify the UI
- Adjust API call logic
- Add interactive features

---

## ✨ Directory Structure
```bash
Compass/
├── node_modules/        # Dependencies
├── public/              # Static assets
├── server/              # Backend code
│   ├── server.js        # Express server
├── src/                 # Frontend code
│   ├── App.js           # React entry file
│   ├── components/      # React components
│   ├── pages/           # React pages
├── package.json         # Dependencies & configuration
├── README.md            # Project documentation
```

---

## 🔗 Related Links
- [🌐 GitHub Repository](https://github.com/Noel23333/Compass)
- [📖 Express Official Documentation](https://expressjs.com/)
- [⚛️ React Official Documentation](https://react.dev/)

---

## 📢 Contributions & Feedback
If you have any questions or suggestions, feel free to submit an Issue or a Pull Request!
```

---

This version is now in **English**. Let me know if you'd like any further modifications or additions! 🚀
