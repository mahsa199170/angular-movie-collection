# 🎬 Angular Movie Collection Manager

An Angular application built as part of a coding challenge. The app allows users to search, sort, and manage a collection of movies with a polished, responsive user interface and clear application state management.

## 📌 What the App Does

- Displays a list of movies from a mock API
- Allows searching movies by title
- Enables filtering by genre
- Supports sorting by title, year, and rating
- Lets users add/remove favorites and toggle to view only favorites
- Displays full details for each movie with routing
- Includes dark/light mode theme toggle
- Handles loading and error states (loading$, error$)
- Provides image fallback for broken poster links
- Persists favorites in localStorage
- Persists theme preference in localStorage (so your dark/light mode is remembered across browser sessions)
- Persists filters and search term in sessionStorage (so your filter/search state is remembered during a session, but resets when the browser/tab is closed)
- Fully responsive layout
- Includes unit testing for components

## Setup Instructions

### Prerequisites

- Node.js (version `20.11.1` or higher)
- npm or any compatible node package manager
- Angular 20 CLI

### Installation Steps

1. **Clone or download this project**

   ```bash
   git clone <repository-url>
   cd angular-movie-collection
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the backend API**

   ```bash
   npm run start:api
   ```

   This will start the mock API server on `http://localhost:3000`

4. **Start the Angular development server**

   ```bash
   npm start
   ```

   This will start the Angular app on `http://localhost:4200`

5. **Open your browser**
   Navigate to `http://localhost:4200` to see your application

## Project Structure

angular-movie-collection/
│
├── server/
│ └── api.js # Mock Node.js API server
│
├── src/
│ ├── app/
│ │ ├── components/
│ │ │ ├── movie-card/ # Individual movie card
│ │ │ ├── movie-list/ # Movie grid display
│ │ │ ├── movie-detail/ # Movie detail view
│ │ │ └── search-bar/ # Search input component
│ │ ├── models/ # TypeScript interfaces
│ │ ├── services/ # MovieService logic
│ │ ├── app.component.\* # Root app component
│ │ └── app.routes.ts # Routing configuration
│ ├
│ ├── styles.scss # Global styling
│ └── index.html
│
├── angular.json
├── package.json
├── README.md
└── tsconfig.json
