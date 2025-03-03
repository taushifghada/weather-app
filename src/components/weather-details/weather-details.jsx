import { Compass } from "../compass/compass";
import classes from "./weather-details.module.css";
export function WeatherDetails({
  wind,
  clouds,
  visibility,
  country,
  weatherMain,
}) {
  // Finding direction from given degree and gets direction name.
  let degree = wind.deg;
  let directionName;

  if (degree >= 23 && degree < 68) {
    directionName = "Northeast";
  } else if (degree >= 68 && degree < 113) {
    directionName = "East";
  } else if (degree >= 113 && degree < 158) {
    directionName = "Southeast";
  } else if (degree >= 158 && degree < 203) {
    directionName = "South";
  } else if (degree >= 203 && degree < 248) {
    directionName = "Southewest";
  } else if (degree >= 248 && degree < 293) {
    directionName = "West";
  } else if (degree >= 293 && degree < 338) {
    directionName = "Northwest";
  } else {
    directionName = "North";
  }

  // Includes 0 before the single digit of time.
  const getSunTimings = (timeInSeconds) => {
    const date = new Date(timeInSeconds * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let convertedHours = "" + hours;
    let convertedMinutes = "" + minutes;

    if (hours < 10) {
      convertedHours = "0" + hours;
    }

    if (minutes < 10) {
      convertedMinutes = "0" + minutes;
    }
    return `${convertedHours}:${convertedMinutes}`;
  };

  return (
    <div className={classes["weather-detail-section-container"]}>
      <div className={classes["weather-detail-section"]}>
        <div className={classes["weather-detail-item"]}>
          <div className={classes["wind-container"]}>
            <h3>{directionName}</h3>
            <p>{wind.speed} m/sec</p>
          </div>
          <Compass degree={degree} />
        </div>
        <div className={classes["weather-detail-item"]}>
          <div className={classes["time-container"]}>
            <div className={classes.time}>
              <h2>
                {getSunTimings(country.sunrise)}{" "}
                <span className={classes["light-text"]}>Sunrise</span>
              </h2>
              <h2>
                {getSunTimings(country.sunset)}{" "}
                <span className={classes["light-text"]}>Sunset</span>
              </h2>
            </div>
            <div className="sun">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#ffcc33"
                height="800px"
                width="800px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 207.628 207.628"
                xmlSpace="preserve"
                style={{ width: 50, height: 50 }}
              >
                <circle cx="103.814" cy="103.814" r="45.868" />
                <path d="M103.814,157.183c-29.427,0-53.368-23.941-53.368-53.368s23.941-53.368,53.368-53.368s53.368,23.941,53.368,53.368  S133.241,157.183,103.814,157.183z M103.814,65.446c-21.156,0-38.368,17.212-38.368,38.368s17.212,38.368,38.368,38.368  s38.368-17.212,38.368-38.368S124.97,65.446,103.814,65.446z" />
                <path d="M103.814,39.385c-4.142,0-7.5-3.358-7.5-7.5V7.5c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,36.027,107.956,39.385,103.814,39.385z" />
                <path d="M103.814,207.628c-4.142,0-7.5-3.358-7.5-7.5v-24.385c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385  C111.314,204.271,107.956,207.628,103.814,207.628z" />
                <path d="M200.128,111.314h-24.385c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S204.271,111.314,200.128,111.314z" />
                <path d="M31.885,111.314H7.5c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5  S36.027,111.314,31.885,111.314z" />
                <path d="M154.676,60.452c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.242  c2.929-2.929,7.678-2.93,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.242C158.515,59.72,156.595,60.452,154.676,60.452z" />
                <path d="M35.709,179.419c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.243  c2.929-2.929,7.678-2.929,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.243C39.548,178.687,37.629,179.419,35.709,179.419z  " />
                <path d="M171.918,179.419c-1.919,0-3.839-0.732-5.303-2.197l-17.243-17.243c-2.929-2.929-2.929-7.678,0-10.606  c2.929-2.929,7.678-2.929,10.606,0l17.243,17.243c2.929,2.929,2.929,7.678,0,10.606  C175.757,178.687,173.838,179.419,171.918,179.419z" />
                <path d="M52.952,60.452c-1.919,0-3.839-0.732-5.303-2.197L30.406,41.013c-2.929-2.929-2.929-7.677,0-10.606  c2.929-2.929,7.678-2.93,10.606,0l17.243,17.242c2.929,2.929,2.929,7.677,0,10.606C56.791,59.72,54.872,60.452,52.952,60.452z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["weather-detail-section"]}>
        <div className={classes["weather-detail-item"]}>
          <ul>
            <li>
              <p>Temp Mn.</p>
              <h3>
                {Math.ceil(weatherMain.temp_min)}&deg;<sup>c</sup>
              </h3>
            </li>
            <li>
              <p>Temp Mx.</p>
              <h3>
                {Math.ceil(weatherMain.temp_max)}&deg;<sup>c</sup>
              </h3>
            </li>
            <li>
              <p>Pressure</p>
              <h3>{weatherMain.pressure} hPa</h3>
            </li>
            <li>
              <p>Visibiliy</p>
              <h3>{visibility / 1000} km</h3>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
