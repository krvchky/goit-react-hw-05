import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovieSearch } from "../../services/api";
import s from "./MoviesPage.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    const getData = async () => {
      if (!searchQuery) return;

      try {
        const data = await fetchMovieSearch(searchQuery);
        setMovies(data?.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError(error.message);
      }
    };

    getData();
  }, [searchQuery]);

  const handleSearchSubmit = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  const handleChangeFilter = (newValue) => {
    setSearchParams({ query: newValue });
  };

  return (
    <div className={s.wrapper}>
      <SearchBar
        filterValue={searchQuery}
        handleChangeFilter={handleChangeFilter}
        handleSearchSubmit={handleSearchSubmit}
      />
      {error ? <div>Error: {error}</div> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
