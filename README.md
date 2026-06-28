# HackNest - Frontend

HackNest is a modern, responsive web application designed for students to find hackathons, form teams, and manage their profiles. This repository contains the frontend client, built with React and Vite.

## Tech Stack
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (Custom sleek SaaS-like UI)
- **Routing:** React Router DOM
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather Icons)

## Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root of the frontend directory and add the backend API URL:
   ```env
   VITE_API_URL=http://localhost:8080/api
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment
This project is configured to be easily deployed on Vercel.
- The build command is `npm run build`
- The output directory is `dist`.
