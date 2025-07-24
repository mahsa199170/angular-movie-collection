const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock movie data
const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
    rating: 9.3,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster:
      "https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    runtime: 142,
    language: "English",
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    director: "Francis Ford Coppola",
    rating: 9.2,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://image.tmdb.org/t/p/w1280/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    runtime: 175,
    language: "English",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
    rating: 9.0,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster: "https://image.tmdb.org/t/p/w342/vzqgEDjtqceF3KzIZ1W1iXO7ZyV.jpg",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    runtime: 152,
    language: "English",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: "Crime",
    director: "Quentin Tarantino",
    rating: 8.9,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    poster: "https://image.tmdb.org/t/p/w342/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    runtime: 154,
    language: "English",
  },
  {
    id: 5,
    title: "Forrest Gump",
    year: 1994,
    genre: "Drama",
    director: "Robert Zemeckis",
    rating: 8.8,
    description:
      "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    poster: "https://image.tmdb.org/t/p/w342/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    runtime: 142,
    language: "English",
  },
  {
    id: 6,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    director: "Lana Wachowski",
    rating: 8.7,
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    poster: "https://image.tmdb.org/t/p/w342/p96dm7sCMn4VYAStA6siNz30G1r.jpg",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    runtime: 136,
    language: "English",
  },
  {
    id: 7,
    title: "Goodfellas",
    year: 1990,
    genre: "Crime",
    director: "Martin Scorsese",
    rating: 8.7,
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    poster: "https://image.tmdb.org/t/p/w342/tX1hIHC6ORVPfGKVFCUMJBWB5Td.jpg",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    runtime: 146,
    language: "English",
  },
  {
    id: 8,
    title: "The Silence of the Lambs",
    year: 1991,
    genre: "Thriller",
    director: "Jonathan Demme",
    rating: 8.6,
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    poster: "https://image.tmdb.org/t/p/w342/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    cast: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"],
    runtime: 118,
    language: "English",
  },
];

// Get all movies
app.get("/api/movies", (req, res) => {
  const { search } = req.query;

  if (search) {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

// Get movie by ID
app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

// Get all genres
app.get("/api/genres", (req, res) => {
  const genres = [...new Set(movies.map((movie) => movie.genre))];
  res.json(genres);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Movie API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`🎬 Movie API server running on http://localhost:${PORT}`);
  console.log(`📡 Available endpoints:`);
  console.log(`   GET /api/movies - Get all movies`);
  console.log(`   GET /api/movies?search=term - Search movies`);
  console.log(`   GET /api/movies/:id - Get movie by ID`);
  console.log(`   GET /api/genres - Get all genres`);
  console.log(`   GET /api/health - Health check`);
});
