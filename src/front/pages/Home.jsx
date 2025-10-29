import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { storeActions } from "../store/types";
import { fetchHelloMessage } from "../services/helloService";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);

  const loadMessage = async () => {
    try {
      const data = await fetchHelloMessage();
      dispatch(storeActions.setHello(data.message));
    } catch (err) {
      console.error(err);
      setError(
        "Could not fetch the message from the backend. Please check if the backend is running and accessible.",
      );
    }
  };

  useEffect(() => {
    loadMessage();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        {error ? (
          <span className="text-danger">{error}</span>
        ) : store.message ? (
          <span>{store.message}</span>
        ) : (
          <span className="text-danger">
            Loading message from the backend (make sure your python 🐍 backend is running)...
          </span>
        )}
      </div>
    </div>
  );
};
