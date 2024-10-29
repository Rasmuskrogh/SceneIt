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
  value?: string;
  handleChangeInputValues?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IForm<T> {
  title: String;
  fields: IFromFields[];
  onSubmit: (values: T) => void;
  type: String;
  buttonValue: string;
  isEditable?: boolean;
  toggleEdit?: () => void;
}

export interface IAccountFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
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
  userData: UserData | null;
  isLoading: boolean;
  setUserData: (user: UserData | null) => void;
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

export interface LoginFormData {
  username: string;
  password: string;
}

export interface IListMovieProps extends IMovies {
  ActiveButton: number;
}
