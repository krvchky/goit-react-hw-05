import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../../services/api";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchTrendingMovies();
      if (data?.results?.length) {
        setMovies(data.results);
      } else {
        setError("No results found");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (loading) {
    return <div className={s.wrapper}>Loading...</div>;
  }

  if (error) {
    return <div className={s.wrapper}>Error: {error}</div>;
  }

  return (
    <div className={s.wrapper}>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
