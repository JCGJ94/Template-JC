import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { storeActions } from "../store/types";
import { fetchHelloMessage } from "../services/helloService";
import "./home.css";

const accentColors = ["#f97316", "#22d3ee", "#a855f7", "#fb7185"];

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [accentIndex, setAccentIndex] = useState(0);

  const loadMessage = async () => {
    try {
      const data = await fetchHelloMessage();
      dispatch(storeActions.setHello(data.message));
      setError(null);
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

  useEffect(() => {
    setAccentIndex((prev) => (prev + 1) % accentColors.length);
  }, [count]);

  const accentColor = accentColors[accentIndex];

  return (
    <section className="home-hero">
      <div className="home-hero__overlay">
        <div className="home-hero__brand">
          <img src="/jc-code-logo.png" alt="JC Dev logo" className="home-hero__logo" />
          <p className="home-hero__tagline">JC → DevTemplate</p>
          <h1 className="home-hero__title" style={{ color: accentColor }}>
            Welcome, dev
          </h1>
        </div>

        <div className="home-counter" style={{ borderColor: accentColor }}>
          <span className="home-counter__initials">JC</span>
          <p className="home-counter__value" style={{ color: accentColor }}>
            {count.toString().padStart(2, "0")}
          </p>
          <div className="home-counter__controls">
            <button type="button" className="home-counter__button" onClick={() => setCount((value) => value + 1)}>
              Add
            </button>
            <button
              type="button"
              className="home-counter__button home-counter__button--ghost"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="home-message">
          <p className="home-message__label">Template status</p>
          <div className="home-message__content">
            {error ? (
              <span className="home-message__error">{error}</span>
            ) : store.message ? (
              <span>{store.message}</span>
            ) : (
              <span>Loading message from the backend…</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
