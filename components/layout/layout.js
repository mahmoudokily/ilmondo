import styles from './layout.module.css'
import Link from 'next/link'
import Head from 'next/head'
import PublicIcon from '@material-ui/icons/Public';

const Layout = ({ children, title = "Ilmondo" }) => (
    <div className={styles.container}>
        <Head>
            <title>{title} </title>
        </Head>
        <header className={styles.header}>
            <Link href="/">
                <h1>
                    il Mondo
                </h1>

            </Link>





        </header>
        <div className={styles.main}>        {children}</div>

        <div className={styles.footer}>
            copyright : Mahmoud Okily 2021
        </div>

    </div>
)


export default Layout;