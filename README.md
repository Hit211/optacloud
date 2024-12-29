# OptaCloud Project

This is a full-stack web application consisting of a **React** frontend powered by **Vite** and a **Node.js/Express** backend. The application allows users to view, save, and manage addresses on an interactive map, with features like geolocation and address searching.

## Project Overview

- **Frontend:** React, Vite, Leaflet (for maps)
- **Backend:** Node.js, Express.js, Axios (for HTTP requests)
- **Database:** MongoDB (for backend database storage)

## Project Structure

- `frontend/` - Contains the React front-end code.
- `backend/` - Contains the Node.js back-end code.
- `.gitignore` - Specifies files and directories to ignore in the repository.
- `README.md` - Instructions on how to run the application.

## Requirements

Before running the project, make sure you have the following software installed on your machine:

- **Node.js** (version 14 or higher) - [Download Node.js](https://nodejs.org/en/)
- **npm** (Node Package Manager) or **yarn** (npm comes bundled with Node.js)
- **MongoDB** (if you are using it for backend database storage) - [Install MongoDB](https://www.mongodb.com/try/download/community)

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Hit211/optacloud.git
cd optacloud


cd backend
npm install

PORT=8000
MONGODB_URI=mongodb://localhost:27017/optaCloudDB

Start the Backend Server
Run the backend server:
npm run dev


Set Up the Frontend
Navigate to the frontend directory and install dependencies:

cd ../frontend
npm install
npm run dev


Dependencies
Backend :-

express
axios
mongoose
dotenv


Frontend  :-

react
react-router-dom
leaflet
axios
vite
