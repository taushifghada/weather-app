import { WeatherDetails } from "../weather-details/weather-details";
import { ShowTemperature } from "../show-temperature/show-temperature";
import { useEffect, useState } from "react";

import classes from "./weather.module.css";
import { BackButton } from "../back-button/back-button";
import { LocationForm } from "../location-form/location-form";

// API endpoints.
const WEATHER_DATA_URL = "https://api.openweathermap.org/data/2.5/weather";
const DIRECT_GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct";
const API_KEY = "80f4f692fed210a4ab8bd0fd5db83e4d";

// Shows weather card.
export function Weather() {
  const [enteredCity, setEnteredCity] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [chosenPlaceState, setChosenPlaceState] = useState("-1");

  const [geocodeResult, setGeocodeResult] = useState([]);
  const [weather_info, setWeatherInfo] = useState({});

  const [validationError, setValidationError] = useState({ error: "" });
  const [error, setError] = useState({ error: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isChoosenCityDataSubmitting, setIsChosenCityDataSubmitting] =
    useState(false);

  const [showTemp, setShowTemp] = useState(false);

  // Handle city name input.
  const cityNameInputHandler = (e) => {
    setEnteredCity(e.target.value.trim());
  };

  // Handle country code drop-down.
  const countryCodeChangeHandler = (e) => {
    setCountryCode(e.target.value);
  };

  // Handle choose between two or more matching cities.
  const choosePlaceChangeHandler = (e) => {
    console.log(e.target.value);
    setChosenPlaceState(e.target.value);
  };

  // resetting the whole state variables.
  const resetState = () => {
    setEnteredCity("");
    setCountryCode("IN");
    setChosenPlaceState("0");
    setGeocodeResult([]);
    setWeatherInfo({});
  };

  // Handle back button.
  const backButtonHandler = () => {
    resetState();
    setShowTemp(false);
  };

  // Gets geo code for entered city and country.
  const getGeocoding = async (cityName, countryCode) => {
    const res = await fetch(
      `${DIRECT_GEOCODING_URL}?q=${cityName},${countryCode}&limit=5&appid=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      throw Error(data.message);
    }

    return data;
  };

  // Gets weather data of choosen city by the user.
  const getWeatherData = async (city, state, country) => {
    const res = await fetch(
      `${WEATHER_DATA_URL}?q=${city},${state},${country}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    if (!res.ok) {
      throw Error(data.message);
    }

    return data;
  };

  // Submits form for the geocoding of the entered location.
  const submitGeocodeHandler = async () => {
    if (enteredCity === "") {
      setValidationError({ error: "Field must not be blank!" });
      return;
    }

    if (!isNaN(enteredCity)) {
      setValidationError({ error: "city name must be a string!" });
      return;
    }

    if (enteredCity.length > 10) {
      setValidationError({
        error: "city name must not be greater than 10 letters",
      });
      return;
    }

    setValidationError({ error: "" });
    setError({ error: "" });
    setSubmitting(true);

    try {
      const data = await getGeocoding(enteredCity, countryCode);

      if (data.length < 1) {
        setError({ error: "Please enter valid data!" });
      } else {
        const geocode_result = data.map((result) => ({
          state: result.state,
          city: result.name,
        }));
        setGeocodeResult(geocode_result);
      }
    } catch (error) {
      setError({ error: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  // Submits form after choosing the city among the matching city results.
  const submitChooseCityHandler = async () => {
    if (chosenPlaceState === "-1") {
      setValidationError({ error: "Please select your city!" });
      return;
    }

    setValidationError({ error: "" });
    setError({ error: "" });
    setIsChosenCityDataSubmitting(true);

    try {
      const city = geocodeResult[chosenPlaceState].city;
      const state = geocodeResult[chosenPlaceState].state;

      const data = await getWeatherData(city, state, countryCode);

      if (data.length < 1) {
        setError({ error: "Please enter valid city!" });
      } else {
        setWeatherInfo(data);
        setShowTemp(true);
      }
    } catch (error) {
      setError({ error: error.message });
    } finally {
      setIsChosenCityDataSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="background"
        style={{ gap: 20, display: "flex", justifyContent: "center" }}
      >
        {error.error && (
          <div className="error">
            <p>{error.error}</p>
          </div>
        )}
        {validationError.error && (
          <div className="error">
            <p>{validationError.error}</p>
          </div>
        )}
        {!showTemp && (
          <LocationForm
            cityName={enteredCity}
            countryCode={countryCode}
            places={geocodeResult}
            chosenPlaceState={chosenPlaceState}
            isCityDataSubmitting={submitting}
            isChoosenCityDataSubmitting={isChoosenCityDataSubmitting}
            error={error.error}
            onInputChange={cityNameInputHandler}
            onCountryCodeChange={countryCodeChangeHandler}
            onChoosePlaceHandler={choosePlaceChangeHandler}
            onClickBack={backButtonHandler}
            onSubmitGeocode={submitGeocodeHandler}
            onSubmitChooseCity={submitChooseCityHandler}
          />
        )}

        {showTemp && (
          <div className={classes["weather-container"]}>
            <div className={classes["city-container"]}>
              <div>
                <BackButton
                  onClick={backButtonHandler}
                  // style={{ position: "absolute", left: 10, top: 10 }}
                />
              </div>
              <div>
                <h1 className={classes.city}>{weather_info.name}</h1>
              </div>
              <div></div>
            </div>

            <ShowTemperature
              temp={weather_info["main"]["temp"]}
              weather={weather_info["weather"][0]}
              feelsLike={weather_info["main"].feels_like}
              humidity={weather_info["main"].humidity}
              date={weather_info["dt"]}
            />
            <WeatherDetails
              wind={weather_info["wind"]}
              clouds={weather_info["clouds"]}
              visibility={weather_info["visibility"]}
              country={weather_info["sys"]}
              weatherMain={weather_info["main"]}
            />
          </div>
        )}
      </div>
    </>
  );
}
