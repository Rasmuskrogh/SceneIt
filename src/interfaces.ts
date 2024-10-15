export interface IMovies {
  Title: string;
  Summary: string;
  Genre: string;
  Director: String;
  Actors: String;
  IMDBRating: string;
  RottenTomatoesRating: number;
  Poster: string;
  IMDBId: string;
}

export interface IButton {
  Label: string;
  OnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ClassName: string;
}

export interface IMovieContextType {
  movies: IMovies[];
  setMovies: React.Dispatch<React.SetStateAction<IMovies[]>>;
}
