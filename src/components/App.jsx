import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));

const App = () => {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<h1>Loading....</h1>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
