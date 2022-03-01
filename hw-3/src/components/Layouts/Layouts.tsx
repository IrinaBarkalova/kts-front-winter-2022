import * as React from "react";

import styles from "@styles/Layout.module.scss";
import { Space } from "antd";

type Props = {
  children: React.ReactNode;
};

const CardBlock: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__content}>
        <Space direction="vertical">
          <div className={styles.card_block}>{children}</div>
        </Space>
      </div>
    </div>
  );
};

export default CardBlock;
