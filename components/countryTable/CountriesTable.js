import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./countriestable.module.css";
import Link from "next/link";
import { Typography } from "@material-ui/core";
const orderBy = (countries, value, direction) => {
  if (direction === "desc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  } else if (direction === "asc") {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  } else {
    return countries;
  }
};
const RowOrder = ({ direction }) => {
  if (!direction) {
    return <></>;
  } else if (direction === "desc") {
    return (
      <div>
        <KeyboardArrowDownRounded />
      </div>
    );
  } else {
    return (
      <div>
        <KeyboardArrowUpRounded />
      </div>
    );
  }
};
const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState("");
  const [value, setValue] = useState("");

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };
  return (
    <div>
      <div className={styles.sort_buttons}>
        <button className={styles.flag}>Flag</button>
        <button
          className={styles.name}
          onClick={() => setValueAndDirection("name")}
        >
          <Typography variant="h5">Name</Typography>
          {value === "name" && <RowOrder direction={direction} />}
        </button>
        <button
          className={styles.population}
          onClick={() => setValueAndDirection("population")}
        >
          <div>Population</div>
          {value === "population" && <RowOrder direction={direction} />}
        </button>
        <button
          className={styles.area}
          onClick={() => setValueAndDirection("area")}
        >
          <div>area</div>
          {value === "area" && <RowOrder direction={direction} />}
        </button>
        <button
          className={styles.gini}
          onClick={() => setValueAndDirection("gini")}
        >
          <div>gini</div>
          {value === "gini" && <RowOrder direction={direction} />}
        </button>
      </div>
      {orderedCountries.map((country) => (
        <Link href={`country/${country.alpha3Code}`}>
          <div className={styles.country}>
            <div className={styles.country_flag}>
              <img src={country.flag} alt={country.name} />
            </div>
            <div className={styles.country_name}> {country.name}</div>
            <div className={styles.country_population}>
              {" "}
              {country.population}
            </div>
            <div className={styles.area}> {country.area || 0} </div>
            <div className={styles.gini}> {country.gini || 0}%</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
