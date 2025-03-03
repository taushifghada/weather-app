import classes from "./show-temperature.module.css";
import countryCodes from "../../assets/country-codes.json";
import { BackButton } from "../back-button/back-button";
import { useEffect, useState } from "react";

const monthNames = [
  { index: 0, name: "January" },
  { index: 1, name: "February" },
  { index: 2, name: "March" },
  { index: 3, name: "April" },
  { index: 4, name: "May" },
  { index: 5, name: "June" },
  { index: 6, name: "July" },
  { index: 7, name: "August" },
  { index: 8, name: "September" },
  { index: 9, name: "October" },
  { index: 10, name: "November" },
  { index: 11, name: "December" },
];

const imageUrlFirstPart = "https://openweathermap.org/img/wn/";
const imageUrlLastPart = "@2x.png";

export function ShowTemperature({ temp, weather, feelsLike, humidity, date }) {
  const [imageURL, setImageUrl] = useState(null);

  const { icon } = weather;

  // Setting weather icon url.
  useEffect(() => {
    if (!icon) {
      return;
    }
    setImageUrl(imageUrlFirstPart + `${icon}` + imageUrlLastPart);
  }, [icon]);

  // Gets the date of today.
  const getDate = () => {
    const transformDate = new Date(date * 1000);

    const day = transformDate.getDate();
    const month = transformDate.getMonth();
    return `Today, ${day} ${monthNames[month].name}`;
  };

  return (
    <>
      <div className={classes["temprature"]}>
        <div className={classes["temprature-date-degree-container"]}>
          <h1>
            {Math.ceil(temp)}
            <span className={classes.degree}>&deg;</span>
            <span className={classes["c-letter"]}>c</span>
          </h1>
          <p className={classes.date}>{getDate()}</p>
        </div>
        <div className={classes["weather-icon"]}>
          <img src={imageURL} />
        </div>
        <div className={classes["weather-main-container"]}>
          <h3>{weather.main}</h3>
          <table className={classes.table}>
            <tbody>
              <tr>
                <td>Feels Like</td>
                <td></td>
                <td>{feelsLike} %</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td></td>
                <td>{humidity} %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
