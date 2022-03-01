import * as React from "react";

import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
const EndMessage: React.FC = () => {
  return (
    <Result icon={<SmileOutlined />} title="You have seen all repositories!" />
  );
};

export default React.memo(EndMessage);
