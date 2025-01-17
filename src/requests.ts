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
          users_permissions_users: {
            connect: [userId],
          },
          movies: {
            connect: [movieId],
          },
        },
      }),
    });

    if (response.ok) {
      console.log("Disliked movie added successfully!");
    } else {
      console.log("Error in posting disliked movie", response);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getDislikedMovies = async (userId: number | undefined) => {
  try {
    const response = await fetch(
      `${API}/disliked-movies?filters[users_permissions_users][id][$eq]=${userId}&pagination[limit]=100&populate=users_permissions_users,movies`,
      {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok disliked-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const postLikedMovies = async (
  movieId: string | undefined,
  userId: number | undefined
) => {
  try {
    const response = await fetch(`${API}/liked-movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${BEARER} ${token}`,
      },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
          users_permissions_users: {
            connect: [userId],
          },
          movies: {
            connect: [movieId],
          },
        },
      }),
    });

    if (response.ok) {
      console.log("Liked movie added successfully!");
    } else {
      console.log("Error in posting liked movie", response);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getLikedMovies = async (userId: number | undefined) => {
  try {
    const response = await fetch(
      `${API}/liked-movies?filters[users_permissions_users][id][$eq]=${userId}&pagination[limit]=100&populate=users_permissions_users,movies`,
      {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok liked-movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postSeenMovies = async (
  movieId: string | undefined,
  userId: number | undefined
) => {
  try {
    const response = await fetch(`${API}/seen-movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${BEARER} ${token}`,
      },
      body: JSON.stringify({
        data: {
          IMDBId: movieId,
          users_permissions_users: {
            connect: [userId],
          },
          movies: {
            connect: [movieId],
          },
        },
      }),
    });

    if (response.ok) {
      console.log("Seen movie added successfully!");
    } else {
      console.log("Error in posting seen movie", response);
    }
  } catch (error) {
    console.log(error);
  }
};
export const getSeenMovies = async (userId: number | undefined) => {
  try {
    const response = await fetch(
      `${API}/seen-movies?filters[users_permissions_users][id][$eq]=${userId}&pagination[limit]=100&populate=users_permissions_users,movies`,
      {
        headers: {
          Authorization: `${BEARER} ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok liked-movies");
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
