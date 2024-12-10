import { API, BEARER } from "./constant";
import { getToken } from "./helpers";

const token: string | null = getToken();

export const getMovies = async () => {
  try {
    const response = await fetch(`${API}/movies?pagination[limit]=100`);
    if (!response.ok) {
      throw new Error("Network response was not ok, getmovies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postDislikedMovies = async (
  movieId: string | undefined,
  userId: number | undefined
) => {
  console.log(token);

  try {
    const response = await fetch(`${API}/disliked-movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${BEARER} ${token}`,
      },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
          User: {
            connect: [userId],
          },
        },
      }),
    });
    console.log("dislikedMovies post response", response);
  } catch (error) {
    console.log(error);
  }
};
export const getDislikedMovies = async (/* token: string | undefined */) => {
  try {
    const response = await fetch(
      `${API}/disliked-movies?pagination[limit]=100`,
      {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      }
    );
    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok disliked-movies");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postLikedMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch(`${API}/liked-movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getLikedMovies = async () => {
  try {
    const response = await fetch(`${API}/liked-movies?pagination[limit]=100`);
    if (!response.ok) {
      throw new Error("Network response was not ok liked-movies");
    }
    const data = await response.json();
    console.log(response);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postSeenMovies = async (movieId: string | undefined) => {
  try {
    const response = await fetch(`${API}/seen-movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
        },
      }),
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const getSeenMovies = async () => {
  try {
    const response = await fetch(`${API}/seen-movies?pagination[limit]=100`);
    if (!response.ok) {
      throw new Error("Network response was not ok seen-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteMovie = async (
  listName: string,
  id: number
): Promise<void> => {
  try {
    const response = await fetch(`${API}/${listName}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete movie with ID: ${id} from ${listName}`);
    }
  } catch (error) {
    console.error(`Error deleting movie from ${listName}:`, error);
  }
};
// export const getMovies = async () => {

// }
