import { ReactNode } from "react";

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

export interface IFromFields {
  label: string;
  name: string;
  type: string;
  required: boolean;
}

export interface IForm<T> {
  title: String;
  fields: IFromFields[];
  onSubmit: (values: T) => void;
  type: String;
  buttonValue: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
}

export interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  setUser: (user: UserData | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  repeat: string;
}
