import { Router } from 'express';

const router = Router();

const movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
    { id: 2, title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', year: 1999 },
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

// Sample route for movies
router.get('/', (req, res) => {
    res.json({
        movies: movies
    });
});

router.get('/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(m => m.id === movieId);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

router.post('/', (req, res) => {
    // In a real application, you would handle the request body and save the new movie to a database
    // Let implement a simple example of adding a new movie to the movies array
    const newMovie = {
        id: movies.length + 1, // This is just a simple way to generate an ID, in a real application you would use a database
        title: req.body.title,
        director: req.body.director,
        year: req.body.year
    };
    movies.push(newMovie);
    
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

router.put('/:id', (req, res) => {
    // In a real application, you would handle the request body and update the movie in the database
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === movieId);
    
    if (movieIndex !== -1) {
        movies[movieIndex] = {
            ...movies[movieIndex],
            ...req.body
        };
        res.json({ message: 'Movie updated successfully', movie: movies[movieIndex] });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

router.delete('/:id', (req, res) => {
    // In a real application, you would delete the movie from the database
    const movieId = parseInt(req.params.id);
    const movieIndex = movies.findIndex(m => m.id === movieId);
    
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.json({ message: 'Movie deleted successfully' });
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

export default router;