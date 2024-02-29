import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [place, setPlace] = useState({
    name: "",
    FIO: "",
    ip: "",
    mac: "",
    place: "",
    comment: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/address/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setPlace(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (place.id) {
      axiosClient
        .put(`/address/${place.id}`, place)
        .then(() => {
          setNotification("Place was successfully updated");
          navigate("/place");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/address/create", place)
        .then(() => {
          setNotification("Place was successfully created");
          navigate("/place");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {place.id && <h2>Update Place: {place.place}</h2>}
      {!place.id && <h2>New Place </h2>}
      <div className="card animated fadeInDown" style={{ padding: "10px" }}>
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input
              value={place.name}
              onChange={(ev) => setPlace({ ...place, name: ev.target.value })}
            />
            <label>IP</label>
            <input
              value={place.ip}
              onChange={(ev) => setPlace({ ...place, ip: ev.target.value })}
            />
            <label>MAC address</label>
            <input
              value={place.mac}
              onChange={(ev) => setPlace({ ...place, mac: ev.target.value })}
            />
            <label>FIO</label>
            <input
              value={place.FIO}
              onChange={(ev) => setPlace({ ...place, FIO: ev.target.value })}
            />
            <label>Place</label>
            <input
              value={place.place}
              onChange={(ev) => setPlace({ ...place, place: ev.target.value })}
            />
            <label>Comment</label>
            <input
              value={place.comment}
              onChange={(ev) =>
                setPlace({ ...place, comment: ev.target.value })
              }
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
