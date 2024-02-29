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
  const [searchValue, setSearchValue] = useState("");
  const [place, setPlace] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  useEffect(() => {
    getPlace();
  }, []);

  const onDeleteClick = (place) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
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
      <h2 style={{ marginBottom: "10px" }}>My added places</h2>
      <div className="searchWr">
        <input
          placeholder="Search"
          type="text"
          style={{ borderRadius: "5px" }}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        {searchValue && (
          <div className="clearSearch" onClick={() => setSearchValue("")}>
            <ClearIcon size={25} />
          </div>
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
          <tbody>
            {place
              .filter((obj) => {
                if (
                  obj.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((u) => (
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
