
import { useEffect, useState } from 'react';
import styles from './country.module.css'
import Layout from "../../components/layout/layout"
import Link from 'next/link'
const getCountry = async (id) => {
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
    const country = await res.json();
    return country;
}




const Country = ({ country }) => {
    const [borders, setBorders] = useState([]);
    const getBorders = async () => {
        const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
        setBorders(borders)

    }
    useEffect(() => {
        getBorders();

    }, [])
    console.log(borders)
    return (
        <Layout title={country.name}>
            < div className={styles.country}>
                <div className={styles.country_heading}>
                    <div className={styles.country_img} >
                        <img src={country.flag} alt="" />
                    </div>
                    <div className={styles.country_name}>{country.name}</div>
                    <div className={styles.country_region}>{country.region}</div>
                    <div className={styles.country_row}>
                        <div className={styles.country_population}>
                            <div className={styles.country_value}>  {country.population}</div>
                            <div className={styles.country_label} >population </div>

                        </div>
                        <div className={styles.country_area}>
                            <div className={styles.country_value}>{country.area}</div>
                            <div className={styles.country_label}>  area</div>
                        </div>
                    </div>
                </div>

                <div className={styles.country_details}>
                    <div className={styles.item}>
                        <div>capital </div>
                        <div>{country.capital}</div>
                    </div>
                    <div className={styles.item}>
                        <div>subregion </div>
                        <div>{country.subregion}</div>
                    </div>
                    <div className={styles.item}>
                        <div>currencies </div>
                        <div>{country.currencies.map(currency => {
                            return (
                                <div>
                                    <div>{currency.name}</div>
                                    <div>{currency.code}</div>
                                    <div>{currency.symbol}</div>
                                </div>
                            )
                        })}</div>
                    </div>
                    <div className={styles.item}>
                        <div>languages </div>
                        <div>{country.languages.map(({ name }) => name).join(',')}</div>
                    </div>
                    <div className={styles.item}>
                        <div>nativeName </div>
                        <div>{country.nativeName}</div>
                    </div>
                    <div className={styles.item}>
                        <div>gini </div>
                        <div>{country.gini}</div>
                    </div>
                    <div className={styles.item}>
                        <div>topLevelDomain </div>
                        <div>{country.topLevelDomain}</div>
                    </div>
                    <div className={styles.item}>
                        <div>regionalBlocs </div>
                        <div>{country.regionalBlocs.map(({ name }) => name).join(',')}</div>
                    </div>
                    <div className={styles.country_borders}>
                        <div className={styles.borders_head}>{country.name} Borders </div>
                        <div className={styles.borders}>
                            {borders.map(({ flag, name, alpha3Code }) => (
                                <Link href={`/country/${alpha3Code}`} >
                                    <div >
                                        <div className={styles.border_img}> <img src={flag} alt="" /></div>
                                        <div className={styles.border_name}>{name}</div>
                                    </div>

                                </Link>
                            ))}
                        </div>


                    </div>

                </div>


            </div >
        </Layout>

    )
}



export default Country;

export const getStaticPaths = async () => {
    const res = await fetch("https://restcountries.eu/rest/v2/all")
    const countries = await res.json();
    const paths = countries.map((country) => ({
        params: { id: country.alpha3Code },
    }))
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({ params }) => {

    const country = await getCountry(params.id);

    return {
        props: {
            country,
        }
    }
}