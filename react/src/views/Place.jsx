import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

export default function Place() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [place, setPlace] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const { setNotification } = useStateContext();
  useEffect(() => {
    getPlace();
  }, []);

  const isSearchDisabled = searchQuery.trim() === "";

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:8000/api/search?query=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
    setLoading(false);
  };

  const onDeleteClick = (place) => {
    if (!window.confirm("Are you sure you want to delete this place?")) {
      return;
    }
    axiosClient.delete(`/address/${place.id}`).then(() => {
      setNotification("Place was successfully deleted");
      getPlace();
    });
  };

  const getPlace = () => {
    setLoading(true);
    axiosClient
      .get("/address")
      .then(({ data }) => {
        setLoading(false);
        setPlace(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="searchInput">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
        <button
          className="btn-logout"
          onClick={handleSearch}
          disabled={isSearchDisabled || searching}
        >
          Search
        </button>
      </div>
      <h2 style={{ marginBottom: "10px" }}>My Added Places</h2>

      <div>
        {searchResults.length > 0 ? (
          <p className="alertResult"> {searchResults.length} Result Found </p>
        ) : (
          ""
        )}
      </div>
      {loading ? (
        <div className="loading">
          <CircularProgress color="inherit" />
          <p>Loading</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>FIO</th>
              <th>IP</th>
              <th>Mac-address</th>
              <th>Place</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>

          {searchResults.length > 0 ? (
            <tbody>
              {searchResults.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.FIO}</td>
                  <td>{u.ip}</td>
                  <td>{u.mac}</td>
                  <td>{u.place}</td>
                  <td>{u.comment}</td>
                  <td className="boxButton">
                    <Link to={"/place/" + u.id}>
                      <IconButton color="black">
                        <EditIcon color="inherit" fontSize="small" />
                      </IconButton>
                    </Link>
                    &nbsp;
                    <IconButton
                      aria-label="delete"
                      onClick={(ev) => onDeleteClick(u)}
                    >
                      <DeleteIcon color="black" fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {place.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.FIO}</td>
                  <td>{u.ip}</td>
                  <td>{u.mac}</td>
                  <td>{u.place}</td>
                  <td>{u.comment}</td>
                  <td className="boxButton">
                    <Link to={"/place/" + u.id}>
                      <IconButton color="black">
                        <EditIcon color="inherit" fontSize="small" />
                      </IconButton>
                    </Link>
                    &nbsp;
                    <IconButton
                      aria-label="delete"
                      onClick={(ev) => onDeleteClick(u)}
                    >
                      <DeleteIcon color="black" fontSize="small" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      )}
      <div className="card animated fadeInDown">
        {/* <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>FIO</th>
              <th>IP</th>
              <th>Mac-address</th>
              <th>Place</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <div className="loading">
              <CircularProgress color="inherit" />
            </div>
          )}
          {!loading && (
            <tbody>
              {place.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.FIO}</td>
                  <td>{u.ip}</td>
                  <td>{u.mac}</td>
                  <td>{u.place}</td>
                  <td>{u.comment}</td>
                  <td>
                    <Link to={"/place/" + u.id}>
                      <IconButton color="primary">
                        <EditIcon color="inherit" />
                      </IconButton>
                    </Link>
                    &nbsp;
                    <IconButton
                      aria-label="delete"
                      onClick={(ev) => onDeleteClick(u)}
                    >
                      <DeleteIcon color="black" />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table> */}
      </div>
    </div>
  );
}
