import prisma from "../src/prisma/Prisma";

const seed = async () => {
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
      password: 'admin',
      email: 'admin@gmail.com',
      phone_number: '08123456789',
      photo_profile: 'pp.svg',
      is_admin: true
    },
    {
      username: 'user',
      last_name: "uwu",
      first_name: "sa",
      password: 'user',
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

  const genres: FilmGenre[] = [
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
  ];

  // Films
  async function insertFilm(){
    for(const film of films){
      await prisma.film.create({
        data:{
          title: film.title,
          description: film.description,
          film_path: film.film_path,
          film_poster: film.film_poster,
          film_header: film.film_header,
          date_release: film.date_release,
          duration: film.duration,
          id_user: film.user_id,
        }
      })
    }
  }

  await insertFilm().catch((e) => {
    throw e;
  })

  

  // Film Genres
  const filmGenres: { filmId: number; genreId: number }[] = [
    { filmId: 1, genreId: 1 },
    { filmId: 1, genreId: 2 },
    { filmId: 1, genreId: 5 },
    { filmId: 1, genreId: 6 },
    { filmId: 1, genreId: 10 },
    { filmId: 2, genreId: 5 },
    { filmId: 2, genreId: 6 },
    { filmId: 3, genreId: 4 },
    { filmId: 3, genreId: 8 },
    { filmId: 4, genreId: 3 },
    { filmId: 4, genreId: 7 },
    { filmId: 4, genreId: 9 },
    { filmId: 5, genreId: 3 },
    { filmId: 5, genreId: 7 },
    { filmId: 5, genreId: 9 },
    { filmId: 6, genreId: 3 },
    { filmId: 6, genreId: 4 },
    { filmId: 6, genreId: 8 },
    { filmId: 7, genreId: 3 },
    { filmId: 7, genreId: 4 },
    { filmId: 7, genreId: 8 },
    { filmId: 8, genreId: 3 },
    { filmId: 8, genreId: 4 },
    { filmId: 8, genreId: 8 },
    { filmId: 9, genreId: 3 },
    { filmId: 9, genreId: 7 },
    { filmId: 9, genreId: 8 },
  ];

  async function insertFilmGenre(){
    for (const fg of filmGenres){
      await prisma.film_genre.create({
        data: {
          film_id: fg.filmId,
          genre_id: fg.genreId,
        }
      })
    }
  }

  await insertFilmGenre().catch((e) => {
    throw e;
  })

  console.log("Selese seeding");
  await prisma.$disconnect();
};

export default seed;
