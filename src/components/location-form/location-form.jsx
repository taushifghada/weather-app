import classes from "./location-form.module.css";
import countryCodes from "../../assets/country-codes.json";
import { BackButton } from "../back-button/back-button";

// Add location form
export function LocationForm({
  cityName,
  countryCode,
  places,
  chosenPlaceState,
  isCityDataSubmitting,
  isChoosenCityDataSubmitting,
  error,
  onInputChange,
  onCountryCodeChange,
  onChoosePlaceHandler,
  onClickBack,
  onSubmitGeocode,
  onSubmitChooseCity,
}) {
  const submitLocationFormHandler = (e) => {
    e.preventDefault();
    onSubmitGeocode();
  };
  const submitChooseStateFormHandler = (e) => {
    e.preventDefault();
    onSubmitChooseCity();
  };

  const backButtonHandler = () => {
    onClickBack();
  };

  if (places.length > 0 && !error) {
    return (
      <>
        <form className={classes.form} onSubmit={submitChooseStateFormHandler}>
          <select
            name="places"
            value={chosenPlaceState}
            onChange={onChoosePlaceHandler}
          >
            <option value="-1">Select your city</option>
            {places.map((place, i) => (
              <option value={i} key={i} name={i}>{`${place.city}${
                place.state ? `, ${place.state}` : ""
              }`}</option>
            ))}
          </select>
          <div className={classes.actions} style={{ display: "flex", gap: 5 }}>
            <button
              type="button"
              name="back"
              disabled={isChoosenCityDataSubmitting}
              onClick={backButtonHandler}
            >
              Back
            </button>
            <button
              type="submit"
              name="submit"
              disabled={isChoosenCityDataSubmitting}
            >
              {isChoosenCityDataSubmitting ? "Submitting" : "Submit"}
            </button>
          </div>
        </form>
      </>
    );
  }
  return (
    <>
      <form className={classes.form} onSubmit={submitLocationFormHandler}>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="Enter city name"
          value={cityName}
          onChange={onInputChange}
        />
        <select
          name="country-codes"
          value={countryCode}
          onChange={onCountryCodeChange}
        >
          {Object.keys(countryCodes).map((key, i) => (
            <option
              value={key}
              key={i}
            >{`${key}- ${countryCodes[key]}`}</option>
          ))}
        </select>
        <div className={classes.actions}>
          <button type="submit" name="submit" disabled={isCityDataSubmitting}>
            {isCityDataSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
