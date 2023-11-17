import prisma from "../src/prisma/Prisma";
import HashPassword from "../src/utils/HashPassword";

const main = async () => {
  console.log("Start seeding");
  let passuser = await HashPassword.hash("opopop");
  let passadmin = await HashPassword.hash("opopop");
  interface userProps{
    username: string;
    last_name: string;
    first_name: string;
    password: string;
    email: string;
    phone_number: string;
    photo_profile: string;
    is_admin: boolean;
  }
  const users: userProps[] = [
    {
      username: 'admin',
      last_name: "lisa",
      first_name: "lisa",
      password: passadmin,
      email: 'admin@gmail.com',
      phone_number: '08123456789',
      photo_profile: 'pp.svg',
      is_admin: true
    },
    {
      username: 'user',
      last_name: "uwu",
      first_name: "sa",
      password: passuser,
      email: 'user@gmail.com',
      phone_number: '08123456789',
      photo_profile: 'pp.svg',
      is_admin: false
    }
  ]

  async function insertUser() {
    for (const user of users) {
      await prisma.user.create({
        data: {
          username: user.username,
          last_name: user.last_name,
          first_name: user.first_name,
          password: user.password,
          email: user.email,
          phone_number: user.phone_number,
          photo_profile: user.photo_profile,
          is_admin: user.is_admin,
        },
      });
    }
  }

  await insertUser().catch((e) => {
    throw e;
  });
  
  interface FilmGenre {
    name: string;
  }

  const genres = [
    { name: 'Action' },
    { name: 'Fantasy' },
    { name: 'Drama' },
    { name: 'Mystery' },
    { name: 'Comedy' },
    { name: 'Science Fiction' },
    { name: 'Romance' },
    { name: 'Thriller' },
    { name: 'Horror' },
    { name: 'Adventure' },
    { name: 'Crime' },
    { name: 'Animation' },
    { name: 'Family' },
    { name: 'Documentary' },
    { name: 'Biography' },
    { name: 'History' },
    { name: 'War' },
    { name: 'Musical' },
    { name: 'Sport' },
    { name: 'Western' },
    { name: 'Superhero' },
    { name: 'Spy' },
    { name: 'Political' },
    { name: 'Fantasy Adventure' },
    { name: 'Historical Fiction' },
    { name: 'Romantic Comedy' },
    { name: 'Sci-Fi Thriller' },
    { name: 'Supernatural' },
    { name: 'Film Noir' },
    { name: 'Slice of Life' },
    { name: 'Psychological Thriller' },
    { name: 'Space Opera' },
  ];

  async function insertGenre() {
    for(const genre of genres){
      await prisma.genre.create({
        data:{
          genre_name: genre.name,
        }
      })
    }
  }

  await insertGenre().catch((e) => {
    throw e;
  });

  interface Film {
    title: string;
    description: string;
    film_path: string;
    film_poster: string;
    film_header: string;
    date_release: Date;
    duration: number;
    user_id: number;
  }

  const films: Film[] = [
    {
      title: 'Fast X',
      description: 'Over many missions and against impossible odds, Dom Toretto and his family have...',
      film_path: 'film1.mp4',
      film_poster: 'film1_poster.jpg',
      film_header: 'film1_header.jpg',
      date_release: new Date('2023-05-19'),
      duration: 142,
      user_id: 2,
    },
    {
      title: 'Mission: Impossible - Dead Reckoning Part One',
      description: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet...',
      film_path: 'film2.mp4',
      film_poster: 'film2_poster.jpg',
      film_header: 'film2_header.jpg',
      date_release: new Date('2023-07-12'),
      duration: 164,
      user_id: 2,
    },
    {
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual...',
      film_path: 'film3.mp4',
      film_poster: 'film3_poster.jpg',
      film_header: 'film4_header.jpg',
      date_release: new Date('1994-09-23'),
      duration: 142,
      user_id: 2,
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as The Joker emerges from his mysterious past, he wreaks...',
      film_path: 'film4.mp4',
      film_poster: 'film4_poster.jpg',
      film_header: 'film4_header.jpg',
      date_release: new Date('2008-07-18'),
      duration: 152,
      user_id: 2,
    },
    {
      title: 'The Matrix',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality...',
      film_path: 'film5.mp4',
      film_poster: 'film5_poster.jpg',
      film_header: 'film5_header.jpg',
      date_release: new Date('1999-03-31'),
      duration: 136,
      user_id: 2,
    },
    {
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits...',
      film_path: 'film6.mp4',
      film_poster: 'film6_poster.jpg',
      film_header: 'film6_header.jpg',
      date_release: new Date('1994-10-14'),
      duration: 154,
      user_id: 2,
    },
    {
      title: 'The God Father',
      description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine...',
      film_path: 'film7.mp4',
      film_poster: 'film7_poster.jpg',
      film_header: 'film7_header.jpg',
      date_release: new Date('1972-03-24'),
      duration: 175,
      user_id: 2,
    },
    {
      title: 'Forrest Gump',
      description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other...',
      film_path: 'film8.mp4',
      film_poster: 'film8_poster.jpg',
      film_header: 'film8_header.jpg',
      date_release:new Date('1994-07-06'),
      duration: 142,
      user_id: 2,
    },
    {
      title: 'Fight Club',
      description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club...',
      film_path: 'film9.mp4',
      film_poster: 'film9_poster.jpg',
      film_header: 'film9_header.jpg',
      date_release: new Date('1999-10-15'),
      duration: 139,
      user_id: 2,
    },
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      film_path: 'film10.mp4',
      film_poster: 'film10_poster.jpg',
      film_header: 'film10_header.jpg',
      date_release: new Date('2010-07-16'),
      duration: 148,
      user_id: 2,
    },
    {
      title: 'Avatar',
      description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn...',
      film_path: 'film11.mp4',
      film_poster: 'film11_poster.jpg',
      film_header: 'film11_header.jpg',
      date_release: new Date('2009-12-18'),
      duration: 162,
      user_id: 2,
    },
    {
      title: 'Titanic',
      description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the...',
      film_path: 'film12.mp4',
      film_poster: 'film12_poster.jpg',
      film_header: 'film12_header.jpg',
      date_release: new Date('1997-12-19'),
      duration: 195,
      user_id: 2,
    },
    {
      title: 'The Avengers',
      description: 'Earth\'s mightiest heroes must come together and learn to fight as a team...',
      film_path: 'film13.mp4',
      film_poster: 'film13_poster.jpg',
      film_header: 'film13_header.jpg',
      date_release: new Date('2012-05-04'),
      duration: 143,
      user_id: 2,
    },
    {
      title: 'Jurassic Park',
      description: 'During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur...',
      film_path: 'film14.mp4',
      film_poster: 'film14_poster.jpg',
      film_header: 'film14_header.jpg',
      date_release: new Date('1993-06-11'),
      duration: 127,
      user_id: 2,
    },
    {
      title: 'Eternal Sunshine of the Spotless Mind',
      description: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories...',
      film_path: 'film15.mp4',
      film_poster: 'film15_poster.jpg',
      film_header: 'film15_header.jpg',
      date_release: new Date('2004-03-19'),
      duration: 108,
      user_id: 2,
    },
    {
      title: 'The Lion King',
      description: 'A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery...',
      film_path: 'film16.mp4',
      film_poster: 'film16_poster.jpg',
      film_header: 'film16_header.jpg',
      date_release: new Date('1994-06-15'),
      duration: 88,
      user_id: 2,
    },
    {
      title: 'Interstellar',
      description: 'A team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival...',
      film_path: 'film17.mp4',
      film_poster: 'film17_poster.jpg',
      film_header: 'film17_header.jpg',
      date_release: new Date('2014-11-07'),
      duration: 169,
      user_id: 2,
    },
    {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family, and the terrible evil that haunts the magical world...',
      film_path: 'film18.mp4',
      film_poster: 'film18_poster.jpg',
      film_header: 'film18_header.jpg',
      date_release: new Date('2001-11-16'),
      duration: 152,
      user_id: 2,
    }
  ];


  async function insertFilm() {
    for (const film of films) {
      await prisma.film.create({
        data: {
          title: film.title,
          description: film.description,
          film_path: film.film_path,
          film_poster: film.film_poster,
          film_header: film.film_header, // Fixed typo in the property name
          date_release: film.date_release,
          duration: film.duration,
          id_user: film.user_id,
        },
      });
    }
  }

  for (let i = 0; i < 10; i++) {
    await insertFilm().catch((e) => {
      throw e;
    });
  } // Added closing brace for the loop

  // Film Genres
  const filmGenres: { filmId: number; genreId: number }[] = [
    // ... (previous code)
  ];

  async function insertFilmGenre() {
    for (const fg of filmGenres) {
      await prisma.film_genre.create({
        data: {
          film_id: fg.filmId,
          genre_id: fg.genreId,
        },
      });
    }
  }

  await insertFilmGenre().catch((e) => {
    throw e;
  });

  console.log("Selesai seeding");
  console.log(users, genres, films, filmGenres);
};

main();