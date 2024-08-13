import React, { Suspense, useEffect, useRef, useState, useCallback } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackPath = useRef(location?.state || "/movies");

  const getMovieDetails = useCallback(async () => {
    const data = await fetchMovieDetails(movieId);
    setMovie(data);
  }, [movieId]);

  useEffect(() => {
    getMovieDetails();
  }, [getMovieDetails]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const { poster_path, title, vote_average, overview, genres } = movie;

  return (
    <div className={s.wrapper}>
      <Link to={goBackPath.current} className={s.btn}>
        Go Back
      </Link>
      <div className={s.wrapperInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className={s.img}
        />
        <div className={s.textInfo}>
          <h2>{title}</h2>
          <p>User score: {vote_average}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <hr />
      <h3>Addition Information</h3>
      <ul>
        <li>
          <NavLink
            to={`cast`}
            className={({ isActive }) => (isActive ? s.active : s.inactive)}
          >
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`reviews`}
            className={({ isActive }) => (isActive ? s.active : s.inactive)}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <hr />
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
