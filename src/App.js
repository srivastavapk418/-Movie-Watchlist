import { useState } from "react";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import Search from "./Search";
import NavBar from "./NavBar";
import Loader from "./Loader";
import NumResults from "./NumResults";
import Main from "./Main";
import Box from "./Box";
import MoviesList from "./MoviesList";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

// const key = "65340229";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    //   localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((mov) => mov.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              key={selectedId}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
