import classes from "./compass.module.css";

// Compass for wind direction
export function Compass({ degree }) {
  return (
    <div className={classes.compass}>
      <div className={classes["direction-container-horizontal"]}>
        <h3>W</h3>
        <h3>E</h3>
      </div>
      <div className={classes["direction-container-vertical"]}>
        <h3>N</h3>
        <h3>S</h3>
      </div>
      <div
        className={classes["needle"]}
        style={{
          transform: `translate(-50%, -50%) rotate(${degree ? degree : 0}deg)`,
        }}
      >
        <div className={classes.arrow}></div>
      </div>
    </div>
  );
}
