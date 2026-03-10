import { prisma } from "../config/db.js";

const getAllWatchlist = async (req, res) => {
  const watchlist = await prisma.watchlistItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      movie: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  res.status(200).json({
    status: "Success",
    results: watchlist.length,
    data: watchlist,
  });
};

const getWatchlistItem = async (req, res) => {
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      movie: true,
    },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item not found!",
    });
  }

  // Ensure only owner can view
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to view this watchlist item!",
    });
  }

  res.status(200).json({
    status: "Success",
    data: watchlistItem,
  });
};

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // Verify the movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    res.status(404).json({
      error: "Movie not found",
    });
  }

  // Check if already added
  const existsInWatchlist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existsInWatchlist) {
    return res.status(400).json({
      error: "Movie already in the watchlist",
    });
  }

  const watchlistItem = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlistItem,
    },
  });
};

const updateWatchlistItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  // Find watchlist item
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item not found!",
    });
  }

  // Ensure only the owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to update this watchlist item!",
    });
  }

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: {
      ...(status && { status }),
      ...(rating !== undefined && { rating }),
      ...(notes && { notes }),
    },
  });

  res.status(200).json({
    status: "Success",
    message: "Watchlist item updated successfully",
    data: updatedItem,
  });
};

const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.movie.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({
      error: "Watchlist item not found!",
    });
  }
  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({
      error: "Not allowed to delete this watchlist item!",
    });
  }

  await prisma.watchlistItem.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({
    status: "Success",
    message: "Movie removed from watchlist",
  });
};

export {
  getAllWatchlist,
  getWatchlistItem,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
};
