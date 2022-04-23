import { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  // console.log(favourites);

  // pagal tai, kas irasoma, yra kvieciama per API.
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=95c3cc7b`;

    const response = await fetch(url);
    const responseJson = await response.json();

    //Fukcija kvieciama, kai per search yra gaunamas kazkoks rezultatas. Jei jis tuscias, tada nekvieciamas
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  // Kai search value pasikeicia searche is kart atliekamas fukcijos iskvetimas
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  // ant page load, kadangi jokiu dependacie funkciju neikelta, atnaujinamas sarasas is local storage del favourite mvoies
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );
    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  //Ikeliamas state ray i local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    // Patikrinu ar toks filmas jau yra
    const filmAlreadyExists = favourites.some(
      (film) => film.imdbID === movie.imdbID
    );
    //Jeigu yra, nebekeliu i array. Jei nera, toliau keliu i array
    if (filmAlreadyExists) return;
    // sukuriama nauja array kopija
    const newFavouriteList = [...favourites, movie];
    // Ir tada atnaujinama array su naujais filmais
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    // is array saraso isfiltruojami visi filmai, kurie neatitinka pagal id i nauja aray
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    //Tada nauja array ikeliama i bendra sarasa state
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="movie-app">
      <div className="row row-top">
        <MovieListHeading heading="Movies" />
        <SearchBox
          favourites={favourites}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </div>
      <div className="row row-bottom">
        <MovieList
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
        />
      </div>

      <div className="row row-top">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row row-bottom">
        {favourites != 0 ? (
          <MovieList
            movies={favourites}
            handleFavouritesClick={removeFavouriteMovie}
            favouriteComponent={RemoveFavourites}
          />
        ) : (
          <p className="favourites-error">No favourite movies yet mate ! </p>
        )}
      </div>
    </div>
  );
}

export default App;
