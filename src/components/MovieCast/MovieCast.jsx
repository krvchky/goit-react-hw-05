import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../services/api";
import s from "./MovieCast.module.css"; 

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId)
      .then(data => setCast(data.cast || []))
      .catch(error => console.error("Error fetching movie cast:", error));
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {cast.length > 0 ? (
        <ul>
          {cast.map(({ id, profile_path, name, character }) => (
            <li key={id} className={s.actor}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "https://via.placeholder.com/200x300"
                }
                alt={name}
                className={s.actorImg}
              />
              <div>
                <h4>{name}</h4>
                <p>Role: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
