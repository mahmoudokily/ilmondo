import styles from './searchinput.module.css'

import SearchRounded from "@material-ui/icons/SearchRounded";
const SearchInput = ({ ...rest }) => (
    <div className={styles.searchinput}>
        <SearchRounded />
        <input type='text' {...rest} className={styles.input} />
    </div>
)


export default SearchInput;