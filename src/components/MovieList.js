import "./MovieList.css";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {props.movies.map((movie, index) => (
        <div className="movie" key={movie.imdbID}>
          <img src={movie.Poster} alt="movie"></img>

          <div
            className="movie-overlay"
            // is app js per props perduodama funkcija arba add arba delete favourties
          >
            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className="add-favourites"
            >
              <FavouriteComponent />
            </div>
            <div className="movie-info">
              <span>{movie.Title}</span>
              <span>{movie.Year}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
