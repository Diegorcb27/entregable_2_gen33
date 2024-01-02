import React, { useState } from "react";
import "./WeatherCard.css"

const WeatherCard = ({ weather, temp }) => {
  const [isCelsius, setisCelsius] = useState(true);

  const handleChangeTemp = () => {
    setisCelsius(!isCelsius);
  };

  return (
    <div>
      <article className="weather">
        <h1 className="weather__title">Weather App</h1>
        <h2 className="weather__subtitle">{`${weather?.name}, ${weather?.sys.country}`}</h2>
        <section className="weather__body">
          <header className="weather__img">
            <img
              className="weather__icon"
              src={
                weather &&
                `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
              }
            ></img>
          </header>
          <article className="weather__info">
            <h2 className="weather__info__title">
              "{weather?.weather[0].description}"
            </h2>
            <ul className="weather__list">
              <li className="weather__item">
                <span className="weather__label">Wind Speed: </span>
                <span className="weather__value">{weather?.wind.speed} m/s</span>
              </li>
              <li className="weather__item">
                <span className="weather__label">Clouds: </span>
                <span className="weather__value">{weather?.clouds.all} %</span>
              </li>
              <li className="weather__item">
                <span className="weather__label">Pressure: </span>
                <span className="weather__value">
                  {weather?.main.pressure} hPa
                </span>
              </li>
            </ul>
          </article>
        </section>
          <footer className="weather__footer">
            <h2 className="weather__temp">
              {isCelsius ? `${temp?.celsius} °C` : `${temp?.fahrenheit} °F`}
            </h2>
            <button className="weather__btn" onClick={handleChangeTemp}>Change Temperature</button>
          </footer>
       
      </article>
    </div>
  );
};

export default WeatherCard;
