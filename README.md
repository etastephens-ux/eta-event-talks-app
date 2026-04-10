# TechTalks 2026 Event Website

A modern, responsive single-page application for a technical conference schedule. This project features a **Node.js/Express** backend that serves a dynamic schedule with category-based filtering.

![License](https://img.shields.io/badge/license-ISC-green)
![Node.js](https://img.shields.io/badge/node.js-v18%2B-blue)

## 🚀 Features

- **Dynamic Schedule:** Automatically loads conference talks from a JSON data source.
- **Instant Search:** Filter talks by category (e.g., AI, Web, Cloud) in real-time.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **Dark Mode Aesthetic:** High-contrast green "Matrix-style" theme for a technical feel.
- **RESTful API:** Clean backend endpoint for schedule data retrieval.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Data:** JSON-based storage for easy updates

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (comes with Node.js)

## 🔧 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/etastephens-ux/eta-event-talks-app.git
   cd eta-event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:3000`

## 📂 Project Structure

```text
├── public/             # Static frontend files
│   ├── index.html      # Main entry point
│   ├── style.css       # Custom styling
│   └── script.js       # Frontend logic & API fetching
├── server.js           # Express server & API routes
├── talks.json          # Conference schedule data
├── package.json        # Project metadata & dependencies
└── .gitignore          # Files to exclude from version control
```

## 🌐 API Endpoints

### `GET /api/talks`
Returns the full list of conference talks and breaks.

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "The Future of AI",
    "speakers": ["Dr. Alice Smith"],
    "category": ["AI", "Future"],
    "startTime": "10:00",
    "endTime": "11:00",
    "description": "...",
    "type": "talk"
  }
]
```

## 📝 License

This project is licensed under the ISC License.
