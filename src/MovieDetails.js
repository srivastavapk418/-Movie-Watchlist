import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StartRating";
import { useKey } from "./useKey";

const key = "65340229";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  const isWatched = watched.map((mov) => mov.imdbID).includes(selectedId);
  // console.log(isWatched);

  const watchedUserRating = watched.find(
    (mov) => mov.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Actors: actors,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
  } = movie;

  // console.log(title, year);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // /* eslint-disable */
  // if (imdbRating > 8) [A, setA] = useState("");

  // if (imdbRating > 8) return <p>excellent</p>;

  //Esc key used to escape from the MovieDetails

  useKey("Escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const req = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
        );
        const data = await req.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;

      //useEffect cleanup function
      return function () {
        document.title = "usePopcorn";
        // console.log(`cleanup effect for the movie ${title}`);  //closure property
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>

            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
