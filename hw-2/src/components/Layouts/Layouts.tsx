import * as React from "react";

import { Space } from "antd";
import "@styles/Layout.css";

type Props = {
  children: React.ReactNode;
};

const CardBlock: React.FC<Props> = ({ children }: Props) => {
  return (
    <div className="layout">
      <div className="layout__content">
        <Space direction="vertical">
          <div className="card-block">{children}</div>
        </Space>
      </div>
    </div>
  );
};

export default CardBlock;
