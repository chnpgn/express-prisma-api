import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

console.log("Database Connection String:", process.env.DATABASE_URL);

const prisma = new PrismaClient({
  adapter,
});

const userId = "1d72d29e-c18e-45bd-883c-2ccf9f4d4508";

const movies = [
  {
    title: "Shadow Protocol",
    overview: "A rogue agent uncovers a global surveillance conspiracy.",
    releaseYear: 2019,
    genre: ["Action", "Thriller"],
    runtime: 118,
    posterUrl: "https://example.com/posters/shadow-protocol.jpg",
    createdBy: userId,
  },
  {
    title: "Silent Orbit",
    overview:
      "Astronauts aboard a deep space station discover a mysterious signal.",
    releaseYear: 2021,
    genre: ["Sci-Fi", "Mystery"],
    runtime: 124,
    posterUrl: "https://example.com/posters/silent-orbit.jpg",
    createdBy: userId,
  },
  {
    title: "Golden Harvest",
    overview: "A struggling farmer fights to save his family land.",
    releaseYear: 2017,
    genre: ["Drama"],
    runtime: 110,
    posterUrl: "https://example.com/posters/golden-harvest.jpg",
    createdBy: userId,
  },
  {
    title: "Neon Streets",
    overview:
      "A detective navigates a cyberpunk city ruled by crime syndicates.",
    releaseYear: 2022,
    genre: ["Crime", "Sci-Fi"],
    runtime: 132,
    posterUrl: "https://example.com/posters/neon-streets.jpg",
    createdBy: userId,
  },
  {
    title: "The Lost Kingdom",
    overview:
      "Adventurers search for an ancient civilization hidden in the jungle.",
    releaseYear: 2018,
    genre: ["Adventure", "Fantasy"],
    runtime: 140,
    posterUrl: "https://example.com/posters/lost-kingdom.jpg",
    createdBy: userId,
  },
  {
    title: "Echoes of Yesterday",
    overview: "A historian discovers letters that change the past forever.",
    releaseYear: 2016,
    genre: ["Drama", "Romance"],
    runtime: 115,
    posterUrl: "https://example.com/posters/echoes-yesterday.jpg",
    createdBy: userId,
  },
  {
    title: "Velocity Rush",
    overview: "An underground racer risks everything for one final race.",
    releaseYear: 2020,
    genre: ["Action", "Sport"],
    runtime: 107,
    posterUrl: "https://example.com/posters/velocity-rush.jpg",
    createdBy: userId,
  },
  {
    title: "Crimson Tidefall",
    overview: "A coastal town battles a mysterious red tide phenomenon.",
    releaseYear: 2019,
    genre: ["Horror", "Thriller"],
    runtime: 103,
    posterUrl: "https://example.com/posters/crimson-tidefall.jpg",
    createdBy: userId,
  },
  {
    title: "Starlight Sonata",
    overview: "A gifted pianist struggles between fame and love.",
    releaseYear: 2015,
    genre: ["Drama", "Music"],
    runtime: 112,
    posterUrl: "https://example.com/posters/starlight-sonata.jpg",
    createdBy: userId,
  },
  {
    title: "Iron Battalion",
    overview: "Soldiers defend a strategic outpost during a brutal conflict.",
    releaseYear: 2014,
    genre: ["War", "Action"],
    runtime: 125,
    posterUrl: "https://example.com/posters/iron-battalion.jpg",
    createdBy: userId,
  },
  {
    title: "Digital Ghost",
    overview: "A hacker realizes someone else is living inside the network.",
    releaseYear: 2023,
    genre: ["Sci-Fi", "Thriller"],
    runtime: 119,
    posterUrl: "https://example.com/posters/digital-ghost.jpg",
    createdBy: userId,
  },
  {
    title: "Desert Mirage",
    overview:
      "Travelers lost in the Sahara uncover a hidden oasis civilization.",
    releaseYear: 2018,
    genre: ["Adventure", "Drama"],
    runtime: 121,
    posterUrl: "https://example.com/posters/desert-mirage.jpg",
    createdBy: userId,
  },
  {
    title: "Winter Hollow",
    overview: "A small town faces terror during an endless winter storm.",
    releaseYear: 2021,
    genre: ["Horror"],
    runtime: 99,
    posterUrl: "https://example.com/posters/winter-hollow.jpg",
    createdBy: userId,
  },
  {
    title: "Quantum Divide",
    overview: "Scientists experiment with parallel realities.",
    releaseYear: 2022,
    genre: ["Sci-Fi"],
    runtime: 134,
    posterUrl: "https://example.com/posters/quantum-divide.jpg",
    createdBy: userId,
  },
  {
    title: "Broken Symphony",
    overview:
      "A composer tries to finish his masterpiece before losing his hearing.",
    releaseYear: 2017,
    genre: ["Drama"],
    runtime: 108,
    posterUrl: "https://example.com/posters/broken-symphony.jpg",
    createdBy: userId,
  },
  {
    title: "Ocean's Secret",
    overview: "Divers discover a lost submarine carrying dangerous cargo.",
    releaseYear: 2016,
    genre: ["Adventure", "Thriller"],
    runtime: 116,
    posterUrl: "https://example.com/posters/ocean-secret.jpg",
    createdBy: userId,
  },
  {
    title: "The Clockmaker",
    overview: "A watchmaker builds a device capable of bending time.",
    releaseYear: 2020,
    genre: ["Fantasy", "Drama"],
    runtime: 113,
    posterUrl: "https://example.com/posters/clockmaker.jpg",
    createdBy: userId,
  },
  {
    title: "Dark Horizon",
    overview: "A group of survivors tries to escape a collapsing planet.",
    releaseYear: 2024,
    genre: ["Sci-Fi", "Adventure"],
    runtime: 129,
    posterUrl: "https://example.com/posters/dark-horizon.jpg",
    createdBy: userId,
  },
  {
    title: "Midnight Runaway",
    overview: "Two strangers flee across the country with a secret suitcase.",
    releaseYear: 2019,
    genre: ["Crime", "Drama"],
    runtime: 105,
    posterUrl: "https://example.com/posters/midnight-runaway.jpg",
    createdBy: userId,
  },
  {
    title: "Garden of Whispers",
    overview: "A botanist discovers plants that communicate with humans.",
    releaseYear: 2023,
    genre: ["Fantasy", "Mystery"],
    runtime: 111,
    posterUrl: "https://example.com/posters/garden-whispers.jpg",
    createdBy: userId,
  },
];

const main = async () => {
  console.log("Seeding movies ....");

  for (const movie of movies) {
    await prisma.movie.create({
      data: movie,
    });

    console.log(`Created movie : ${movie.title}`);
  }

  console.log("Seeding completed!!!");
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
