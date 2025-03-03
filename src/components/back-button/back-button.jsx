import classes from "./back-button.module.css";

export function BackButton({ onClick, style }) {
  return (
    <div className={classes.actions} style={style}>
      <button type="button" name="back" onClick={onClick}>
        Back
      </button>
    </div>
  );
}
