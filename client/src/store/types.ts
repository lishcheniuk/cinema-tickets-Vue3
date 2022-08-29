export type MoviesDataType = {
  _id: string;
  poster: Array<string>;
  country: string;
  age_limit: string;
  description: string;
  relesed: string;
  producer: string;
  staring: string;
  genre: string;
  title: string;
  schedule: ScheduleType[];
  type: "new" | "old";
};

export type ScheduleType = {
  _id: string;
  date: string;
  places: Array<Array<"free" | "busy">>;
  movie_id: string;
  technology: "IMAX" | "4DX" | "Cinetech";
  format: "2D" | "3D";
};

export type CartType = {
  row: number;
  place: number;
  price: string;
  id: string;
};

export type OrderType = {
  places: CartType[];
  timeId: string;
  movieId: string;
  userId: string;
};

export type UserType = {
  email: string;
  password?: string;
  cpassword?: string;
  name?: string;
  _id?: string;
};
