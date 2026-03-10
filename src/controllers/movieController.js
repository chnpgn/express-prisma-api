import { prisma } from "../config/db.js";

// GET all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        creator: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ movies });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

// GET movie by id
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        creator: true,
        watchlist: true,
      },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
};

// CREATE movie
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      overview,
      releaseYear,
      genre,
      runtime,
      posterUrl,
      createdBy,
    } = req.body;

    const movie = await prisma.movie.create({
      data: {
        title,
        overview,
        releaseYear,
        genre,
        runtime,
        posterUrl,
        createdBy,
      },
    });

    res.status(201).json({
      message: "Movie created successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create movie" });
  }
};

// UPDATE movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.update({
      where: { id },
      data: req.body,
    });

    res.json({
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
};

// DELETE movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.movie.delete({
      where: { id },
    });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
};
