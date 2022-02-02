import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout/layout";
import SearchInput from "../components/Searchinput/SearchInput";
import CountriesTable from "../components/countryTable/CountriesTable";
import { useState } from "react";

function Home({ countries }) {
  const [keyword, setKeyword] = useState("");
  const filterdCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );
  const handleFilter = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout className={styles.home}>
      <div className={styles.home_heading}>
        <div className={styles.top_header}>
          search of {countries.length} countries !
        </div>
        <div className={styles.input}>
          <SearchInput
            placeholder=" Search for country , region , subregion"
            onChange={handleFilter}
          />
        </div>
      </div>

      <CountriesTable countries={filterdCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  return {
    props: {
      countries,
    },
  };
};

export default Home;
