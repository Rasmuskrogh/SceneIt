import { IMovies } from "./interfaces";

export const getMovies = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/movies");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postDislikedMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch("http://localhost:1337/api/disliked-movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getDislikedMovies = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/disliked-movies");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postLikedMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch("http://localhost:1337/api/liked-movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getLikedMovies = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/liked-movies");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postSeenMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch("http://localhost:1337/api/seen-movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
export const getSeenMovies = async () => {
  try {
    const response = await fetch("http://localhost:1337/api/seen-movies");

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const getMovies = async () => {

// }
// export const getMovies = async () => {

// }
