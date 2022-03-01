import * as React from "react";

import styles from "@styles/Layout.module.scss";
import { Space } from "antd";

type Props = {
  children: React.ReactNode;
};

const CardBlock: React.FC<Props> = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={styles.layout}>
      <div className={styles.layout__content}>
        <Space direction="vertical">
          <div className={styles.card_block}>{props.children}</div>
        </Space>
      </div>
    </div>
  );
};

export default CardBlock;
