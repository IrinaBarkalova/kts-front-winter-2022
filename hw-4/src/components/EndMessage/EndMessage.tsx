import * as React from "react";

import { Result } from "antd";
const EndMessage: React.FC = () => {
  return <Result title="You have seen all repositories!" />;
};

export default React.memo(EndMessage);
