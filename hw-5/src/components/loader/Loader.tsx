import * as React from "react";

import styles from "components/SearchForm/SearchForm.module.scss";
const Loader: React.FC = () => {
  return (
    <div className={styles.search_form}>
      <p>Loading...</p>
    </div>
  );
};

export default React.memo(Loader);
