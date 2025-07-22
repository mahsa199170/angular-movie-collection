# Angular Coding Challenge - Movie Collection Manager

## Overview

Welcome to the Angular Coding Challenge! You'll be building a **Movie Collection Manager** application that allows users to browse, search, and manage their movie collection. This challenge is designed to test your basic Angular skills and ability to work with APIs.

A skeleton for the project has been set up, although you may change it however you see fit --- just be sure to have a reason *why*, as for everything else. We want to know your *thought process* behind your code, rather than any specific metric of quality.

## Challenge Requirements

### Core Features to Implement:

1. **Movie List Display** - Show all movies from the API in a grid or list format
2. **Search Functionality** - Allow users to search movies by title
3. **Movie Details** - Display detailed information when a movie is clicked
4. **Responsive Design** - Make the app work on different screen sizes
5. **Loading States** - Show loading indicators while fetching data

### Bonus Features (Optional):

- Filter movies by genre
- Add/remove movies from favorites
- Sort movies by title, year, or rating
- Add a dark/light theme toggle

## Setup Instructions

### Prerequisites

- Node.js (version `20.11.1` or higher)
- npm or any compatible node package manager
- Angular 20 CLI

### Installation Steps

1. **Clone or download this project**

   ```bash
   git clone <repository-url>
   cd angular-coding-challenge
   ```

2. **Create a development branch**

   ```bash
   git checkout -b <firstname>-<lastname>-submission
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the backend API**

   ```bash
   npm run start:api
   ```

   This will start the mock API server on `http://localhost:3000`

5. **Start the Angular development server**

   ```bash
   npm start
   ```

   This will start the Angular app on `http://localhost:4200`

6. **Open your browser**
   Navigate to `http://localhost:4200` to see your application

## Your Task

### 1. Components (`src/app/`)

- **Search Bar** (`search-bar/`) - Implement search input and functionality
- **Movie List** (`movie-list/`) - Display movies in a grid/list
- **Movie Card** (`movie-card/`) - Individual movie display
- **Movie Detail** (`movie-detail/`) - Detailed movie view
- **App Component** (`app/`) - Main app layout

### 2. Service (`src/app/movies.ts`)

- Implement all HTTP methods to communicate with the API
- Add proper error handling

### 3. Global styling (`src/styles.scss`)

- Add global styles and utility classes
- Implement responsive design
- Create animations and transitions

### 4. Interfaces (`src/app/movie.ts`)

- The Movie interface is already defined
- You can extend it if needed

## API Documentation

### Base URL

```
http://localhost:3000
```

### Available Endpoints

#### 1. Get All Movies

```
GET /api/movies
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "The Shawshank Redemption",
    "year": 1994,
    "genre": "Drama",
    "director": "Frank Darabont",
    "rating": 9.3,
    "description": "Two imprisoned men bond over a number of years...",
    "poster": "https://example.com/poster1.jpg"
  }
]
```

#### 2. Search Movies

```
GET /api/movies?search={searchTerm}
```

**Parameters:**

- `search` (optional): Search term to filter movies by title

#### 3. Get Movie by ID

```
GET /api/movies/{id}
```

**Response:**

```json
{
  "id": 1,
  "title": "The Shawshank Redemption",
  "year": 1994,
  "genre": "Drama",
  "director": "Frank Darabont",
  "rating": 9.3,
  "description": "Two imprisoned men bond over a number of years...",
  "poster": "https://example.com/poster1.jpg",
  "cast": ["Tim Robbins", "Morgan Freeman"],
  "runtime": 142,
  "language": "English"
}
```

#### 4. Get Genres

```
GET /api/genres
```

**Response:**

```json
["Action", "Drama", "Comedy", "Horror", "Sci-Fi"]
```
## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── movie-list/          # TODO: Implement movie list
│   │   ├── movie-card/          # TODO: Implement movie card
│   │   ├── movie-detail/        # TODO: Implement movie detail
│   │   └── search-bar/          # TODO: Implement search bar
│   ├── services/
│   │   └── movie.service.ts     # TODO: Implement API calls
│   ├── models/
│   │   └── movie.model.ts       # Already defined
│   └── app.component.ts         # TODO: Implement app layout
├── assets/
└── styles.scss                  # TODO: Add global styles
```

## What We're Looking For

### Technical Skills:

- **Angular Fundamentals**: Components, services, signals/RxJS, dependency injection
- **TypeScript**: Proper typing and interfaces
- **HTTP Client**: Making API calls and handling responses
- **CSS/SCSS**: Styling and responsive design
- **Error Handling**: Graceful error management

### Code Quality:

- Clean, readable code
- Proper component structure
- Unit tests
- Service layer implementation
- Error handling
- Loading states

### Bonus Points:

- Good documentation
- End-to-end testing (framework of choice)
- Performance considerations
- Accessibility features
- Modern CSS (Grid/Flexbox)
- Responsive design

---

**Good luck! We're excited to see what you build!**
