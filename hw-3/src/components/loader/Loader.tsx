import * as React from "react";

import styles from "@styles/SearchForm.module.scss";
import { Spin } from "antd";
const Loader: React.FC = () => {
  return (
    <div className={styles.searchForm}>
      <Spin size="large" />
    </div>
  );
};

export default React.memo(Loader);
