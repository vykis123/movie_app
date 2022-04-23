import "./SearchBox.css";

const SearchBox = (props) => {
  return (
    <div className="col">
      <div className="favourites-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="rgb(210, 77, 87)"
          className="bi bi-person-heart"
          viewBox="0 0 16 16"
        >
          <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
        </svg>
        {props.favourites == 0 ? (
          ""
        ) : (
          <span className="favourites-box-text">
            {props.favourites.length} Favourites
          </span>
        )}
      </div>
      <input
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        className="form-control"
        placeholder="Type to search..."
      ></input>
    </div>
  );
};

export default SearchBox;
