import styles from "./searchinput.module.css";
import { TextField } from "@material-ui/core";
import SearchRounded from "@material-ui/icons/SearchRounded";
const SearchInput = ({ ...rest }) => (
  //   <div className={styles.searchinput}>
  // <SearchRounded />
  <TextField type="text" {...rest} fullWidth variant="outlined" />
  //   </div>
);

export default SearchInput;
